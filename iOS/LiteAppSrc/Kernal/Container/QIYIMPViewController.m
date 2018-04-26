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
//  QIYIMPViewController.m
//  QIYIMiniProgram
//
//  Created by Breakerror on 2018/2/28.
//  Copyright © 2018年 Breakerror. All rights reserved.
//

#import "QIYICommon.h"
#import "QIYIMainifest.h"
#import "QIYIContainer.h"
#import "QIYINavigationBar.h"
#import "QIYIContainerHandler.h"
#import "QIYIMPViewController.h"
#import "QIYIURLProtocol.h"
#import "NSURLProtocol+QIYIAdd.h"

@interface QIYIMPViewController()<QIYIContainerHandler>
@property(nonatomic, readwrite, strong) QIYIContainer* container;
@end

@implementation QIYIMPViewController

-(instancetype) init {
    if (self = [super init]) {
        self.parent             = nil;
        self.hostNavgation      = nil;
        self.bDelegate          = nil;
        self.asset              = nil;
        self.navigationbar      = nil;
        self.navigationbarView  = nil;
        self.container          = nil;
        self.manifest           = nil;
        self.arguments          = nil;
        self.pageName           = @"";
        [NSURLProtocol registerClass:[QIYIURLProtocol class]];
    }
    return self;
}

-(void)viewDidLoad{
    [super viewDidLoad];
    [NSURLProtocol wk_registerScheme:@"file"];
}

-(void) buildNavigationBar {
    if (!self.manifest || !self.asset) {
        return;
    }
    
    QIYINavigationBar* bar = [[QIYINavigationBar alloc] init];
    self.navigationbarView = bar;
    [self.view addSubview:self.navigationbarView];
    if ([self.navigationbarView conformsToProtocol:@protocol(QIYINavigationBarBase)]) {
        self.navigationbar = bar;
    }
    __weak QIYIMPViewController* ws = self;
    bar.onDismiss = ^{
        if (ws.hostNavgation.viewControllers.count > 1) {
            [ws.hostNavgation popViewControllerAnimated:YES];
        }
//        else{
//            [ws dismissViewControllerAnimated:YES completion:^{
//            }];
//        }
    };
}

-(void) loadView {
    self.view = [[UIView alloc] initWithFrame:[UIScreen mainScreen].bounds];
    self.view.backgroundColor = [UIColor whiteColor];
    [self buildNavigationBar];
    
    float navigationBarHeight = 0;
    if (self.navigationbarView) {
        navigationBarHeight = self.navigationbarView.frame.size.height;
    }
    
    self.container = [[QIYIContainer alloc] init];
    self.container.handler = self;
    self.container.asset = self.asset;
    self.container.name = self.pageName;
    self.container.manifest = self.manifest;
    float containerHeight = __SCREEN_HEIGHT - navigationBarHeight;
    self.container.frame = CGRectMake(0, navigationBarHeight, __SCREEN_WIDTH, containerHeight);
    [self.view addSubview:self.container];
    NSString* json = @"{}";
    if (nil != self.arguments) {
        NSError* error = nil;
        NSData* jsonData = [NSJSONSerialization dataWithJSONObject:self.arguments
                                                           options:NSJSONWritingPrettyPrinted
                                                             error:&error];
        json = [[NSString alloc] initWithData:jsonData encoding:NSUTF8StringEncoding];
    }
    json = [@"__page__data =" stringByAppendingString:json];
    [self.container evaluateScript:[json dataUsingEncoding:NSUTF8StringEncoding]];
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

-(void)dealloc{
    [NSURLProtocol unregisterClass:[QIYIURLProtocol class]];
}

@end
