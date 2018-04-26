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
import android.view.View;
import android.view.ViewGroup;
import android.widget.FrameLayout;

import com.iqiyi.halberd.demo.impl.video.LiteAppVideoView;
import com.iqiyi.halberd.liteapp.api.provider.LiteAppNativeViewHolder;
import com.iqiyi.halberd.liteapp.context.LiteAppContext;
import com.iqiyi.halberd.liteapp.api.provider.LiteAppNativeWidgetBase;

import org.json.JSONException;
import org.json.JSONObject;

/**
 * Created by eggizhang@qiyi.com on 2017/8/8.
 * using this widget factory to create a video widget and show in lite app
 */
public class VideoBoxWidget extends LiteAppNativeWidgetBase {
    @Override
    public LiteAppNativeViewHolder createNativeViewHolder(int top, int left, int width
            , int height, JSONObject viewData, Context context, LiteAppContext liteAppContext) throws JSONException {
        context = liteAppContext.getAndroidContext().getApplicationContext();
        float scale = context.getResources().getDisplayMetrics().density;
        FrameLayout.LayoutParams layoutParams = new FrameLayout.LayoutParams
                (Math.round(width * scale), Math.round(height * scale));
        layoutParams.setMargins(Math.round(left * scale), Math.round(top * scale), 0, 0);
        final FrameLayout whatEverHolderView =new FrameLayout(context);
        whatEverHolderView.setLayoutParams(new FrameLayout.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT));
        final LiteAppVideoView view = new LiteAppVideoView(context);
        whatEverHolderView.addView(view);
        view.setLayoutParams(layoutParams);
        validateColor(view, viewData);
        String src = viewData.optString("src");
        if (src != null) {
            view.setVideoUri(src);
        }
        view.setFocusable(true);
        return new LiteAppNativeViewHolder() {
            @Override
            public void onNativeViewDestroy() {
                view.dispose();
                super.onNativeViewDestroy();
            }

            @Override
            public void onNativeViewResume() {
                view.start();
                super.onNativeViewResume();
            }

            @Override
            public void onNativeViewPause() {
                view.pause();
                super.onNativeViewPause();
            }

            @Override
            public View getNativeView() {
                return whatEverHolderView;
            }
        };
    }
}
