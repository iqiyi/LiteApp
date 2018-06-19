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
package com.iqiyi.halberd.liteapp.export;

import android.annotation.SuppressLint;
import android.os.AsyncTask;
import android.text.TextUtils;
import android.util.Log;

import com.iqiyi.halberd.liteapp.LiteAppFragmentActivity;
import com.iqiyi.halberd.liteapp.api.provider.LiteAppContextInitProvider;
import com.iqiyi.halberd.liteapp.api.provider.LiteAppNetworkProvider;
import com.iqiyi.halberd.liteapp.context.ExecutorManager;
import com.iqiyi.halberd.liteapp.context.LiteAppContext;
import com.iqiyi.halberd.liteapp.context.LiteAppPage;
import com.iqiyi.halberd.liteapp.event.BridgeEvent;
import com.iqiyi.halberd.liteapp.event.IBridgeEventListener;
import com.iqiyi.halberd.liteapp.event.impl.EventBridgeImpl;
import com.iqiyi.halberd.liteapp.plugin.network.impl.LiteAppNetworkRequest;
import com.iqiyi.halberd.liteapp.utils.MD5Utils;
import com.iqiyi.halberd.liteapp.view.LiteAppBaseActivity;

import org.json.JSONException;
import org.json.JSONObject;

/**
 * Created by eggizhang@qiyi.com on 2017/9/7.
 * using this provider to provide javascript functions to javascript core
 * as default api.
 */
@SuppressWarnings("unused")
public class DefaultFunctionProvider implements LiteAppContextInitProvider {
    private static final String TAG = DefaultFunctionProvider.class.getName();

