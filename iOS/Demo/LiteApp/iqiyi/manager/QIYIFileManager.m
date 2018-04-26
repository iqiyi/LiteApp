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
//  QIYIFileManager.m
//  QIYIMiniProgram
//
//  Created by yanqiang zhang on 08/02/2018.
//  Copyright © 2018 www.iqiyi.com. All rights reserved.
//

#import "QIYIFileManager.h"

@interface QIYIFileManager()
@property(nonatomic, strong, readwrite) NSString* root;
@property(nonatomic, strong, readwrite) NSFileManager* fileManager;
@end

@implementation QIYIFileManager

+(instancetype) sharedManager {
    static dispatch_once_t once_token;
    static QIYIFileManager* _instance = nil;
    dispatch_once(&once_token, ^{
        _instance = [[self alloc] init];
    });
    return _instance;
}

-(instancetype) init{
    if (self = [super init]) {
        self.root = NSHomeDirectory();
        self.root = [self.root stringByAppendingPathComponent:@"Documents"];
        self.root = [self.root stringByAppendingPathComponent:@"miniProgram"];
        self.fileManager = [NSFileManager defaultManager];
        [self.fileManager createDirectoryAtPath:self.root
                    withIntermediateDirectories:YES attributes:nil error:nil];
    }
    return self;
}

-(NSString*) rootPath{
    return self.root;
}

-(void) setRoot_base:(NSString *)root_base{
    self.root_base = [self.root stringByAppendingPathComponent:root_base];
}

-(void) setRoot_business:(NSString *)root_business{
    self.root_business = [self.root stringByAppendingPathComponent:root_business];;
}

-(NSData*) readFromFile:(NSString*)file {
    if (nil == file) {
        return nil;
    }
    NSData *data = [self.fileManager contentsAtPath:file];
    return data;
}

-(BOOL) isExist:(NSString*)file {
    if (nil != file) {
        return NO;
    }
    file = [self.root stringByAppendingPathComponent:file];
    return [self.fileManager fileExistsAtPath:file];
}

-(BOOL) makeDir:(NSString*)dir {
    if (nil == dir) {
        return NO;
    }
    NSError* err = nil;
    dir = [self.root stringByAppendingPathComponent:dir];
    return [self.fileManager createDirectoryAtPath:dir
                       withIntermediateDirectories:YES attributes:nil error:&err];
    
}

-(BOOL) writeToPath:(NSString*)file data:(NSData*)buffer {
    if (nil == file || nil == buffer) {
        return NO;
    }
    return [self.fileManager createFileAtPath:file contents:buffer attributes:nil];
}

-(BOOL) removeAtPath:(NSString*)file{
    if (nil == file) {
        return NO;
    }
     file = [self.root stringByAppendingPathComponent:file];
    return [self.fileManager removeItemAtPath:file error:nil];
}

-(BOOL) remove:(NSString*)file {
    if (nil == file) {
        return NO;
    }
    file = [self.root stringByAppendingPathComponent:file];
    return [self.fileManager removeItemAtPath:file error:nil];
}

-(BOOL) clear {
    [self.fileManager removeItemAtPath:self.root error:nil];
    [self.fileManager createDirectoryAtPath:self.root
                withIntermediateDirectories:YES attributes:nil error:nil];
    return YES;
}



@end
