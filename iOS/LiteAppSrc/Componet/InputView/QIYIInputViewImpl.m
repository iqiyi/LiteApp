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
//  QIYIInputViewImpl.m
//  QIYIMiniProgram
//
//  Created by yanqiang zhang on 08/03/2018.
//  Copyright © 2018 www.iqiyi.com. All rights reserved.
//

#import "QIYIInputViewImpl.h"
#import "QIYINativeViewProtocal.h"
#import "QIYICommon.h"

@interface QIYIInputViewImpl()
@property(nonatomic,readwrite,strong)bNativeCallkback nativeViewBlock;
@property(nonatomic,readwrite,weak)NSNumber* native_id;
@end

@implementation QIYIInputViewImpl

-(instancetype) init {
    self=[super init];
    if(self){
        self.autocapitalizationType = UITextAutocapitalizationTypeNone;
        self.borderStyle = UITextBorderStyleNone;
        self.keyboardType = UIKeyboardTypeDefault;
        self.clearsOnBeginEditing = NO;
        [self setBackgroundColor:[UIColor clearColor]];
        [[NSNotificationCenter defaultCenter]
         addObserver:self
         selector:@selector(textFieldTextDidChangeOneCI:)
         name:UITextFieldTextDidChangeNotification
         object:self];
        self.delegate = self;
    }
    return self;
}

-(void)createWith:(NSDictionary *)dic callBack:(bNativeCallkback)nativeCallback {
    NSDictionary* native_data = __safe_convert([dic objectForKey:@"viewData"], NSDictionary);
    NSString *placeholder = [native_data valueForKey:@"placeholder"];
    BOOL focus = [native_data valueForKey:@"focus"];
    if (focus) {
        [self becomeFirstResponder];
    }
    if (placeholder != nil) {
        self.placeholder = placeholder;
    }
    _nativeViewBlock = nativeCallback;
}

-(void)textFieldTextDidChangeOneCI:(NSNotification *)notification
{
    UITextField *textfield=[notification object];
    if (textfield.text.length > 0) {
        if (self.nativeViewBlock) {
            self.nativeViewBlock(@{@"input":textfield.text});
        }
    }
}

-(void)textFieldDidBeginEditing:(UITextField *)textField{
    if (textField.text.length > 0) {
        if (self.nativeViewBlock) {
            self.nativeViewBlock(@{@"event":@"bindfocus",@"params":textField.text});
        }
    }
}

-(void)textFieldDidEndEditing:(UITextField *)textField{
    if (textField.text.length > 0) {
        if (self.nativeViewBlock) {
             self.nativeViewBlock(@{@"event":@"bindblur",@"params":textField.text});
        }
    }
}

-(BOOL)textFieldShouldReturn:(UITextField *)textField{
    if (textField.text.length > 0) {
        if (self.nativeViewBlock) {
             self.nativeViewBlock(@{@"event":@"bindconfirm",@"params":textField.text});
        }
    }
    [textField endEditing:YES];
    return YES;
}


@end
