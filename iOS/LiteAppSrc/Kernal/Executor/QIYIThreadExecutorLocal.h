//
//  QIYIThreadExecutorLocal.h
//  QIYIMiniProgram
//
//  Created by Breakerror on 2018/2/28.
//  Copyright © 2018年 Breakerror. All rights reserved.
//

#import "QIYIInct.h"
#import "QIYIExecutor.h"
#import "QIYIExecutorQueue.h"

@interface QIYIThreadExecutorLocal: NSObject
+(void) attachExecutor:(QIYIExecutor *)executor;
+(QIYIExecutor *) currentExecutor;
+(void) detachExecutor;
+(void) attachExecutorQueue:(QIYIExecutorQueue *)queue;
+(QIYIExecutorQueue *) currentExecutorQueue;
+(void) detachExecutorQueue;
@end
