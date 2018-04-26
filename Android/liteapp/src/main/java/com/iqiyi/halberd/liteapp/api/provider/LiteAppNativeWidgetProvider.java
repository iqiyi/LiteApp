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
import android.support.annotation.MainThread;
import android.text.TextUtils;

import com.iqiyi.halberd.liteapp.context.LiteAppContext;
import com.iqiyi.halberd.liteapp.plugin.widget.NativeViewPlugin;
import com.iqiyi.halberd.liteapp.plugin.widget.impl.ColorBoxWidget;
import com.iqiyi.halberd.liteapp.plugin.widget.impl.ImageBoxWidget;
import com.iqiyi.halberd.liteapp.plugin.widget.impl.InputTextWidget;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.HashMap;

/**
 * Created by eggizhang@qiyi.com on 2017/7/20.
 * Using this view factory to create native views on container top layer
 */
public class LiteAppNativeWidgetProvider {
    private HashMap<String,LiteAppNativeWidgetBase> widgetDic = new HashMap<>();

    public static LiteAppNativeWidgetProvider getInstance(){
        return Host.instance;
    }

    @MainThread
    public LiteAppNativeViewHolder createNativeView(int top, int left, int width, int height, String type,
                                 JSONObject viewData, Context context, LiteAppContext liteAppContext) throws JSONException {
        if(!widgetDic.containsKey(type)){
            return null;
        }
        LiteAppNativeWidgetBase widget = widgetDic.get(type);
        if(widget!=null){
            return widget.createNativeViewHolder(
                    top,left,width,height,viewData,context, liteAppContext);
        }
        return null;
    }

    public static void registerWidget(String key, LiteAppNativeWidgetBase widget){
        if(TextUtils.isEmpty(key)){
            return;
        }
        if(widget == null){
            return;
        }
        getInstance().widgetDic.put(key,widget);
    }

    private LiteAppNativeWidgetProvider(){
        //load default widgets
        widgetDic.put(NativeViewPlugin.NATIVE_VIEW_BOX_TYPE_COLOR,new ColorBoxWidget());
        widgetDic.put(NativeViewPlugin.NATIVE_VIEW_BOX_TYPE_IMAGE,new ImageBoxWidget());
        widgetDic.put(NativeViewPlugin.NATIVE_VIEW_BOX_TYPE_TEXT,new InputTextWidget());
    }

    private static class Host{
        private final static LiteAppNativeWidgetProvider instance = new LiteAppNativeWidgetProvider();
    }
}
