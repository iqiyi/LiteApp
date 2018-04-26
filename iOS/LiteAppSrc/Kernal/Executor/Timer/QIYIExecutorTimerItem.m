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
//  QIYIExecutorTimerItem.m
//  QIYIMiniProgram
//
//  Created by Breakerror on 2018/2/28.
//  Copyright © 2018年 Breakerror. All rights reserved.
//

#import "QIYIExecutorTimerItem.h"

@implementation QIYIExecutorTimerItem

-(instancetype) init {
    if (self = [super init]) {
        self.loop       = NO;
        self.handle     = 0;
        self.index      = -1;
        self.interval   = 0;
        self.lastInvoke = 0;
        self.startTime  = 0;
        self.callback   = nil;
    }
    return self;
}

-(long long) timeout {
    return self.startTime + self.interval;
}
@end
