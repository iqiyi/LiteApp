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
package com.iqiyi.halberd.liteapp.plugin.loading;

import android.app.Activity;
import android.app.Dialog;
import android.util.Log;

import com.iqiyi.halberd.liteapp.LiteAppFragmentActivity;
import com.iqiyi.halberd.liteapp.api.provider.LiteAppLoadingViewProvider;
import com.iqiyi.halberd.liteapp.common.BridgeConstant;
import com.iqiyi.halberd.liteapp.event.BridgeEvent;
import com.iqiyi.halberd.liteapp.plugin.BasePlugin;
import com.iqiyi.halberd.liteapp.utils.LogUtils;

import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by xujiajia_sx on 2017/12/14.
 *
 */

public class LoadingPlugin extends BasePlugin {
    public static final String TAG = LoadingPlugin.class.getName();
    private Dialog mLoadingDialog;

    @Override
    public boolean interceptEvent(BridgeEvent event) {
        return false;
    }

    @Override
    public void onEvent(BridgeEvent event) {
        Log.d(TAG, event.getType());
        if (BridgeConstant.BRIDGE_LOADING.equals(event.getType())) {
            try {
                if(LiteAppFragmentActivity.topInstance==null){
                    return;
                }
                Activity activity=LiteAppFragmentActivity.topInstance.get();
                if(activity==null){
                    return;
                }
                JSONObject dataObj = new JSONObject(event.getData());
                final String action = dataObj.optString("action");
                final boolean cancelable = dataObj.optBoolean("cancelable",true);
                final LoadingViewFactory loadingViewFactory = LiteAppLoadingViewProvider.getLoadingViewFactory();
                if(loadingViewFactory!=null) {
                    if(mLoadingDialog==null) {
                        mLoadingDialog = loadingViewFactory.createLoadingDialog(activity);
                        loadingViewFactory.setCancelable(mLoadingDialog,cancelable);
                    }
                    if ("show".equals(action)) {
                        if(mLoadingDialog!=null) {
                            loadingViewFactory.show(mLoadingDialog);
                        }
                    } else if ("hide".equals(action)) {
                        if(mLoadingDialog!=null) {
                            loadingViewFactory.hide(mLoadingDialog);
                            mLoadingDialog = null;
                        }
                    }
                }else{
                    if ("show".equals(action)) {
                        Log.d(TAG, "loadingView==null show ");
                    } else if ("hide".equals(action)) {
                        Log.d(TAG, "loadingView==null hide ");
                    }
                }
            } catch (Exception e) {
                LogUtils.logError(LogUtils.LOG_MINI_PROGRAM_ERROR, "LoadingPlugin onEvent error",e);
            }
        }
    }

    @Override
    protected List<String> getEventFilter() {
        ArrayList<String> filter = new ArrayList<>();
        filter.add(BridgeConstant.BRIDGE_LOADING);
        return filter;
    }
}
