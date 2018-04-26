//
//  QIYIContainer.h
//  QIYIMiniProgram
//
//  Created by Breakerror on 2018/2/28.
//  Copyright © 2018年 Breakerror. All rights reserved.
//

#import "QIYIInct.h"
#import "QIYIAsset.h"
#import "QIYIMainifest.h"
#import "QIYIContainerHandler.h"
#import "QIYIWebview.h"
@interface QIYIContainer: UIView
@property(nonatomic, readwrite, weak)   id<QIYIContainerHandler> handler;
@property(nonatomic, readwrite, strong) QIYIMainifest* manifest;
@property(nonatomic, readwrite, strong) QIYIAsset* asset;
@property(nonatomic, readwrite, strong) NSString* name;
@property(nonatomic, readwrite, strong) QIYIWebview* webview;
-(BOOL) load;

-(void) evaluateScript:(NSData*)buffer;

@end
