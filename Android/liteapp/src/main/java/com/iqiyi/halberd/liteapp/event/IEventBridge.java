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
package com.iqiyi.halberd.liteapp.event;

import com.iqiyi.halberd.liteapp.context.LiteAppContext;

/**
 * Created by eggizhang@qiyi.com on 2017/7/17.
 * Abstract bridge for halberd views
 */
public interface IEventBridge {
    /**
     * Register a listener to view bridge, you can register multiple times for one listener
     * for different event types and see which type current listener registered
     * @param eventType only events match with {@link BridgeEvent#getType()} event will trigger
     *                  listener registered.
     * @param listener listener to be registered
     * @param context context to attach to this event bridge , if not will respond too all contexts and
     *                function as a global listener, otherwise a context local listener.
     * */
    void registerBridgeListener(String eventType, IBridgeEventListener listener, LiteAppContext context);

    /**
     * Trigger event, this will cause event to be triggered on async thread and will not block main
     * thread.
     * @param event you should give a new {@link BridgeEvent} for listeners to process
     * */
    void triggerEvent(BridgeEvent event);
}
