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
package com.iqiyi.halberd.demo.impl;

import android.content.Context;
import android.util.Log;

import com.iqiyi.halberd.demo.impl.manager.LiteAppPackageProviderImpl;
import com.iqiyi.halberd.liteapp.api.LiteAppGlobalConfig;
import com.iqiyi.halberd.liteapp.api.provider.LiteAppLoadingViewProvider;
import com.iqiyi.halberd.liteapp.api.provider.LiteAppContextInitManager;
import com.iqiyi.halberd.liteapp.api.provider.LiteAppContextInitProvider;
import com.iqiyi.halberd.liteapp.api.provider.LiteAppErrorProvider;
import com.iqiyi.halberd.liteapp.api.provider.LiteAppGlobalInitializer;
import com.iqiyi.halberd.liteapp.api.provider.LiteAppNativeWidgetProvider;
import com.iqiyi.halberd.liteapp.api.provider.LiteAppNetworkProvider;
import com.iqiyi.halberd.liteapp.api.provider.LiteAppPackageProvider;
import com.iqiyi.halberd.liteapp.context.LiteAppContext;
import com.iqiyi.halberd.liteapp.context.LiteAppFactory;
import com.iqiyi.halberd.liteapp.export.DefaultFunctionProvider;
import com.iqiyi.halberd.demo.impl.manager.LiteAppMirrorPackageLoader;
import com.iqiyi.halberd.liteapp.plugin.appdata.AppDataPlugin;
import com.iqiyi.halberd.liteapp.plugin.loading.LoadingPlugin;
import com.iqiyi.halberd.liteapp.plugin.network.NetworkPlugin;
import com.iqiyi.halberd.liteapp.plugin.router.PageRouterPlugin;
import com.iqiyi.halberd.liteapp.plugin.share.SharePlugin;
import com.iqiyi.halberd.liteapp.plugin.title.SetTitlePlugin;
import com.iqiyi.halberd.liteapp.plugin.widget.NativeViewPlugin;
import com.iqiyi.halberd.liteapp.utils.LogUtils;

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
        public synchronized void init(final Context context) {
            if(!initialized){
                initialized = true;
                LiteAppMirrorPackageLoader.validateMirror(context);

                LogUtils.getInstance().init(context);
                LogUtils.setLogProvider(LogFileRecordImpl.getInstance());
                LogUtils.log(LogUtils.LOG_MINI_PROGRAM_ACTIVITY_LIFE_CYCLE, "lite app configuration");
                LiteAppContextInitManager.addLiteAppContextInitProvider(new LiteAppContextInitProvider() {
                        @Override
                        public void invalid(LiteAppContext context) {
                        //TODO add your scripts here
                    }
                });
                LiteAppErrorProvider.setOnErrorListener(new LiteAppErrorHandler());
                LiteAppContextInitManager.addLiteAppContextInitProvider(new DefaultFunctionProvider());
                LiteAppNetworkProvider.setExecutor(ConnectionExecutorImpl.getInstance());
                LiteAppPackageProvider.setClient(new LiteAppPackageProviderImpl(context));
                LiteAppNativeWidgetProvider.registerWidget(
                        NativeViewPlugin.NATIVE_VIEW_BOX_TYPE_VIDEO,new VideoBoxWidget());
                LiteAppFactory.setCacheCount(3);
                LiteAppLoadingViewProvider.setLoadingViewFactory(new LoadingViewFactoryImpl());

                new AppDataPlugin().attach();
                new NativeViewPlugin().attach();
                new PageRouterPlugin().attach();
                new NetworkPlugin().attach();
                new SharePlugin().attach();
                new SetTitlePlugin().attach();
                new LoadingPlugin().attach();
            }
        }
    }
}
