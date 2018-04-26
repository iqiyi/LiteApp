//
//  QIYIMPViewController.h
//  QIYIMiniProgram
//
//  Created by Breakerror on 2018/2/28.
//  Copyright © 2018年 Breakerror. All rights reserved.
//

#import "QIYIInct.h"
#import "QIYIAsset.h"
#import "QIYIMainifest.h"
#import "QIYINavigationBarBase.h"
#import "QIYIMPViewControllerDelegate.h"

@interface QIYIMPViewController: UIViewController
@property(nonatomic, readwrite, weak)   UIViewController* parent;
@property(nonatomic, readwrite, weak)   UINavigationController* hostNavgation;
@property(nonatomic, readwrite, weak)   id<QIYIMPViewControllerDelegate> bDelegate;
@property(nonatomic, readwrite, strong) QIYIAsset* asset;
@property(nonatomic, readwrite, strong) id<QIYINavigationBarBase> navigationbar;
@property(nonatomic, readwrite, strong) UIView* navigationbarView;
@property(nonatomic, readwrite, strong) QIYIMainifest* manifest;
@property(nonatomic, readwrite, strong) NSDictionary* arguments;
@property(nonatomic, readwrite, strong) NSString* pageName;

-(void) buildNavigationBar;

@end
