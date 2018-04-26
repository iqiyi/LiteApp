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
package com.iqiyi.halberd.liteapp.plugin.widget.impl;

import android.content.Context;
import android.graphics.Color;
import android.text.Editable;
import android.text.TextWatcher;
import android.view.KeyEvent;
import android.view.View;
import android.view.inputmethod.EditorInfo;
import android.view.inputmethod.InputMethodManager;
import android.widget.EditText;
import android.widget.FrameLayout;

import com.iqiyi.halberd.liteapp.api.provider.LiteAppNativeViewHolder;
import com.iqiyi.halberd.liteapp.api.provider.LiteAppNativeWidgetBase;
import com.iqiyi.halberd.liteapp.context.ExecutorManager;
import com.iqiyi.halberd.liteapp.context.LiteAppContext;
import com.iqiyi.halberd.liteapp.utils.DisplayUtils;
import com.iqiyi.halberd.liteapp.utils.LogUtils;
import com.iqiyi.halberd.liteapp.view.impl.HalWebView;

import org.json.JSONException;
import org.json.JSONObject;

/**
 * Created by eggizhang@qiyi.com on 2017/8/8.
 * using this widget to implement native input instead of web input
 * for better experience
 */
public class InputTextWidget extends LiteAppNativeWidgetBase {
    private final static String TAG = InputTextWidget.class.getName();

    @Override
    public LiteAppNativeViewHolder createNativeViewHolder(int top, int left, int width,
                                                              int height, JSONObject viewData,
                                                              final Context context,
                                                              final LiteAppContext liteAppContext) throws JSONException {
        float scale = context.getResources().getDisplayMetrics().density;
        FrameLayout.LayoutParams layoutParams = new FrameLayout.LayoutParams
                (Math.round(width * scale), Math.round(height * scale));
        layoutParams.setMargins(Math.round(left * scale), Math.round(top * scale), 0, 0);
        if(viewData == null){
            return new LiteAppNativeViewHolder() {
                @Override
                public View getNativeView() {
                    return new EditText(context);
                }
            };
        }
        String hint = viewData.optString("placeholder");
        boolean focus = viewData.optBoolean("focus");

        final EditText view = new EditText(context);
        int padding = DisplayUtils.dip2px(context,5);
        view.setPadding(padding,padding,padding,padding);
        view.setSingleLine();
        view.setImeOptions(EditorInfo.IME_ACTION_SEARCH);
        view.setTextSize(((float)height)/2.5f);
        view.setBackgroundColor(Color.TRANSPARENT);
       //view.setTag(0);

        view.setOnFocusChangeListener(new View.OnFocusChangeListener() {
            @Override
            public void onFocusChange(final View v, boolean hasFocus) {
                JSONObject eventContent = new JSONObject();
                try {
                    eventContent.put("_uid", view.getTag());
                    if (hasFocus) {
                        eventContent.put("event", "bindfocus");
                    } else {
                        eventContent.put("event", "bindblur");
                    }
                    eventContent.put("params", view.getText().toString());
                    ExecutorManager.executeScript(
                            liteAppContext, "__thread__.getEvent(" + eventContent.toString() +
                                    ");");
                } catch (JSONException e){
                    LogUtils.logError(LogUtils.LOG_MINI_PROGRAM_ERROR,"failed to trigger input event",e);
                }
            }
        });

        if(focus) {
            view.requestFocus();
            HalWebView.isEditing = true;
            InputMethodManager inputMethodManager =  ((InputMethodManager) view.getContext().
                    getSystemService(Context.INPUT_METHOD_SERVICE));
            if(inputMethodManager!=null) {
                inputMethodManager.toggleSoftInput(InputMethodManager.SHOW_IMPLICIT,
                        InputMethodManager.HIDE_NOT_ALWAYS);
            }

        }

        view.addTextChangedListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence s, int start, int count, int after) {

            }

            @Override
            public void onTextChanged(CharSequence s, int start, int before, int count) {

            }

            @Override
            public void afterTextChanged(Editable s) {
                JSONObject eventContent = new JSONObject();
                try {
                    eventContent.put("_uid", view.getTag());
                    eventContent.put("event", "bindinput");
                    eventContent.put("params", view.getText().toString());
                    ExecutorManager.executeScript(
                            liteAppContext, "__thread__.getEvent(" + eventContent.toString() +
                                    ");");
                } catch (JSONException e){
                    LogUtils.logError(LogUtils.LOG_MINI_PROGRAM_ERROR,"failed to trigger input event",e);
                }
            }
        });

        view.setOnKeyListener(new View.OnKeyListener() {
            @Override
            public boolean onKey(View v, int keyCode, KeyEvent event) {
                if (event.getAction() == KeyEvent.ACTION_DOWN)
                {
                    switch (keyCode)
                    {
                        case KeyEvent.KEYCODE_DPAD_CENTER:
                        case KeyEvent.KEYCODE_ENTER:
                            JSONObject eventContent = new JSONObject();
                            try {
                                eventContent.put("_uid", view.getTag());
                                eventContent.put("event", "bindconfirm");
                                eventContent.put("params", view.getText().toString());
                                ExecutorManager.executeScript(
                                        liteAppContext, "__thread__.getEvent(" + eventContent.toString() +
                                                ");");
                            } catch (JSONException e){
                                LogUtils.logError(LogUtils.LOG_MINI_PROGRAM_ERROR,"failed to trigger input event",e);
                            }
                            return true;
                        default:
                            break;
                    }
                }
                return false;
            }
        });

        view.setLayoutParams(layoutParams);
        validateColor(view, viewData);
        if (hint != null) {
            view.setHint(hint);
        }
        return new LiteAppNativeViewHolder() {
            @Override
            public View getNativeView() {
                return view;
            }
        };
    }
}
