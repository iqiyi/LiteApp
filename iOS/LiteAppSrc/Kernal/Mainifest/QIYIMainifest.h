//
//  QIYIMainifest.h
//  QIYIMiniProgram
//
//  Created by Breakerror on 2018/2/28.
//  Copyright © 2018年 Breakerror. All rights reserved.
//

#import "QIYIInct.h"
#import "QIYIManifestTabbarBundle.h"

@interface QIYIMainifest: NSObject
-(BOOL) load:(NSData*)buffer;
-(NSString*) obtainTitle;
-(NSString*) ontainMainPage;
-(NSString*) obtainPage:(NSString*)name;
-(QIYIManifestTabbarBundle*) obtainTabbarBundle;
@end
