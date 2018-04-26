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

/**
 * Created by chen on 2017/8/31
 * This interface is specific for cross process passing initialing lite app,
 * Any class implement this interface and set to {@link com.iqiyi.halberd.liteapp.api.LiteAppGlobalConfig}.
 * will be stored in shared preference and be validated each time lite app started
 * until you reset to another initializer.
 */
public interface LiteAppGlobalInitializer {
    /**
     * This method will be called when lite app process initialized
     * @param context related android context
     * */
    void init(Context context);
}
