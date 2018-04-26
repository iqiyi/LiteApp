//
//  NSURLProtocol+QIYIAdd.h
//  QIYIMPBoard
//
//  Created by yanqiang zhang on 21/11/2017.
//  Copyright © 2017 Breakerror. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface NSURLProtocol (QIYIAdd)

+ (void)wk_registerScheme:(NSString*)scheme;

+ (void)wk_unregisterScheme:(NSString*)scheme;

@end
