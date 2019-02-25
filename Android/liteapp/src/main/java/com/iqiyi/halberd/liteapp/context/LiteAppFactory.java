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
package com.iqiyi.halberd.liteapp.context;

import android.content.Context;
import android.support.annotation.MainThread;
import android.text.TextUtils;
import android.util.Log;

import com.iqiyi.halberd.liteapp.common.LiteAppException;
import com.iqiyi.halberd.liteapp.manager.impl.LiteAppDetail;
import com.iqiyi.halberd.liteapp.plugin.PagePluginManager;
import com.iqiyi.halberd.liteapp.utils.LogUtils;
import com.iqiyi.halberd.liteapp.view.LiteAppBaseActivity;
import com.iqiyi.halberd.liteapp.view.impl.WebViewLiteAppContainer;

import org.json.JSONObject;

import java.util.Stack;

/**
 * Created by eggizhang@qiyi.com on 2017/7/17.
 * using this lite app factory to create a lite app view
 */

public class LiteAppFactory {
    private static Stack<LiteAppPage> cache = new Stack<>();
    private static int cacheCount = 9;
    private static String cachedFrameworkVersion = "";
    private static LiteAppDetail cachedLiteAppDetail = null;
    private static String TAG = LiteAppFactory.class.getName();

    public static synchronized void setCacheCount(int count){
        cacheCount = count;
    }

    @MainThread
    public synchronized static void createCache(Context context, LiteAppDetail liteApp) throws LiteAppException {
        if(liteApp!=null) {
            createCacheWithLiteAppID(context, liteApp);
        } else {
            createCacheWithLiteAppID(context, cachedLiteAppDetail);
        }
    }

    public synchronized static void clearCache() throws LiteAppException {
        cachedFrameworkVersion = "";
        cachedLiteAppDetail = null;
        cache.clear();
    }

    @MainThread
    private synchronized static void createCacheWithLiteAppID(final Context context, LiteAppDetail liteAppDetail) throws LiteAppException {
        if(liteAppDetail == null){
            Log.v(TAG, "lite app container pre load null default detail " + android.os.Process.myPid());
        } else if (!TextUtils.equals(cachedFrameworkVersion, liteAppDetail.getBaseVersion())) {
            for(LiteAppPage cached: cache){
                //dispose old caches
                cached.disposeInstance();
                cached.getContainer().destroy();
            }
            cache.clear();
            cachedFrameworkVersion = liteAppDetail.getBaseVersion();
            cachedLiteAppDetail = liteAppDetail;
            Log.v(TAG, "lite app container pre cache load　" + android.os.Process.myPid());
        } else {
            Log.v(TAG, "lite app container pre load cache hit " + android.os.Process.myPid());
        }
        for(int i = cache.size(); i < cacheCount ; i++) {
            cacheOne(context);
        }
    }
    /**
     * Using this method to create a lite app context without container.
     * */
    public synchronized static LiteAppContext getCachedLiteAppContext(LiteAppBaseActivity context,LiteAppDetail liteApp){
        //nocache
        try {
            return LiteAppContext.createInstance(context, liteApp);
        } catch (LiteAppException e) {
            Log.d(TAG,"base cache error");
        }
        return null;
    }

    /**
     * Using this method to create a new web view lite app context
     * */
    public synchronized static LiteAppPage getWebViewLiteAppPageCache(
            final Context context, final LiteAppDetail liteAppDetail, JSONObject bundle) throws LiteAppException {
        if(liteAppDetail == null){
            return null;
        }
        String jsFrameworkVersion = liteAppDetail.getBaseVersion();
        if (!TextUtils.equals(cachedFrameworkVersion, jsFrameworkVersion)) {
            for(LiteAppPage cached: cache){
                //dispose old caches
                cached.disposeInstance();
                cached.getContainer().destroy();
            }
            cache.clear();
            cachedFrameworkVersion = jsFrameworkVersion;
            cachedLiteAppDetail = liteAppDetail;
            Log.v(TAG, "lite app container pre cache load　" + android.os.Process.myPid());
        } else {
            Log.v(TAG, "lite app container pre load cache hit " + android.os.Process.myPid());
        }


        if(cache.size() > 0){
            LogUtils.log(LogUtils.LOG_MINI_PROGRAM_CACHE,LogUtils.CACHE_PAGE+LogUtils.CACHE_MEMORY_HIT);
        } else {
            //cache not hit return one instantly and consider
            cacheOne(context);
            if(cache.size()==0){
                throw new LiteAppException();
            }
        }

        LiteAppPage page = cache.pop();
        page.currentContext=context;
        PagePluginManager.initPagePlugin(page);
        page.getContainer().getView().postDelayed(new Runnable() {
            @Override
            public void run() {
                //fill up cache
                try {
                    createCache(context, liteAppDetail);
                } catch (LiteAppException e) {
                    LogUtils.logError(LogUtils.LOG_MINI_PROGRAM_ERROR,
                            "exception null package", e);
                }
            }
        },1000);
        //validate bundle
        page.setBundle(bundle);
        return page;
    }

    /**
     * Using this method to dispose a lite app context
     * */
    public synchronized static void disposeLiteAppContext(LiteAppContext context){
        context.purge();
        context.disposeInstance();
    }

    private synchronized static void cacheOne(Context context){
        LogUtils.log(LogUtils.LOG_MINI_PROGRAM_CACHE,LogUtils.CACHE_PAGE +LogUtils.CACHE_MEMORY_CREATE+LogUtils.ACTION_START);
        Context appContext=context.getApplicationContext();
        try {
            LiteAppPage liteAppPage = LiteAppPage.createPageInstance(appContext, cachedLiteAppDetail);
            //bind container
            WebViewLiteAppContainer webViewLiteAppContainer = new WebViewLiteAppContainer();
            webViewLiteAppContainer.bindLiteAppContext(liteAppPage);
            cache.push(liteAppPage);
            Log.v(TAG,"cache pool size" + cache.size());
        }catch (LiteAppException e){
            LogUtils.logError(LogUtils.LOG_MINI_PROGRAM_ERROR,"base cache error",e);
        }

        LogUtils.log(LogUtils.LOG_MINI_PROGRAM_CACHE,LogUtils.CACHE_PAGE +LogUtils.CACHE_MEMORY_CREATE+LogUtils.ACTION_STOP);
    }
}
