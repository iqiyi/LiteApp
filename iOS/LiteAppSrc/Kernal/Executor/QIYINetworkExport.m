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
//  QIYINetworkExport.m
//  QIYIMiniProgram
//
//  Created by yanqiang zhang on 08/03/2018.
//  Copyright © 2018 www.iqiyi.com. All rights reserved.
//

#import "QIYINetworkExport.h"
#import "QIYINetDownload.h"
#import "QIYIExecutorQueue.h"
#import "QIYIThreadExecutorLocal.h"

@implementation QIYINetworkExport
-(void)getUri:(NSString*)uri
         args:(id)arguments success:(JSValue*)success fail:(JSValue*)fail {
    QIYIExecutorQueue* queue = [QIYIThreadExecutorLocal currentExecutorQueue];
    if (nil == queue || nil == uri) {
        return;
    }
    NSDictionary* dic = __safe_convert(arguments, NSDictionary);
    [QIYINetDownload get:uri arguments:nil success:^(id object) {
        NSString* str = [[NSString alloc] initWithData:object
                                              encoding:NSUTF8StringEncoding];
        [queue post:^(QIYIExecutor* executor) {
            [success callWithArguments:@[str]];
        }];
    } failure:^{
        [queue post:^(QIYIExecutor* executor) {
            [fail callWithArguments:nil];
        }];
    }];
}
@end
