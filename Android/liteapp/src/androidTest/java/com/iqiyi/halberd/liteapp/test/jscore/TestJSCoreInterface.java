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
package com.iqiyi.halberd.liteapp.test.jscore;

import android.content.Intent;
import android.support.test.InstrumentationRegistry;
import android.support.test.runner.AndroidJUnit4;
import android.text.TextUtils;

import com.iqiyi.halberd.liteapp.LiteAppFragmentActivity;
import com.iqiyi.halberd.liteapp.api.LiteAppHelper;
import com.iqiyi.halberd.liteapp.api.provider.LiteAppContextInitManager;
import com.iqiyi.halberd.liteapp.context.ExecutorManager;
import com.iqiyi.halberd.liteapp.context.LiteAppContext;
import com.iqiyi.halberd.liteapp.context.LiteAppFactory;
import com.iqiyi.halberd.liteapp.export.DefaultFunctionProvider;
import com.iqiyi.halberd.liteapp.export.JsObject;
import com.iqiyi.halberd.liteapp.export.NativeObjectRef;

import org.junit.Test;
import org.junit.runner.RunWith;

import static com.iqiyi.halberd.liteapp.view.LiteAppBaseActivity.MINI_PROGRAM_ID;
import static com.iqiyi.halberd.liteapp.view.LiteAppBaseActivity.MINI_PROGRAM_NEED_UPDATE;

/**
 * Created by eggizhang@qiyi.com on 2017/9/5.
 * using this test cases to test js core interfaces
 */
@RunWith(AndroidJUnit4.class)
public class TestJSCoreInterface {

    @Test
    public void testBasicOperationNetwork() throws Exception {
        LiteAppContextInitManager.addLiteAppContextInitProvider(new DefaultFunctionProvider());

        LiteAppContext liteAppContext = LiteAppContext.createInstance(InstrumentationRegistry.getTargetContext(),null);

        ExecutorManager.executeScript(liteAppContext, "__base__('ds')");
        ExecutorManager.executeScript(liteAppContext, "__base__.console('console called')");
        ExecutorManager.executeScript(liteAppContext, "__base__.console.log('log called')");
        ExecutorManager.executeScript(liteAppContext, "__base__.patch('patch')");

        LiteAppFactory.disposeLiteAppContext(liteAppContext);
        Thread.sleep(1000000000);
    }

    @Test
    public void testTimer() throws Exception {
        LiteAppContextInitManager.addLiteAppContextInitProvider(new DefaultFunctionProvider());
        final LiteAppContext liteAppContext = LiteAppContext.createInstance(InstrumentationRegistry.getTargetContext(),null);
        JsObject callbacker = new JsObject(){
            @Override
            protected long onCalled(NativeObjectRef[] callbackHandles, String[] parameters){
                if(TextUtils.isEmpty(parameters[0])){
                    return 0;
                }
                ExecutorManager.callNativeRefFunction(liteAppContext, callbackHandles[0],"testResult");
                return 0;
            }
        };
        ExecutorManager.executeScript(liteAppContext, "setInterval(function(){console.log('timer good');},1000)");
        Thread.sleep(1000000000);
    }

    @Test
    public void testThis() throws Exception{
        LiteAppContextInitManager.addLiteAppContextInitProvider(new DefaultFunctionProvider());
        LiteAppContext liteAppContext = LiteAppContext.createInstance(InstrumentationRegistry.getTargetContext(),null);
        ExecutorManager.executeScript(liteAppContext, "setInterval(function(){console.log('timer good');},1000)");
        Thread.sleep(1000000000);
    }

    @Test
    public void testNetwork() throws Exception {
        Intent intent = new Intent(InstrumentationRegistry.getContext(), LiteAppFragmentActivity.class);
        //validate basic config
        LiteAppDemoConfig.validate(InstrumentationRegistry.getContext());

        LiteAppHelper.prepareLiteAppPage(InstrumentationRegistry.getContext());
        Thread.sleep(1000);

        intent.putExtra(MINI_PROGRAM_ID, "123" );
        intent.putExtra(MINI_PROGRAM_NEED_UPDATE, false);
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        InstrumentationRegistry.getContext().startActivity(intent);

        //LiteAppFactory.disposeLiteAppContext(liteAppContext);
        Thread.sleep(1000000000);
    }
}
