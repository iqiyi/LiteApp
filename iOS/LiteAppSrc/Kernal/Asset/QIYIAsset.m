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
//  QIYIAsset.m
//  QIYIMiniProgram
//
//  Created by Breakerror on 2018/2/28.
//  Copyright © 2018年 Breakerror. All rights reserved.
//

#import "QIYIAsset.h"

@implementation QIYIAsset

-(void) bundlePrepare:(void(^)(BOOL))complete {
    if (nil != complete) {
        complete(NO);
    }
}

-(NSString *) obtainHtmlPath {
    return nil;
}

-(NSData *) obtainBaseScript {
    return nil;
}

-(NSData*) obtainBundleScript:(NSString*)path {
    return nil;
}

-(NSString*) obtainBundleCss:(NSString*)path {
    return nil;
}

-(NSData *) obtainManifest {
    return nil;
}

-(NSData*) obtainFile:(NSString*)file {
    return nil;
}

@end

