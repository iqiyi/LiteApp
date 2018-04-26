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
//  QIYINetDownload.m
//  QIYIMiniProgram
//
//  Created by Breakerror on 2018/2/28.
//  Copyright © 2018年 Breakerror. All rights reserved.
//


#import "AFNetworking.h"
#import "QIYINetDownload.h"

static AFHTTPSessionManager* __qp_manager = nil;

@implementation QIYINetDownload

+(void) load {
    __qp_manager = [AFHTTPSessionManager manager];
    __qp_manager.securityPolicy = [AFSecurityPolicy policyWithPinningMode:AFSSLPinningModeNone];
    __qp_manager.responseSerializer = [AFHTTPResponseSerializer serializer];
    __qp_manager.securityPolicy.validatesDomainName = NO;
    __qp_manager.responseSerializer.acceptableContentTypes
    = [NSSet setWithObjects:@"application/json", @"text/json", @"text/plain",
       @"text/javascript", @"text/html", @"application/xml",  @"application/javascript",
       @"application/zip", nil];
}


+(BOOL) get:(NSString*)uri
  arguments:(NSDictionary*)argument
    success:(void(^)(id))success
    failure:(void(^)(void))failure {
    if (nil == uri) {
        return NO;
    }
    
    [__qp_manager GET:uri parameters:argument
             progress:^(NSProgress * _Nonnull downloadProgress) {
             } success:^(NSURLSessionDataTask * _Nonnull task, id  _Nullable responseObject) {
                 if (nil != success) success(responseObject);
             } failure:^(NSURLSessionDataTask * _Nullable task, NSError * _Nonnull error) {
                 if (nil != failure) failure();
             }];
    return YES;
}

+(BOOL) post:(NSString*)uri
   arguments:(NSDictionary*)argument
     success:(void(^)(id))success
     failure:(void(^)(void))failure {
    if (nil == uri) {
        return NO;
    }
    
    [__qp_manager POST:uri parameters:argument
              progress:^(NSProgress * _Nonnull downloadProgress) {
              } success:^(NSURLSessionDataTask * _Nonnull task, id  _Nullable responseObject) {
                  if (nil != success) success(responseObject);
              } failure:^(NSURLSessionDataTask * _Nullable task, NSError * _Nonnull error) {
                  if (nil != failure) failure();
              }];
    return YES;
}
@end
