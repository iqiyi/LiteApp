//
//  QIYINavigationBar.h
//  QIYIMiniProgram
//
//  Created by Breakerror on 2018/3/1.
//  Copyright © 2018年 Breakerror. All rights reserved.
//

#import "QIYIInct.h"
#import "QIYINavigationBarBase.h"

@interface QIYINavigationBar : UIView<QIYINavigationBarBase>
@property(nonatomic, readwrite, strong) void(^onDismiss)(void);
@property(nonatomic, readwrite, strong) void(^onTapTitleLabel)(void); ;

-(void) showTitle:(NSString*)title;
-(void) showTitleColor:(UIColor*)clr;
-(void) showBackgroudColor:(UIColor*)clr;
-(void) showIntervalLineColor:(UIColor*)clr;
@end
