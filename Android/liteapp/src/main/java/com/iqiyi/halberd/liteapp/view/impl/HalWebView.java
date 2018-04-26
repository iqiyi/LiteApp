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
import android.os.Build;
import android.os.Handler;
import android.view.MotionEvent;
import android.view.View;
import android.view.inputmethod.InputMethodManager;
import android.webkit.WebView;
import android.widget.EditText;

import com.iqiyi.halberd.liteapp.LiteAppFragmentActivity;
import com.iqiyi.halberd.liteapp.utils.LogUtils;
import com.iqiyi.halberd.liteapp.view.LiteAppBaseActivity;

/**
 * Created by eggizhang@qiyi.com on 2017/7/19.
 * web view with scroll bar
 */
@SuppressWarnings("unused")
public class HalWebView extends WebView {

    private Context mContext;
    public static volatile boolean isEditing = false;
    private Handler mainHandler = new Handler();
    private boolean enable=false;
    private volatile boolean freshState=false;
    private final static String TAG = HalWebView.class.getName();

    public HalWebView(Context context) {
        super(context);
        LogUtils.log(LogUtils.LOG_MINI_PROGRAM_PAGE_LIFE_CYCLE,LogUtils.LIFE_WEB_VIEW+LogUtils.LIFE_OBJECT_CREATE);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
            setWebContentsDebuggingEnabled(true);
        }
        mContext = context;
    }

    @Override
    public void destroy() {
        LogUtils.log(LogUtils.LOG_MINI_PROGRAM_PAGE_LIFE_CYCLE,LogUtils.LIFE_WEB_VIEW+LogUtils.LIFE_DESTROY);
        super.destroy();
    }

    private OnScrollChangedCallback mOnScrollChangedCallback;
    private OnFreshEnableListener mListener;
    @Override
    protected void onScrollChanged(final int l, final int t, final int oldl, final int oldt) {
        super.onScrollChanged(l, t, oldl, oldt);
        if (mOnScrollChangedCallback != null) mOnScrollChangedCallback.onScroll(l, t);
    }

    public OnScrollChangedCallback getOnScrollChangedCallback() {
        return mOnScrollChangedCallback;
    }

    public void setOnScrollChangedCallback(final OnScrollChangedCallback onScrollChangedCallback) {
        mOnScrollChangedCallback = onScrollChangedCallback;
    }
    public void setOnRefreshEnableListener(OnFreshEnableListener listener){
        mListener=listener;
    }
    /**
     * implement in the activity/fragment/view that you want to listen to the webview
     */
    interface OnScrollChangedCallback {
        void onScroll(int l, int t);
    }
    interface OnFreshEnableListener{
        void onEnable(boolean enable);
    }
    public boolean isEnable(){return enable;}
    public boolean getFreshState(){
        return freshState;
    }
    public void setFreshState(boolean state) {
        freshState = state;
    }
    @SuppressLint("ClickableViewAccessibility")
    @Override
    public boolean onTouchEvent(MotionEvent event) {
        isEditing = false;
        if(mListener!=null){
            //判断页面内容顶部是否滑到webView顶部和当前webView是否正在刷新来设置SwipeRefreshLayout
            if(getScrollY()<=0){
                enable=true;
            }
            else if(getScrollY()>0){
                enable = getFreshState();
            }
            mListener.onEnable(enable);
        }
        super.onTouchEvent(event);
        hideSoftInput(mContext,event);
        return true;
    }

    private void hideSoftInput(final Context context, final MotionEvent event) {
        //click事件也是在手机抬起时
        if (event.getAction() == MotionEvent.ACTION_UP) {
            //延迟0.05秒执行软键盘隐藏判断，以供JavaScript内部事件传递
            mainHandler.postDelayed(new Runnable() {
                @Override
                public void run() {
                    if(LiteAppFragmentActivity.topInstance == null){
                        return;
                    }
                    LiteAppBaseActivity fragmentActivity = LiteAppFragmentActivity.topInstance.get();
                    if(fragmentActivity == null){
                        return;
                    }
                    final View v = fragmentActivity.getCurrentFocus();
                    if (v != null) {
                        if (!isEditing && isShouldHideInput(v, event)) {
                            final InputMethodManager imm = (InputMethodManager) context.
                                    getSystemService(Context.INPUT_METHOD_SERVICE);
                            if (imm != null) {
                                imm.hideSoftInputFromWindow(v.getWindowToken(), 0);
                            }
                        }
                    }
                }
            }, 50);
        }
    }

    public boolean isShouldHideInput(View v, MotionEvent event) {
        if (v != null && (v instanceof EditText)) {
            int[] leftTop = {0, 0};
            //获取输入框当前的location位置
            v.getLocationInWindow(leftTop);
            int left = leftTop[0];
            int top = leftTop[1];
            int bottom = top + v.getHeight();
            int right = left + v.getWidth();
            return !(event.getX() > left && event.getX() < right
                    && event.getY() > top && event.getY() < bottom);
        }
        return false;
    }

}
