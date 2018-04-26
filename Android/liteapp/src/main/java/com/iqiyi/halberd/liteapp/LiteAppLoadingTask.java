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
package com.iqiyi.halberd.liteapp;

import android.annotation.SuppressLint;
import android.content.Context;
import android.os.AsyncTask;

import com.iqiyi.halberd.liteapp.api.provider.LiteAppPackageProvider;
import com.iqiyi.halberd.liteapp.manager.impl.LiteAppDetail;
import com.iqiyi.halberd.liteapp.utils.LogUtils;

/**
 * Created by eggizhang@qiyi.com on 17-10-20.
 * Using this task to load lite app and check its location through network
 * then lite app activity can be opened
 */
public class LiteAppLoadingTask extends AsyncTask<Void,Void,LiteAppDetail>{

    public String id;

    LiteAppLoadingTask(String id) {
        this.id = id;
    }

    @Override
    protected LiteAppDetail doInBackground(Void... params) {
        // 1 first check update
        return LiteAppPackageProvider.getClient().prepareLiteAppFromServer(id);
    }

    @Override
    protected void onPostExecute(LiteAppDetail detail) {
        if (detail==null){
            LogUtils.log(LogUtils.LOG_MINI_PROGRAM_CACHE, LogUtils.CACHE_NETWORK + LogUtils.CACHE_CHECK_UPDATE + LogUtils.COMMON_FAIL);
        } else {
            LogUtils.log(LogUtils.LOG_MINI_PROGRAM_CACHE, LogUtils.CACHE_NETWORK + LogUtils.CACHE_CHECK_UPDATE + LogUtils.COMMON_SUCCESS);
        }
        super.onPostExecute(detail);
    }
}
