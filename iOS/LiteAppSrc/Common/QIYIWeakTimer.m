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
//  QIYIWeakTimer.m
//  QIYIMiniProgram
//
//  Created by Breakerror on 2018/2/28.
//  Copyright © 2018年 Breakerror. All rights reserved.
//

#import "QIYIWeakTimer.h"

@implementation QIYIWeakTimerTarget

-(void) fire:(NSTimer*)timer {
    if(self.target) {
#pragma clang diagnostic push
#pragma clang diagnostic ignored "-Warc-performSelector-leaks"
        [self.target performSelector:self.selector withObject:timer.userInfo afterDelay:0.0f];
#pragma clang diagnostic pop
    } else {
        [self.timer invalidate];
    }
}
@end

@implementation QIYIWeakTimer

+(NSTimer *) scheduledTimerWithTimeInterval:(NSTimeInterval)interval
                                     target:(id)aTarget
                                   selector:(SEL)aSelector
                                   userInfo:(id)userInfo
                                    repeats:(BOOL)repeats {
    QIYIWeakTimerTarget* timerTarget = [[QIYIWeakTimerTarget alloc] init];
    timerTarget.target = aTarget;
    timerTarget.selector = aSelector;
    timerTarget.timer = [NSTimer scheduledTimerWithTimeInterval:interval
                                                         target:timerTarget
                                                       selector:@selector(fire:)
                                                       userInfo:userInfo
                                                        repeats:repeats];
    return timerTarget.timer;
}

+(NSTimer *)scheduledTimerWithTimeInterval:(NSTimeInterval)interval
                                     block:(WeakTimerHandler)block
                                  userInfo:(id)userInfo
                                   repeats:(BOOL)repeats {
    NSMutableArray *userInfoArray = [NSMutableArray arrayWithObject:[block copy]];
    if (userInfo != nil) {
        [userInfoArray addObject:userInfo];
    }
    return [self scheduledTimerWithTimeInterval:interval
                                         target:self
                                       selector:@selector(_timerBlockInvoke:)
                                       userInfo:[userInfoArray copy]
                                        repeats:repeats];
}

+(void) _timerBlockInvoke:(NSArray*)userInfo {
    WeakTimerHandler block = userInfo[0];
    id info = nil;
    if (userInfo.count == 2) {
        info = userInfo[1];
    }
    
    if (block) {
        block(info);
    }
}
@end

