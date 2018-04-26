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
import android.os.Handler;
import android.os.Looper;
import android.os.Message;
import android.text.TextUtils;
import android.util.Log;

import com.iqiyi.halberd.liteapp.api.provider.LiteAppContextInitManager;
import com.iqiyi.halberd.liteapp.api.provider.LiteAppContextInitProvider;
import com.iqiyi.halberd.liteapp.api.provider.LiteAppPackageProvider;
import com.iqiyi.halberd.liteapp.common.LiteAppException;
import com.iqiyi.halberd.liteapp.event.BridgeEvent;
import com.iqiyi.halberd.liteapp.event.IBridgeEventListener;
import com.iqiyi.halberd.liteapp.export.NativeContextRef;
import com.iqiyi.halberd.liteapp.manager.impl.LiteAppDetail;
import com.iqiyi.halberd.liteapp.utils.JSUtils;
import com.iqiyi.halberd.liteapp.utils.LogUtils;

import org.json.JSONObject;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.TimeUnit;

/**
 * Created by eggizhang@qiyi.com on 2017/7/24.
 * Lite App Context is a context for binding lite app view to a lite app runtime
 * executor.Typically view layer will be a view structure on main thread (web view) and its
 * related view data.
 * Executor is a js engine context in a isolated thread.
 */
@SuppressWarnings("unused")
public class LiteAppContext {
    private final static String TAG = LiteAppContext.class.getName();

    /**
     * current context base version, do check before execute business to this context;
     */
    String baseVersion;

    /**
     * a lite app ID will be bound to this lite app context when it is attached to
     * lite app activity or fragment and validated
     * */
    private String liteAppID;

    /**
     * a native handle point to jni layer executor context.
     * bind with executor thread and its related js script engine instance.
     * */
    long nativeHandle;

    /**
     * should bind with its android context to inflate layouts and manage android view
     **/
    Context androidContext;

    /**
     * should purge lite app context when you need to stop all events before gc
     * this context and release native contexts
     * */
    private boolean purged;

    /**
     * this json object is a bundle for lite app contexts or pages to retrieve and
     * start just like android {@link android.os.Bundle}
     *  set a bundle on app start and can access to this bundle data from lite app
     *  pages
     **/
    private JSONObject bundle;

    private HashMap<String,Object> attachedTags=new HashMap<>();
    /**
     * this thread is a looper thread to executing javascript for lite app,
     * should only manage and interact with current lite app context
     * through this thread
     * */
    LiteAppLooperThread thread = new LiteAppLooperThread();

    /**
     *a local listener map for lite app context
     **/
    private HashMap<String,List<IBridgeEventListener>> localListenerMap = new HashMap<>();

    /**
     * for this context type ,no container is bind to this context
     * */
    public static final int CONTEXT_TYPE_SERVICE = 0;
    /***
     * for this context type, can be cast to a lite app page
     */
    public static final int CONTEXT_TYPE_PAGE = 1;

    public static int type = CONTEXT_TYPE_SERVICE;

    public static final String TAG_TITLE_CONFIG="titleConfig";

    public String getBaseVersion() {
        return baseVersion;
    }

    public static LiteAppContext createInstance(Context androidContext, LiteAppDetail liteAppDetail)throws LiteAppException {
        LogUtils.log(LogUtils.LOG_MINI_PROGRAM_PAGE_LIFE_CYCLE,LogUtils.LIFE_PAGE+LogUtils.PAGE_CONTEXT_CREATE);
        LiteAppContext newContext = new LiteAppContext();
        newContext.androidContext = androidContext;
        String framework;
        if(liteAppDetail == null){
            newContext.baseVersion = "";
            framework  = LiteAppPackageProvider.getClient().getLiteAppFrameworkJSCPart("");
        } else {
            newContext.baseVersion = liteAppDetail.getBaseVersion();
            framework = LiteAppPackageProvider.getClient().getLiteAppFrameworkJSCPart(liteAppDetail.getId());
        }
        newContext.getThread().start();
        CountDownLatch threadInitLatch = new CountDownLatch(1);

        newContext.createNative(threadInitLatch, framework);
        try {
            threadInitLatch.await();
        } catch (InterruptedException e) {
            LogUtils.logError(LogUtils.LOG_MINI_PROGRAM_ERROR,"init lite app context native failed",e);
        }
        if(newContext.nativeHandle == 0){
            LogUtils.logError(LogUtils.LOG_MINI_PROGRAM_ERROR,"lite app context init failed",null);
            return null;
        }
        return newContext;
    }

    public void setAppID(String liteAppID){
        this.liteAppID = liteAppID;
    }

    public String getBindAppID(){
        return liteAppID;
    }

    void disposeInstance(){
        LogUtils.log(LogUtils.LOG_MINI_PROGRAM_PAGE_LIFE_CYCLE,LogUtils.LIFE_PAGE+LogUtils.PAGE_CONTEXT_DISPOSE);
        //2. dispose context self
        purge();

        getThread().getHandler().post(new Runnable() {
            @Override
            public void run() {
                purge();
                NativeContextRef.remove(nativeHandle);
                ExecutorManagerNative.disposeAsyncExecutor(nativeHandle);
                Looper myLooper = getThread().getLooper();
                if (myLooper!=null) {
                    //quit looper
                    myLooper.quit();
                }
                LogUtils.log(LogUtils.LOG_MINI_PROGRAM_PAGE_LIFE_CYCLE,LogUtils.LIFE_PAGE+LogUtils.PAGE_THREAD_STOP);
            }
        });
    }

