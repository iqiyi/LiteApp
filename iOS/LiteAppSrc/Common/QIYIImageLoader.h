//
//  QIYIImageLoader.h
//  QIYIMiniProgram
//
//  Created by Breakerror on 2018/2/28.
//  Copyright © 2018年 Breakerror. All rights reserved.
//

#import "QIYIInct.h"

@interface QIYIImageLoader: NSObject
+(void) load:(UIImageView *)imageview url:(NSURL*)url
    complete:(void(^)(UIImageView *, BOOL))handler;
@end
