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
//  QIYIThreadExecutor.m
//  QIYIMiniProgram
//
//  Created by Breakerror on 2018/2/28.
//  Copyright © 2018年 Breakerror. All rights reserved.
//

#import "QIYIExecutor.h"
#import "QIYIExecutorQueue.h"
#import "QIYIThreadExecutor.h"
#import "QIYIThreadExecutorLocal.h"

@interface QIYIThreadExecutor()
@property(readwrite, nonatomic, strong) NSThread* thread;
@property(readwrite, nonatomic, strong) QIYIExecutorQueue* threadQueue;
@property(readwrite, nonatomic, strong) QIYIExecutor* executor;
@property(readwrite, nonatomic, strong) QIYIExecutorTimer* timer;
@end

@implementation QIYIThreadExecutor

static long long __g_thread_num = 0;

-(instancetype) init {
    if (self = [super init]) {
        self.executor = [[QIYIExecutor alloc] init];
        self.timer = self.executor.timer;
        self.threadQueue = [[QIYIExecutorQueue alloc] init];
        self.thread = [[NSThread alloc] initWithTarget:self
                                              selector:@selector(threadMain)
                                                object:nil];
        self.thread.name = [NSString stringWithFormat:@"mpt:%lld", __g_thread_num++];
    }
    return self;
}

-(void) start {
    if (nil != self.thread) {
        [self.thread start];
    }
}

-(void) post:(void(^)(QIYIExecutor *))block {
    if (block && self.threadQueue) {
        [self.threadQueue post:block];
    }
}

-(void) shouldExit {
    if (self.threadQueue) {
        [self.threadQueue postExitSignal];
    }
}

-(QIYIExecutor *) currentExecutor {
    return self.executor;
}

-(void) threadMain {
    NSArray* arr = nil;
    Boolean shouldExit = NO;
    QIYIExecutorTimer* timer = self.timer;
    QIYIExecutor* executor = self.executor;
    [QIYIThreadExecutorLocal attachExecutorQueue:self.threadQueue];
    while (1) {
        if (nil != timer) {
            arr = [self.threadQueue obtian:[timer nextTimeout]];
            [timer tick];
        }
        
        for (id object in arr) {
            if ([NSNull null] == object) {
                shouldExit = YES;
            } else {
                typedef void(^bThreadBlock)(QIYIExecutor *);
                ((bThreadBlock) object)(executor);
            }
        }
        
        if (shouldExit) {
            break;
        }
    }
    [QIYIThreadExecutorLocal detachExecutorQueue];
}
@end