    public void registerLocalEventListener(String eventType, IBridgeEventListener listener){
        List<IBridgeEventListener> list;
        if(!localListenerMap.containsKey(eventType)){
            list = new ArrayList<>();
            localListenerMap.put(eventType,list);
        } else {
            list = localListenerMap.get(eventType);
        }
        list.add(listener);
    }

    public void triggerEvent(BridgeEvent event){
        List<IBridgeEventListener> listenerList = localListenerMap.get(event.getType());
        if(listenerList!=null){
            boolean intercepted = event.isIntercepted();
            for(IBridgeEventListener item: listenerList){
                if(item.interceptEvent(event)){
                    intercepted = true;
                }
            }
            event.setIntercepted(intercepted);
            if(!intercepted){
                for(IBridgeEventListener item: listenerList){
                    item.onEvent(event);
                }
            }
        }
        //go back and trigger container event
        if(event.getContext() == null){
            return;
        }
        if(event.getContext().getType() == LiteAppContext.CONTEXT_TYPE_PAGE) {
            ((LiteAppPage)event.getContext()).getContainer().onEvent(event);
        }
    }

    public int getType(){
        return type;
    }

    boolean isPurged(){
        return purged;
    }

    void purge(){
        purged = true;
    }

    public void setTag(String tag, Object content) {
        attachedTags.put(tag, content);
    }

    public Object getTag(String tag){
        return attachedTags.get(tag);
    }

    public LiteAppLooperThread getThread() {
        return thread;
    }

    public JSONObject getBundle() {
        return bundle;
    }

    public LiteAppContext setBundle(final JSONObject bundle) {
        this.bundle = bundle;
        //also should validate bundle in javascript layer
        if(nativeHandle == 0 || purged || bundle == null){
            return this;
        }
        thread.getHandler().post(new Runnable() {
            @Override
            public void run() {
                ExecutorManagerNative.executeScript(nativeHandle,
                        JSUtils.prepareInjectJSONObject("__page__data", bundle));
            }
        });
        return this;
    }

    void createNative(final CountDownLatch createLatch, final String framework) {
        thread.getHandler().post(new Runnable() {
            @Override
            public void run() {
                nativeHandle = ExecutorManagerNative.createAsyncExecutor();
                for(LiteAppContextInitProvider provider: LiteAppContextInitManager.getLiteAppContextInitProvider()){
                    provider.invalid(LiteAppContext.this);
                }
                //may wait for nativeHandle
                createLatch.countDown();
                //may wait for container
                if(TextUtils.isEmpty(framework)){
                    return;
                }
                long delay = ExecutorManagerNative.executeScript(nativeHandle,framework);
                tickInitTimerDelay(LiteAppContext.this, delay, nativeHandle);
                NativeContextRef.put(nativeHandle, LiteAppContext.this);
            }
        });
    }

    private void tickInitTimerDelay(final LiteAppContext context,
                                    final long delay, final long nativeHandle){
        if(delay > 100000){
            return;
        }
        context.getThread().getHandler().postDelayed(new Runnable() {
            @Override
            public void run() {
                if(context.isPurged()){
                    return;
                }
                long timeout = ExecutorManagerNative.tickTimer(nativeHandle);
                tickInitTimerDelay(context,timeout,nativeHandle);
            }
        },delay);
    }

    public Context getAndroidContext() {
        return androidContext;
    }

    protected static class LiteAppLooperHandler extends Handler {
        @Override
        public void handleMessage(Message msg) {
            super.handleMessage(msg);
        }
    }

    protected static class LiteAppLooperThread extends Thread{
        volatile LiteAppLooperHandler mHandler;
        volatile CountDownLatch handlerPrepareWait;

        public LiteAppLooperHandler getHandler(){
            while (mHandler == null){
                //too fast started looper but not prepared handler
                try {
                    Thread.sleep(20);
                } catch (InterruptedException e) {
                    LogUtils.logError(LogUtils.LOG_MINI_PROGRAM_ERROR,
                            "wait for handler error context",e);
                }
            }
            return mHandler;
        }

        Looper getLooper(){
            return Looper.myLooper();
        }

        @Override
        public synchronized void start() {
            handlerPrepareWait = new CountDownLatch(1);
            super.start();
            try {
                handlerPrepareWait.await(100,TimeUnit.MILLISECONDS);
            } catch (InterruptedException e) {
                LogUtils.logError(LogUtils.LOG_MINI_PROGRAM_ERROR,"error creating thread",e);
            }
        }

        public void run(){
            try {
                Looper.prepare();
                mHandler = new LiteAppLooperHandler();
                handlerPrepareWait.countDown();
                Looper.loop();
                Log.v(TAG,"looper quit and thread quit");
            } catch (Exception e){
                LogUtils.logError(LogUtils.LOG_MINI_PROGRAM_ERROR,"exception in lite app native context",e);
            }
        }
    }
}