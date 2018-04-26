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
//  QIYIMainifest.m
//  QIYIMiniProgram
//
//  Created by Breakerror on 2018/2/28.
//  Copyright © 2018年 Breakerror. All rights reserved.
//

#import "QIYICommon.h"
#import "QIYIMainifest.h"
#import "QIYIManifestTabbarBundle.h"

@interface QIYIMainifest()
@property(nonatomic, readwrite, strong) NSString* title;
@property(nonatomic, readwrite, strong) NSString* userVersion;
@property(nonatomic, readwrite, strong) NSString* indexPageName;
@property(nonatomic, readwrite, strong) QIYIManifestTabbarBundle* tabbarBundle;
@property(nonatomic, readwrite, strong) NSMutableDictionary<NSString*, NSString*>* router;
@end

@implementation QIYIMainifest

-(instancetype) init {
    if (self = [super init]) {
        self.title          = @"";
        self.userVersion    = @"";
        self.indexPageName  = @"";
        self.tabbarBundle   = [[QIYIManifestTabbarBundle alloc] init];
        self.router         = [[NSMutableDictionary alloc] init];
    }
    return self;
}

-(BOOL) load:(NSData*)buffer {
    if (nil == buffer) {
        return NO;
    }
    
    NSDictionary* dic =
        [NSJSONSerialization JSONObjectWithData:buffer
             options:NSJSONReadingMutableLeaves error:nil];
    if (nil == dic) {
        return NO;
    }
    
    self.userVersion = __safe_convert([dic objectForKey:@"version"], NSString);
    NSArray* pages = __safe_convert([dic objectForKey:@"pages"], NSArray);
    if (nil != pages) {
        for (int i = 0; i < pages.count; ++i) {
            NSDictionary* page = __safe_convert(pages[i], NSDictionary);
            if (nil != page) {
                NSString* name = __safe_convert([page objectForKey:@"name"], NSString);
                NSString* path = __safe_convert([page objectForKey:@"path"], NSString);
                if (name && path && name.length > 0 && path.length > 0) {
                    [self.router setObject:path forKey:name];
                }
            }
        }
    }
    self.indexPageName = __safe_convert([dic objectForKey:@"index"], NSString);
    
    NSDictionary* tabbar = __safe_convert([dic objectForKey:@"tabbar"], NSDictionary);
    if (nil != tabbar) {
        NSArray* items = __safe_convert([tabbar objectForKey:@"items"], NSArray);
        if (nil != items) {
            for (int i = 0; i < items.count; ++i) {
                NSDictionary* data = __safe_convert(items[i], NSDictionary);
                if (nil != data) {
                    QIYIManifestTabbarBundleItem* item = [[QIYIManifestTabbarBundleItem alloc] init];
                    NSString* path = __safe_convert([data objectForKey:@"path"], NSString);
                  //  path = [self.router objectForKey:path];
                    item.name = path;
                    item.unselectedIcon = __safe_convert([data objectForKey:@"unselectedIcon"], NSString);
                    item.selectedIcon = __safe_convert([data objectForKey:@"selectedIcon"], NSString);
                    item.title = __safe_convert([data objectForKey:@"title"], NSString);
                    item.titleUnSelectedColor = [UIColor blackColor];
                    item.titleSelectedColor = [UIColor blackColor];
                    
                    [self.tabbarBundle.items addObject:item];
                }
            }
        }
    }
    return YES;
}

-(NSString*) obtainTitle {
    return self.title;
}

-(NSString*) ontainMainPage {
    return self.indexPageName;
}

-(NSString*) obtainPage:(NSString*)name {
    if (!name || !self.router) {
        return @"";
    }
    return [self.router objectForKey:name];
}

-(QIYIManifestTabbarBundle*) obtainTabbarBundle {
    return self.tabbarBundle;
}
@end
