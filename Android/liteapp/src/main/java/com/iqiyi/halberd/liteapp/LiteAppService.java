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

import android.app.Service;
import android.content.Intent;
import android.os.IBinder;
import android.support.annotation.Nullable;
import android.util.Log;

import com.iqiyi.halberd.liteapp.api.LiteAppGlobalConfig;
import com.iqiyi.halberd.liteapp.api.provider.LiteAppGlobalInitializer;
import com.iqiyi.halberd.liteapp.api.provider.LiteAppPackageProvider;
import com.iqiyi.halberd.liteapp.common.LiteAppException;
import com.iqiyi.halberd.liteapp.context.LiteAppFactory;
import com.iqiyi.halberd.liteapp.plugin.appdata.AppDataPlugin;
import com.iqiyi.halberd.liteapp.utils.LogUtils;

import java.util.logging.ConsoleHandler;

/**
 * Created by eggizhang@qiyi.com on 2017/8/31.
 * This service used to prepare and kill lite app process
 **/
public class LiteAppService extends Service{
    public static final String CLEAR_MEMORY = "clear";
    public static final String ACTION_PREPARE = "prepare";
    public static final String CHANGE_GLOBAL_DATA = "change_global_data";

    private static final String TAG = LiteAppService.class.getName();

    @Nullable
    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        LiteAppGlobalInitializer initializer =
                LiteAppGlobalConfig.getLiteAppInitializer(this);
        if(initializer!=null){
            initializer.init(this);
        }
        //先在Service中创建 lite app，避免第一次创建Webview过慢问题
        if(intent == null) {
            return super.onStartCommand(null, flags, startId);
        }
        if(ACTION_PREPARE.equals(intent.getAction())) {
            //using empty framework version for default
            try {
                LiteAppFactory.createCache(this,
                        null);
            } catch (LiteAppException e) {
                LogUtils.logError(LogUtils.LOG_MINI_PROGRAM_ERROR,
                        "package error in prepare cache", e);
            }
        } else if(CLEAR_MEMORY.equals(intent.getAction())){
            try {
                LiteAppFactory.clearCache();
            } catch (LiteAppException e) {
                LogUtils.logError(LogUtils.LOG_MINI_PROGRAM_ERROR,
                        "package error in prepare cache null package", e);
            }
            LiteAppPackageProvider.getClient().cleanMemoryCache();
            //android.os.Process.killProcess(android.os.Process.myPid());
        } else if(CHANGE_GLOBAL_DATA.equals(intent.getAction())){
            AppDataPlugin.changeAppDataInternal(intent.getStringExtra(AppDataPlugin.EXTRA_APP_DATA));
        }
        return super.onStartCommand(intent, flags, startId);
    }
}
