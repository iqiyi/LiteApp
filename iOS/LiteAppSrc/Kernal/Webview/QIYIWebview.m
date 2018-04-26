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
//  QIYIWebview.m
//  QIYIMiniProgram
//
//  Created by Breakerror on 2018/2/28.
//  Copyright © 2018年 Breakerror. All rights reserved.
//

#import "QIYIInct.h"
#import "QIYIWebview.h"
#import "QIYIWebviewDelegate.h"

@interface QIYIWebview()<WKScriptMessageHandler, WKNavigationDelegate>
@property(nonatomic, readwrite, strong) NSMutableArray<NSString*>* patchCache;
@property(nonatomic, readwrite, assign) BOOL isDidConstructed;
@property(nonatomic, readwrite, strong) QIYIWebviewDelegate* delegate;
@property(nonatomic, readwrite, strong) bOnDidConstructed onConstructedCallback;
@property(nonatomic, readwrite, strong) QIYIAsset* asset;
@end

@implementation QIYIWebview

-(instancetype) init {
    self.delegate = [[QIYIWebviewDelegate alloc] init];
    self.delegate.host = self;
    WKUserContentController* userContentController = [[WKUserContentController alloc] init];
    [userContentController addScriptMessageHandler:_delegate name:@"message"];
    [userContentController addScriptMessageHandler:_delegate name:@"finish_construct"];
    [userContentController addScriptMessageHandler:_delegate name:@"native_call"];
    [userContentController addScriptMessageHandler:_delegate name:@"emit"];
    WKWebViewConfiguration* configuration = [[WKWebViewConfiguration alloc] init];
    configuration.userContentController = userContentController;
    
    if (self = [super initWithFrame:CGRectZero configuration:configuration]) {
        self.isDidConstructed = NO;
        self.navigationDelegate = self;
        self.patchCache = [[NSMutableArray alloc] init];
        self.scrollView.bounces = NO;
    }
    return self;
}

-(void) load:(QIYIAsset*)asset didConstructed:(bOnDidConstructed)onConstructedCallback {
    self.asset = asset;
    self.onConstructedCallback = onConstructedCallback;
    if (nil != self.asset) {
        NSString *html = [asset obtainHtmlPath];
        if (html != nil) {
            NSURL* fileURL = [NSURL fileURLWithPath:html];
            NSData *data = [NSData dataWithContentsOfFile:html];
            NSString* str = [[NSString alloc] initWithData:data
                                                  encoding:kCFStringEncodingUTF8];
            [self loadHTMLString:str baseURL:fileURL];
        }
    }
}

-(void) userContentController:(WKUserContentController*)userContentController
      didReceiveScriptMessage:(WKScriptMessage *)message {
    if ([@"message" isEqualToString:message.name]) {
    } else if ([@"finish_construct" isEqualToString:message.name]) {
        [self onDidConstructed];
    } else if ([@"emit" isEqualToString:message.name]) {
        if (self.onRecvScriptEmit) {
             self.onRecvScriptEmit(message.body);
        }
    } else if ([@"native_call" isEqualToString:message.name]) {
        if (self.onRecvNativeCall) {
             self.onRecvNativeCall(message.body);
        }
    }
}

-(void) onDidConstructed {
    self.isDidConstructed = YES;
    for (NSString* patch in self.patchCache) {
        [self evaluateJavaScript:patch completionHandler:^(id obt, NSError* error) {
        }];
    }
    
    if (self.onConstructedCallback) {
        self.onConstructedCallback(self);
    }
}

-(void) commitPatch:(NSString*)patch {
    if (patch) {
        if (self.isDidConstructed) {
            [self evaluateJavaScript:patch completionHandler:^(id obt, NSError* error) {
            }];
        } else {
            [self.patchCache addObject:patch];
        }
    }
}

@end


