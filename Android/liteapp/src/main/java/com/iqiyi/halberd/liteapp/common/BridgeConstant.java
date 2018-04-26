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
package com.iqiyi.halberd.liteapp.common;

/**
 * Created by eggizhang@qiyi.com on 2017/7/18.
 * javascript bridge constant for events and callback functions
 */

public class BridgeConstant {
    //event types make sure identical to js and CPP layer events
    public final static String BRIDGE_LOAD_START = "bridgeLoadStart";
    public final static String BRIDGE_LOAD_FINISH = "bridgeLoadFinish";
    public final static String BRIDGE_ON_RESUME = "pageResume";
    public final static String BRIDGE_ON_PAUSE = "pagePause";
    public final static String BRIDGE_ON_DESTROY = "pageDestroy";
    public final static String BRIDGE_NATIVE_BOX = "nativeBox";
    public final static String BRIDGE_SHORT_CUT = "shortCut";
    public final static String BRIDGE_SHARE_PAGE = "pageShare";
    public final static String BRIDGE_GO_BROWSER = "goBrowser";
    public final static String BRIDGE_SET_TITLE = "setTitle";
    public final static String BRIDGE_SET_SWIPE_REFRESH = "setSwipeRefresh";
    public final static String BRIDGE_CLEAN_MENU = "cleanMenu";
    public final static String BRIDGE_STORAGE = "storage";
    public final static String BRIDGE_NETWORK = "request";
    public final static String BRIDGE_LOADING = "loading";
}
