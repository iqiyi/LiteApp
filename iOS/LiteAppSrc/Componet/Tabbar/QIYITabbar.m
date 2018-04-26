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
//  QIYITabbar.m
//  QIYIMiniProgram
//
//  Created by Breakerror on 2018/3/1.
//  Copyright © 2018年 Breakerror. All rights reserved.
//

#import "QIYITabbar.h"
#import "QIYICommon.h"

#define __TABBAR_ITEM_WIDTH             66
#define __TABBAR_ICON_SIZE              30


@interface QIYITabbar()
@property(nonatomic, readwrite, strong) UIView* line;
@property(nonatomic, readwrite, strong) NSMutableArray<QIYITabbarItem*>* items;
@end

@implementation QIYITabbar

-(instancetype) init {
    if (self = [super init]) {
        CGRect rect = [[UIScreen mainScreen] bounds];
        CGFloat top = rect.size.height - __TABBAR_HEIGHT;
        self.frame = CGRectMake(0, top, rect.size.width, __TABBAR_HEIGHT);
        self.items = [[NSMutableArray alloc] init];
        self.line = [[UIView alloc] init];
        self.line.frame = CGRectMake(0, 0, rect.size.width, 0.5);
        self.line.backgroundColor = [UIColor colorWithRed:0 green:0 blue:0 alpha:.15];
        [self addSubview:self.line];
    }
    return self;
}

-(void) addItem:(QIYITabbarItem*)item {
    if (nil != item) {
        [self.items addObject:item];
        [self addSubview:item];
        
        __weak QIYITabbar* ws = self;
        NSUInteger index = self.items.count -1;
        item.bOnSelected = ^{
            if (ws) {
                [self selected:index];
                if (ws.bOnTabbarSelected) {
                    ws.bOnTabbarSelected(index);
                }
            }
        };
    }
}

-(void) selected:(NSUInteger)index {
    for (int i = 0; i < self.items.count; ++i) {
        QIYITabbarItem* item = self.items[i];
        if (i == index) {
            [item setSelected:YES];
        } else {
            [item setSelected:NO];
        }
    }
}

-(void) setIntervalLineColor:(UIColor*)color {
    if (nil == color) {
        self.line.backgroundColor = [UIColor clearColor];
    } else {
        self.backgroundColor = color;
    }
}

-(void) layoutSubviews {
    NSUInteger count = self.items.count;
    if (count > 0) {
        CGFloat width = self.frame.size.width;
        CGFloat height = self.frame.size.height;
        width -= count * __TABBAR_ITEM_WIDTH;
        CGFloat interval = width / (count +1);
        CGFloat offset = interval;
        for (NSInteger i = 0; i < count; ++i) {
            CGRect rc = CGRectMake(offset, 0, __TABBAR_ITEM_WIDTH, height);
            self.items[i].frame = rc;
            offset += __TABBAR_ITEM_WIDTH + interval;
        }
    }
}
@end
