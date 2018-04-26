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
package com.iqiyi.halberd.liteapp.view.impl;

import android.annotation.SuppressLint;
import android.content.Context;
import android.graphics.Canvas;
import android.os.AsyncTask;
import android.os.Build;
import android.os.Handler;
import android.support.annotation.MainThread;
import android.support.annotation.RequiresApi;
import android.support.v4.widget.SwipeRefreshLayout;
import android.text.TextUtils;
import android.util.Log;
import android.view.View;
import android.view.ViewGroup;
import android.webkit.ConsoleMessage;
import android.webkit.ValueCallback;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceRequest;
import android.webkit.WebResourceResponse;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.FrameLayout;

import com.iqiyi.halberd.liteapp.api.provider.LiteAppPackageProvider;
import com.iqiyi.halberd.liteapp.common.BridgeConstant;
import com.iqiyi.halberd.liteapp.context.ExecutorManager;
import com.iqiyi.halberd.liteapp.context.LiteAppContext;
import com.iqiyi.halberd.liteapp.context.LiteAppPage;
import com.iqiyi.halberd.liteapp.event.BridgeEvent;
import com.iqiyi.halberd.liteapp.event.impl.EventBridgeImpl;
import com.iqiyi.halberd.liteapp.manager.LiteAppResourceDelegate;
import com.iqiyi.halberd.liteapp.utils.LogUtils;
import com.iqiyi.halberd.liteapp.view.ILiteAppContainer;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.concurrent.ConcurrentLinkedQueue;

import static com.iqiyi.halberd.liteapp.event.BridgeEvent.jsConsoleEventData;
import static com.iqiyi.halberd.liteapp.event.BridgeEvent.jsConsoleEventIntercepted;
import static com.iqiyi.halberd.liteapp.event.BridgeEvent.jsConsoleEventType;

/**
 * Created by eggizhang@qiyi.com on 2017/7/17.
 * using this container to host a web view and bind with events
 */
public class WebViewLiteAppContainer implements ILiteAppContainer{
    private FrameLayout mContainerView;
    private WebView mWebView;
    private Context mContext;
    private FrameLayout mNativeLayerView;
    private FrameLayout mNativeHoverLayer;
    private ConcurrentLinkedQueue<String> patchBuffer = new ConcurrentLinkedQueue<>();
    private boolean loadFinished;
    private SwipeRefreshLayout swipeRefreshLayout;
    private LiteAppContext bindContext;

    private final static String TAG = WebViewLiteAppContainer.class.getName();

    public WebViewLiteAppContainer(){}

    @Override
    public void onEvent(BridgeEvent event){

        if(event.getType().equals(BridgeConstant.BRIDGE_LOAD_FINISH)){
            Context context = event.getContext().getAndroidContext();
            Handler mainHandler = new Handler(context.getMainLooper());
            Runnable myRunnable = new Runnable() {
                @Override
                public void run() {
                    loadFinished = true;
                    invalidBuffer();
//                    Log.v(TAG, "webview data loading fin\ished:");
                }
            };
            mainHandler.post(myRunnable);
        }
    }

    @Override
    public void loadData(final String data, boolean sync){
        if(sync){
            mWebView.loadDataWithBaseURL("file:///mp_local/"
                    ,data, "text/html", "utf-8", "");
        } else {
            mWebView.post(new Runnable() {
                @Override
                public void run() {
                    mWebView.loadDataWithBaseURL("file:///mp_local/"
                            , data, "text/html", "utf-8", "");
                }
            });
        }
    }

    @Override
    public FrameLayout getNativeHoverLayer(){
        return mNativeHoverLayer;
    }

    @Override
    public FrameLayout getNativeLayerView(){
        return mNativeLayerView;
    }

    @Override
    public View getView() {
        return mContainerView;
    }

    public void onMounted(){

    }

    @Override
    public void destroy(){
        mContainerView.removeAllViews();
        if(mWebView==null){
            return;
        }
        swipeRefreshLayout.removeAllViews();
        mWebView.clearHistory();
        mWebView.clearCache(true);
        mWebView.loadUrl("about:blank");
        mWebView.removeAllViews();
        mWebView.destroy();
        mWebView.setWebChromeClient(null);
        mWebView.setWebViewClient(null);
        bindContext = null;
        mWebView = null;
    }

