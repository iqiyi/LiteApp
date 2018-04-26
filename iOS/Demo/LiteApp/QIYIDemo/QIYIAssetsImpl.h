//
//  QIYIAssetsImpl.h
//  QIYIMiniProgram
//
//  Created by Breakerror on 2018/3/1.
//  Copyright © 2018年 Breakerror. All rights reserved.
//

#import "QIYICommon.h"
#import "QIYIAsset.h"

@interface QIYIAssetsImpl:QIYIAsset

// bundle prepare
-(void) bundlePrepare:(void(^)(BOOL))complete;

// html path
-(NSString *) obtainHtmlPath;

// base script
-(NSData *) obtainBaseScript;

// bundle script
-(NSData*) obtainBundleScript:(NSString*)path;

//bundle css
-(NSString*) obtainBundleCss:(NSString*)path;

// manifest buffer
-(NSData *) obtainManifest;

// obtain file
-(NSData*) obtainFile:(NSString*)file;


@end
