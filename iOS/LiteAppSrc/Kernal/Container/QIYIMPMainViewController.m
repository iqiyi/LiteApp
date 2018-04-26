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
//  QIYIMPMainViewController.m
//  QIYIMiniProgram
//
//  Created by Breakerror on 2018/3/1.
//  Copyright © 2018年 Breakerror. All rights reserved.
//

#import "QIYICommon.h"
#import "QIYITabbar.h"
#import "QIYIMainifest.h"
#import "QIYIContainer.h"
#import "QIYIContainerCombine.h"
#import "QIYINavigationBar.h"
#import "QIYIMPMainViewController.h"
#import "QIYIAssetManager.h"

@interface QIYIMPMainViewController()<QIYIContainerHandler>
@property(nonatomic, readwrite, strong) QIYIContainerCombine* container;
@property(nonatomic, readwrite, strong) UIView* loadingAnimationView;
@end

@implementation QIYIMPMainViewController

-(instancetype) init {
    if (self = [super init]) {
        self.container              = nil;
        self.manifest               = nil;
        self.loadingAnimationView   = nil;
    }
    return self;
}

-(void) loadView {
    self.view = [[UIView alloc] initWithFrame:[UIScreen mainScreen].bounds];
    self.view.backgroundColor = [UIColor whiteColor];
    if (self.bDelegate) {
        self.loadingAnimationView = [self.bDelegate buildLoadingAnimationView:self];
    }
    
    if (self.loadingAnimationView) {
        self.loadingAnimationView.frame = self.view.bounds;
    }
    
    if (self.asset) {
        [QIYIAssetManager shareInstance].asset = self.asset;
        __weak QIYIMPMainViewController* ws = self;
        [self showLoadingAnimation:YES];
        [self.asset bundlePrepare:^(BOOL success) {
            if (ws) {
                __strong QIYIMPMainViewController* s_self = ws;
                if (success) {
                    dispatch_async(dispatch_get_main_queue(), ^{
                        [self showLoadingAnimation:NO];
                        if (s_self.bDelegate) {
                            [s_self.bDelegate prepareBundle:YES vc:s_self];
                            s_self.manifest = [[QIYIMainifest alloc] init];
                            if ([s_self.manifest load:[s_self.asset obtainManifest]]) {
                                [s_self buildContent];
                            } else {
                                [s_self.bDelegate parserManifestFail:s_self];
                            }
                        }
                    });
                } else {
                    dispatch_async(dispatch_get_main_queue(), ^{
                        [self showLoadingAnimation:NO];
                        if (s_self.bDelegate) {
                            [s_self.bDelegate prepareBundle:NO vc:s_self];
                        }
                    });
                }
            }
        }];
    }
}

-(void) buildContent {
    if (!self.manifest || !self.asset) {
        return;
    }
    
    // build navigation bar
    [self buildNavigationBar];
    float navigationBarHeight = 0;
    if (self.navigationbarView) {
        navigationBarHeight = self.navigationbarView.frame.size.height;
        self.navigationbarView.frame = CGRectMake(0, 0, __SCREEN_WIDTH, navigationBarHeight);
    }
    
    // build tabbar
    QIYITabbar* tabbarView = nil;
    NSUInteger pagesCount = 1; float tabbarViewHeight = 0;
    QIYIManifestTabbarBundle* tabbar = [self.manifest obtainTabbarBundle];
     NSUInteger showCount = 0;
     NSString* name = [self.manifest ontainMainPage];
    if (tabbar && tabbar.items && self.asset) {
        pagesCount = tabbar.items.count;
        if (pagesCount > 1) {
            tabbarView = [[QIYITabbar alloc] init];
            for (NSUInteger i = 0; i < pagesCount; ++i) {
                QIYIManifestTabbarBundleItem* bundleItem = tabbar.items[i];
                if (bundleItem) {
                    QIYITabbarItem* item = [[QIYITabbarItem alloc] init];
                    item.title = bundleItem.title;
                    item.titleSelectedColor = bundleItem.titleSelectedColor;
                    item.titleUnSelectedColor = bundleItem.titleUnSelectedColor;
                    item.selectedIcon = [UIImage imageWithData:[self.asset obtainFile:bundleItem.selectedIcon]];
                    item.unselectedIcon = [UIImage imageWithData:[self.asset obtainFile:bundleItem.unselectedIcon]];
                    [item construct];
                    [tabbarView addItem:item];
                    if ([bundleItem.name isEqualToString:name]) {
                        showCount = i;
                        item.selected = true;
                    }
                    
                }
            }
        }
    }
    if (nil != tabbarView) {
        tabbarViewHeight = tabbarView.frame.size.height;
        float tabbarViewTop = __SCREEN_HEIGHT - tabbarViewHeight;
        tabbarView.frame = CGRectMake(0, tabbarViewTop, __SCREEN_WIDTH, tabbarViewHeight);
        [self.view addSubview:tabbarView];
        __weak QIYIMPMainViewController* ws = self;
        tabbarView.bOnTabbarSelected = ^(NSUInteger index) {
            if (ws && self.container) {
                [self.container show:index];
            }
        };
    }
    
    // build container combine
    self.container = [[QIYIContainerCombine alloc] init:pagesCount<1 ? 1 : pagesCount];
    float contianerHeight = __SCREEN_HEIGHT - navigationBarHeight - tabbarViewHeight;
    self.container.frame = CGRectMake(0, navigationBarHeight, __SCREEN_WIDTH, contianerHeight);
    if (tabbar && tabbar.items && self.asset) {
        for (NSUInteger i = 0; i < pagesCount; ++i) {
            QIYIManifestTabbarBundleItem* bundleItem = tabbar.items[i];
            if (bundleItem) {
                QIYIContainer* container = [self.container at:i];
                if (container) {
                    container.name = bundleItem.name;
                    [self configContainer:container];
                }
            }
        }
        if (pagesCount == 0) {
                QIYIContainer* container = [self.container at:0];
                if (container) {
                    container.name = name;
                    [self configContainer:container];
                }
        }
    }
    [self.view addSubview:self.container];
    [self.container show:showCount];
}

-(void) configContainer:(QIYIContainer *)container {
    container.manifest = self.manifest;
    container.asset = self.asset;
    container.handler = self;
    NSString* json = @"{}";
    json = [@"__page__data =" stringByAppendingString:json];
    NSData *data = [json dataUsingEncoding:NSUTF8StringEncoding];
    [container evaluateScript:data];
}

-(void) showLoadingAnimation:(BOOL)show {
    if (nil != self.loadingAnimationView) {
        if (show) {
            [self.view addSubview:self.loadingAnimationView];
        } else {
             [self.loadingAnimationView removeFromSuperview];
        }
    }
}

-(void) startNewPage:(NSString*)name withArguments:(NSDictionary*)dic {
    if (name && self.hostNavgation) {
        QIYIMPViewController* vc = [[QIYIMPViewController alloc] init];
        vc.parent           = self;
        vc.hostNavgation    = self.hostNavgation;
        vc.bDelegate        = self.bDelegate;
        vc.asset            = self.asset;
        vc.manifest         = self.manifest;
        vc.arguments        = dic;
        vc.pageName         = name;
        [self.hostNavgation pushViewController:vc animated:YES];
    }
}

@end
