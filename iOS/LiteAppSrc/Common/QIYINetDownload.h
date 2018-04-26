//
//  QIYINetDownload.h
//  QIYIMiniProgram
//
//  Created by Breakerror on 2018/2/28.
//  Copyright © 2018年 Breakerror. All rights reserved.
//

#import "QIYIInct.h"

@interface QIYINetDownload: NSObject
+(BOOL) get:(NSString*)uri
  arguments:(NSDictionary*)argument
    success:(void(^)(id))success
    failure:(void(^)(void))failure;
+(BOOL) post:(NSString*)uri
   arguments:(NSDictionary*)argument
     success:(void(^)(id))success
     failure:(void(^)(void))failure;
@end
