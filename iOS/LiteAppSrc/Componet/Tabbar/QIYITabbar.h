//
//  QIYITabbar.h
//  QIYIMiniProgram
//
//  Created by Breakerror on 2018/3/1.
//  Copyright © 2018年 Breakerror. All rights reserved.
//

#import "QIYIInct.h"
#import "QIYITabbarItem.h"

@interface QIYITabbar: UIView
@property(nonatomic, readwrite, strong) void(^bOnTabbarSelected)(NSUInteger);
@property(nonatomic, readwrite, strong) UIColor* intervalLineColor;
-(void) addItem:(QIYITabbarItem*)item;
-(void) selected:(NSUInteger)index;
@end
