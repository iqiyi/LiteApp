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

import android.content.Context;

import com.iqiyi.halberd.liteapp.api.LiteAppGlobalConfig;
import com.iqiyi.halberd.liteapp.api.provider.LiteAppContextInitManager;
import com.iqiyi.halberd.liteapp.api.provider.LiteAppContextInitProvider;
import com.iqiyi.halberd.liteapp.api.provider.LiteAppGlobalInitializer;
import com.iqiyi.halberd.liteapp.api.provider.LiteAppLoadingViewProvider;
import com.iqiyi.halberd.liteapp.api.provider.LiteAppNetworkProvider;
import com.iqiyi.halberd.liteapp.api.provider.LiteAppPackageProvider;
import com.iqiyi.halberd.liteapp.context.LiteAppContext;
import com.iqiyi.halberd.liteapp.export.DefaultFunctionProvider;
import com.iqiyi.halberd.liteapp.plugin.loading.LoadingPlugin;
import com.iqiyi.halberd.liteapp.plugin.network.NetworkPlugin;
import com.iqiyi.halberd.liteapp.plugin.router.PageRouterPlugin;
import com.iqiyi.halberd.liteapp.plugin.share.SharePlugin;
import com.iqiyi.halberd.liteapp.plugin.shortCut.ShortCutPlugin;
import com.iqiyi.halberd.liteapp.plugin.storage.StoragePlugin;
import com.iqiyi.halberd.liteapp.plugin.swipe_refresh.SwipeRefreshPlugin;
import com.iqiyi.halberd.liteapp.plugin.title.SetTitlePlugin;
import com.iqiyi.halberd.liteapp.plugin.widget.NativeViewPlugin;
import com.iqiyi.halberd.liteapp.test.network.OKHttpExecutorImpl;

/**
 * Created by xujiajia_sx on 2017/10/18.
 *
 */

class TestConfig {

    static void validate(Context context){
        LiteAppGlobalConfig.setLiteAppInitializer(context, new DemoInitializer());
    }

    /** LiteAppGlobalInitializer must be public for reflect call ! */
    public static class DemoInitializer implements
            LiteAppGlobalInitializer {
        private static boolean initialized = false;
        @Override
        public synchronized void init(Context context) {
            if(!initialized){
                initialized = true;

                LiteAppContextInitManager.addLiteAppContextInitProvider(new LiteAppContextInitProvider() {
                    @Override
                    public void invalid(LiteAppContext context) {
                        //add your scripts here
                    }
                });
                LiteAppContextInitManager.addLiteAppContextInitProvider(new DefaultFunctionProvider());
                LiteAppNetworkProvider.setExecutor(OKHttpExecutorImpl.getInstance());
                LiteAppPackageProvider.setClient(new LocalPackageClient());
                LiteAppLoadingViewProvider.setLoadingViewFactory(new LoadingViewFactoryImpl());

                new NativeViewPlugin().attach();
                new PageRouterPlugin().attach();
                new NetworkPlugin().attach();
                new SharePlugin().attach();
                new SetTitlePlugin().attach();
                new EventTestPlugin().attach();
                new KeepEventPlugin().attach();
                new SwipeRefreshPlugin().attach();
                new StoragePlugin().attach();
                new ShortCutPlugin().attach();
                new NetworkPlugin().attach();
                new LoadingPlugin().attach();
            }
        }
    }
}
