//
//  QIYIExecutorExport.h
//  QIYIMiniProgram
//
//  Created by Breakerror on 2018/2/28.
//  Copyright © 2018年 Breakerror. All rights reserved.
//

#import "QIYIInct.h"
#import "QIYICommon.h"

@protocol QIYIExecutorExportDelegate<NSObject>
-(void) postPatch:(NSString*)patch;
-(void) triggerEvent:(NSString *)type withArguments:(id)arguments;
@end

@protocol QIYIExecutorExport<JSExport>
-(void) postPatch:(NSString*)patch;
JSExportAs(triggerEvent, -(void) triggerEvent:(NSString*)type arguments:(JSValue *)arguments);
-(BOOL) finish:(id)arguments;
-(BOOL) share:(id)argument;
@end


@interface QIYIExecutorExportImpl : NSObject<QIYIExecutorExport>
@property(nonatomic, readwrite, weak) id<QIYIExecutorExportDelegate> delegate;
@end

