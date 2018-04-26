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
package com.iqiyi.halberd.liteapp.plugin.share;

import android.content.Intent;
import android.net.Uri;
import android.util.Log;

import com.iqiyi.halberd.liteapp.common.BridgeConstant;
import com.iqiyi.halberd.liteapp.event.BridgeEvent;
import com.iqiyi.halberd.liteapp.plugin.BasePlugin;
import com.iqiyi.halberd.liteapp.utils.LogUtils;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by eggizhang@qiyi.com on 2017/8/23.
 * using this share plugin to share an url of current page
 */
public class SharePlugin extends BasePlugin {
    private static final String TAG = SharePlugin.class.getName();

    @Override
    public boolean interceptEvent(BridgeEvent event) {
        return false;
    }

    @Override
    public void onEvent(BridgeEvent event) {
        Log.d(TAG, event.getType());

        if (event.getType().equals(BridgeConstant.BRIDGE_SHARE_PAGE)) {
            try {
                JSONObject shareObject = new JSONObject(event.getData());
                final Uri content_url = Uri.parse(shareObject.optString("url"));

                Intent intent = new Intent();
                intent.setAction(Intent.ACTION_VIEW);
                intent.setData(content_url);
                event.getContext().getAndroidContext()
                        .startActivity(Intent.createChooser(intent, "请选择浏览器"));
            } catch (JSONException e) {
                LogUtils.logError(LogUtils.LOG_MINI_PROGRAM_ERROR, "share event failed", e);
            }
        }

    }

    @Override
    protected List<String> getEventFilter() {
        List<String> filter = new ArrayList<>();
        filter.add(BridgeConstant.BRIDGE_SHARE_PAGE);
        filter.add(BridgeConstant.BRIDGE_GO_BROWSER);
        return filter;
    }
}
