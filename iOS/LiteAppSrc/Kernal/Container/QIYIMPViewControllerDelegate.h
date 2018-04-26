//
//  QIYIMPViewControllerDelegate.h
//  QIYIMiniProgram
//
//  Created by Breakerror on 2018/2/28.
//  Copyright © 2018年 Breakerror. All rights reserved.
//

#import "QIYIInct.h"

@class QIYIMPViewController;
@protocol QIYIMPViewControllerDelegate<NSObject>

// loading animation
-(UIView*) buildLoadingAnimationView:(QIYIMPViewController*)vc;

// perpar bundle status
-(void) prepareBundle:(BOOL)success vc:(QIYIMPViewController*)vc;

// manifest fail
-(void) parserManifestFail:(QIYIMPViewController*)vc;

@end
