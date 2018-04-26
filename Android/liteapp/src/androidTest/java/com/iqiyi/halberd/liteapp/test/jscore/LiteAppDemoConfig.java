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

import android.content.Context;
import android.util.Log;

import com.iqiyi.halberd.liteapp.api.LiteAppGlobalConfig;
import com.iqiyi.halberd.liteapp.api.provider.LiteAppGlobalInitializer;
import com.iqiyi.halberd.liteapp.api.provider.LiteAppContextInitManager;
import com.iqiyi.halberd.liteapp.api.provider.LiteAppContextInitProvider;
import com.iqiyi.halberd.liteapp.api.provider.LiteAppNetworkProvider;
import com.iqiyi.halberd.liteapp.api.provider.LiteAppPackageProvider;
import com.iqiyi.halberd.liteapp.context.LiteAppContext;
import com.iqiyi.halberd.liteapp.export.DefaultFunctionProvider;
import com.iqiyi.halberd.liteapp.plugin.network.NetworkPlugin;
import com.iqiyi.halberd.liteapp.plugin.router.PageRouterPlugin;
import com.iqiyi.halberd.liteapp.plugin.share.SharePlugin;
import com.iqiyi.halberd.liteapp.plugin.widget.NativeViewPlugin;
import com.iqiyi.halberd.liteapp.test.network.OKHttpExecutorImpl;

/**
 * Created by eggizhang@qiyi.com on 2017/8/23.
 * using this demo to give a basic config to lite app
 * providing configurations that validate for each lite app process!
 * be noticed that only in this configuration utils, we will validate this configuration
 * and run configured initialization for each process!
 */
public class LiteAppDemoConfig {
    public static void validate(Context context){
        LiteAppGlobalInitializer initializer = new DemoInitializer();
        initializer.init(context);
        LiteAppGlobalConfig.setLiteAppInitializer(context, initializer);

    }

    /** LiteAppGlobalInitializer must be public for reflect call ! */
    public static class DemoInitializer implements
            LiteAppGlobalInitializer {
        private static boolean initialized = false;

        @Override
        public synchronized void init(Context context) {
            if(!initialized){
                initialized = true;

                Log.v(LiteAppDemoConfig.class.getName(),"configuring lite app ");
                LiteAppContextInitManager.addLiteAppContextInitProvider(new LiteAppContextInitProvider() {
                    @Override
                    public void invalid(LiteAppContext context) {
                        //add your self defined init scripts here
                    }
                });
                LiteAppContextInitManager.addLiteAppContextInitProvider(new DefaultFunctionProvider());
                LiteAppNetworkProvider.setExecutor(OKHttpExecutorImpl.getInstance());
                LiteAppPackageProvider.setClient(new ZipLiteAppServerClientImpl(context));

                new NativeViewPlugin().attach();
                new PageRouterPlugin().attach();
                new NetworkPlugin().attach();
                new SharePlugin().attach();
            }
        }
    }
}
