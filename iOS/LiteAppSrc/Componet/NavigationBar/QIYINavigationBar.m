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
//  QIYINavigationBar.m
//  QIYIMiniProgram
//
//  Created by Breakerror on 2018/3/1.
//  Copyright © 2018年 Breakerror. All rights reserved.
//

#import "QIYINavigationBar.h"
#import "QIYICommon.h"
#import "QIYINavBackButton.h"

@interface QIYINavigationBar()
@property(nonatomic, readwrite, strong) QIYINavBackButton*  backButton;
@property(nonatomic, readwrite, strong) UIView*  intervalLine;
@property(nonatomic, readwrite, strong) UIView*  innerContainer;
@property(nonatomic, readwrite, strong) UILabel* titleLabel;
@end

@implementation QIYINavigationBar

-(instancetype) init {
    if (self = [super init]) {
        CGRect rect = [[UIScreen mainScreen] bounds];
        self.frame = CGRectMake(0, 0, rect.size.width, __NAVIGATION_BAR_HEIGHT);
        CGFloat innerContainerHeight = __NAVIGATION_BAR_HEIGHT - __NAVIGATION_OFFSET;
        self.innerContainer = [[UIView alloc] init];
        self.innerContainer.frame = CGRectMake(0,
            __NAVIGATION_OFFSET, rect.size.width, innerContainerHeight);
        [self addSubview:self.innerContainer];
        
        self.intervalLine = [[UIView alloc] init];
        self.intervalLine.frame = CGRectMake(
            0, __NAVIGATION_BAR_HEIGHT -0.5, rect.size.width, 0.5);
        self.intervalLine.backgroundColor = [UIColor colorWithRed:0 green:0 blue:0 alpha:.15];
        [self addSubview:self.intervalLine];
        
        self.backButton = [[QIYINavBackButton alloc] init];
        self.backButton.frame = CGRectMake(15, 6, __NAVIGATION_BUTTON_SIZE, __NAVIGATION_BUTTON_SIZE);
        [self.backButton addTarget:self
                                 action:@selector(onDismissButtonTap:)
                       forControlEvents:UIControlEventTouchUpInside];
        [self.innerContainer addSubview:self.backButton];

        self.titleLabel = [[UILabel alloc] init];
        self.titleLabel.textColor = [UIColor blackColor];
        self.titleLabel.font = [UIFont systemFontOfSize:13];
        [self.innerContainer addSubview:self.titleLabel];
    }
    return self;
}

-(void) onDismissButtonTap:(UIButton *)sender {
    if (nil != self.onDismiss) {
        self.onDismiss();
    }
}

-(void) showTitle:(NSString*)title {
    self.titleLabel.text = title;
    CGSize size = [self.titleLabel sizeThatFits:CGSizeMake(CGFLOAT_MAX, CGFLOAT_MAX)];
    CGFloat t = ((__NAVIGATION_BAR_HEIGHT - __NAVIGATION_OFFSET) - size.height) /2;
    CGFloat l = __NAVIGATION_OFFSET + 5 + __NAVIGATION_BUTTON_SIZE;
    self.titleLabel.frame = CGRectMake(l, t, size.width, size.height);
}

-(void) showTitleColor:(UIColor*)clr {
    self.titleLabel.textColor = clr;
}

-(void) showBackgroudColor:(UIColor*)clr {
    self.backgroundColor = clr;
}

-(void) showIntervalLineColor:(UIColor*)clr {
    self.intervalLine.backgroundColor = clr;
}

@end
