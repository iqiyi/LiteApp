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

import android.annotation.TargetApi;
import android.content.Context;
import android.graphics.drawable.Drawable;
import android.os.Build;
import android.support.annotation.Nullable;
import android.util.AttributeSet;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;

import com.iqiyi.halberd.liteapp.R;

/**
 * Created by eggizhang@qiyi.com on 2017/7/26.
 * use this view to render a tab item in lite app tab
 */
public class TabBarItemView  extends LinearLayout{
    private TextView textView;
    private ImageView imageSwitcher;
    private boolean selected;
    private TabBarItem tabBarItem;

    public TabBarItemView(Context context) {
        super(context);
    }

    public TabBarItemView(Context context, @Nullable AttributeSet attrs){
        super(context,attrs);
    }

    public TabBarItemView(Context context, @Nullable AttributeSet attrs, int defStyleAttr){
        super(context,attrs,defStyleAttr);
    }

    @SuppressWarnings("unused")
    @TargetApi(Build.VERSION_CODES.LOLLIPOP)
    public TabBarItemView(Context context, AttributeSet attrs, int defStyleAttr, int defStyleRes){
        super(context,attrs,defStyleAttr,defStyleRes);
    }

    public void setTabBarItem(TabBarItem item){
        tabBarItem = item;
        if(textView == null || imageSwitcher == null){
            textView = (TextView) findViewById(R.id.text_label);
            imageSwitcher = (ImageView)findViewById(R.id.image_switcher);
        }
        textView.setTextColor(tabBarItem.unselectedTextColor);
        textView.setText(tabBarItem.textBarText);
        if(tabBarItem.unselectedDrawable!=null) {
            imageSwitcher.setImageDrawable(tabBarItem.unselectedDrawable);
        }
        selected = false;
    }

    public boolean isSelected(){
        return selected;
    }

    public void toggleSelect(boolean select){
        if(select){
            if(tabBarItem.selectedDrawable!=null) {
                imageSwitcher.setImageDrawable(tabBarItem.selectedDrawable);
            }
            textView.setTextColor(tabBarItem.selectedTextColor);
            this.selected = true;
        } else {
            if(tabBarItem.unselectedDrawable!=null) {
                imageSwitcher.setImageDrawable(tabBarItem.unselectedDrawable);
            }
            textView.setTextColor(tabBarItem.unselectedTextColor);
            this.selected = false;
        }
    }

    public static class TabBarItem{
        public String textBarText;
        public int selectedTextColor;
        public int unselectedTextColor;
        public Drawable selectedDrawable;
        public Drawable unselectedDrawable;
    }
}
