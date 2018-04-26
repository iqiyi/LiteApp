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
package com.iqiyi.halberd.demo;

import android.app.Activity;
import android.os.Bundle;
import android.text.TextUtils;
import android.view.View;
import android.widget.FrameLayout;

import com.iqiyi.halberd.liteapp.api.provider.LiteAppPackageProvider;
import com.iqiyi.halberd.liteapp.common.BridgeConstant;
import com.iqiyi.halberd.liteapp.common.LiteAppException;
import com.iqiyi.halberd.liteapp.context.ExecutorManager;
import com.iqiyi.halberd.liteapp.context.LiteAppFactory;
import com.iqiyi.halberd.liteapp.context.LiteAppPage;
import com.iqiyi.halberd.liteapp.event.BridgeEvent;
import com.iqiyi.halberd.liteapp.event.impl.EventBridgeImpl;
import com.iqiyi.halberd.demo.impl.manager.LiteAppPackageManager;
import com.iqiyi.halberd.liteapp.manager.impl.LiteAppDetail;

import org.json.JSONException;
import org.json.JSONObject;

public class DIYLiteAppActivity extends Activity {
    FrameLayout liteAppView;
    LiteAppPage contentPage = null;
    String liteAppID = "mp-iqiyi";
    String pagePath = "video";
    LiteAppDetail liteAppDetail;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_diy_lite_app);
        liteAppView = findViewById(R.id.lite_app_container);

        findViewById(R.id.lite_app_show_button).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                JSONObject initData = new JSONObject();
                try {
                    initData.put("tvid",841976700);
                    liteAppDetail = LiteAppPackageManager.getInstance().
                            getLiteAppDetailCache(getApplicationContext(), liteAppID);
                    contentPage = LiteAppFactory.getWebViewLiteAppPageCache(getApplicationContext(),liteAppDetail, initData);
                    liteAppView.addView(contentPage.getContainer().getView());
                    contentPage.getContainer().onMounted();
                    contentPage.setAppID(liteAppID);

                    String script = LiteAppPackageManager.getInstance().getPageCache(
                            getApplicationContext(),liteAppID,
                            liteAppDetail.getPageByName(pagePath).getPath());
                    String cssPath = LiteAppPackageProvider.getClient()
                            .getLiteAppPageBundleCssPath(liteAppID, liteAppDetail.getPageByName(pagePath).getPath());

                    contentPage.injectPageCss(cssPath);
                    if(!TextUtils.isEmpty(script)) {
                        ExecutorManager.executeScript(contentPage, script);
                    }
                } catch (JSONException e) {
                    e.printStackTrace();
                } catch (LiteAppException e) {
                    e.printStackTrace();
                }
            }
        });
    }

    @Override
    protected void onPause() {
        if(contentPage!=null) {
            BridgeEvent pauseEvent = new BridgeEvent();
            pauseEvent.setType(BridgeConstant.BRIDGE_ON_PAUSE);
            pauseEvent.setData("{}");
            pauseEvent.setContext(contentPage);
            pauseEvent.setIntercepted(false);
            pauseEvent.setLocal(true);
            EventBridgeImpl.getInstance().triggerEvent(pauseEvent);
        }
        super.onPause();
    }

    @Override
    protected void onResume() {
        if(contentPage!=null) {
            BridgeEvent pauseEvent = new BridgeEvent();
            pauseEvent.setType(BridgeConstant.BRIDGE_ON_RESUME);
            pauseEvent.setData("{}");
            pauseEvent.setContext(contentPage);
            pauseEvent.setIntercepted(false);
            pauseEvent.setLocal(true);
            EventBridgeImpl.getInstance().triggerEvent(pauseEvent);
        }
        super.onResume();
    }

    @Override
    protected void onDestroy() {
        if(contentPage!=null) {
            BridgeEvent pauseEvent = new BridgeEvent();
            pauseEvent.setType(BridgeConstant.BRIDGE_ON_DESTROY);
            pauseEvent.setData("{}");
            pauseEvent.setContext(contentPage);
            pauseEvent.setIntercepted(false);
            pauseEvent.setLocal(true);
            EventBridgeImpl.getInstance().triggerEvent(pauseEvent);
        }
        if(contentPage!=null){
            contentPage.getContainer().destroy();
        }
        super.onDestroy();
    }
}
