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
//  QIYILoadingViewImpl.m
//  QIYIMiniProgram
//
//  Created by yanqiang zhang on 27/02/2018.
//  Copyright © 2018 www.iqiyi.com. All rights reserved.
//

#import "QIYILoadingViewImpl.h"
#import "QIYICommon.h"

#define _ANIMATION_VIEW_SIZE            40
#define _ANIMATION_VIEW_SIZE            40

@interface QIYILoadingViewImpl()
@property(nonatomic, readwrite, strong) UIImageView* animation;
@end

@implementation QIYILoadingViewImpl

-(instancetype) init {
    if (self = [super init]) {
        self.backgroundColor = [UIColor whiteColor];
        self.animation = [[UIImageView alloc] init];
        
        NSMutableArray* array = [[NSMutableArray alloc] init];
        for (int i = 1; i <= 4; i++) {
            NSString *name =   [NSString stringWithFormat:@"loading0%d.png",i];
            NSBundle *libBundle = [NSBundle bundleWithPath:[[[NSBundle mainBundle] resourcePath] stringByAppendingPathComponent:@"QIYI_Resouce.bundle"]];
            NSString *path = @"";
            if (libBundle) {
                path = [[libBundle resourcePath] stringByAppendingPathComponent:name];
            }
            [array addObject:[UIImage imageWithContentsOfFile:path]];
        }
        self.animation.animationImages = array;
        self.animation.animationDuration = 1;
        self.animation.animationRepeatCount = 0;
        [self addSubview:self.animation];
        CGRect rect = [[UIScreen mainScreen] bounds];
        CGFloat w = rect.size.width; CGFloat h = rect.size.height;
        self.frame = CGRectMake(0, __NAVIGATION_BAR_HEIGHT, w, h - __NAVIGATION_BAR_HEIGHT);
        self.backgroundColor = [UIColor whiteColor];
        [self showAnimation:YES];
    }
    return self;
}

-(void) showAnimation:(BOOL)show {
    if (show) {
        [self.animation startAnimating];
    } else {
        [self.animation stopAnimating];
    }
}

-(void) layoutSubviews {
    CGRect rect = self.frame;
    CGFloat l = (rect.size.width - _ANIMATION_VIEW_SIZE) /2;
    CGFloat y = (rect.size.height - __NAVIGATION_BAR_HEIGHT) /2 - _ANIMATION_VIEW_SIZE;
    self.animation.frame = CGRectMake(l, y, _ANIMATION_VIEW_SIZE, _ANIMATION_VIEW_SIZE);
}

-(void)dealloc{
    
    NSLog(@"QPContainerLoading dealloc");
}

@end
