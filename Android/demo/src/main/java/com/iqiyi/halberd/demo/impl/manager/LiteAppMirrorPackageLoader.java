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
package com.iqiyi.halberd.demo.impl.manager;

import android.app.Activity;
import android.content.Context;
import android.content.SharedPreferences;
import android.text.TextUtils;
import android.util.Log;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

import static com.iqiyi.halberd.demo.impl.manager.LiteAppFrameworkManager.global_SP;

/**
 * Created by eggizhang@qiyi.com on 17-12-12.
 * This mirror loader load static files in package /assets/mirror/lite/
 * to cache storage path , this feature allows user to write files in
 * assets before lite app package loads from network ,enable local lite app package
 * from app installed.
 * */

public class LiteAppMirrorPackageLoader {

    private static final String TAG = LiteAppMirrorPackageLoader.class.getName();
    private static final String MIRROR_VALIDATED_KEY = "MIRROR_VALIDATED_KEY";

    public static void validateMirror(Context context){
        SharedPreferences sharedPreferences = context.getSharedPreferences(global_SP, Activity.MODE_PRIVATE);
        boolean validate = sharedPreferences.getBoolean(MIRROR_VALIDATED_KEY, false);
        if(!validate){
            //not yet
            Log.v(TAG,"validate Mirror");
            sharedPreferences.edit().putBoolean(MIRROR_VALIDATED_KEY, true).apply();
            //try once
            copyAssets(context, "mp_mirror", "lite");
        }else {
            Log.v(TAG,"skip Mirror");
        }
    }

    public static void clearMirrorPackage(Context context){
        SharedPreferences sharedPreferences = context.getSharedPreferences(global_SP, Activity.MODE_PRIVATE);
        sharedPreferences.edit().putBoolean(MIRROR_VALIDATED_KEY, false).apply();
    }

    /**
     * 拷贝assets文件下文件到指定路径
     *
     * @param context context
     * @param assetDir  源文件/文件夹
     * @param targetDir  目标文件夹
     */
    private static void copyAssets(Context context, String assetDir, String targetDir) {
        if (TextUtils.isEmpty(assetDir) || TextUtils.isEmpty(targetDir)) {
            return;
        }
        String separator = File.separator;
        try {
            // 获取assets目录assetDir下一级所有文件以及文件夹
            String[] fileNames = context.getResources().getAssets().list(assetDir);
            // 如果是文件夹(目录),则继续递归遍历
            if (fileNames.length > 0) {
                File targetFile = new File(context.getFilesDir(), targetDir);
                if (!targetFile.exists() && !targetFile.mkdirs()) {
                    return;
                }
                for (String fileName : fileNames) {
                    copyAssets(context, assetDir + separator + fileName, targetDir + separator + fileName);
                }
            } else { // 文件,则执行拷贝
                copy(context, assetDir, targetDir);
            }
        } catch (Exception e) {
            Log.e(TAG,"error mirror copy directory", e);
        }
    }

    /**
     * 复制文件
     *
     * @param context 上下文对象
     * @param zipPath 源文件
     * @param targetPath 目标文件
     */
    private static void copy(Context context, String zipPath, String targetPath) {
        if (TextUtils.isEmpty(zipPath) || TextUtils.isEmpty(targetPath)) {
            return;
        }
        File dest = new File(context.getFilesDir(), targetPath);
        dest.getParentFile().mkdirs();
        InputStream in = null;
        OutputStream out = null;
        try {
            in = new BufferedInputStream(context.getAssets().open(zipPath));
            out = new BufferedOutputStream(new FileOutputStream(dest));
            byte[] buffer = new byte[4096];
            int length = 0;
            while ((length = in.read(buffer)) != -1) {
                out.write(buffer, 0, length);
            }
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                out.close();
                in.close();
            } catch (IOException e) {
                Log.e(TAG,"error mirror copy file", e);
            }
        }
    }
}
