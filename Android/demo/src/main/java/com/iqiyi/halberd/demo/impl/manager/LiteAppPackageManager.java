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

import com.iqiyi.halberd.liteapp.manager.impl.LiteAppDescription;
import com.iqiyi.halberd.liteapp.manager.impl.LiteAppDetail;
import com.iqiyi.halberd.liteapp.utils.LogUtils;

import java.util.HashMap;
import java.util.List;

/**
 * Created by eggizhang@qiyi.com on 2017/7/19.
 * a package manager for lite app to communicate with server and
 * retrieve lite app packages and manifests
 */
@SuppressWarnings("unused")
public class LiteAppPackageManager {
    public static LiteAppPackageManager getInstance() {
        return Host.instance;
    }

    //simple network client
    ZipLiteAppServerClient client = new ZipLiteAppServerClient();

    //use memory cache to cache a lite app
    private HashMap<String,String> cachedFile = new HashMap<>();
    private HashMap<String,byte[]> cachedBytes = new HashMap<>();
    private LiteAppDetail cachedDetail;
    private String cacheAppID = "";
    private boolean memoryCacheDirty = false;

    private static final String TAG = LiteAppPackageManager.class.getName();

    public List<LiteAppDescription> getSearchLiteApp(Context context, String text,
                                                             boolean forceUpdate){
        return client.searchLiteApp(text,context,forceUpdate);
    }

    public void cleanMemoryCache(){
        cachedFile.clear();
        cachedBytes.clear();
        cachedDetail = null;
        cacheAppID = "";
    }

    /**
     * Feel memory cache dirty means activity may still using old version app
     * mark it as dirty when updated, and when activity destroy will check this mark
     * and clean memory cache to avoid changing version in lite app instant run time
     * and cause bugs
     * */
    public void markMemoryCacheDirty(boolean isDirty){
        memoryCacheDirty = isDirty;
    }

    public boolean isMemoryCacheDirty(){
        return memoryCacheDirty;
    }

    /**
     * Using this lite app file byte
     * */
    public byte[] getLiteAppFileByte(Context context, String id, String path){
        byte[] imageCache = null;
        if(TextUtils.equals(cacheAppID,id)){
            if(cachedBytes.containsKey(path)){
                imageCache = cachedBytes.get(path);
            }
        } else {
            cachedFile.clear();
            cachedBytes.clear();
            cachedDetail = null;
            cacheAppID = "";
        }
        if(imageCache == null){
            imageCache = LiteAppLocalPackageUtils.getLiteAppBytesCache(context,id,
                    path);
            if(imageCache != null){
                LogUtils.log(LogUtils.LOG_MINI_PROGRAM_CACHE,LogUtils.CACHE_IMAGE+LogUtils.CACHE_DISK_HIT);
                cacheAppID = id;
                cachedBytes.put(path,imageCache);
                LogUtils.log(LogUtils.LOG_MINI_PROGRAM_CACHE,LogUtils.CACHE_IMAGE+LogUtils.CACHE_MEMORY_CREATE);
            }
        }else {
            LogUtils.log(LogUtils.LOG_MINI_PROGRAM_CACHE,LogUtils.CACHE_IMAGE+LogUtils.CACHE_MEMORY_HIT);
        }
        return imageCache;
    }

    public LiteAppDetail getLiteAppDetailUpdate(Context context, String id){
        checkUpdate(context,id);
        return getLiteAppDetailCache(context,id);
    }

    public LiteAppDetail getLiteAppDetailCache(Context context, String id){
        String cacheString;
        String VersionString;
        if(TextUtils.equals(cacheAppID, id)){
            if(cachedDetail!=null) {
                LogUtils.log(LogUtils.LOG_MINI_PROGRAM_CACHE,LogUtils.CACHE_FILE+LogUtils.CACHE_MEMORY_HIT);
                return cachedDetail;
            }
        } else {
            cacheString = LiteAppLocalPackageUtils.getLiteAppCache(context,id,
                    "conf/manifest.json");

            if(!TextUtils.isEmpty(cacheString)){
                cacheAppID = id;
                cachedDetail = LiteAppDetail.parse(cacheString,id);
                String versionFile = getFileCache(context,id,"version");
                if(TextUtils.isEmpty(versionFile)){
                    return null;
                }
                LiteAppDescription description = LiteAppDescription.parse(versionFile);
                if(description==null){
                    return null;
                }
                if(cachedDetail!=null) {
                    if (TextUtils.isEmpty(cachedDetail.getVersion())) {
                        cachedDetail.setVersion(description.getVersion());
                    }
                    cachedDetail.setBaseVersion(description.getBaseVersion());
                }
                cachedFile.clear();
                cachedBytes.clear();
                LogUtils.log(LogUtils.LOG_MINI_PROGRAM_CACHE, LogUtils.CACHE_FILE + LogUtils.CACHE_DISK_HIT);
                return cachedDetail;
            }
        }
        return null;
    }

    public String getFileCache(Context context, String id, String path){
        String cacheString = null;
        if(TextUtils.equals(cacheAppID,id)){
            if(cachedFile.containsKey(
                    path)){
                cacheString = cachedFile.get(path);
            }
        } else {
            cachedFile.clear();
            cachedBytes.clear();
            cachedDetail = null;
            cacheAppID = "";
        }
        if(TextUtils.isEmpty(cacheString)){
            cacheString = LiteAppLocalPackageUtils.getLiteAppCache(context,id,
                    path);
            if(!TextUtils.isEmpty(cacheString)){
                cacheAppID = id;
                cachedFile.put(path,cacheString);
            }else {
                LogUtils.log(LogUtils.LOG_MINI_PROGRAM_CACHE,LogUtils.CACHE_FILE+LogUtils.CACHE_DISK_HIT);
            }
        }else {
            LogUtils.log(LogUtils.LOG_MINI_PROGRAM_CACHE,LogUtils.CACHE_FILE+LogUtils.CACHE_MEMORY_HIT);
        }
        return cacheString;
    }

    public String getPageCache(Context context, String id,
                               String pagePath){
        if(pagePath.startsWith("/")){
            pagePath = pagePath.substring(1,pagePath.length());
        }
        String path = pagePath + "bundle.js";
        return getFileCache(context,id,path);
    }

    String getCssPath(Context context, String id, String pagePath){
        return pagePath + "bundle.css";
    }

    private LiteAppDescription checkUpdate(Context context, String id){
        LiteAppDescription description;
        //by default no version
        String version = "-1";
        LiteAppDetail cacheDetail= getLiteAppDetailCache(context,id);
        if(cacheDetail!=null){
            version =cacheDetail.getVersion();
        }
        description = client.checkPackageUpdate(context, id, version);
        if(description!=null){
            if(description.isNeedUpdate()){
                LiteAppLocalPackageUtils.cleanLiteAppWithID(context,id);
                cachedDetail =null;
                cachedFile.clear();
                cacheAppID = "";
            }
        }
        return  description;
    }

    private static class Host {
        private final static LiteAppPackageManager instance = new LiteAppPackageManager();
    }
    private LiteAppPackageManager (){}
}
