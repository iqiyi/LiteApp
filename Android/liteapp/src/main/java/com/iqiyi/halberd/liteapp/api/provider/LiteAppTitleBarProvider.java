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
package com.iqiyi.halberd.liteapp.api.provider;

import android.content.Context;
import android.view.View;

import com.iqiyi.halberd.liteapp.plugin.title.ILiteAppTitleBarFactory;

/**
 * Created by eggizhang@qiyi.com on 17-12-13.
 * using this provider to set title bar
 */

public class LiteAppTitleBarProvider {
    public static ILiteAppTitleBarFactory liteAppTitleBarFactory = null;
    private static final String TAG = LiteAppTitleBarProvider.class.getName();

    public static void setLiteAppTitleBarView(ILiteAppTitleBarFactory liteAppTitleBarView){
        liteAppTitleBarFactory = liteAppTitleBarView;
    }

    public static ILiteAppTitleBarFactory getLiteAppTitleBarFactory(){
        return liteAppTitleBarFactory;
    }
}
