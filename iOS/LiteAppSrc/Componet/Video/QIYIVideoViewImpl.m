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
//  QIYIVideoViewImpl.m
//  QIYIMiniProgram
//
//  Created by yanqiang zhang on 28/02/2018.
//  Copyright © 2018 www.iqiyi.com. All rights reserved.
//

#import "QIYIVideoViewImpl.h"
#import "QIYICommon.h"
#import "ZFPlayer.h"
#import "ZFPlayerView.h"

@interface QIYIVideoViewImpl()<ZFPlayerDelegate>
@property(nonatomic,readwrite,strong)bNativeCallkback nativeViewBlock;
@property(nonatomic,readwrite,strong)ZFPlayerView* playerView;
@property(nonatomic,readwrite,strong)ZFPlayerModel* playerModel;
@end

@implementation QIYIVideoViewImpl

-(instancetype)init{
    self=[super init];
    if(self){
        _playerView = [[ZFPlayerView alloc] init];
        _playerModel = [[ZFPlayerModel alloc] init];
        _playerModel.fatherView = self;
        _playerModel.title = @"iQIYI";
        _playerView.delegate = self;
        [self addSubview:_playerView];
    }
    return self;
}

-(void)startPlayer:(NSString*)url{
    _playerModel.videoURL = [NSURL URLWithString:url];
    [_playerView playerModel:_playerModel];
    [_playerView autoPlayTheVideo];
}

- (void)createWith:(NSDictionary *)dic callBack:(bNativeCallkback)nativeCallback{
    _nativeViewBlock = nativeCallback;
    NSDictionary* native_data = __safe_convert([dic objectForKey:@"viewData"], NSDictionary);
    NSString *src = [native_data valueForKey:@"src"];
    if (src != nil) {
        [self startPlayer:src];
    }
}

-(void)zf_playerBackAction{
    //可以通过这个回调，将需要回传的东西 传递给js
    if (self.nativeViewBlock) {
        self.nativeViewBlock(nil);
    }
}

@end
