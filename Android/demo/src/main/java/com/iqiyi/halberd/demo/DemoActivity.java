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
import android.content.Intent;
import android.os.Bundle;
import android.view.View;

import com.iqiyi.halberd.demo.impl.LiteAppDemoConfig;
import com.iqiyi.halberd.demo.impl.manager.LiteAppMirrorPackageLoader;
import com.iqiyi.halberd.demo.impl.manager.LiteAppPackageManager;
import com.iqiyi.halberd.liteapp.api.LiteAppHelper;
import com.iqiyi.halberd.demo.impl.manager.LiteAppFrameworkManager;
import com.iqiyi.halberd.demo.impl.manager.LiteAppLocalPackageUtils;
import com.iqiyi.halberd.liteapp.plugin.appdata.AppDataPlugin;

public class DemoActivity extends Activity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_demo);
        setTitle("小程序示例");

        //validate basic config 
        LiteAppDemoConfig.validate(this);

        //you set app data here
        String va = "{}";
        AppDataPlugin.updateAppData(va, this);

        findViewById(R.id.lite_app_list_button).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(DemoActivity.this ,LiteAppListActivity.class);
                startActivity(intent);
            }
        });

//        findViewById(R.id.diy_lite_app_button).setOnClickListener(new View.OnClickListener() {
//            @Override
//            public void onClick(View v) {
//                Intent intent = new Intent(DemoActivity.this ,DIYLiteAppActivity.class);
//                startActivity(intent);
//            }
//        });

        findViewById(R.id.lite_app_clean_button).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                //clean lite app cache
                LiteAppLocalPackageUtils.cleanAlLiteappCache(DemoActivity.this);

                //clean memory cache
                LiteAppPackageManager.getInstance().cleanMemoryCache();
                LiteAppFrameworkManager.getInstance().cleanMemoryCacheAndDefaultPreference(DemoActivity.this);

                //clear mirror package usage and mirror package will be reloaded again
                LiteAppMirrorPackageLoader.clearMirrorPackage(DemoActivity.this);
                LiteAppMirrorPackageLoader.validateMirror(DemoActivity.this);

                //clean lite app process
                LiteAppHelper.cleanLiteAppProcess(DemoActivity.this);
            }
        });
    }

    protected void onResume() {
        super.onResume();
    }
}
