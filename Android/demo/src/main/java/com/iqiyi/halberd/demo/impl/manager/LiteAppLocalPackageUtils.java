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

import android.content.Context;
import android.text.TextUtils;

import com.iqiyi.halberd.liteapp.utils.LogUtils;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

/**
 * Created by eggizhang@qiyi.com on 2017/7/19.
 * storage & get local lite app caches
 */
@SuppressWarnings("unused")
public class LiteAppLocalPackageUtils {
    private final static String TAG = LiteAppLocalPackageUtils.class.getName();

    static void storageLiteAppCache(Context context, String id, String path, String content){
        storageLiteAppCache(context, "lite/" +  id + "/" + path, content);
    }

    static String getLiteAppCache(Context context, String id, String path){
        return getLiteAppCache(context, "lite/" + id + "/" + path);
    }   

    public static void cleanAlLiteappCache(Context context){
        File file = new File(context.getFilesDir(), "lite");
        deleteRecursive(file);
    }

    public static void cleanLiteAppWithID(Context context, String id){
        File file = new File(context.getFilesDir(), "lite/" + id);
        deleteRecursive(file);
    }

    private static void deleteRecursive(File fileOrDirectory) {
        if (fileOrDirectory.isDirectory())
            for (File child : fileOrDirectory.listFiles()) {
                deleteRecursive(child);
            }
        fileOrDirectory.delete();
    }

    static byte[] getLiteAppBytesCache(Context context, String id, String path){
        String storagePath = "lite/" + id + "/" + path;
        try {
            File file = new File(context.getFilesDir(), storagePath);
            if(!file.exists()){
                return null;
            }
            FileInputStream fin = new FileInputStream(file);
            byte[] readBuffer = new byte[fin.available()];
            fin.read(readBuffer);
            return readBuffer;
        } catch (IOException e) {
            LogUtils.logError(LogUtils.LOG_MINI_PROGRAM_ERROR,"error when creating cache",e);
        }
        return null;
    }

    public static boolean storageLiteAppByteCache(Context context, String id, String path,
                                                      byte[] storageBytes){
        String storagePath = "lite/" + id + "/" + path;
        try {
            LogUtils.log(LogUtils.LOG_MINI_PROGRAM_CACHE,LogUtils.CACHE_IMAGE+LogUtils.CACHE_DISK_CREATE+LogUtils.ACTION_START);
            if(storageBytes == null){
                return false;
            }
            File file = new File(context.getFilesDir(), storagePath);
            createParentPath(file);
            if(file.exists()){
                file.delete();
            }
            file.createNewFile();
            FileOutputStream fout = new FileOutputStream(file);
            fout.write(storageBytes);
            LogUtils.log(LogUtils.LOG_MINI_PROGRAM_CACHE,LogUtils.CACHE_IMAGE+LogUtils.CACHE_DISK_CREATE+LogUtils.ACTION_STOP);
            return true;
        } catch (IOException e) {
            LogUtils.logError(LogUtils.LOG_MINI_PROGRAM_ERROR,"error when creating cache",e);
        }
        return false;
    }

    static InputStream getLiteAppStreamCache(Context context, String id, String path){
        String storagePath = "lite/" + id + "/" + path;
        try {
            File file = new File(context.getFilesDir(), storagePath);
            if(!file.exists()){
                return null;
            }
            return new FileInputStream(file);
        } catch (IOException e) {
            LogUtils.logError(LogUtils.LOG_MINI_PROGRAM_ERROR,"error when creating cache",e);
        }
        return null;
    }

    static void storageLiteAppStreamCache(Context context, String id, String path,
                                              InputStream inputStream){
        String storagePath = "lite/" + id + "/" + path;
        try {
            if(inputStream == null){
                return;
            }
            File file = new File(context.getFilesDir(), storagePath);
            createParentPath(file);
            if(file.exists()){
                file.delete();
            }
            file.createNewFile();
            FileOutputStream fout = new FileOutputStream(file);
            byte[] buffer = new byte[16 * 1024];
            int count = 0;
            while ((count = inputStream.read(buffer)) != -1)
            {
                fout.write(buffer, 0, count);
            }
        } catch (IOException e) {
            LogUtils.logError(LogUtils.LOG_MINI_PROGRAM_ERROR,"error when creating cache",e);
        }
    }

    private static void storageLiteAppCache(Context context, String path, String content){
        try {
            LogUtils.log(LogUtils.LOG_MINI_PROGRAM_CACHE,LogUtils.CACHE_FILE+LogUtils.CACHE_DISK_CREATE+LogUtils.ACTION_START);
            if(TextUtils.isEmpty(content)){
                return;
            }
            File file = new File(context.getFilesDir(), path);
            if(file.exists()){
                file.delete();
            }

            createParentPath(file);
            file.createNewFile();

            FileOutputStream fout = new FileOutputStream(file);
            fout.write(content.getBytes());
            LogUtils.log(LogUtils.LOG_MINI_PROGRAM_CACHE,LogUtils.CACHE_FILE+LogUtils.CACHE_DISK_CREATE+LogUtils.ACTION_STOP);
        } catch (IOException e) {
            LogUtils.logError(LogUtils.LOG_MINI_PROGRAM_ERROR,"error when creating cache",e);
        }
    }

    private static void createParentPath(File file){
        File parent = file.getParentFile();
        if(!parent.exists()){
            createParentPath(parent);
            parent.mkdir();
        }
    }

    private static String getLiteAppCache(Context context,String path){
        try {
            File file = new File(context.getFilesDir(), path);
            if(!file.exists()){
                return null;
            }
            StringBuilder sb = new StringBuilder();
            FileInputStream fin = new FileInputStream(file);
            BufferedReader reader = new BufferedReader(new InputStreamReader(fin));
            String line = null;
            while ((line = reader.readLine()) != null) {
                sb.append(line).append("\n");
            }
            reader.close();
            return sb.toString();
        } catch (IOException e) {
            LogUtils.logError(LogUtils.LOG_MINI_PROGRAM_ERROR,"error when creating cache",e);
        }
        return null;
    }
}
