//
//  QIYIExecutorTimerItem.h
//  QIYIMiniProgram
//
//  Created by Breakerror on 2018/2/28.
//  Copyright © 2018年 Breakerror. All rights reserved.
//

#import "QIYIInct.h"

@interface QIYIExecutorTimerItem: NSObject
@property(nonatomic, assign, readwrite) BOOL loop;
@property(nonatomic, assign, readwrite) NSInteger handle;
@property(nonatomic, assign, readwrite) NSInteger index;
@property(nonatomic, assign, readwrite) NSInteger interval;
@property(nonatomic, assign, readwrite) long long lastInvoke;
@property(nonatomic, assign, readwrite) long long startTime;
@property(nonatomic, assign, readonly ) long long timeout;
@property(nonatomic, strong, readwrite) JSValue*  callback;
@end
