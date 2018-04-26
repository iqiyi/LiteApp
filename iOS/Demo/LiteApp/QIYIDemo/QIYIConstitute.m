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
//  QIYIConstitute.m
//  QIYIMiniProgram
//
//  Created by yanqiang zhang on 05/03/2018.
//  Copyright © 2018 www.iqiyi.com. All rights reserved.
//

#import "QIYIConstitute.h"
#import "QIYINetDownload.h"
#import "QIYIConstant.h"
#import "QIYICommon.h"
#import "QIYIFileManager.h"
#import "ZipArchive.h"
#import "QIYIBusinessModel.h"

typedef  void(^bUpdateSuccessCallback)(BOOL);
@interface QIYIConstitute()<SSZipArchiveDelegate>
@property(nonatomic, readwrite, strong) NSString* project;
@property(nonatomic, readwrite, strong) NSString* version;
@property(nonatomic, readwrite, assign) BOOL isExistBasePackage;
@property(nonatomic, readwrite, assign) BOOL isExistBusinessPackage;
@property(nonatomic, readwrite, strong) QIYIBusinessModel* buisnessVersion;
@property(nonatomic, readwrite, strong) QIYIFileManager* local;
@property(nonatomic, readwrite, strong) bUpdateSuccessCallback updateSuccessCallback ;
@end

@implementation QIYIConstitute
-(instancetype) init:(NSString*) project {
    if (self = [super init]) {
        self.project = project;
        self.version = @"";
        self.isExistBasePackage = NO;
        self.isExistBusinessPackage = NO;
        self.updateSuccessCallback = nil;
        self.buisnessVersion = [[QIYIBusinessModel alloc] init];
        self.local = [QIYIFileManager sharedManager];
    }
    return self;
}

#pragma mark - Public method

-(void) checkUpdate:(void(^)(BOOL))complement {
    self.updateSuccessCallback = complement;
     __weak QIYIConstitute* ws = self;
    if ([ws compareVersion]) {
        [ws comparePackage];
    }else{
        [ws request:self.project parameter:__QIYI_LOCAL_VERSION callback:^(BOOL callback) {
        }];
    }
}

-(NSString *) obtainHtmlPath {
    return [self getRootBasePath:@"/template.html"];
}

-(NSData *) obtainBaseScript {
    NSData *qyJS = [self.local readFromFile:
                    [self getRootBasePath:
                     @"/core/qy.thread.js"]];
    NSData *componentJS = [self.local readFromFile:
                           [self getRootBasePath:
                            @"/component/component.thread.js"]];
    NSMutableData * result = [NSMutableData dataWithData:qyJS];
    [result appendData:componentJS];
    return result;
}

-(NSData*) obtainBundleScript:(NSString*)path {
    return [self.local readFromFile:[self getRootBusinessPath:
                                     [path stringByAppendingString:@"bundle.js"]]];
}

-(NSString*) obtainBundleCss:(NSString*)path {
    return [self getRootBusinessPath:
            [path stringByAppendingString:@"bundle.css"]];
}

-(NSData *) obtainManifest {
    return [self.local readFromFile:[self getRootBusinessPath:@"/conf/manifest.json"]];
}

-(NSData*) obtainFile:(NSString*)file {
    NSString *busPath = [self getRootBusinessPath:file];
    NSData *data = [self.local readFromFile:busPath];
    if (data == nil) {
        NSString *basePath = [self getRootBasePath:file];
        data = [self.local readFromFile:basePath];
    }
    return data;
}

#pragma mark - Private method

-(BOOL) compareVersion {
    BOOL isExistVersion = NO;
    NSString *localPath = [self getBundlePathWithName:@"version"];
    NSData *versionData = [[NSFileManager defaultManager] contentsAtPath:localPath];
    NSDictionary *dic = nil;
    if (versionData != nil) {
        dic = [NSJSONSerialization JSONObjectWithData:versionData
                                              options:NSJSONReadingMutableLeaves
                                                error:nil];
        if (dic != nil) {
            isExistVersion = YES;
        }
    }else{
        NSData *data = [self.local readFromFile:[[self.local rootPath] stringByAppendingPathComponent:__QIYI_LOCAL_VERSION]];
        if (data != nil) {
            dic = [NSJSONSerialization JSONObjectWithData:data
                                                  options:NSJSONReadingMutableLeaves
                                                    error:nil];
        }
        if (dic != nil) {
            isExistVersion = YES;
        }
    }
    if (isExistVersion) {
        [_buisnessVersion setValuesForKeysWithDictionary:dic];
    }
    return isExistVersion;
}

-(void) comparePackage {
    if (![self.local isExist:[self.project
                              stringByAppendingPathComponent:__QIYI_LOCAL_PACKAGE]]) {
        [self checkLocalPackage:self.project];
    }else{ _isExistBusinessPackage = YES;}
    NSString *basePath = [NSString
                          stringWithFormat:@"%@/%@",__QIYI_REQUEST_BASE,_buisnessVersion.version];
    if (![self.local isExist:[basePath
                              stringByAppendingPathComponent:__QIYI_LOCAL_PACKAGE]]) {
        [self checkLocalPackage:__QIYI_REQUEST_BASE];
    }else{ _isExistBasePackage = YES;}
    [self updateCallBack];
}

