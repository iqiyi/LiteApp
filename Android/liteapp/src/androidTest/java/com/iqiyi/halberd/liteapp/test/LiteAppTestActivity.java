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
package com.iqiyi.halberd.liteapp.test;

import android.os.Bundle;

import com.iqiyi.halberd.liteapp.LiteAppFragmentActivity;
import com.iqiyi.halberd.liteapp.event.impl.EventBridgeImpl;

/**
 * Created by eggizhang@qiyi.com on 2017/7/17.
 * using this activity to test lite app from a sync process
 */

public class LiteAppTestActivity extends LiteAppFragmentActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        TestingBridgeListener.startDebugListener(EventBridgeImpl.getInstance());
    }


}