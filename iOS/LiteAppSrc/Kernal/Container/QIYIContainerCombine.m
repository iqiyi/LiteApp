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
//  QIYIContainerCombine.m
//  QIYIMiniProgram
//
//  Created by Breakerror on 2018/3/1.
//  Copyright © 2018年 Breakerror. All rights reserved.
//

#import "QIYIContainerCombine.h"

@interface QIYIContainerCombine()
@property(nonatomic, readwrite, assign) int current;
@property(nonatomic, readwrite, strong) NSMutableArray<QIYIContainer*>* arr;
@end

@implementation QIYIContainerCombine

-(instancetype) init:(NSUInteger)num {
    if (self = [super init]) {
        self.current = -1;
        self.arr = [[NSMutableArray alloc] init];
        for (int i = 0; i < num; ++i) {
            QIYIContainer* container = [[QIYIContainer alloc] init];
            [self.arr addObject:container];
            [self addSubview:container];
            if (i == 0) {
                container.hidden = NO;
            } else {
                container.hidden = YES;
            }
        }
    }
    return self;
}

-(QIYIContainer*) at:(NSUInteger)index {
    if (nil == self.arr) {
        return nil;
    }
    if (index >= self.arr.count) {
        return nil;
    }
    return [self.arr objectAtIndex:index];
}

-(void) layoutSubviews {
    QIYIContainer* container = [self at:self.current];
    if (nil != container) {
        container.frame = self.bounds;
    }
}

-(void) show:(NSUInteger)index {
    if (self.current >= 0 && self.current < self.arr.count) {
        QIYIContainer* container = [self at:self.current];
        if (nil != container) {
            container.hidden = YES;
        }
    }
    
    QIYIContainer* container = [self at:index];
    if (nil != container) {
        container.hidden = NO;
        container.frame = self.bounds;
        [self bringSubviewToFront:container];
    }
}

@end
