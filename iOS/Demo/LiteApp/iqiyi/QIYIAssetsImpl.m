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
//  QIYIAssetsImpl.m
//  QIYIMiniProgram
//
//  Created by Breakerror on 2018/3/1.
//  Copyright © 2018年 Breakerror. All rights reserved.
//

#import "QIYIAssetsImpl.h"
#import "QIYIConstitute.h"

@interface QIYIAssetsImpl()
@property(nonatomic, readwrite, strong) QIYIConstitute* process;
@end

@implementation QIYIAssetsImpl

- (instancetype)init
{
    self = [super init];
    if (self) {
        self.process = [[QIYIConstitute alloc] init:@"iqiyi"];//项目名称
    }
    return self;
}

// bundle prepare
-(void) bundlePrepare:(void(^)(BOOL))complete {
    [self.process checkUpdate:^(BOOL success) {
        if (complete) {
            complete(success);
        }
    }];
}

// html path
-(NSString *) obtainHtmlPath {
    return [self.process obtainHtmlPath];
}

// base script
-(NSData *) obtainBaseScript {
    return [self.process obtainBaseScript];
}

// bundle script
-(NSData*) obtainBundleScript:(NSString*)path {
    return  [self.process obtainBundleScript:path];
}

//bundle css
-(NSString*) obtainBundleCss:(NSString*)path {
    return  [self.process obtainBundleCss:path];
}

// manifest buffer
-(NSData *) obtainManifest {
     return [self.process obtainManifest];
}

// obtain file
-(NSData*) obtainFile:(NSString*)file {
    return [self.process obtainFile:file];
}


@end
