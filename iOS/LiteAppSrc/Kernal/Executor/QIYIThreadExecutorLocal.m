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
//  QIYIThreadExecutorLocal.m
//  QIYIMiniProgram
//
//  Created by Breakerror on 2018/2/28.
//  Copyright © 2018年 Breakerror. All rights reserved.
//

#import "QIYIThreadExecutorLocal.h"

@interface QIYIThreadExecutorLocal()
@property(nonatomic, readwrite, strong) NSLock* lock;
@property(nonatomic, readwrite, strong) NSMutableDictionary<NSString*, QIYIExecutorQueue*>* queues;
@property(nonatomic, readwrite, strong) NSMutableDictionary<NSString*, QIYIExecutor*>* executors;
@end

@implementation QIYIThreadExecutorLocal

+(QIYIThreadExecutorLocal *) shareInstance {
    static dispatch_once_t once_token;
    static QIYIThreadExecutorLocal* _instance = nil;
    dispatch_once(&once_token, ^{
        _instance = [[QIYIThreadExecutorLocal alloc] init];
    });
    return _instance;
}

-(instancetype) init {
    if (self = [super init]) {
        self.lock = [[NSLock alloc] init];
        self.queues = [[NSMutableDictionary alloc] init];
        self.executors = [[NSMutableDictionary alloc] init];
    }
    return self;
}

+(void) attachExecutor:(QIYIExecutor *)executor {
    NSThread* thread = [NSThread currentThread];
    QIYIThreadExecutorLocal* instance = [QIYIThreadExecutorLocal shareInstance];
    if (nil != executor && thread.name) {
        [instance.lock lock];
        [instance.executors setObject:executor forKey:thread.name];
        [instance.lock unlock];
    }
}

+(QIYIExecutor *) currentExecutor {
    QIYIExecutor* exectuor = nil;
    NSThread* thread = [NSThread currentThread];
    QIYIThreadExecutorLocal* instance = [QIYIThreadExecutorLocal shareInstance];
    if (thread.name) {
        [instance.lock lock];
        exectuor = [instance.executors objectForKey:thread.name];
        [instance.lock unlock];
    }
    return exectuor;
}

+(void) detachExecutor {
    NSThread* thread = [NSThread currentThread];
    QIYIThreadExecutorLocal* instance = [QIYIThreadExecutorLocal shareInstance];
    if (thread.name) {
        [instance.lock lock];
        [instance.executors removeObjectForKey:thread.name];
        [instance.lock unlock];
    }
}

+(void) attachExecutorQueue:(QIYIExecutorQueue *)queue {
    NSThread* thread = [NSThread currentThread];
    QIYIThreadExecutorLocal* instance = [QIYIThreadExecutorLocal shareInstance];
    if (nil != queue && thread.name) {
        [instance.lock lock];
        [instance.queues setObject:queue forKey:thread.name];
        [instance.lock unlock];
    }
}

+(QIYIExecutorQueue *) currentExecutorQueue {
    QIYIExecutorQueue* queue = nil;
    NSThread* thread = [NSThread currentThread];
    QIYIThreadExecutorLocal* instance = [QIYIThreadExecutorLocal shareInstance];
    if (thread.name) {
        [instance.lock lock];
        queue = [instance.queues objectForKey:thread.name];
        [instance.lock unlock];
    }
    return queue;
}

+(void) detachExecutorQueue {
    NSThread* thread = [NSThread currentThread];
    QIYIThreadExecutorLocal* instance = [QIYIThreadExecutorLocal shareInstance];
    if (thread.name) {
        [instance.lock lock];
        [instance.queues removeObjectForKey:thread.name];
        [instance.lock unlock];
    }
}
@end
