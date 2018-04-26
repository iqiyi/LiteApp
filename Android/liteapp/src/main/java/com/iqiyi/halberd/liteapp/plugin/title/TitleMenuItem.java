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
package com.iqiyi.halberd.liteapp.plugin.title;

import android.graphics.drawable.Drawable;

/**
 * Created by xujiajia_sx on 2017/10/19.
 *
 */

public class TitleMenuItem {
    private String id;
    private String text;
    private Drawable icon;
    private OnClickListener listener;

    public interface OnClickListener {
        void onClick();
    }

    public TitleMenuItem(String id, String text,Drawable icon, OnClickListener listener){
        this.id=id;
        this.text=text;
        this.icon=icon;
        this.listener=listener;
    }

    public String getId() {
        return id;
    }
    public void setText(String text) {
        this.text = text;
    }
    public String getText() {
        return text;
    }

    public void setIcon(Drawable icon) {
        this.icon = icon;
    }

    public Drawable getIcon() {
        return icon;
    }

    public void itemClick() {
        listener.onClick();
    }

}
