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
package com.iqiyi.halberd.liteapp.plugin.widget;

import android.view.View;
import android.view.ViewGroup;
import android.widget.FrameLayout;

import com.iqiyi.halberd.liteapp.api.provider.LiteAppNativeViewHolder;
import com.iqiyi.halberd.liteapp.api.provider.LiteAppNativeWidgetProvider;
import com.iqiyi.halberd.liteapp.common.BridgeConstant;
import com.iqiyi.halberd.liteapp.context.LiteAppContext;
import com.iqiyi.halberd.liteapp.context.LiteAppPage;
import com.iqiyi.halberd.liteapp.event.BridgeEvent;
import com.iqiyi.halberd.liteapp.plugin.BasePlugin;
import com.iqiyi.halberd.liteapp.utils.LogUtils;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by eggizhang@qiyi.com on 2017/7/18.
 * using this plugin to
 */

public class NativeViewPlugin extends BasePlugin {
    public static String TAG = NativeViewPlugin.class.getName();

    /*constants*/
    public final static String NATIVE_VIEW_BOX_TYPE_TEXT = "QiyiInput";
    public final static String NATIVE_VIEW_BOX_TYPE_IMAGE = "ImageBox";
    public final static String NATIVE_VIEW_BOX_TYPE_COLOR = "ColorBox";
    public final static String NATIVE_VIEW_BOX_TYPE_VIDEO = "QiyiVideo";

    @Override
    protected List<String> getEventFilter() {
        ArrayList<String> filter = new ArrayList<>();
        filter.add(BridgeConstant.BRIDGE_NATIVE_BOX);
        filter.add(BridgeConstant.BRIDGE_ON_DESTROY);
        filter.add(BridgeConstant.BRIDGE_ON_PAUSE);
        filter.add(BridgeConstant.BRIDGE_ON_RESUME);
        return filter;
    }

    @Override
    public boolean interceptEvent(BridgeEvent event) {
        return false;
    }

    @Override
    public void onEvent(final BridgeEvent event) {
        if(event.getContext().getType() == LiteAppContext.CONTEXT_TYPE_SERVICE){
            return;
        }
        final FrameLayout nativeLayout = ((LiteAppPage) event.getContext())
                .getContainer().getNativeLayerView();
        final FrameLayout nativeHoverLayout = ((LiteAppPage) event.getContext())
                .getContainer().getNativeHoverLayer();
        if (BridgeConstant.BRIDGE_ON_PAUSE.equals(event.getType())) {
            for (int i=0; i< nativeLayout.getChildCount(); i++ ){
                LiteAppNativeViewHolder holder = (LiteAppNativeViewHolder)
                        nativeLayout.getChildAt(i).getTag(-1);
                if(holder != null){
                    holder.onNativeViewPause();
                }
            }
            for (int i=0; i< nativeHoverLayout.getChildCount(); i++ ){
                LiteAppNativeViewHolder holder = (LiteAppNativeViewHolder)
                        nativeHoverLayout.getChildAt(i).getTag(-1);
                if(holder != null){
                    holder.onNativeViewPause();
                }
            }
            return;
        }
        if (BridgeConstant.BRIDGE_ON_RESUME.equals(event.getType())) {
            for (int i=0; i< nativeLayout.getChildCount(); i++ ){
                LiteAppNativeViewHolder holder = (LiteAppNativeViewHolder)
                        nativeLayout.getChildAt(i).getTag(-1);
                if(holder != null){
                    holder.onNativeViewResume();
                }
            }
            for (int i=0; i< nativeHoverLayout.getChildCount(); i++ ){
                LiteAppNativeViewHolder holder = (LiteAppNativeViewHolder)
                        nativeHoverLayout.getChildAt(i).getTag(-1);
                if(holder != null){
                    holder.onNativeViewResume();
                }
            }
            return;
        }
        if (BridgeConstant.BRIDGE_ON_DESTROY.equals(event.getType())) {
            for (int i=0; i< nativeLayout.getChildCount(); i++ ){
                LiteAppNativeViewHolder holder = (LiteAppNativeViewHolder)
                        nativeLayout.getChildAt(i).getTag(-1);
                if(holder != null){
                    holder.onNativeViewDestroy();
                }
                nativeLayout.removeAllViews();
            }
            for (int i=0; i< nativeHoverLayout.getChildCount(); i++ ) {
                LiteAppNativeViewHolder holder = (LiteAppNativeViewHolder)
                        nativeHoverLayout.getChildAt(i).getTag(-1);
                if(holder != null){
                    holder.onNativeViewDestroy();
                }
                nativeHoverLayout.removeAllViews();
            }
            return;
        }
        if (BridgeConstant.BRIDGE_NATIVE_BOX.equals(event.getType())) {
            if (event.getContext().getType() == LiteAppContext.CONTEXT_TYPE_PAGE) {
                try {
                    JSONObject dataObj = new JSONObject(event.getData());
                    String action = dataObj.optString("action");
                    final String id = dataObj.optString("id");
                    final String type = dataObj.optString("type");

                    if ("create".equals(action)) {
                        final int top = dataObj.optInt("top");
                        final int left = dataObj.optInt("left");
                        final int height = dataObj.optInt("height");
                        final int width = dataObj.optInt("width");
                        final boolean hover = dataObj.optBoolean("hover");
                        final JSONObject viewData = dataObj.optJSONObject("viewData");

                        nativeLayout.post(new Runnable() {
                            @Override
                            public void run() {
                                LiteAppNativeViewHolder contentViewHolder;
                                try {
                                    contentViewHolder = LiteAppNativeWidgetProvider.getInstance().createNativeView(
                                            top, left, width, height, type, viewData, event.getContext().getAndroidContext().getApplicationContext(), event.getContext());
                                    if (contentViewHolder != null) {
                                        contentViewHolder.getNativeView().setTag(id);
                                        contentViewHolder.getNativeView().setTag(-1, contentViewHolder);
                                        View nativeView = contentViewHolder.getNativeView();
                                        if (hover) {
                                            nativeHoverLayout.addView(nativeView);
                                        } else {
                                            nativeLayout.addView(nativeView);
                                        }
                                        nativeView.requestFocus();
                                        nativeView.setEnabled(true);
                                    }
                                } catch (JSONException e) {
                                    LogUtils.logError(LogUtils.LOG_MINI_PROGRAM_ERROR,"error native view data json",e);
                                }
                            }
                        });
                    } else if ("delete".equals(action)) {
                        if (id != null) {
                            nativeLayout.post(new Runnable() {
                                @Override
                                public void run() {
                                    //video only change url
                                    View target = nativeLayout.findViewWithTag(id);
                                    if (target == null) {
                                        target = nativeHoverLayout.findViewWithTag(id);
                                    }
                                    if (target == null) {
                                        return;
                                    }
                                    ViewGroup parent = (ViewGroup) target.getParent();
                                    parent.removeView(target);
                                    parent.invalidate();
                                }
                            });
                        }
                    }
                } catch (JSONException e) {
                    LogUtils.logError(LogUtils.LOG_MINI_PROGRAM_ERROR,"error in native view data",e);
                }
            }
        }
    }
}
