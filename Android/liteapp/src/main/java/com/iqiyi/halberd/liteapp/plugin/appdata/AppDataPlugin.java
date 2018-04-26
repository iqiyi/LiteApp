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
package com.iqiyi.halberd.liteapp.plugin.appdata;

import android.content.Context;
import android.content.Intent;
import android.text.TextUtils;
import android.util.Log;

import com.iqiyi.halberd.liteapp.LiteAppService;
import com.iqiyi.halberd.liteapp.context.ExecutorManager;
import com.iqiyi.halberd.liteapp.context.LiteAppContext;
import com.iqiyi.halberd.liteapp.event.BridgeEvent;
import com.iqiyi.halberd.liteapp.event.impl.EventBridgeImpl;
import com.iqiyi.halberd.liteapp.plugin.BasePlugin;
import com.iqiyi.halberd.liteapp.utils.JSUtils;
import com.iqiyi.halberd.liteapp.utils.LogUtils;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.Collections;
import java.util.List;

/**
 * Created by eggizhang@qiyi.com on 17-12-13.
 * using this app data plugin to add app data to lite app before it started in all lite apps.
 * Will also change lite app data when lite app data change called. will also trigger events
 * in all contexts to notify app data change, after it called.
 *
 * Remember to call this plugin when lite app app data changed through its static method,
 * {@link AppDataPlugin#updateAppData(String,Context)} by what will transfer data through different
 * process in case you use lite app in multi process way.
 *
 * App data is global, do not put large message into it to damage performance.
 */

public class AppDataPlugin extends BasePlugin{
    /**
     * This event will be triggered before app data changed by
     * {@link AppDataPlugin#updateAppData(String, Context)}
     * will contains json string of new app data object.
     */
    public static final String EVENT_TYPE_APP_DATA_WILL_CHANGED = "appDataChanged";
    public static final String EXTRA_APP_DATA = "extra_app_data";
    public static final String TAG = AppDataPlugin.class.getName();

    private static String appDataJSONString = "{}";

    @Override
    public void invalid(LiteAppContext context) {
        //when invalid to context, put bundle into this context;
        try {
            JSONObject appDataJsonObj;
            appDataJsonObj = new JSONObject(appDataJSONString);
            String injectString = JSUtils.prepareInjectJSONObject("__app__data",appDataJsonObj);
            //inject when app started
            ExecutorManager.executeScript(context,injectString);
        } catch (JSONException e) {
            LogUtils.logError(LogUtils.LOG_MINI_PROGRAM_ERROR,
                    "error format app data",e);
            LogUtils.logError(LogUtils.LOG_MINI_PROGRAM_ERROR,"error format app data",e);
        }
        super.invalid(context);
    }

    /**
     * using this method to provide app data
     * */
    public static void updateAppData(String dataJSONString, Context context){
        //for multi process scenario first press to lite app service
        Intent intent = new Intent(context, LiteAppService.class);
        intent.setAction(LiteAppService.CHANGE_GLOBAL_DATA);
        intent.putExtra(EXTRA_APP_DATA, dataJSONString);
        context.startService(intent);
    }

    public static void changeAppDataInternal(String newJSONString){
        if(TextUtils.isEmpty(newJSONString)){
           return;
        }

        appDataJSONString = newJSONString;
        Log.v(TAG, "update app data：　" + appDataJSONString);
        //trigger event for app data change
        BridgeEvent appDataChangeEvent = new BridgeEvent();
        appDataChangeEvent.setType(EVENT_TYPE_APP_DATA_WILL_CHANGED);
        appDataChangeEvent.setLocal(false);
        appDataChangeEvent.setData(newJSONString);
        EventBridgeImpl.getInstance().triggerEvent(appDataChangeEvent);
    }

    @Override
    public boolean interceptEvent(BridgeEvent event) {
        return false;
    }

    @Override
    public void onEvent(BridgeEvent event) {
        Log.v(TAG,"receive event: "+ EVENT_TYPE_APP_DATA_WILL_CHANGED);
        try {
            JSONObject appDataJsonObj = new JSONObject(appDataJSONString);
            String injectString = JSUtils.prepareInjectJSONObject("getAppData",appDataJsonObj);
            //inject when app started
            if(event.getContext() !=null) {
                ExecutorManager.executeScript(event.getContext(), injectString);
            }
        } catch (JSONException e) {
            LogUtils.logError(LogUtils.LOG_MINI_PROGRAM_ERROR, "error format app data",e);
        }
    }

    @Override
    protected List<String> getEventFilter() {
        return Collections.singletonList(EVENT_TYPE_APP_DATA_WILL_CHANGED);
    }
}
