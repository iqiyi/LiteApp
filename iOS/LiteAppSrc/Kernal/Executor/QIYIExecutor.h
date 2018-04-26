//
//  QIYIExecutor.h
//  QIYIMiniProgram
//
//  Created by Breakerror on 2018/2/28.
//  Copyright © 2018年 Breakerror. All rights reserved.
//

#import "QIYIInct.h"
#import "QIYIExecutorTimer.h"
#import "QIYIExecutorExport.h"

typedef void(^bExceptionBlock)(NSString*, int, int);
@interface QIYIExecutor: NSObject
@property(readonly,  nonatomic, strong) JSContext* context;
@property(readwrite, nonatomic, strong) bExceptionBlock exceptionHandler;
@property(readwrite, nonatomic, weak)   id<QIYIExecutorExportDelegate> delegate;
-(QIYIExecutorTimer*) timer;
-(JSValue*) evaluateScript:(NSData*)buffer;
@end
