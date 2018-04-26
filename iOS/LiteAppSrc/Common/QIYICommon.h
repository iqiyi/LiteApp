//
//  QIYICommon.h
//  QIYIMiniProgram
//
//  Created by Breakerror on 2018/2/28.
//  Copyright © 2018年 Breakerror. All rights reserved.
//

#define __safe_convert(obj, T)                                  \
    obj? ([obj isKindOfClass:[T class]]? (T*)(obj): nil): nil

#define __SCREEN_WIDTH                 ([UIScreen mainScreen].bounds.size.width)
#define __SCREEN_HEIGHT                ([UIScreen mainScreen].bounds.size.height)
#define __NAVIGATION_HEIGHT            44.0f
#define __NAVIGATION_BUTTON_SIZE         32.0f
#define __NAVIGATION_OFFSET            ((__IS_IPHONE_X == YES) ? 44.0f : 20.0f)
#define __NAVIGATION_BAR_HEIGHT        ((__IS_IPHONE_X == YES) ? 88.0f : 64.0f)
#define __TABBAR_HEIGHT                ((__IS_IPHONE_X == YES) ? 83.0f : 49.0f)

#define __IS_IPHONE_X                  ((__SCREEN_HEIGHT == 812.0f) ? YES : NO)
