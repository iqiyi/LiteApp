//
//  QIYIWebview.h
//  QIYIMiniProgram
//
//  Created by Breakerror on 2018/2/28.
//  Copyright © 2018年 Breakerror. All rights reserved.
//

#import "QIYIInct.h"
#import "QIYIAsset.h"

@class QIYIWebview;
typedef void(^bOnDidConstructed)(QIYIWebview *);
@interface QIYIWebview: WKWebView
@property(nonatomic, strong, readwrite) void(^onRecvScriptEmit)(NSString*);
@property(nonatomic, strong, readwrite) void(^onRecvNativeCall)(NSString*);
-(void) load:(QIYIAsset*)asset didConstructed:(bOnDidConstructed)onConstructedCallback;
-(void) userContentController:(WKUserContentController*)userContentController
      didReceiveScriptMessage:(WKScriptMessage *)message;
-(void) commitPatch:(NSString*)patch;
@end
