/**
 *
 * Copyright 2018 iQIYI.com
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
//
//  QIYIContainer.m
//  QIYIMiniProgram
//
//  Created by Breakerror on 2018/2/28.
//  Copyright © 2018年 Breakerror. All rights reserved.
//


#import "QIYIContainer.h"
#import "QIYIThreadExecutor.h"
#import "QIYINativeViewHandler.h"
@interface QIYIContainer()<QIYIExecutorExportDelegate>
@property(nonatomic, readwrite, strong) QIYIThreadExecutor* executor;
@property(nonatomic, readwrite, strong) QIYINativeViewHandler* nativeHandler;
@end

@implementation QIYIContainer

-(instancetype) init {
    if (self = [super init]) {
        self.asset      = nil;
        self.name       = nil;
        self.manifest   = nil;
        self.nativeHandler = [[QIYINativeViewHandler alloc] init];
        self.executor = [[QIYIThreadExecutor alloc] init];
        if (self.executor.currentExecutor) {
            self.executor.currentExecutor.delegate = self;
        }
        
        self.webview = [[QIYIWebview alloc] init];
        __weak QIYIContainer* ws = self;
        self.webview.onRecvScriptEmit = ^(NSString* script) {
            if (ws && script) {
                [ws evaluateScript:[script dataUsingEncoding:NSUTF8StringEncoding]];
            }
        };
        self.webview.onRecvNativeCall = ^(NSString* buffer) {
            if (ws && buffer) {
                NSData* data = [buffer dataUsingEncoding:NSUTF8StringEncoding];
                NSDictionary* dic = [NSJSONSerialization JSONObjectWithData:data options:0 error:nil];
                if (nil != dic) {
                    NSString* call_type = __safe_convert([dic objectForKey:@"type"], NSString);
                    if ([call_type isEqualToString:@"nativeBox"]) {
                        NSDictionary* inner = __safe_convert([dic objectForKey:@"data"], NSDictionary);
                        if (nil != inner) {
                            [ws.nativeHandler handleNativeView:inner onContainer:ws];
                        }
                        
                    }
                }
            }
        };
        [self addSubview:self.webview];
    }
    return self;
}

-(void) dealloc {
    if (self.executor) {
        [self.executor shouldExit];
    }
}

-(void) layoutSubviews {
    if (self.webview) {
        self.webview.frame = self.bounds;
    }
}

-(void)setAsset:(QIYIAsset *)asset{
    if (asset != nil) {
        _asset = asset;
         __weak QIYIContainer* ws = self;
        [self.webview load:self.asset didConstructed:^(QIYIWebview * webview) {
            [ws injectCssFile];
            [ws load];
        }];
    }
}

-(BOOL) load {
    if (!self.asset || !self.name || !self.manifest || !self.executor) {
        return NO;
    }
    
    // start inner thread
    [self.executor start];
    
    // executor base script
    NSData* buffer = [self.asset obtainBaseScript];
    if (nil != buffer) {
        [self.executor post:^(QIYIExecutor* executor) {
            [executor evaluateScript:buffer];
        }];
    }
    
    // executor business script
    NSString* businessPath = [self.manifest obtainPage:self.name];
    NSData* businessBuffer = [self.asset obtainBundleScript:businessPath];
    if (nil != businessBuffer) {
        [self.executor post:^(QIYIExecutor* executor) {
            [executor evaluateScript:businessBuffer];
        }];
    }
    
    return YES;
}

-(void) injectCssFile {
    // executor business css
    NSString* businessPath = [self.manifest obtainPage:self.name];
    NSString* cssPath = [self.asset obtainBundleCss:businessPath];
    NSData* dada = [[NSFileManager defaultManager] contentsAtPath:cssPath];
    if (nil != dada) {
        NSString* script = @"addCssNative('";
        script = [script stringByAppendingString:cssPath];
        script = [script stringByAppendingString:@"');"];
        [self postPatch:script];
    }
}

-(void) evaluateScript:(NSData*)buffer {
    if (buffer && self.executor) {
        [self.executor post:^(QIYIExecutor* executor) {
            [executor evaluateScript:buffer];
        }];
    }
}

-(void) postPatch:(NSString*)patch {
   __weak QIYIContainer* ws = self;
    if (patch && self.webview) {
        dispatch_async(dispatch_get_main_queue(), ^{
            [ws.webview commitPatch:patch];
        });
    }
}

-(void)triggerEvent:(NSString *)type withArguments:(id)arguments{
    NSDictionary* args = __safe_convert(arguments, NSDictionary);
    if ([type isEqualToString:@"goPage"]) {
        NSString* pagename = __safe_convert([args objectForKey:@"path"], NSString);
        NSDictionary* data = __safe_convert([args objectForKey:@"data"], NSDictionary);
        if (pagename != nil && self.handler) {
            __weak QIYIContainer* ws = self;
            dispatch_async(dispatch_get_main_queue(), ^{
                [ws.handler startNewPage:pagename withArguments:data];
            });
        }
    }
}

@end
