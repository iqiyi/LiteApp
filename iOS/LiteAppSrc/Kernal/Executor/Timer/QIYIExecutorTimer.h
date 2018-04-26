//
//  QIYIExecutorTimer.h
//  QIYIMiniProgram
//
//  Created by Breakerror on 2018/2/28.
//  Copyright © 2018年 Breakerror. All rights reserved.
//

#import "QIYIInct.h"
#import "QIYIExecutorTimerItem.h"

@interface QIYIExecutorTimer : NSObject
-(void) tick;
-(void) removeAll;
-(JSValue*) removeNodeAtIndex:(NSInteger)index;
-(JSValue*) removeNodeForHandle:(NSInteger)index;
-(NSInteger) nextTimeout;
-(NSInteger) timerCount;
-(NSInteger) addNode:(NSInteger)time withBlock:(JSValue*)block loop:(BOOL)loop;
-(QIYIExecutorTimerItem*) removeHeadNode;
-(QIYIExecutorTimerItem*) headNode;
@end
