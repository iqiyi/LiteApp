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
//  QIYIExecutorQueue.m
//  QIYIMiniProgram
//
//  Created by Breakerror on 2018/2/28.
//  Copyright © 2018年 Breakerror. All rights reserved.
//

#import "QIYIExecutorQueue.h"

@implementation QIYIExecutorQueue
{
    bool            _signaled;
    pthread_cond_t  _cond;
    pthread_mutex_t _mutex;
    NSMutableArray* _queue;
}

-(instancetype) init {
    if (self = [super init]) {
        _signaled = false;
        pthread_cond_init(&_cond, NULL);
        pthread_mutex_init(&_mutex, NULL);
        _queue = [[NSMutableArray alloc] init];
    }
    return self;
}

-(void) dealloc {
    pthread_cond_destroy(&_cond);
    pthread_mutex_destroy(&_mutex);
}

-(void) postExitSignal {
    pthread_mutex_lock(&_mutex);
    _signaled = true;
    [_queue addObject: [NSNull null]];
    pthread_cond_signal(&_cond);
    pthread_mutex_unlock(&_mutex);
}

-(void) post:(void(^)(QIYIExecutor *))block {
    pthread_mutex_lock(&_mutex);
    if (nil != block) {
        _signaled = true;
        [_queue addObject:block];
    }
    pthread_cond_signal(&_cond);
    pthread_mutex_unlock(&_mutex);
}

-(NSArray*) obtian:(NSUInteger)timeout {
    if (timeout > 10000000) {
        timeout = 10000000;
    }
    NSMutableArray* arr = [[NSMutableArray alloc] init];
    pthread_mutex_lock(&_mutex);
    if (!_signaled) {
        struct timeval t;
        gettimeofday(&t, NULL);
        t.tv_usec += timeout * 1000;
        if (t.tv_usec >= 1000000) {
            t.tv_sec += t.tv_usec / 1000000;
            t.tv_usec %= 1000000;
        }
        struct timespec outtime = {t.tv_sec, t.tv_usec * 1000};
        pthread_cond_timedwait(&_cond, &_mutex, &outtime);
    }
    NSMutableArray* ta = _queue;
    _queue = arr; arr = ta;
    _signaled = false;
    pthread_mutex_unlock(&_mutex);
    return arr;
}
@end
