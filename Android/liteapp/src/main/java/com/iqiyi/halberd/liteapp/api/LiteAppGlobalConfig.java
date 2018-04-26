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
package com.iqiyi.halberd.liteapp.api;

import android.app.Activity;
import android.content.Context;
import android.content.SharedPreferences;
import android.text.TextUtils;

import com.iqiyi.halberd.liteapp.api.provider.LiteAppGlobalInitializer;
import com.iqiyi.halberd.liteapp.utils.LogUtils;

/**
 * Created by eggizhang@qiyi.com on 2017/7/24.
 * use this class to deal with lite app global configs
 */
public class LiteAppGlobalConfig {
    /** Set a global initializer and will be stored in preference globally for every process*/
    public static void setLiteAppInitializer(Context context,
                                                 LiteAppGlobalInitializer initializer){
        String initializerClassName = initializer.getClass().getName();
        SharedPreferences sp = context.getSharedPreferences(global_SP, Activity.MODE_PRIVATE);
        SharedPreferences.Editor editor = sp.edit();
        editor.putString(initializer_Class_Name_SP, initializerClassName);
        editor.apply();
    }

    public static LiteAppGlobalInitializer getLiteAppInitializer(Context context){
        SharedPreferences sp = context.getSharedPreferences(global_SP, Activity.MODE_PRIVATE);
        String initializerClassName = sp.getString(initializer_Class_Name_SP,null);
        if(TextUtils.isEmpty(initializerClassName)){
            return null;
        }
        try {
            Class initializerClass = Class.forName(initializerClassName);
            return (LiteAppGlobalInitializer)initializerClass.newInstance();
        } catch (Exception e){
            LogUtils.logError(LogUtils.LOG_MINI_PROGRAM_ERROR,"no initializer class found",e);
        }
        return null;
    }

    private static final String initializer_Class_Name_SP = "initializerClassName";
    private static final String global_SP = "global";
    private static final String TAG = LiteAppGlobalConfig.class.getName();

}
