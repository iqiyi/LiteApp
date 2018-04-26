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

import android.view.View;

/**
 * Created by eggizhang@qiyi.com on 2017/9/1.
 * using this native view holder to provide native view and control its life cycle
 */
public abstract class LiteAppNativeViewHolder {
    /** Override this method if view need to be created */
    public abstract View getNativeView();

    /**Override this method if view need to be released specifically */
    public void onNativeViewDestroy(){

    }

    /**Override this method if view need to be resumed*/
    public void onNativeViewResume(){

    }

    /**Override this method if view need to be paused*/
    public void onNativeViewPause(){

    }
}
