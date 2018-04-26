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
import android.text.TextUtils;
import android.util.Log;

import com.iqiyi.halberd.liteapp.api.provider.LiteAppPackageProvider;
import com.iqiyi.halberd.liteapp.common.LiteAppException;
import com.iqiyi.halberd.liteapp.manager.impl.LiteAppDetail;
import com.iqiyi.halberd.liteapp.utils.LogUtils;
import com.iqiyi.halberd.liteapp.view.ILiteAppContainer;

import java.util.Date;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.TimeUnit;

/**
 * Created by eggizhang@qiyi.com on 2017/7/17.
 * Lite App Context is a context for binding lite app view to a lite app runtime
 * executor.Typically view layer will be a view structure on main thread (web view) and its
 * related view data.
 * Executor is a js engine context in a isolated thread.
 */
public class LiteAppPage extends LiteAppContext{
    private final static String TAG = LiteAppPage.class.getName();
    /**
     * a lite app container bind with this lite app context
     * */
    private ILiteAppContainer container;

    public static int type = CONTEXT_TYPE_PAGE;

    public int getType(){
        return type;
    }

    public ILiteAppContainer getContainer() {
        //
        if(container == null){
            //hai mei suo
            //setContainer
            Log.v(TAG, "wait:"+new Date().getTime()+"");
            lockSelf(false);
        }
        return container;
    }

    public void injectPageCss(String cssPath){
        if(!TextUtils.isEmpty(cssPath)){
            container.injectCss(cssPath);
        }
    }

    //container may not yet bind to page before js request some event and call container action
    //use this local function to lock self prevent crash on container not found
    synchronized private void  lockSelf(boolean isReady){
        try {
            if(!isReady) {
                if(container == null) {
                    wait();
                }
            } else {
                notify();
            }
        } catch (InterruptedException e) {
            LogUtils.logError(LogUtils.LOG_MINI_PROGRAM_ERROR, "error lock self",e);
        }
    }

    public LiteAppPage setContainer(ILiteAppContainer container) {
        if(container!=null){
            Log.v(TAG, "notify:"+new Date().getTime()+"");
            lockSelf(true);
        }
        this.container = container;
        return this;
    }

    void disposeInstance(){
        super.disposeInstance();
        getThread().getHandler().post(new Runnable() {
            @Override
            public void run() {
                container = null;
            }
        });
    }

    public static LiteAppPage createPageInstance(Context androidContext, LiteAppDetail liteAppDetail)throws LiteAppException {
        LogUtils.log(LogUtils.LOG_MINI_PROGRAM_PAGE_LIFE_CYCLE,LogUtils.LIFE_PAGE+LogUtils.PAGE_CONTEXT_CREATE);
        LiteAppPage newPage = new LiteAppPage();
        newPage.androidContext = androidContext;
        String frameWork;
        if(liteAppDetail!=null) {
            newPage.setAppID(liteAppDetail.getId());
            newPage.baseVersion = liteAppDetail.getBaseVersion();
            frameWork = LiteAppPackageProvider.getClient().getLiteAppFrameworkJSCPart(liteAppDetail.getId());
        } else {
            newPage.setAppID("");
            newPage.baseVersion = "";
            frameWork = LiteAppPackageProvider.getClient().getLiteAppFrameworkJSCPart("");
        }
        newPage.thread.start();
        CountDownLatch threadInitLatch = new CountDownLatch(1);
        //Log.v(TAG, LiteAppFrameworkManager.getInstance().getLiteAppComponentJS(androidContext, baseVersion));
        newPage.createNative(threadInitLatch, frameWork);
        try {
            threadInitLatch.await(1000, TimeUnit.MILLISECONDS);
            LogUtils.log(LogUtils.LOG_MINI_PROGRAM_PAGE_LIFE_CYCLE,LogUtils.LIFE_PAGE+LogUtils.PAGE_THREAD_CREATE);
        } catch (InterruptedException e) {
            LogUtils.logError(LogUtils.LOG_MINI_PROGRAM_ERROR,"init lite app context native failed",e);
        }
        if(newPage.nativeHandle == 0){
            LogUtils.logError(LogUtils.LOG_MINI_PROGRAM_ERROR,
                    "lite app context init failed", null);
            newPage.disposeInstance();

            //retry
            return createPageInstance(androidContext, liteAppDetail);
        }
        return newPage;
    }
}