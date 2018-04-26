//
//  QIYIExecutorQueue.h
//  QIYIMiniProgram
//
//  Created by Breakerror on 2018/2/28.
//  Copyright © 2018年 Breakerror. All rights reserved.
//

#import "QIYIInct.h"

@class QIYIExecutor;
@interface QIYIExecutorQueue: NSObject
-(void) postExitSignal;
-(void) post:(void(^)(QIYIExecutor *))block;
-(NSArray *) obtian:(NSUInteger)timeout;
@end
