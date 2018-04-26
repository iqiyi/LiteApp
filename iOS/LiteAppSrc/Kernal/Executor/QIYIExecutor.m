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
//  QIYIExecutor.m
//  QIYIMiniProgram
//
//  Created by Breakerror on 2018/2/28.
//  Copyright © 2018年 Breakerror. All rights reserved.
//

#import "QIYICommon.h"
#import "QIYIExecutor.h"
#import "QIYINetworkExport.h"

@interface QIYIExecutor()
@property(nonatomic, readwrite, strong) QIYIExecutorTimer* timer;
@property(nonatomic, readwrite, strong) QIYIExecutorExportImpl* export;
@property(nonatomic, readwrite, strong) QIYINetworkExport* network;
@end

@implementation QIYIExecutor

-(instancetype) init {
    if (self = [super init]) {
        self.timer = [[QIYIExecutorTimer alloc] init];
        _context = [[JSContext alloc] init];
        __weak QIYIExecutor* ws = self;
        _context.exceptionHandler = ^(JSContext* context, JSValue* exception) {
            if (ws) {
                [ws handleException:context exception:exception];
            }
        };
        
        self.export = [[QIYIExecutorExportImpl alloc] init];
        _context[@"__base__"] = self.export;

        self.network = [[QIYINetworkExport alloc] init];
        _context[@"network"] = self.network;

        QIYIExecutorTimer* timer = self.timer;
        _context[@"global"] = _context.globalObject;
        _context[@"setTimeout"] = ^(JSValue* callback, NSNumber* timeout) {
            if (nil == callback || nil == timeout) {
                return @(0);
            }
            return @([timer addNode:timeout.integerValue withBlock:callback loop:NO]);
        };
        _context[@"setInterval"] = ^(JSValue* callback, NSNumber* timeout) {
            if (nil == callback || nil == timeout) {
                return @(0);
            }
            return @([timer addNode:timeout.integerValue withBlock:callback loop:YES]);
        };
        _context[@"clearTimeout"] = ^(NSNumber* handle) {
            if (nil != handle) {
                [timer removeNodeForHandle:handle.integerValue];
            }
        };
        _context[@"clearInterval"] = ^(NSNumber* handle) {
            if (nil != handle) {
                [timer removeNodeForHandle:handle.integerValue];
            }
        };
    }
    return self;
}

-(void) handleException:(JSContext*)context exception:(JSValue*)exception {
    NSDictionary* detail = __safe_convert([exception toObject], NSDictionary);
    if (nil == detail)  {
        return;
    }
    NSNumber* line = detail[@"line"];
    NSNumber* column = detail[@"column"];
    NSString* info = [NSString stringWithFormat:@"%@", exception];
    NSLog(@"js error info = %@ line = %@ column = %@ detail = %@",info,line,column,detail);
    if (self.exceptionHandler != nil) {
        self.exceptionHandler(info, line.intValue, column.intValue);
    }
}

-(QIYIExecutorTimer*) timer {
    return _timer;
}

-(JSValue*) evaluateScript:(NSData*)buffer {
    if (nil == buffer || nil == self.context) {
        return nil;
    }
    NSString* script = [[NSString alloc]
                        initWithData:buffer encoding:NSUTF8StringEncoding];
    if (nil != script && script.length > 0) {
        return [self.context evaluateScript:script];
    }
    return nil;
}

-(void) setDelegate:(id<QIYIExecutorExportDelegate>)delegate {
    if (self.export) {
        self.export.delegate = delegate;
    }
}

-(id<QIYIExecutorExportDelegate>) delegate {
    if (self.export) {
        return self.export.delegate;
    }
    return nil;
}

@end
