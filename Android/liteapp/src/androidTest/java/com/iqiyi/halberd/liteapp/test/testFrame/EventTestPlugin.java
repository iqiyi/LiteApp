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
import com.iqiyi.halberd.liteapp.plugin.BasePlugin;

import junit.framework.Assert;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by xuyunhua on 2017/8/4.
 */

public class EventTestPlugin extends BasePlugin {
    public static final String TAG = EventTestPlugin.class.getName();

    @Override
    public boolean interceptEvent(BridgeEvent event) {
        return false;
    }

    @Override
    protected List<String> getEventFilter() {
        ArrayList<String> filter = new ArrayList<>();
        filter.add("1234");
        filter.add("test");
        filter.add("!@#$%^&*()");
        filter.add("---");
        filter.add("   ");
        return filter;
    }

    @Override
    public void onEvent(final BridgeEvent event) {
        Log.d(TAG,event.getData());
        if(event.getType().equals("1234")){
            Assert.assertEquals("1234111",event.getData());
        }else if(event.getType().equals("test")){
            Assert.assertEquals("test222",event.getData());
        }else if(event.getType().equals("!@#$%^&*()")){
            Assert.assertEquals("!@#$%^&*()333",event.getData());
        }else if(event.getType().equals("---")){
            Assert.assertEquals("---444",event.getData());
        }else if(event.getType().equals("   ")){
            Assert.assertEquals("   555",event.getData());
        }
    }
}
