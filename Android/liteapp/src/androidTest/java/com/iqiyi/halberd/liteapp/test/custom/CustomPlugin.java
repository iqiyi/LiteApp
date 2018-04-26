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
package com.iqiyi.halberd.liteapp.test.custom;

import android.util.Log;
import com.iqiyi.halberd.liteapp.event.BridgeEvent;
import com.iqiyi.halberd.liteapp.plugin.BasePlugin;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by xuyunhua on 2017/8/4.
 */

public class CustomPlugin extends BasePlugin {
    public static String TAG=CustomPlugin.class.getName();
    @Override
    public boolean interceptEvent(BridgeEvent event) {
        return false;
    }

    @Override
    protected List<String> getEventFilter() {
        ArrayList<String> filter = new ArrayList<>();
        filter.add("testNetWork");
        filter.add("nativeBox");
        filter.add("alert");
        filter.add("login");
        filter.add("video");
        filter.add("pay");
        filter.add("info");
        filter.add("searchApp");
        filter.add("start");
        return filter;
    }
    @Override
    public void onEvent(final BridgeEvent event) {
        Log.d(TAG,"eventType:"+event.getType());
        Log.d(TAG,"eventData:"+event.getData());
    }
}
