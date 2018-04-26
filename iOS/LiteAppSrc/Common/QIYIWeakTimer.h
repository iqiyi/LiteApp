//
//  QIYIWeakTimer.h
//  QIYIMiniProgram
//
//  Created by Breakerror on 2018/2/28.
//  Copyright © 2018年 Breakerror. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface QIYIWeakTimerTarget : NSObject
@property (nonatomic, weak,   readwrite) id target;
@property (nonatomic, assign, readwrite) SEL selector;
@property (nonatomic, weak,   readwrite) NSTimer* timer;
@end

typedef void (^WeakTimerHandler)(id userInfo);
@interface QIYIWeakTimer : NSObject
+(NSTimer*) scheduledTimerWithTimeInterval:(NSTimeInterval)interval
                                    target:(id)aTarget
                                  selector:(SEL)aSelector
                                  userInfo:(id)userInfo
                                   repeats:(BOOL)repeats;

+(NSTimer*) scheduledTimerWithTimeInterval:(NSTimeInterval)interval
                                     block:(WeakTimerHandler)block
                                  userInfo:(id)userInfo
                                   repeats:(BOOL)repeats;
@end
