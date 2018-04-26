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
package com.iqiyi.halberd.liteapp.plugin.swipe_refresh;

import android.support.v4.widget.SwipeRefreshLayout;
import android.util.Log;
import android.view.View;
import android.view.ViewGroup;

import com.iqiyi.halberd.liteapp.common.BridgeConstant;
import com.iqiyi.halberd.liteapp.context.ExecutorManager;
import com.iqiyi.halberd.liteapp.context.LiteAppPage;
import com.iqiyi.halberd.liteapp.event.BridgeEvent;
import com.iqiyi.halberd.liteapp.export.NativeObjectRef;
import com.iqiyi.halberd.liteapp.plugin.BasePlugin;
import com.iqiyi.halberd.liteapp.utils.LogUtils;

import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by xujiajia_sx on 2017/11/22.
 *
 */

public class SwipeRefreshPlugin extends BasePlugin {
    public static final String TAG = SwipeRefreshPlugin.class.getName();

    @Override
    public boolean interceptEvent(BridgeEvent event) {
        return false;
    }

    @Override
    public void onEvent(final BridgeEvent event) {
        Log.d(TAG, event.getType());

        if (BridgeConstant.BRIDGE_SET_SWIPE_REFRESH.equals(event.getType())) {
            try{
                View containerView=((LiteAppPage)(event.getContext())).getContainer().getView();
                final SwipeRefreshLayout mSwipeRefreshLayout=(SwipeRefreshLayout) ((ViewGroup)containerView).getChildAt(0);

                JSONObject dataObj = new JSONObject(event.getData());
                final boolean enabled = dataObj.optBoolean("enabled",true);
                final int color = dataObj.optInt("color");
                final int background = dataObj.optInt("background");
                final NativeObjectRef refresh = ExecutorManager.getPropertyFromJSObject(
                        event.getNativeObjectHandles(), "refresh");

                containerView.post(new Runnable() {
                    @Override
                    public void run() {
                        mSwipeRefreshLayout.setEnabled(enabled);
                        mSwipeRefreshLayout.setColorSchemeColors(color);
                        mSwipeRefreshLayout.setProgressBackgroundColorSchemeColor(background);
                        mSwipeRefreshLayout.setOnRefreshListener(new SwipeRefreshLayout.OnRefreshListener() {
                            @Override
                            public void onRefresh() {
                                ExecutorManager.callNativeRefFunction(event.getContext(), refresh, "");
                                mSwipeRefreshLayout.setRefreshing(false);
                            }
                        });

                    }
                });

            }catch (Exception e){
                LogUtils.logError(LogUtils.LOG_MINI_PROGRAM_ERROR,
                        "SwipeRefreshPlugin event error" ,e);
            }
        }
    }

    @Override
    protected List<String> getEventFilter() {
        ArrayList<String> filter = new ArrayList<>();
        filter.add(BridgeConstant.BRIDGE_SET_SWIPE_REFRESH);
        return filter;
    }
}
