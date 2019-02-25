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
package com.iqiyi.halberd.liteapp.utils;

import android.content.Context;
import android.util.DisplayMetrics;

/**
 * Created by eggizhang@qiyi.com on 2017/8/22.
 * display utils
 */
@SuppressWarnings("unused")
public class DisplayUtils {
    public static int tabBarHeight;
    public static int containerHeight;
    private static  DisplayMetrics metrics;

    public static int getWidth(Context context){
        if(metrics == null){
            metrics = context.getResources().getDisplayMetrics();
        }
        return metrics.widthPixels;

    }
    public static int getHaveTabBarHeight(){
        return containerHeight;
    }
    public static int getNoTabBarHeight(Context context){
//        return tabBarHeight;
        if(metrics == null){
            metrics = context.getResources().getDisplayMetrics();
        }
        return metrics.heightPixels;
    }

    /**
     * 根据手机的分辨率从 dp 的单位 转成为 px(像素)
     */
    public static int dip2px(Context context, float dpValue) {
        final float scale = context.getResources().getDisplayMetrics().density;
        return (int) (dpValue * scale + 0.5f);
    }

    /**
     * 根据手机的分辨率从 px(像素) 的单位 转成为 dp
     */
    public static int px2dip(Context context, float pxValue) {
        final float scale = context.getResources().getDisplayMetrics().density;
        return (int) (pxValue / scale + 0.5f);

    }
}
