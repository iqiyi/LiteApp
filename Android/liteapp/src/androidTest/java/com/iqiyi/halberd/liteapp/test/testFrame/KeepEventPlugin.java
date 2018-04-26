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
package com.iqiyi.halberd.liteapp.test.testFrame;

import android.util.Log;

import com.iqiyi.halberd.liteapp.event.BridgeEvent;
import com.iqiyi.halberd.liteapp.export.NativeObjectRef;
import com.iqiyi.halberd.liteapp.plugin.BasePlugin;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

/**
 * Created by xujiajia_sx on 2017/11/6.
 */

public class KeepEventPlugin extends BasePlugin {
    public static final String TAG = KeepEventPlugin.class.getName();
    private int count=-1;
    public static HashMap<Integer,NativeObjectRef> mMap=new HashMap<>();

    @Override
    public boolean interceptEvent(BridgeEvent event) {
        return false;
    }

    @Override
    public void onEvent(BridgeEvent event) {
        if(event.getType().equals("keepEventTest")){
            count++;
            Log.v(TAG,""+count+" "+event.getData());
            mMap.put(count,event.getNativeObjectHandles());
        }
    }

    @Override
    protected List<String> getEventFilter() {
        ArrayList<String> filter = new ArrayList<>();
        filter.add("keepEventTest");
        return filter;
    }
}
