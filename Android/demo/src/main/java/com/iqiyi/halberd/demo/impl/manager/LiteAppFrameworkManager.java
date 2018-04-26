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

import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.Context;
import android.content.SharedPreferences;
import android.text.TextUtils;

import com.iqiyi.halberd.liteapp.utils.LogUtils;

import java.util.HashMap;

/**
 * Created by eggizhang@qiyi.com on 17-10-19.
 * using this lite app framework manager to manage lite app framework
 */
public class LiteAppFrameworkManager {
    private static final String liteAppFrameworkPath = "core/qy.thread.js";
    private static final String liteAppComponentPath = "component/component.thread.js";

    private static final String liteAppFrameworkWebViewPath = "template.html";
    private static final String liteAppFrameworkID = "base";

    static final String managerFrameworkCacheStatus = "managerFrameworkCacheStatus";
    static final String global_SP = "global";
    private String liteAppDefaultVersion;

    private String cacheFrameworkVersion = "";
    private HashMap<String, String> cacheFrameworkFile = new HashMap<>();

    public static LiteAppFrameworkManager getInstance(){
        return Host.instance;
    }

    public void cleanMemoryCacheAndDefaultPreference(Context context){
        setDefaultFrameworkVersion(context, "");
        cacheFrameworkVersion = "";
        cacheFrameworkFile.clear();
    }

    void cleanMemoryCache(){
        cacheFrameworkVersion = "";
        cacheFrameworkFile.clear();
    }

    String getDefaultFrameworkVersion(Context context){
        //prepare before use
        if(liteAppDefaultVersion!=null){
            return liteAppDefaultVersion;
        }
        SharedPreferences sp = context.getSharedPreferences(global_SP, Activity.MODE_PRIVATE);
        String cachedVersion = sp.getString(managerFrameworkCacheStatus,"");
        if(TextUtils.isEmpty(cachedVersion)){
            //when first installed use default version with package, default version
            cachedVersion = "";
            SharedPreferences.Editor editor = sp.edit();
            editor.putString(managerFrameworkCacheStatus, cachedVersion);
            editor.apply();
        }

        liteAppDefaultVersion = cachedVersion;
        return liteAppDefaultVersion;
    }

    @SuppressLint("ApplySharedPref")
    public void setDefaultFrameworkVersion(Context context, String version){
        liteAppDefaultVersion = version;
        SharedPreferences sp = context.getSharedPreferences(global_SP, Activity.MODE_PRIVATE);
        SharedPreferences.Editor editor = sp.edit();
        editor.putString(managerFrameworkCacheStatus, version).commit();
    }

    String getLiteAppFrameworkVersion(Context context, String liteAppID){
        if(TextUtils.isEmpty(liteAppID)){
            return getDefaultFrameworkVersion(context);
        }
        if(LiteAppPackageManager.getInstance().getLiteAppDetailCache(context,liteAppID)!=null) {
            return LiteAppPackageManager.getInstance().getLiteAppDetailCache(context, liteAppID).getBaseVersion();
        }
        return getDefaultFrameworkVersion(context);
    }

    String getLiteAppFramework(Context context, String version) {
        if(TextUtils.isEmpty(version)){
            return null;
        }
        if(TextUtils.equals(version,"notValid" )){
            //empty version when just installed this app
            return null;
        }

        return getFileFromCache(context, version, liteAppFrameworkPath);
    }

    String getLiteAppComponentJS(Context context, String version){
        return getFileFromCache(context, version, liteAppComponentPath);
    }

    String getLiteAppWebViewFramework(Context context, String version) {
        return getFileFromCache(context, version, liteAppFrameworkWebViewPath);
    }

    String getFileFromCache(Context context, String version, String path){
        String versionID = liteAppFrameworkID + "/" + version;
        String cacheString = null;
        if(TextUtils.equals(cacheFrameworkVersion,versionID)){
            if(cacheFrameworkFile.containsKey(
                    path)){
                cacheString = cacheFrameworkFile.get(path);
            }
        } else {
            cacheFrameworkFile.clear();
            cacheFrameworkVersion = "";
        }
        if(TextUtils.isEmpty(cacheString)){
            cacheString = LiteAppLocalPackageUtils.getLiteAppCache(context,versionID,
                    path);
            if(!TextUtils.isEmpty(cacheString)){
                cacheFrameworkVersion = versionID;
                cacheFrameworkFile.put(path,cacheString);
            }else {
                LogUtils.log(LogUtils.LOG_MINI_PROGRAM_CACHE,LogUtils.CACHE_FILE+LogUtils.CACHE_DISK_HIT);
            }
        }else {
            LogUtils.log(LogUtils.LOG_MINI_PROGRAM_CACHE,LogUtils.CACHE_FILE+LogUtils.CACHE_MEMORY_HIT);
        }
        if (cacheString == null){
            cacheString = "";
        }
        return cacheString;
    }

    private LiteAppFrameworkManager(){}

    private static class Host{
        static final LiteAppFrameworkManager instance;

        static {
            instance = new LiteAppFrameworkManager();
        }
    }
}
