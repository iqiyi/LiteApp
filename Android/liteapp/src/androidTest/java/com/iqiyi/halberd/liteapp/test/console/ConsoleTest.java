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
package com.iqiyi.halberd.liteapp.test.console;

import android.content.Context;
import android.support.test.InstrumentationRegistry;
import android.support.test.runner.AndroidJUnit4;

import com.iqiyi.halberd.liteapp.context.ExecutorManager;
import com.iqiyi.halberd.liteapp.context.ExecutorManagerNative;

import org.junit.Test;
import org.junit.runner.RunWith;

import static org.junit.Assert.assertEquals;

/**
 * Created by eggizhang@qiyi.com on 2017/7/17.
 * using this test case to print console logs
 */
@RunWith(AndroidJUnit4.class)

public class ConsoleTest {
    @Test
    public void useAppContext() throws Exception {
        // Context of the app under test.
        Context appContext = InstrumentationRegistry.getTargetContext();
        System.loadLibrary("gnustl_shared");
        System.loadLibrary("icu_common");
        System.loadLibrary("jsc");
        System.loadLibrary("halberd");
        //startLiteApp();

        long newExecutorHandler = ExecutorManagerNative.createAsyncExecutor();
        ExecutorManagerNative.executeScript(newExecutorHandler,"halberd.__lite_api.call()");
        ExecutorManagerNative.disposeAsyncExecutor(newExecutorHandler);

        Thread.sleep(1000);
    }
}
