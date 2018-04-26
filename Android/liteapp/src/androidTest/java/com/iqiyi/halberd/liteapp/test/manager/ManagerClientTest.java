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
package com.iqiyi.halberd.liteapp.test.manager;

import android.support.test.InstrumentationRegistry;
import android.support.test.runner.AndroidJUnit4;
import android.util.Log;

import com.iqiyi.halberd.liteapp.context.LiteAppContext;
import com.iqiyi.halberd.liteapp.api.provider.LiteAppPackageClient;

import org.junit.Test;
import org.junit.runner.RunWith;

import static org.junit.Assert.assertTrue;

/**
 * Created by eggizhang@qiyi.com on 2017/7/19.
 * using this test case to test on manager client
 */
@RunWith(AndroidJUnit4.class)
public class ManagerClientTest {
    @Test
    public void testManagerNetwork() throws Exception {
        Thread.sleep(100);
    }

    @Test
    public void testInit100Context() throws Exception{
        long time = System.currentTimeMillis();
        for(int i=0; i<100; i++) {
        }
        Log.v("100 context take time:", String.valueOf(System.currentTimeMillis() - time));
    }

    @Test
    public void testJSCompat() throws Exception {
        Log.v("teststart","some test start ");
        Log.v("testfinish","some test finish push task ");
        for(int i = 0;i<5; i++){
            Thread.sleep(5000);
            Log.v("othertask","still alive");
        }

//        ExecutorManager.executeScript(someScript,
//                "halberd.util.set_interval(function(){" +
//                        "halberd.bridge.postPatch('timer tick!')" +
//                        "},1000);");
        //Thread.sleep(1000000000);
    }

    @Test
    public void disposeTest() throws Exception {
        LiteAppContext.createInstance(InstrumentationRegistry.getTargetContext(), null);
        //ExecutorManager.disposeAsyncExecutor(exe);
        Thread.sleep(1000000000);
    }

    @Test
    public void reflectTest() throws Exception{
        Class LiteAppHttpClientClass = LiteAppPackageClient.class;
    }
}
