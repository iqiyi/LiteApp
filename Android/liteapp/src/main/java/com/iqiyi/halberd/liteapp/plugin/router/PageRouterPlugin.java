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
package com.iqiyi.halberd.liteapp.plugin.router;

import android.text.TextUtils;
import android.util.Log;

import com.iqiyi.halberd.liteapp.LiteAppFragmentActivity;
import com.iqiyi.halberd.liteapp.event.BridgeEvent;
import com.iqiyi.halberd.liteapp.plugin.BasePlugin;
import com.iqiyi.halberd.liteapp.utils.LogUtils;
import com.iqiyi.halberd.liteapp.view.LiteAppBaseActivity;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by chen on 2017/7/28.
 * using this page router plugin to manage page wide router
 */
public class PageRouterPlugin extends BasePlugin{

    @Override
    public boolean interceptEvent(BridgeEvent event) {
        return false;
        }

    @Override
    public void onEvent(BridgeEvent event) {
        if(TextUtils.equals(event.getType(), "goPage")) {
            String data = event.getData();
            try {
                JSONObject dataObj = new JSONObject(data);
                String pageRouter = dataObj.optString("path");
                JSONObject dataContent = dataObj.optJSONObject("data");
                Log.v("PageRouter", pageRouter);
                if (LiteAppFragmentActivity.topInstance != null) {
                    LiteAppBaseActivity topActivity = LiteAppFragmentActivity.topInstance.get();
                    if (topActivity != null) {
                        topActivity.routerGoPage(pageRouter, dataContent);
                    }
                }
            } catch (JSONException e) {
                LogUtils.logError(LogUtils.LOG_MINI_PROGRAM_ERROR,"failed to process this page router event",e);
            }
        }
    }

    @Override
    protected List<String> getEventFilter() {
        List<String> filter = new ArrayList<>();
        filter.add("goPage");
        filter.add("getData");
        return filter;
    }
}
