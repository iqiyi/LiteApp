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

import android.graphics.Color;

/**
 * Created by eggizhang@qiyi.com on 2017/8/1.
 * using this class to transfer a color string to int
 */
public class ColorUtils {
    public static final String TAG = ColorUtils.class.getName();
    public static int parseColor(String colorString){
        try {
            return Color.parseColor(colorString);
        } catch (Exception e){
            LogUtils.logError(LogUtils.LOG_MINI_PROGRAM_ERROR,"parse color failed",e);
            return Color.BLACK;
        }
    }
}
