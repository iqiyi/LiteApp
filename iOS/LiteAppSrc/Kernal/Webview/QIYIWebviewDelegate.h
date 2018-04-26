//
//  QIYIWebviewDelegate.h
//  QIYIMiniProgram
//
//  Created by Breakerror on 2018/2/28.
//  Copyright © 2018年 Breakerror. All rights reserved.
//

#import "QIYIInct.h"

@class QIYIWebview;
@interface QIYIWebviewDelegate : NSObject<WKScriptMessageHandler>
@property(nonatomic, readwrite, weak) QIYIWebview* host;
@end