    @Override
    public void invalid(final LiteAppContext context) {
        //add base
        JsObject base = new JsObject(){};
        ExecutorManager.addObjectToGlobal(context ,"__base__", base);
        //add console
        final JsObject console = new JsObject(){};
        ExecutorManager.addObjectToGlobal(context , "console", console);
        JsObject log = new JsObject(){
            @Override
            protected long onCalled(NativeObjectRef[] callbackHandles, String[] parameters){
                if(TextUtils.isEmpty(parameters[0])){
                    return 0;
                }
                if(parameters[0].length()<2){
                    return 0;
                }
                Log.v(TAG ,"js_console_log:" + parameters[0]);
                return 0;
            }
        };
        //ExecutorManager.executeScript(context,"console.log = function(){}");
        ExecutorManager.addObjectToObject(context,console,"log",log);
        JsObject error = new JsObject(){
            @Override
            protected long onCalled(NativeObjectRef[] callbackHandles, String[] parameters){
                if(TextUtils.isEmpty(parameters[0])){
                    return 0;
                }
                if(parameters[0].length()<2){
                    return 0;
                }
                Log.v(TAG ,"js_console_error:" + parameters[0]);
                return 0;
            }
        };
        ExecutorManager.addObjectToObject(context,console,"error", error);
        //add patch
        JsObject postPatch = new JsObject(){
            @Override
            protected long onCalled(NativeObjectRef[] callbackHandles, String[] parameters){
                if(TextUtils.isEmpty(parameters[0])){
                    return 0;
                }
                if(parameters[0].length()<2){
                    return 0;
                }
                Log.v(TAG ,"js_post_patch"+ parameters[0]);
                if(context.getType() == LiteAppContext.CONTEXT_TYPE_PAGE){
                    ((LiteAppPage)context).getContainer().postPatch(parameters[0]);
                }
                return 0;
            }
        };
        ExecutorManager.addObjectToObject(context, base, "postPatch", postPatch);

        //__base__.triggerEvent(eventType,data);
        JsObject triggerEvent = new JsObject(){
            @Override
            protected long onCalled(NativeObjectRef[] callbackHandles, String[] parameters){
                if(TextUtils.isEmpty(parameters[0])){
                    return 0;
                }
                if(parameters[0].length()<2){
                    return 0;
                }
                Log.v(TAG ,"js_trigger_event"+ parameters[0]);
                BridgeEvent bridgeEvent = new BridgeEvent();
                bridgeEvent.setContext(context);
                bridgeEvent.setData(parameters[1]);
                bridgeEvent.setType(parameters[0]);
                bridgeEvent.setNativeObjectHandles(callbackHandles[1]);
                if(parameters.length > 2){
                    //by default a local broadcast event
                    boolean global = TextUtils.equals("true", parameters[2]);
                    bridgeEvent.setLocal(!global);
                } else {
                    bridgeEvent.setLocal(true);
                }
                EventBridgeImpl.getInstance().triggerEvent(bridgeEvent);
                return 0;
            }
        };
        ExecutorManager.addObjectToObject(context, base, "triggerEvent", triggerEvent);

        //__base__.registerEventListener(eventType,eventCallback);
        JsObject registerEventListener = new JsObject(){
            @Override
            protected long onCalled(final NativeObjectRef[] callbackHandles, String[] parameters){
                if(TextUtils.isEmpty(parameters[0])){
                    return 0;
                }
                if(parameters[0].length()<2){
                    return 0;
                }
                Log.v(TAG ,"js_register_event_listener"+ parameters[0]);

                EventBridgeImpl.getInstance().registerBridgeListener(parameters[0], new IBridgeEventListener() {
                    NativeObjectRef onEventCallbackHandle = callbackHandles[1];

                    @Override
                    public boolean interceptEvent(BridgeEvent event) {
                        //do not intercept in javascript layer
                        return false;
                    }

                    @Override
                    public void onEvent(BridgeEvent event) {
                        ExecutorManager.callNativeRefFunction(context
                                ,onEventCallbackHandle, event.getData());
                    }
                }, context);
                return 0;
            }
        };
        ExecutorManager.addObjectToObject(context, base, "registerEventListener", registerEventListener);

        JsObject goBrowser = new JsObject() {
            @Override
            protected long onCalled(NativeObjectRef[] callbackHandles, String[] parameters){
                if(TextUtils.isEmpty(parameters[0])){
                    return 0;
                }
                if(parameters[0].length()<2) {
                    return 0;
                }   
                Log.v(TAG , "goBrowser" + parameters[0]);
                return 0;
            }
        };
        ExecutorManager.addObjectToObject(context, base, "goBrowser", goBrowser);

        JsObject network = new JsObject();
        ExecutorManager.addObjectToGlobal(context, "network", network);

        JsObject networkGet = new JsObject(){
            @Override
            protected long onCalled(NativeObjectRef[] callbackHandles, String[] parameters){
                if(TextUtils.isEmpty(parameters[0])){
                    return 0;
                }
                if(parameters[0].length()<2){
                    return 0;
                }
                final String callbackParameter0 = parameters[0];
                final NativeObjectRef finalCallbackHandle2 = callbackHandles[2];
                NativeObjectRef callbackHandle3 = null;
                if(callbackHandles.length>3) {
                    callbackHandle3 = callbackHandles[3];
                }
                Log.v(TAG ,"network get" + parameters[0]);
                final NativeObjectRef finalCallbackHandle3 = callbackHandle3;
                @SuppressLint("StaticFieldLeak") AsyncTask<Void,Void,Void> networkTask = new AsyncTask<Void,Void,Void>() {
                    @Override
                    protected Void doInBackground(Void[] objects) {
                        LiteAppNetworkRequest request = new LiteAppNetworkRequest();
                        //retrieve data
                        request.setMethod("GET")
                                .setURL(callbackParameter0);
                        LiteAppNetworkProvider.executeNetworkRequest(request);
                        if(request.isSuccess()) {
                            ExecutorManager.callNativeRefFunction(context,
                                    finalCallbackHandle2, request.getResultData());
                        } else {
                            if(finalCallbackHandle3 ==null){
                                return null;
                            }
                            ExecutorManager.callNativeRefFunction(context,
                                    finalCallbackHandle3, request.getResultData());
                        }
                        return null;
                    }
                };
                networkTask.executeOnExecutor(AsyncTask.THREAD_POOL_EXECUTOR);
                return 0;
            }
        };
        ExecutorManager.addObjectToObject(context, network, "get", networkGet);

        JsObject share = new JsObject(){
            @Override
            protected long onCalled(NativeObjectRef[] callbackHandles, String[] parameters){
                if(TextUtils.isEmpty(parameters[0])){
                    return 0;
                }
                if(parameters[0].length()<2){
                    return 0;
                }
                Log.v("share", parameters[0]);
                return 0;
            }
        };
        ExecutorManager.addObjectToObject(context, base, "share", share);

        JsObject getData = new JsObject(){
            @Override
            protected long onCalled(NativeObjectRef[] callbackHandles, String[] parameters){
                if(TextUtils.isEmpty(parameters[0])){
                    return 0;
                }
                if(parameters[0].length()<2){
                    return 0;
                }
                Log.v(TAG, "getData" + parameters[0]);
                return 0;
            }
        };

        JsObject pageRouter = new JsObject(){
            @Override
            protected long onCalled(NativeObjectRef[] callbackHandles, String[] parameters){
                if(TextUtils.isEmpty(parameters[0])){
                    return 0;
                }
                if(parameters[0].length()<2){
                    return 0;
                }
                if(TextUtils.isEmpty(parameters[1])){
                    parameters[1] = "{}";
                }
                Log.v("go page", parameters[0]);
                if (LiteAppFragmentActivity.topInstance != null) {
                    LiteAppBaseActivity topActivity = LiteAppFragmentActivity.topInstance.get();
                    if (topActivity != null) {
                        try {
                            topActivity.routerGoPage(parameters[0], new JSONObject(parameters[1]));
                        } catch (JSONException e) {
                            Log.v(TAG, "data form not json: " + parameters[1]);
                        }
                    }
                }
                return 0;
            }
        };
        ExecutorManager.addObjectToObject(context, base, "start", pageRouter);

        //using this md5 utils will work around x86 crash on javascript md5
        final JsObject md5 = new JsObject() {
            protected long onCalled(NativeObjectRef[] callbackHandles, String[] parameters) {
                if(TextUtils.isEmpty(parameters[0])) {
                    return 0;
                } else if(callbackHandles.length < 2) {
                    return 0;
                } else {
                    String mdResult = MD5Utils.md5(parameters[0]);
                    ExecutorManager.callNativeRefFunction(context, callbackHandles[1], mdResult);
                }
                return 0;
            }
        };
        ExecutorManager.addObjectToGlobal(context, "mi_pad__md5__", md5);
    }
}