    @SuppressLint({"SetJavaScriptEnabled", "AddJavascriptInterface"})
    @MainThread
    @Override
    public void bindLiteAppContext(final LiteAppPage context) {
        bindContext = context;
        mContainerView = new FrameLayout(context.getAndroidContext());
        //web view create
        Log.w(TAG,"webview data loading start");
        mContext = context.getAndroidContext();
        mWebView = new HalWebView(context.getAndroidContext());
        mWebView.getSettings().setJavaScriptEnabled(true);
        mWebView.setFocusable(false);
        mWebView.getSettings().setLayoutAlgorithm(WebSettings.LayoutAlgorithm.NORMAL);
        mWebView.setLongClickable(false);
        mWebView.setOnLongClickListener(new View.OnLongClickListener() {
            @Override
            public boolean onLongClick(View v) {
                return true;
            }
        });
        mWebView.setWebViewClient(new WebViewClient(){
            @Override
            public WebResourceResponse shouldInterceptRequest (final WebView view, String url) {
                if(url.startsWith("file:///")){
                    WebResourceResponse response = LiteAppResourceDelegate.
                            getWebResourceResponse(url, bindContext.getBindAppID());
                    if(response == null){
                        response = super.shouldInterceptRequest(view,url);
                    }
                    return response;
                } else {
                    return super.shouldInterceptRequest(view,url);
                }
            }

            @RequiresApi(api = Build.VERSION_CODES.LOLLIPOP)
            public WebResourceResponse shouldInterceptRequest(WebView view, WebResourceRequest request){
                String url = request.getUrl().toString();
                if(url.startsWith("file:///")){
                    WebResourceResponse response = LiteAppResourceDelegate.
                            getWebResourceResponse(url, bindContext.getBindAppID());
                    if(response == null){
                        response = super.shouldInterceptRequest(view,url);
                    }
                    return response;
                } else {
                    return super.shouldInterceptRequest(view,url);
                }
            }

            @Override
            public void onPageFinished(WebView view, String url) {
//                loadFinished = true;
//                invalidBuffer();
//                Log.v(TAG, "webview data loading finished:");
                super.onPageFinished(view, url);
            }
        });
        mWebView.setWebChromeClient(new WebChromeClient(){
            @Override
            public boolean onConsoleMessage(ConsoleMessage consoleMessage) {
                String messageContent = consoleMessage.message();
                Log.v(TAG, messageContent);
                if(messageContent.startsWith("hal:")){
                    String eventString = messageContent.substring(4,messageContent.length());
                    new ConsoleEventTask(context, eventString).executeOnExecutor(AsyncTask.THREAD_POOL_EXECUTOR);
                }
                if(messageContent.startsWith("execute:")){
                    String executeString = messageContent.substring(8,messageContent.length());
                    if(TextUtils.isEmpty(executeString)){
                        return true;
                    }
                    ExecutorManager.executeScript(context,executeString);
                }
                return true;
            }
        });

        //native view create
        mNativeLayerView = new FrameLayout(context.getAndroidContext()){
            @Override
            protected void dispatchDraw(Canvas canvas) {
                int top = ((FrameLayout.LayoutParams)getLayoutParams()).topMargin;
                //Log.v("RENDER" ,"top:" + top + "  web view:" + webScroll + "   real top:" + getTop() );
                //hacking on top position 来防止拖影
                setTop(top);
                super.dispatchDraw(canvas);
            }
        };
        mNativeHoverLayer = new FrameLayout(context.getAndroidContext());

        mNativeLayerView.setFocusable(true);
        mNativeHoverLayer.setFocusable(true);
        //view append to parent
        swipeRefreshLayout = new SwipeRefreshLayout(context.getAndroidContext());
        swipeRefreshLayout.setEnabled(false);
        swipeRefreshLayout.setOnRefreshListener(new SwipeRefreshLayout.OnRefreshListener() {
            @Override
            public void onRefresh() {
                swipeRefreshLayout.setRefreshing(false);
            }
        });
        swipeRefreshLayout.addView(mWebView);
        mContainerView.addView(swipeRefreshLayout);
        mContainerView.addView(mNativeLayerView);
        mContainerView.addView(mNativeHoverLayer);
        ViewGroup.LayoutParams params = new ViewGroup.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT,
                ViewGroup.LayoutParams.MATCH_PARENT);
        mContainerView.setLayoutParams(params);
        mNativeLayerView.getLayoutParams().height = FrameLayout.LayoutParams.WRAP_CONTENT;
        mNativeLayerView.getLayoutParams().width = FrameLayout.LayoutParams.WRAP_CONTENT;
        mNativeHoverLayer.getLayoutParams().height = FrameLayout.LayoutParams.WRAP_CONTENT;
        mNativeHoverLayer.getLayoutParams().width = FrameLayout.LayoutParams.WRAP_CONTENT;
        mWebView.getLayoutParams().height = FrameLayout.LayoutParams.MATCH_PARENT;
        mWebView.getLayoutParams().width = FrameLayout.LayoutParams.MATCH_PARENT;
        //start loading
        mWebView.loadDataWithBaseURL("file:///mp_local/package",
                LiteAppPackageProvider.getClient().getLiteAppFrameworkWebViewPart(context.getBindAppID()),
                "text/html", "utf-8", "");
        context.setContainer(this);
    }

    private void invalidPatch(){
        if(loadFinished) {
            if(patchBuffer.size()>0) {
                final String data = patchBuffer.poll();
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
                    if(mWebView == null){
                        return;
                    }
                    mWebView.evaluateJavascript(data, new ValueCallback<String>() {
                        @Override
                        public void onReceiveValue(String value) {
                            invalidPatch();
                            Log.v(TAG, "invalid buffer:" + data);
                        }
                    });
                } else {
                    mWebView.loadUrl("javascript:" + data);
                    invalidPatch();
                }
            }
        } else {
            Log.v(TAG,"bridge not yet,cache");
        }
    }

    private void invalidBuffer(){
        invalidPatch();
    }

    @Override
    public synchronized void postPatch(final String data) {
        patchBuffer.add(data);
        Handler mainHandler = new Handler(mContext.getMainLooper());
        Runnable myRunnable = new Runnable() {
            @Override
            public void run() {
                invalidBuffer();
            }
        };
        mainHandler.post(myRunnable);
    }

    public void injectCss(String cssPath){
        try {
            if(TextUtils.isEmpty(cssPath)){
                return;
            }
            cssPath = "file:///" + cssPath;
            postPatch("addCssNative('"+  cssPath + "')");
//            postPatch("(function() {" +
//                    "var parent = document.getElementsByTagName('head').item(0);" +
//                    "var style = document.createElement('style');" +
//                    "style.type = 'text/css';" +
//                    // Tell the browser to BASE64-decode the string into your script !!!
//                    "style.innerHTML = window.atob('" + encoded + "');" +
//                    "parent.appendChild(style)" +
//                    "})()");
        } catch (Exception e) {
            LogUtils.logError(LogUtils.LOG_MINI_PROGRAM_ERROR, "error in injecting packaged css",e);
        }
    }

    private static class ConsoleEventTask extends AsyncTask<Void,Void,Void>{
        LiteAppPage mContext = null;
        String eventString = "";

        ConsoleEventTask(LiteAppPage context, String string){
            mContext = context;
            eventString = string;
        }

        @Override
        protected Void doInBackground(Void... params) {
            try {
                JSONObject jsonObject = new JSONObject(eventString);
                String eventData = jsonObject.optString(jsConsoleEventData);
                String eventType = jsonObject.optString(jsConsoleEventType);
                boolean intercepted = jsonObject.optBoolean(jsConsoleEventIntercepted);
                BridgeEvent event = new BridgeEvent();
                event.setContext(mContext);
                event.setType(eventType);
                event.setData(eventData);
                event.setIntercepted(intercepted);
                event.setLocal(true);
                EventBridgeImpl.getInstance().triggerEvent(event);
            } catch (JSONException e) {
                LogUtils.logError(LogUtils.LOG_MINI_PROGRAM_ERROR,"invalid event from console",e);
            }

            return null;
        }
    }
}
