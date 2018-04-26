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
package com.iqiyi.halberd.liteapp.view;

import android.support.annotation.MainThread;
import android.view.View;
import android.widget.FrameLayout;

import com.iqiyi.halberd.liteapp.context.LiteAppPage;
import com.iqiyi.halberd.liteapp.event.BridgeEvent;

/**
 * Created by eggizhang@qiyi.com on 2017/7/17.
 * a view should implement this interface to be operated by halberd runtime engine and
 * used as lite app view.
 */@SuppressWarnings("unused")
public interface ILiteAppContainer {

    /**
     * Use this method to load a string data into this container view
     * @param data loaded initial data
     * @param sync use sync to load in main thread now and return when finished
     * */
    void loadData(String data, boolean sync);

    /**
     * Post patch to this container
     * @param patchData patch data content
     * */
    void postPatch(String patchData);

    /**
     * Injecting css into this container
     * */
    void injectCss(String cssContent);

    FrameLayout getNativeHoverLayer();
    /**
     * Get additional native layer for plugins to add its view into screen
     **/
    FrameLayout getNativeLayerView();

    /**
     * Get current lite app Android content view
     * @return root view instance hosted by this container
     **/
    View getView();

    /**
     * Use this method to destroy webview
     **/
    void destroy();

    /**
     * on view mounted */
    void onMounted();

    /**
     * OnEvent to container
     * */
    void onEvent(BridgeEvent event);

    /**
     * Bind lite app context with current container
     * @param context should bind to a lite app context, on context can only bind one
     *                container.
     * */
    @MainThread
    void bindLiteAppContext(LiteAppPage context);
}
