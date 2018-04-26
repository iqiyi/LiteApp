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

import java.io.InputStream;

/**
 * Created by eggizhang@qiyi.com on 2017/7/17.
 * using this assets utils to retrieve from assets
 */

public class AssetsUtils {
    private static final String TAG = AssetsUtils.class.getName();
    static public String getFromAssets(String fileName, Context context) {
        try {

            InputStream inputStream
                    = context.getAssets().open(fileName);
            int size = inputStream.available();
            byte[] buffer = new byte[size];
            inputStream.read(buffer);
            inputStream.close();

            return new String(buffer, "UTF-8");
        } catch (Exception e) {
            LogUtils.logError(LogUtils.LOG_MINI_PROGRAM_ERROR,"getFromAssets failed",e);
        }
        return "";
    }}
