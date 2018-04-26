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
//  QIYINativeViewCombine.m
//  QIYIMiniProgram
//
//  Created by yanqiang zhang on 08/03/2018.
//  Copyright © 2018 www.iqiyi.com. All rights reserved.
//

#import "QIYINativeViewCombine.h"
#import "QIYIVideoViewImpl.h"
#import "QIYIInputViewImpl.h"
@implementation QIYINativeViewCombine
-(instancetype) init:(NSString *)type {
    if (self = [super init]) {
        if([type isEqualToString:@"QiyiInput"]){
            self.view = [[QIYIInputViewImpl alloc] init];
        }else if([type isEqualToString:@"QiyiVideo"]){
            self.view = [[QIYIVideoViewImpl alloc] init];
        }
        self.isHover = NO;
    }
    return self;
}
@end
