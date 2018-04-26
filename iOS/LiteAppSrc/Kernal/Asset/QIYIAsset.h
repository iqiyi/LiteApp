//
//  QIYIAsset.h
//  QIYIMiniProgram
//
//  Created by Breakerror on 2018/2/28.
//  Copyright © 2018年 Breakerror. All rights reserved.
//

#import "QIYIInct.h"

@interface QIYIAsset: NSObject

// bundle prepare
-(void) bundlePrepare:(void(^)(BOOL))complete;

// view buffer
-(NSString *) obtainHtmlPath;

// base script
-(NSData *) obtainBaseScript;

// busisness script
-(NSData*) obtainBundleScript:(NSString*)path;

//busisness css
-(NSString*) obtainBundleCss:(NSString*)path;

// manifest buffer
-(NSData *) obtainManifest;

// obtain file
-(NSData*) obtainFile:(NSString*)file;

@end
