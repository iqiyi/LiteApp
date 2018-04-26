//
//  QIYIContainerCombine.h
//  QIYIMiniProgram
//
//  Created by Breakerror on 2018/3/1.
//  Copyright © 2018年 Breakerror. All rights reserved.
//

#import "QIYIContainer.h"

@interface QIYIContainerCombine: UIView
-(instancetype) init:(NSUInteger)num;
-(QIYIContainer*) at:(NSUInteger)index;
-(void) show:(NSUInteger)index;
@end
