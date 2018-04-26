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
//  QIYINavBackButton.m
//  QIYIMiniProgram
//
//  Created by yanqiang zhang on 09/03/2018.
//  Copyright © 2018 www.iqiyi.com. All rights reserved.
//

#import "QIYINavBackButton.h"
@implementation QIYINavBackButton

-(instancetype) init {
    if (self = [super init]) {
//        self.normalColor = [UIColor whiteColor];
//        self.highlightColor = [UIColor grayColor];
        [self addObserver:self forKeyPath:@"highlighted" options:0 context:nil];
    }
    return self;
}

-(void) dealloc {
    [self removeObserver:self forKeyPath:@"highlighted"];
}

-(void) observeValueForKeyPath:(NSString*)keyPath
                      ofObject:(id)object
                        change:(NSDictionary*)change
                       context:(void*)context {
    if ([keyPath isEqualToString:@"highlighted"]) {
        [self setNeedsDisplay];
    }
}

-(void) drawRect:(CGRect)rect {
    [super drawRect:rect];
    
    CGContextRef ctx = UIGraphicsGetCurrentContext();
    CGContextSetLineCap(ctx, kCGLineCapRound);
    CGContextSetLineWidth(ctx, 2.0);
    
    if (self.highlighted) {
        if (nil == self.highlightColor) {
            self.highlightColor = [UIColor darkGrayColor];
        }
        CGFloat r = 0, g = 0, b = 0, a = 1.0;
        [self.highlightColor getRed:&r green:&g blue:&b alpha:&a];
        CGContextSetRGBStrokeColor(ctx, r, g, b, a);
    } else {
        if (nil == self.normalColor) {
            self.normalColor = [UIColor grayColor];
        }
        CGFloat r = 0, g = 0, b = 0, a = 1.0;
        [self.normalColor getRed:&r green:&g blue:&b alpha:&a];
        CGContextSetRGBStrokeColor(ctx, r, g, b, a);
    }
    
    CGContextBeginPath(ctx);
    const float ud_inside = 9.0f; const float lr_inside = 12.0f;
    CGContextMoveToPoint(ctx, rect.size.width - lr_inside, ud_inside);
    CGContextAddLineToPoint(ctx, lr_inside, rect.size.height /2);
    CGContextAddLineToPoint(ctx, rect.size.width - lr_inside, rect.size.height - ud_inside);
    CGContextStrokePath(ctx);
}
@end
