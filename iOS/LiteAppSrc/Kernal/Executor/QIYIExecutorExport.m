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
//  QIYIExecutorExport.m
//  QIYIMiniProgram
//
//  Created by Breakerror on 2018/2/28.
//  Copyright © 2018年 Breakerror. All rights reserved.
//

#import "QIYIExecutorExport.h"

@implementation QIYIExecutorExportImpl

-(instancetype) init {
    if (self = [super init]) {
        self.delegate = nil;
    }
    return self;
}

-(void) postPatch:(NSString*)patch {
    if (self.delegate && patch) {
        [self.delegate postPatch:patch];
    }
}

-(void) triggerEvent:(NSString*)type arguments:(JSValue*)arguments{
    NSDictionary* dic = nil;
    if (nil != arguments) {
        dic = __safe_convert([arguments toObject], NSDictionary);
    }
    if (self.delegate) {
        [self.delegate triggerEvent:type withArguments:dic];
    }
}

-(void) listenIdleTick:(JSValue*)value {
}

-(BOOL) finish:(id)arguments {
    return YES;
}

-(BOOL) share:(id)argument {
    return YES;
}

@end

