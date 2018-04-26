//
//  ViewController.m
//  QIYIMiniProgram
//
//  Created by Breakerror on 2018/2/28.
//  Copyright © 2018年 Breakerror. All rights reserved.
//

#import "QIYIMPViewNavController.h"
#import "QIYIAssetsImpl.h"
#import "QIYIDelegateImpl.h"
#import "ViewController.h"

@interface ViewController ()
@property(nonatomic, readwrite, strong) QIYIDelegateImpl* delegateImpl;
@property(nonatomic, readwrite, strong) QIYIAssetsImpl* asset;
@end

@implementation ViewController

- (void)viewDidAppear:(BOOL)animated {
    [super viewDidAppear:animated];
    
    _asset =[[QIYIAssetsImpl alloc] init];
    _delegateImpl = [[QIYIDelegateImpl alloc] init];
    QIYIMPViewNavController* vc = [QIYIMPViewNavController alloc];
    vc = [vc init:_asset delegate:_delegateImpl];
    [self presentViewController:vc animated:YES completion:^{
    }];
}


- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}


@end
