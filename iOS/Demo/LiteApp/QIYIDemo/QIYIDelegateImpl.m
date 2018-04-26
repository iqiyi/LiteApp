//
//  QIYIDelegateImpl.m
//  QIYIMiniProgram
//
//  Created by yanqiang zhang on 01/03/2018.
//  Copyright © 2018 Breakerror. All rights reserved.
//

#import "QIYIDelegateImpl.h"
#import "QIYILoadingViewImpl.h"

@implementation QIYIDelegateImpl
// loading animation
-(UIView*) buildLoadingAnimationView:(QIYIMPViewController*)vc{
    return[[QIYILoadingViewImpl alloc] init];
}

// perpar bundle status
-(void) prepareBundle:(BOOL)success vc:(QIYIMPViewController*)vc{
    
}

// manifest fail
-(void) parserManifestFail:(QIYIMPViewController*)vc{
    
}

@end
