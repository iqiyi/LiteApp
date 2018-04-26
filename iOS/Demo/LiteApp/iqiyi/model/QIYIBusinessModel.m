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
//  QIYIBusinessModel.m
//  QIYIMiniProgram
//
//  Created by yanqiang zhang on 09/02/2018.
//  Copyright © 2018 www.iqiyi.com. All rights reserved.
//

#import "QIYIBusinessModel.h"

@implementation QIYIBusinessModel
-(instancetype) init{
    
    if (self = [super init]) {
        _version = @"";
        _base_version = @"";
        _manifest_url = @"";
        _package = @"";
    }
    return self;
    
}

- (void)setValue:(id)value forUndefinedKey:(NSString *)key {
    NSLog(@"setValue = %@ forUndefinedKey = %@",value,key);
}
@end
