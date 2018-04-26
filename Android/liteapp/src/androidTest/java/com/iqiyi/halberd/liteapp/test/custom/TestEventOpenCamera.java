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
import android.content.Context;
import android.content.Intent;

import com.iqiyi.halberd.liteapp.common.BridgeConstant;
import com.iqiyi.halberd.liteapp.event.BridgeEvent;
import com.iqiyi.halberd.liteapp.event.IBridgeEventListener;
import com.iqiyi.halberd.liteapp.event.IEventBridge;

/**
 * Created by xuyunhua on 2017/7/20.
 */

public class TestEventOpenCamera implements IBridgeEventListener {
    @Override
    public boolean interceptEvent(BridgeEvent event) {
        return false;
    }

    @Override
    public void onEvent(BridgeEvent event) {
        final Context context=event.getContext().getAndroidContext();
        Intent intent=new Intent(context,OpenCameraTestActivity.class);
        context.startActivity(intent);
    }
    public static void register(IEventBridge bridge){
        IBridgeEventListener listener=new TestEventOpenCamera();
        bridge.registerBridgeListener(BridgeConstant.BRIDGE_LOAD_FINISH,listener,null);
        bridge.registerBridgeListener(BridgeConstant.BRIDGE_LOAD_START,listener,null);
        bridge.registerBridgeListener(BridgeConstant.BRIDGE_NATIVE_BOX,listener,null);
    }
}
