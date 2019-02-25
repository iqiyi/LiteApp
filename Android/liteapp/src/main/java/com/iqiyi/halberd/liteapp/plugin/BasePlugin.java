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
package com.iqiyi.halberd.liteapp.plugin;

import com.iqiyi.halberd.liteapp.api.provider.LiteAppContextInitManager;
import com.iqiyi.halberd.liteapp.api.provider.LiteAppContextInitProvider;
import com.iqiyi.halberd.liteapp.context.LiteAppContext;
import com.iqiyi.halberd.liteapp.event.IEventBridge;
import com.iqiyi.halberd.liteapp.event.IBridgeEventListener;
import com.iqiyi.halberd.liteapp.event.impl.EventBridgeImpl;

import java.util.List;

/**
 * Created by eggizhang@qiyi.com on 2017/7/18.
 * extend this base plugin to extend feature of halberd framework
 */
public abstract class BasePlugin implements IBridgeEventListener, LiteAppContextInitProvider {
    protected abstract List<String> getEventFilter();

    /**
     * Using this function to do something when context started , just like
     * {@link com.iqiyi.halberd.liteapp.export.DefaultFunctionProvider}
     * */
    public void invalid(LiteAppContext context){
        //do noting by default
    }

    public void attach() {
        LiteAppContextInitManager.addLiteAppContextInitProvider(this);

        IEventBridge mBridge = EventBridgeImpl.getInstance();
        List<String> filter = getEventFilter();
        if(filter == null){
            return;
        }
        for (String items : filter) {
            mBridge.registerBridgeListener(items, this, null);
        }
    }
}
