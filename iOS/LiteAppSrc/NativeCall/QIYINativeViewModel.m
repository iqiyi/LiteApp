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
//  QIYINativeViewModel.m
//  QIYIMiniProgram
//
//  Created by yanqiang zhang on 28/02/2018.
//  Copyright © 2018 www.iqiyi.com. All rights reserved.
//

#import "QIYINativeViewModel.h"
#import "QIYICommon.h"
@implementation QIYINativeViewModel
-(instancetype)initWithDic:(NSDictionary *)inner{
    if (self = [super init]) {
        _top = __safe_convert([inner objectForKey:@"top"], NSNumber);
        _left = __safe_convert([inner objectForKey:@"left"], NSNumber);
        _width = __safe_convert([inner objectForKey:@"width"], NSNumber);
        _height = __safe_convert([inner objectForKey:@"height"], NSNumber);
        _hover = __safe_convert([inner objectForKey:@"hover"], NSNumber);
        _viewData = __safe_convert([inner objectForKey:@"viewData"], NSDictionary);
    }
    return self;
}

-(CGRect)currentFrame{
    return CGRectMake(_left.floatValue, _top.floatValue, _width.floatValue, _height.floatValue);
}
@end
