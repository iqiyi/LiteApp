//
//  QIYIManifestTabbarBundle.h
//  QIYIMiniProgram
//
//  Created by Breakerror on 2018/2/28.
//  Copyright © 2018年 Breakerror. All rights reserved.
//

#import "QIYIInct.h"

@interface QIYIManifestTabbarBundleItem : NSObject
@property(nonatomic, strong, readwrite) NSString* unselectedIcon;
@property(nonatomic, strong, readwrite) NSString* selectedIcon;
@property(nonatomic, strong, readwrite) NSString* title;
@property(nonatomic, strong, readwrite) UIColor*  titleSelectedColor;
@property(nonatomic, strong, readwrite) UIColor*  titleUnSelectedColor;
@property(nonatomic, strong, readwrite) NSString* name;
@end

@interface QIYIManifestTabbarBundle : NSObject
@property(nonatomic, strong, readwrite) NSMutableArray<QIYIManifestTabbarBundleItem*>* items;
@end
