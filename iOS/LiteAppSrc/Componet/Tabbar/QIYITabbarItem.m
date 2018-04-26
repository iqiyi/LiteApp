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
//  QIYITabbarItem.m
//  QIYIMiniProgram
//
//  Created by Breakerror on 2018/3/1.
//  Copyright © 2018年 Breakerror. All rights reserved.
//

#import "QIYITabbarItem.h"

#define __TABBAR_ITEM_WIDTH         66
#define __TABBAR_ICON_SIZE          28

@interface QIYITabbarItem()
@property(nonatomic, readwrite, strong)UILabel* titleLabel;
@property(nonatomic, readwrite, strong)UIImageView* icon;
@end


@implementation QIYITabbarItem

-(instancetype) init {
    if (self = [super init]) {
        self.titleLabel = [[UILabel alloc] init];
        self.titleLabel.textAlignment = NSTextAlignmentCenter;
        self.titleLabel.font = [UIFont systemFontOfSize:10];
        [self addSubview:self.titleLabel];
        self.icon = [[UIImageView alloc] init];
        [self addSubview:self.icon];
        self.bOnSelected = nil;
        UITapGestureRecognizer* tapGesturRecognizer
        = [[UITapGestureRecognizer alloc]initWithTarget:self action:@selector(tap:)];
        [self addGestureRecognizer:tapGesturRecognizer];
    }
    return self;
}

-(void) tap:(id)tap {
    if (!self.selected) {
        if (self.bOnSelected) {
            self.bOnSelected();
        }
        [self setSelected:YES];
    }
}

-(void) layoutSubviews {
    CGFloat w = self.frame.size.width;
    CGFloat l = (w - __TABBAR_ICON_SIZE) /2;
    self.icon.frame = CGRectMake(l, 4, __TABBAR_ICON_SIZE, __TABBAR_ICON_SIZE);
    self.titleLabel.frame = CGRectMake(0, __TABBAR_ICON_SIZE +5, w, 13);
}

-(void) construct {
    self.titleLabel.text = self.title;
    self.titleLabel.textColor = self.titleUnSelectedColor;
    self.icon.image = self.unselectedIcon;
}

-(void) setSelected:(BOOL) selected {
    if (_selected != selected) {
        if (selected) {
            self.titleLabel.text = self.title;
            self.titleLabel.textColor = self.titleSelectedColor;
            self.icon.image = self.selectedIcon;
        } else {
            self.titleLabel.text = self.title;
            self.titleLabel.textColor = self.titleUnSelectedColor;
            self.icon.image = self.unselectedIcon;
        }
    }
    _selected = selected;
}
@end
