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
package com.iqiyi.halberd.liteapp.plugin.network;

import android.os.AsyncTask;
import android.text.TextUtils;
import android.util.Log;

import com.iqiyi.halberd.liteapp.api.provider.LiteAppNetworkProvider;
import com.iqiyi.halberd.liteapp.common.BridgeConstant;
import com.iqiyi.halberd.liteapp.context.ExecutorManager;
import com.iqiyi.halberd.liteapp.event.BridgeEvent;
import com.iqiyi.halberd.liteapp.export.NativeObjectRef;
import com.iqiyi.halberd.liteapp.plugin.BasePlugin;
import com.iqiyi.halberd.liteapp.plugin.network.impl.LiteAppNetworkRequest;
import com.iqiyi.halberd.liteapp.utils.LogUtils;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

/**
 * Created by eggizhang@qiyi.com on 2017/8/4.
 * using this plugin to implement
 */
public class NetworkPlugin extends BasePlugin {
    private static final String TAG = NetworkPlugin.class.getName();

    @Override
    public boolean interceptEvent(BridgeEvent event) {
        return false;
    }

    @Override
    public void onEvent(BridgeEvent event) {
        Log.d(TAG,event.getType());
        if (event.getType().equals(BridgeConstant.BRIDGE_NETWORK)) {
            new NetworkTask(event).executeOnExecutor(AsyncTask.THREAD_POOL_EXECUTOR);
        }
    }

    @Override
    protected List<String> getEventFilter() {
        List<String> filter = new ArrayList<>();
        filter.add(BridgeConstant.BRIDGE_NETWORK);
        return filter;
    }

    private static class NetworkTask extends AsyncTask<Void,Void,Void>{
        private BridgeEvent networkEvent;
        NativeObjectRef success;
        NativeObjectRef fail;

        NetworkTask(BridgeEvent event){
            networkEvent = event;
            //get protect event to make is validate before callback
            event.retainProtect();
            success = ExecutorManager.getPropertyFromJSObject(
                    networkEvent.getNativeObjectHandles(), "success");
            fail = ExecutorManager.getPropertyFromJSObject(
                    networkEvent.getNativeObjectHandles(), "fail");
        }

        @Override
        protected Void doInBackground(Void... params) {
            LiteAppNetworkRequest request = new LiteAppNetworkRequest();
            //retrieve data
            try {
                String eventData = networkEvent.getData();
                if(!TextUtils.isEmpty(eventData)) {
                    JSONObject requestData = new JSONObject(eventData);
                    final String method = requestData.optString("method","GET");
                    final String url = requestData.optString("url");
                    final String headers = requestData.optString("headers");
                    final String body = requestData.optString("body",null);

                    request.setMethod(method)
                            .setURL(url)
                            .setBody(body)
                            .setRequestHeaders(readHeaders(headers));

                    LiteAppNetworkProvider.executeNetworkRequest(request);
                    if(request.isSuccess()){
                        if(success==null){
                            return null;
                        }
                        ExecutorManager.callNativeRefFunction(networkEvent.getContext(),
                                success,request.getResultData());
                    } else {
                        if(fail == null){
                            return null;
                        }
                        ExecutorManager.callNativeRefFunction(networkEvent.getContext(),
                                fail,String.valueOf(request.getResultCode()));
                    }
                }
            } catch (JSONException e) {
                LogUtils.logError(LogUtils.LOG_MINI_PROGRAM_ERROR,"parse network result error",e);
            } catch (Exception e){
                LogUtils.logError(LogUtils.LOG_MINI_PROGRAM_ERROR,"network unknown exception result error",e);
            }
            return null;
        }

        private HashMap<String,String> readHeaders(String headers) {
            if(headers!=null&&!headers.equals("")) {
                try {
                    HashMap<String, String> map = new HashMap<>();
                    JSONArray jsonArray = new JSONArray(headers);
                    for (int i = 0; i < jsonArray.length(); i++) {
                        JSONObject jsonObject = jsonArray.getJSONObject(i);
                        String key = jsonObject.optString("key");
                        String value = jsonObject.optString("value");
                        if (key != null) {
                            map.put(key, value);
                        }
                    }
                    return map;
                } catch (Exception e) {
                    Log.d(TAG, "NetworkPlugin read headers error", e);
                }
            }
            return null;
        }

        @Override
        protected void onPostExecute(Void v) {
            super.onPostExecute(v);
        }
    }
}
