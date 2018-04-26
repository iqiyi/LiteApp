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
package com.iqiyi.halberd.liteapp.test;

import android.util.Log;

import com.iqiyi.halberd.liteapp.common.BridgeConstant;
import com.iqiyi.halberd.liteapp.event.IEventBridge;
import com.iqiyi.halberd.liteapp.event.IBridgeEventListener;
import com.iqiyi.halberd.liteapp.event.BridgeEvent;

/**
 * Created by eggizhang@qiyi.com on 2017/7/18.
 * this listener will listen to all known events and provide logs for debugging
 */
public class TestingBridgeListener implements IBridgeEventListener {
    public static void startDebugListener(IEventBridge bridge){
        TestingBridgeListener listener = new TestingBridgeListener();
        bridge.registerBridgeListener(BridgeConstant.BRIDGE_LOAD_FINISH,listener,null);
        bridge.registerBridgeListener(BridgeConstant.BRIDGE_LOAD_START,listener,null);
        bridge.registerBridgeListener(BridgeConstant.BRIDGE_NATIVE_BOX,listener,null);
    }

    private static final String TAG = TestingBridgeListener.class.getName();
    @Override
    public boolean interceptEvent(BridgeEvent event) {
        Log.v(TAG,"intercepting event:" + event.getType() + ":  " + event.getData());
        return false;
    }

    @Override
    public void onEvent(BridgeEvent event) {
        Log.v(TAG,"on event" + event.getType() + ":  " + event.getData());
    }
}