-(void) checkLocalPackage:(NSString *)path {
    BOOL isProject = [path isEqualToString:self.project];
    NSString *localFile = isProject ? __QIYI_LOCAL_BUSINESSZIP : __QIYI_LOCAL_BASEZIP;
    NSString *localPath = [self getBundlePathWithName:localFile];
    NSData *businessData = [[NSFileManager defaultManager] contentsAtPath:localPath];
    NSString * destination = [self.local.rootPath
                              stringByAppendingPathComponent:path];
    if (!isProject) {
        destination = [destination
                       stringByAppendingPathComponent:_buisnessVersion.base_version];
    }
    if (businessData != nil) {
        [self unzipPackage:localPath destination:destination];
    }else{
        if (isProject) {
            _isExistBusinessPackage = NO;
        }else{
            _isExistBasePackage = NO;
        }
        [self request:path parameter:__QIYI_REQUEST_ZIP callback:^(BOOL success) {
        }];
    }
}

#pragma mark - Request and response

-(void) request:(NSString *)type parameter:(NSString *)parameter  callback:(void(^)(BOOL))complement {
    __weak QIYIConstitute* ws = self;
    [QIYINetDownload get: [self assemblyUrl:type parameter:parameter] arguments:nil success:^(id content) {
        if (ws) {
            if (content) {
                NSMutableDictionary* dic = [NSMutableDictionary dictionary];
                if ([parameter isEqualToString:__QIYI_LOCAL_VERSION]) {
                    dic = [NSJSONSerialization JSONObjectWithData:content
                                                          options:NSJSONReadingMutableLeaves
                                                            error:nil];
                    if (nil == dic) {
                        if (complement) complement(NO);
                        return;
                    }
                    if ([type isEqualToString: self.project]) {
                        [_buisnessVersion setValuesForKeysWithDictionary:dic];
                        [self.local writeToPath:[[self.local rootPath] stringByAppendingPathComponent:__QIYI_LOCAL_VERSION]  data:content];
                        [self comparePackage];
                    }
                }
                if (complement) complement(YES);
                if ([parameter isEqualToString:__QIYI_REQUEST_ZIP] ) {
                    [ws onRecvPackage:content versionType:type];
                }
                
            } else if (complement) {
                complement(NO);
            }
        }
    } failure:^{
        if (complement) complement(NO);
    }];
}

-(void) onRecvPackage:(id)content versionType:(NSString *)type{
    NSString *rootPath = [self.local rootPath];
    NSString* zip = @"";
    NSString * destination = [rootPath stringByAppendingPathComponent:type];
    if (![type isEqualToString: self.project]) {
        _isExistBasePackage = NO;
        destination = [destination stringByAppendingPathComponent:_buisnessVersion.base_version];
        zip = [rootPath stringByAppendingPathComponent:__QIYI_LOCAL_BASEZIP];
        
    }else{
        _isExistBusinessPackage = NO;
        zip = [rootPath stringByAppendingPathComponent:__QIYI_LOCAL_BUSINESSZIP];
    }
    if (![self.local writeToPath:zip data:content]) { return;}
    [self unzipPackage:zip destination:destination];
}

#pragma mark - Zip and unzip file

-(void) unzipPackage:(NSString *)filePath
         destination:(NSString *)destination {
    if (![self.local makeDir:destination]) {
        NSLog(@"makeDir error = %@",destination);
    }
    if (![SSZipArchive unzipFileAtPath:filePath
                         toDestination:destination
                             overwrite:YES
                              password:nil
                                 error:nil
                              delegate:self]) {
        
    }
}

- (void) zipArchiveDidUnzipArchiveAtPath:(NSString*) path
                                 zipInfo:(unz_global_info) zipInfo
                            unzippedPath:(NSString*) unzippedPath {
    NSArray *array = [unzippedPath componentsSeparatedByString:@"/"];
    if (array.count > 0) {
        NSString *endPath = array.lastObject;
        if ([endPath isEqualToString:self.project]) {
            self.isExistBusinessPackage = YES;
        }else{
            self.isExistBasePackage = YES;
        }
    }
    [self updateCallBack];
}

-(void) updateCallBack {
    if (self.isExistBusinessPackage && self.isExistBasePackage) {
        if (self.updateSuccessCallback) {
            self.updateSuccessCallback(YES);
        }
        self.updateSuccessCallback = nil;
    }
}

#pragma mark - Helper

-(NSString *) assemblyUrl:(NSString *)type parameter:(NSString *)parameter {
    NSString* uri = __QIYI_NET_DOMAIN;
    uri = [uri stringByAppendingPathComponent:type];
    if (![type isEqualToString: self.project]) {
        uri = [uri stringByAppendingPathComponent:_buisnessVersion.base_version];
    }
    uri = [uri stringByAppendingPathComponent:parameter];
    return uri;
}

-(NSString *) getRootBusinessPath:(NSString *)path {
    return [NSString  stringWithFormat:@"%@/%@/%@%@",
            [self.local rootPath],
            self.project,
            __QIYI_LOCAL_PACKAGE,
            path];
}

-(NSString *) getRootBasePath:(NSString *)path {
    return [NSString  stringWithFormat:@"%@/%@/%@/%@%@",
            [self.local rootPath],
            __QIYI_REQUEST_BASE,
            _buisnessVersion.base_version,
            __QIYI_LOCAL_PACKAGE,
            path];
}

- (NSString *)getBundlePathWithName:(NSString *)name{
    NSBundle *libBundle = [NSBundle bundleWithPath:[[[NSBundle mainBundle] resourcePath] stringByAppendingPathComponent:@"QIYI_Resouce.bundle"]];
    NSString *path = @"";
    if (libBundle) {
        path = [[libBundle resourcePath] stringByAppendingPathComponent:name];
    }
    return path ;
}

@end
