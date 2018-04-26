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
//  QIYIURLProtocol.m
//  QIYIMiniProgram
//
//  Created by yanqiang zhang on 08/02/2018.
//  Copyright © 2018 www.iqiyi.com. All rights reserved.
//

#import "QIYIURLProtocol.h"
#import <UIKit/UIKit.h>
#import "QIYIAssetManager.h"

static NSString* const QIYIURLProtocolKey = @"ConstQIYIURLProtocolKey";

@interface QIYIURLProtocol ()<NSURLSessionDelegate>
@property (nonnull,strong) NSURLSessionDataTask *task;
@end

@implementation QIYIURLProtocol
#pragma mark - 重写NSURLProtocol方法

+ (BOOL)canInitWithRequest:(NSURLRequest *)request{
    NSString *scheme = [[request URL] scheme];
    if ( ([scheme caseInsensitiveCompare:@"file"] == NSOrderedSame )){
        if ([NSURLProtocol propertyForKey:QIYIURLProtocolKey inRequest:request])
            return NO;
        return YES;
    }
    return NO;
}

+ (NSURLRequest *)canonicalRequestForRequest:(NSURLRequest *)request{
    NSMutableURLRequest *mutableReqeust = [request mutableCopy];
    //request截取重定向
    if ([request.URL.absoluteString isEqualToString:@""]) {
        NSURL* url1 = [NSURL URLWithString:@""];
        mutableReqeust = [NSMutableURLRequest requestWithURL:url1];
    }
    return mutableReqeust;
}

+ (BOOL)requestIsCacheEquivalent:(NSURLRequest *)a toRequest:(NSURLRequest *)b{
    return [super requestIsCacheEquivalent:a toRequest:b];
}
#pragma mark - NSURLSessionDelegate

- (void)URLSession:(NSURLSession *)session
          dataTask:(NSURLSessionDataTask *)dataTask
didReceiveResponse:(NSURLResponse *)response
 completionHandler:(void (^)(NSURLSessionResponseDisposition))completionHandler {
    [[self client] URLProtocol:self didReceiveResponse:response
            cacheStoragePolicy:NSURLCacheStorageAllowed];
    completionHandler(NSURLSessionResponseAllow);
}

- (void)URLSession:(NSURLSession *)session
          dataTask:(NSURLSessionDataTask *)dataTask
    didReceiveData:(NSData *)data {
    [[self client] URLProtocol:self didLoadData:data];
}

- (void)URLSession:(NSURLSession *)session
              task:(NSURLSessionTask *)task
didCompleteWithError:(nullable NSError *)error {
    [self.client URLProtocolDidFinishLoading:self];
}

#pragma mark - 替换本地资源业务

- (void)startLoading{
    NSMutableURLRequest *mutableReqeust = [[self request] mutableCopy];
    [NSURLProtocol setProperty:@YES forKey:QIYIURLProtocolKey inRequest:mutableReqeust];
    if ([mutableReqeust.URL.absoluteString hasPrefix:@"file:///"]){
        NSString *filePath = mutableReqeust.URL.absoluteString;
        NSData *imageData = nil;
        if ([mutableReqeust.URL.absoluteString hasPrefix:@"file:///res"]) {
            NSArray *data = [filePath componentsSeparatedByString:@"?"];
            if (data.count != 2) { return;}
            filePath = data[0];
            
            filePath = [filePath stringByReplacingOccurrencesOfString:@"file://" withString:@""];
            if ([QIYIAssetManager shareInstance].asset != nil) {
                imageData = [[QIYIAssetManager shareInstance].asset obtainFile:filePath];
            }
        }else{
            filePath = [filePath stringByReplacingOccurrencesOfString:@"file://" withString:@""];
            imageData = [NSData dataWithContentsOfFile:filePath];
        }
        if (imageData == nil) {return;}
        NSURLResponse* response = [[NSURLResponse alloc] initWithURL:self.request.URL MIMEType:@"image/" expectedContentLength:imageData.length textEncodingName:nil];
        [self.client URLProtocol:self didReceiveResponse:response cacheStoragePolicy:NSURLCacheStorageAllowed];
        [self.client URLProtocol:self didLoadData:imageData];
        [self.client URLProtocolDidFinishLoading:self];
    }
    else {
        NSURLSession *session = [NSURLSession sessionWithConfiguration:[NSURLSessionConfiguration defaultSessionConfiguration] delegate:self delegateQueue:nil];
        self.task = [session dataTaskWithRequest:self.request];
        [self.task resume];
    }
}

- (void) stopLoading {
    if (self.task != nil){
        [self.task  cancel];
    }
}

@end
