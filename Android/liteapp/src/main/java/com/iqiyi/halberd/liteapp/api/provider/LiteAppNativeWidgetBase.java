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
package com.iqiyi.halberd.liteapp.api.provider;

import android.content.Context;
import android.graphics.Color;
import android.text.TextUtils;
import android.view.View;

import com.iqiyi.halberd.liteapp.context.LiteAppContext;
import com.iqiyi.halberd.liteapp.utils.LogUtils;

import org.json.JSONException;
import org.json.JSONObject;

/**
 * Created by eggizhang@qiyi.com on 2017/8/8.
 * this implement this native app widget to host native views on top of web view
 */
public abstract class LiteAppNativeWidgetBase {
    /**Implement this method to create a view as native component on top of web view
     * @param top required widget top to web view
     * @param left required widget left to web view
     * @param width required widget width
     * @param height required widget height
     * @param viewData data for other params of this view from javascript for example ,src
     *                    background or input type
     * @param context android context for current lite app
     * @param liteAppContext lite app context for this  widget
     * */
    public abstract LiteAppNativeViewHolder createNativeViewHolder(int top, int left, int width, int height
            ,JSONObject viewData, Context context, LiteAppContext liteAppContext) throws JSONException;

    private final static String TAG = LiteAppNativeWidgetBase.class.getName();
    /** Basic default color parser
     *　@param view view content
     *  @param viewData content data contains data string
     **/
    protected static void validateColor(View view, JSONObject viewData) throws JSONException {
        String color = viewData.optString("color");
        if (!TextUtils.isEmpty(color)) {
            try {
                int colorInt = Color.parseColor(color);
                view.setBackgroundColor(colorInt);
            } catch (IllegalArgumentException e) {
                LogUtils.logError(LogUtils.LOG_MINI_PROGRAM_ERROR,"error creating color",e);
            }
        }
    }
}
