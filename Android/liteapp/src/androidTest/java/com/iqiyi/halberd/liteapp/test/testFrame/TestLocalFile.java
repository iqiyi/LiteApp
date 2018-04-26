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

import android.content.Intent;
import android.support.test.InstrumentationRegistry;
import android.support.test.rule.ActivityTestRule;
import android.support.test.runner.AndroidJUnit4;
import android.util.Log;

import com.iqiyi.halberd.liteapp.api.LiteAppGlobalConfig;
import com.iqiyi.halberd.liteapp.api.provider.LiteAppGlobalInitializer;
import com.iqiyi.halberd.liteapp.context.ExecutorManager;
import com.iqiyi.halberd.liteapp.context.LiteAppContext;
import com.iqiyi.halberd.liteapp.context.LiteAppFactory;
import com.iqiyi.halberd.liteapp.utils.AssetsUtils;

import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;
import org.junit.runner.RunWith;

import static com.iqiyi.halberd.liteapp.view.LiteAppBaseActivity.MINI_PROGRAM_ID;
import static com.iqiyi.halberd.liteapp.view.LiteAppBaseActivity.MINI_PROGRAM_NEED_UPDATE;

/**
 * Created by xuyunhua on 2017/8/23.
 *
 */
@RunWith(AndroidJUnit4.class)
public class TestLocalFile {

    private static final String TAG = TestLocalFile.class.getName();

    @Rule
    public ActivityTestRule<TestFragmentActivity> auth = new ActivityTestRule<>(TestFragmentActivity.class, true, false);

    @Before
    public void init() throws Exception {
        TestConfig.validate(InstrumentationRegistry.getContext());

        LiteAppGlobalInitializer initializer =
                LiteAppGlobalConfig.getLiteAppInitializer(InstrumentationRegistry.getContext());
        if (initializer != null) {
            initializer.init(InstrumentationRegistry.getContext());
        }
    }

    @Test
    public void localZipFile() throws Exception {
        Intent intent = new Intent(InstrumentationRegistry.getContext(), TestFragmentActivity.class);
        intent.putExtra(MINI_PROGRAM_NEED_UPDATE, true);
        intent.putExtra(MINI_PROGRAM_ID, "new_mp_package");
        auth.launchActivity(intent);

        Thread.sleep(1000000);
    }

    @Rule
    public ActivityTestRule<UIThreadActivity> uiActivity = new ActivityTestRule<>(UIThreadActivity.class, true, false);

    @Test
    public void activityEventTest() throws Exception {

        String initString = AssetsUtils.getFromAssets("test_files/initTest.js", InstrumentationRegistry.getContext());
        String localTest = AssetsUtils.getFromAssets("test_files/titlePluginTest.js", InstrumentationRegistry.getContext());

        Intent intent = new Intent(InstrumentationRegistry.getContext(), UIThreadActivity.class);
        intent.putExtra("initString", initString);
        intent.putExtra("jsString", localTest);
        uiActivity.launchActivity(intent);

        Thread.sleep(1000000);
    }

    @Test
    public void contextEventTest() throws Exception{
        String localTest = AssetsUtils.getFromAssets("test_files/maxTriggerEventTest.js", InstrumentationRegistry.getContext());

        LiteAppContext context = LiteAppContext.createInstance(InstrumentationRegistry.getContext(), null);
        ExecutorManager.executeScript(context,localTest);

        LiteAppFactory.disposeLiteAppContext(context);

        Thread.sleep(3000);
        for(int i=0;i<KeepEventPlugin.mMap.size();i++){
            if(KeepEventPlugin.mMap.get(i)!=null){
                Log.v(TAG, "HashMap this index is not null: "+i);
                break;
            }
        }

        Thread.sleep(1000000);
    }


}
