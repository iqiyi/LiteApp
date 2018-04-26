//
//  QIYIMPViewNavController.h
//  QIYIMiniProgram
//
//  Created by Breakerror on 2018/2/28.
//  Copyright © 2018年 Breakerror. All rights reserved.
//

#import "QIYIInct.h"
#import "QIYIMPViewController.h"
#import "QIYIMPMainViewController.h"

@interface QIYIMPViewNavController: UINavigationController
-(instancetype) init:(QIYIAsset*)asset delegate:(id<QIYIMPViewControllerDelegate>)delegate;
@end
