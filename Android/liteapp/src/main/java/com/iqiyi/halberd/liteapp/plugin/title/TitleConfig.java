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

import android.content.Context;
import android.graphics.drawable.Drawable;

import com.iqiyi.halberd.liteapp.R;

import java.util.ArrayList;

/**
 * Created by xujiajia_sx on 2017/10/23.\
 **/

@SuppressWarnings("deprecation")
class TitleConfig {

    private boolean isShowTitle;
    private String text;
    private int color;
    private Drawable logo;
    private int mode;
    private ArrayList<TitleMenuItem> titleMenuArray;
    private boolean isShowMenu;

    void init(final Context context) {
        isShowTitle=true;
        text="爱奇艺";
        color=context.getResources().getColor(R.color.app_material_grey_100);
        logo=null;
        titleMenuArray =null;
        isShowMenu=false;

        titleMenuArray =new ArrayList<>();
    }

    boolean isShowTitle() {
        return isShowTitle;
    }

    void setShowTitle(boolean showTitle) {
        isShowTitle = showTitle;
    }

    String getText() {
        return text;
    }

    void setText(String text) {
        this.text = text;
    }

    int getColor() {
        return color;
    }

    void setColor(int color) {
        this.color = color;
    }

    Drawable getLogo() {
        return logo;
    }

    void setLogo(Drawable logo) {
        this.logo = logo;
    }

    ArrayList<TitleMenuItem> getTitleMenuArray() {
        return titleMenuArray;
    }

    boolean isShowMenu() {
        return isShowMenu;
    }

    void setShowMenu(boolean showMenu) {
        isShowMenu = showMenu;
    }

    public int getMode() {
        return mode;
    }

    public void setMode(int mode) {
        this.mode = mode;
    }

}
