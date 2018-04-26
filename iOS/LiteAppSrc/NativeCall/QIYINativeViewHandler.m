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
//  QIYINativeViewHandler.m
//  QIYIMiniProgram
//
//  Created by yanqiang zhang on 27/02/2018.
//  Copyright © 2018 www.iqiyi.com. All rights reserved.
//

#import "QIYINativeViewHandler.h"
#import "QIYICommon.h"
#import "QIYINativeViewModel.h"
#import "QIYIContainer.h"
#import "QIYINativeViewCombine.h"


@interface QIYINativeViewHandler()
@property(nonatomic, readwrite, strong) NSMutableDictionary<NSNumber*, QIYINativeViewCombine*>* nativeViewPool;
@property(nonatomic, readwrite, assign) BOOL isObserver;
@property(nonatomic, readwrite, strong) QIYIContainer *container;
@end

@implementation QIYINativeViewHandler

-(instancetype) init {
    if (self = [super init]) {
        self.nativeViewPool = [[NSMutableDictionary alloc] init];
        self.isObserver = false;
    }
    return self;
}

-(void)handleNativeView:(NSDictionary *)dic onContainer:(QIYIContainer *)container {
    _container = container;
    NSString* action = __safe_convert([dic objectForKey:@"action"], NSString);
    NSNumber* native_id = __safe_convert([dic objectForKey:@"id"], NSNumber);
    NSString* native_type = __safe_convert([dic objectForKey:@"type"], NSString);
    if (nil == action || nil == native_id) {
        return;
    }
    if ([@"create" isEqualToString:action]) {
        QIYINativeViewModel *model = [[QIYINativeViewModel alloc] initWithDic:dic];
        QIYINativeViewCombine *native_holder = [[QIYINativeViewCombine alloc] init:native_type];
        
        NSLog(@"native_type = %@ isHover = %d",native_id,model.hover.boolValue);
        native_holder.isHover = model.hover.boolValue;
        native_holder.rect = model.currentFrame;
        [self.nativeViewPool setObject:native_holder forKey:native_id];
        native_holder.nativeViewCallback = ^(NSDictionary *parama) {
            NSMutableDictionary *buffer = [[NSMutableDictionary alloc] initWithDictionary:parama];
            if (buffer != nil) {
                [buffer setValue:native_id forKey:@"_uid"];
                NSData *data =    [NSJSONSerialization dataWithJSONObject:buffer options:NSJSONWritingPrettyPrinted error:nil];
                NSString* str = [[NSString alloc] initWithData:data encoding:NSUTF8StringEncoding];
                NSString* path = @"__thread__.getEvent(";
                path = [path stringByAppendingString:str];
                path = [path stringByAppendingString:@");"];
                data = [path dataUsingEncoding:NSUTF8StringEncoding];
                [container evaluateScript:data];
            }
        };
        if ([native_holder.view respondsToSelector:@selector(createWith:callBack:)]) {
            [native_holder.view createWith:dic callBack:native_holder.nativeViewCallback];
        }
        native_holder.view.frame = model.currentFrame;
        [container addSubview:native_holder.view];
        
    } else if ([@"delete" isEqualToString:action]) {
        QIYINativeViewCombine* native_view = [self.nativeViewPool objectForKey:native_id];
        if (nil != native_view && nil != native_view.view) {
            [native_view.view removeFromSuperview];
            [self.nativeViewPool removeObjectForKey:native_id];
            [native_view.view removeFromSuperview];
        }
    } else if ([@"pause" isEqualToString:action]) {
        
    } else if ([@"resume" isEqualToString:action]) {
        
    }
    [self managerObserver:false];
    
}

-(void) managerObserver:(BOOL)isDealloc {
    BOOL judge = false;
    for(NSNumber* key in self.nativeViewPool){
        QIYINativeViewCombine* native_v=[self.nativeViewPool objectForKey:key];
        if(!native_v.isHover){
            judge = true;
        }
    }
    if (judge && !self.isObserver) {
        [_container.webview.scrollView addObserver:self forKeyPath:@"contentOffset" options:NSKeyValueObservingOptionNew  context:nil];
    }
    if ((!judge && self.isObserver) || (isDealloc && judge) ) {
        [_container.webview.scrollView removeObserver:self forKeyPath:@"contentOffset"];
    }
    self.isObserver = judge;
}

- (void)observeValueForKeyPath:(NSString *)keyPath ofObject:(id)object change:(NSDictionary<NSKeyValueChangeKey,id> *)change context:(void *)context {
    if(object == _container.webview.scrollView && [keyPath isEqualToString:@"contentOffset"]){
        CGPoint offset = [change[@"new"] CGPointValue];
        CGFloat y= offset.y;
        for(NSNumber* key in self.nativeViewPool){
            QIYINativeViewCombine* native_v=[self.nativeViewPool objectForKey:key];
            if(!native_v.isHover){
                CGRect rect=native_v.rect;
                rect.origin.y=rect.origin.y-y;
                native_v.view.frame=rect;
            }
        }
    }
}

-(void)dealloc {
    [self managerObserver:true];
}

@end
