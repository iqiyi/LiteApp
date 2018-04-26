//
//  QIYITabbarItem.h
//  QIYIMiniProgram
//
//  Created by Breakerror on 2018/3/1.
//  Copyright © 2018年 Breakerror. All rights reserved.
//

#import "QIYIInct.h"

@interface QIYITabbarItem: UIView
@property(nonatomic, assign, readwrite) BOOL      selected;
@property(nonatomic, strong, readwrite) void      (^bOnSelected)(void);
@property(nonatomic, strong, readwrite) UIImage*  selectedIcon;
@property(nonatomic, strong, readwrite) UIImage*  unselectedIcon;
@property(nonatomic, strong, readwrite) NSString* title;
@property(nonatomic, strong, readwrite) UIColor*  titleSelectedColor;
@property(nonatomic, strong, readwrite) UIColor*  titleUnSelectedColor;

-(void) construct;

@end
