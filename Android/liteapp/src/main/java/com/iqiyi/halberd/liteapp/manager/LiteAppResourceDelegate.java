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
package com.iqiyi.halberd.liteapp.manager;

import android.util.Log;
import android.webkit.WebResourceResponse;

import com.iqiyi.halberd.liteapp.api.provider.LiteAppPackageProvider;
import com.iqiyi.halberd.liteapp.utils.LogUtils;

import java.io.ByteArrayInputStream;

/**
 * Created by eggizhang@qiyi.com on 17-11-20.
 * This delegate is used for reset base url file://mp_local/ files to lite app
 * offline package files.
 * By doing so support css and images packaged in lite app package.
 */

public class LiteAppResourceDelegate {
    private static String TAG = LiteAppResourceDelegate.class.getName();

    public static WebResourceResponse getWebResourceResponse(String src, String liteAppID) {
        //delegate to local package
        try {
            //if from framework use these marks to guide and search framework or package files
            src = src.replace("file:///mp_local/","");
            src = src.replace("file:///", "");
            //split by
            String[] some = src.split("\\u003F");
            if(some.length>0){
                src = some[0];
            }
            byte[] localBytes =  LiteAppPackageProvider.getClient().getLiteAppFileBytes(
                    liteAppID, src);

            if(localBytes != null) {
                return new WebResourceResponse(null, null,
                        new ByteArrayInputStream(localBytes));
            } else {
                return null;
            }
        } catch (Exception e) {
            LogUtils.logError(LogUtils.LOG_MINI_PROGRAM_ERROR,
                    "failed to load local resource",e);
            return null;
        }
    }
}
