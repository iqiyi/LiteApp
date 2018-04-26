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
package com.iqiyi.halberd.liteapp.api.provider;

import android.util.Log;

import com.iqiyi.halberd.liteapp.plugin.network.impl.LiteAppNetworkRequest;
import com.iqiyi.halberd.liteapp.utils.LogUtils;

/**
 * Created by eggizhang@qiyi.com on 2017/6/9.
 * Using this class to initialize hal net working and provide http request
 * in javascript context, call hal instance to create a instance of hal network
 */
public class LiteAppNetworkProvider {
    private static LiteAppNetworkExecutor liteAppNetworkExecutor = null;
    private static final String TAG = LiteAppNetworkProvider.class.getName();

    public static void setExecutor(LiteAppNetworkExecutor executor){
        liteAppNetworkExecutor = executor;
    }

    public static void executeNetworkRequest(LiteAppNetworkRequest request){
        if(liteAppNetworkExecutor == null){
            LogUtils.logError(LogUtils.LOG_MINI_PROGRAM_ERROR,
                    "null network executor implementation", null);
            return;
        }
        liteAppNetworkExecutor.execute(request);
    }
}
