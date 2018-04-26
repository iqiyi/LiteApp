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

/**
 * Created by eggizhang@qiyi.com on 2017/7/17.
 * implement this event listener to register listen to kinds of event
 */

public interface IBridgeEventListener {
    /**
     * Implement this method to intercept view bridge events return
     * true to intercept and onEvent will not be called for any listener
     * for this event.
     * */
    boolean interceptEvent(BridgeEvent event);
    /**
     * If an event is not been intercepted, this method will be called
     * by bridge.
     * */
    void onEvent(BridgeEvent event);
}
