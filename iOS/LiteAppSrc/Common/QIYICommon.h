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
#define __NAVIGATION_BUTTON_SIZE       32.0f

// iPhoneX iPhoneX_MAX适配
#define __XH_iPhoneX (__SCREEN_WIDTH == 375.f && __SCREEN_HEIGHT == 812.f ? YES : NO)
#define __XH_iPhoneX_MAX (__SCREEN_WIDTH == 414.f && __SCREEN_HEIGHT == 896.f ? YES : NO)
#define __XH_iPhoneX_X (__XH_iPhoneX || __XH_iPhoneX_MAX)

#define __NAVIGATION_OFFSET            ((__XH_iPhoneX_X == YES) ? 44.0f : 20.0f)
#define __NAVIGATION_BAR_HEIGHT        ((__XH_iPhoneX_X == YES) ? 88.0f : 64.0f)
#define __TABBAR_HEIGHT                ((__XH_iPhoneX_X == YES) ? 83.0f : 49.0f)
