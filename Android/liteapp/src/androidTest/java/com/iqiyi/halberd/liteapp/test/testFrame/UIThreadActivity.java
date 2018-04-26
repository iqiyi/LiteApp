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

import android.os.Bundle;
import android.support.annotation.Nullable;
import android.view.View;

import com.iqiyi.halberd.liteapp.common.LiteAppException;
import com.iqiyi.halberd.liteapp.context.ExecutorManager;
import com.iqiyi.halberd.liteapp.context.LiteAppFactory;
import com.iqiyi.halberd.liteapp.context.LiteAppPage;
import com.iqiyi.halberd.liteapp.view.LiteAppBaseActivity;
import com.iqiyi.halberd.liteapp.view.impl.WebViewLiteAppContainer;

import org.json.JSONObject;

/**
 * Created by xujiajia_sx on 2017/10/19.
 *
 */

public class UIThreadActivity extends LiteAppBaseActivity {

    private LiteAppPage context;


    @Override
    public void routerGoPage(String pagePath, JSONObject bundle) {

    }

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(new View(this));

        try {
            WebViewLiteAppContainer container = new WebViewLiteAppContainer();
            context = LiteAppPage.createPageInstance(UIThreadActivity.this, null);
            container.bindLiteAppContext(context);
            ExecutorManager.executeScript(context, getIntent().getStringExtra("initString"));
            ExecutorManager.executeScript(context, getIntent().getStringExtra("jsString"));
            setContentView(container.getView());
        } catch (LiteAppException e) {
            e.printStackTrace();
        }
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        LiteAppFactory.disposeLiteAppContext(context);
    }

    @Override
    public void onPointerCaptureChanged(boolean hasCapture) {

    }
}
