//
//  QIYIThreadExecutor.h
//  QIYIMiniProgram
//
//  Created by Breakerror on 2018/2/28.
//  Copyright © 2018年 Breakerror. All rights reserved.
//

#import "QIYIInct.h"
#import "QIYICommon.h"
#import "QIYIExecutor.h"

@interface QIYIThreadExecutor: NSObject
-(void) start;
-(void) post:(void(^)(QIYIExecutor *))block;
-(void) shouldExit;
-(QIYIExecutor *) currentExecutor;
@end
