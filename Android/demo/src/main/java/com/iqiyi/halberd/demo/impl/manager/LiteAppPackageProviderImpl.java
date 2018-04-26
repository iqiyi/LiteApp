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
import android.support.annotation.Nullable;
import android.text.TextUtils;

import com.iqiyi.halberd.liteapp.api.provider.LiteAppPackageClient;
import com.iqiyi.halberd.liteapp.manager.impl.LiteAppDetail;

/**
 * Created by eggizhang on 18-3-5.
 * Using this impl to implement lite app package provider to provide
 * lite app files
 */
public class LiteAppPackageProviderImpl implements LiteAppPackageClient{
    private Context context;

    public LiteAppPackageProviderImpl(Context context){
        this.context = context;
    }

    @Override
    public void cleanMemoryCache() {
        if(LiteAppPackageManager.getInstance().isMemoryCacheDirty()) {
            LiteAppFrameworkManager.getInstance().cleanMemoryCache();
            LiteAppPackageManager.getInstance().cleanMemoryCache();
            SharedPreferences.Editor editor = context.getSharedPreferences(
                    LiteAppFrameworkManager.global_SP, Activity.MODE_PRIVATE).edit();
            editor.putString(LiteAppFrameworkManager.managerFrameworkCacheStatus, "");
            editor.apply();
        }
    }

    @Override
    public LiteAppDetail prepareLiteAppIfCache(String liteAppID) {
        if(TextUtils.isEmpty(liteAppID)){
            return null;
        }
        LiteAppDetail detail =LiteAppPackageManager.getInstance().getLiteAppDetailCache(context,liteAppID);
        if(detail!=null){
            LiteAppFrameworkManager.getInstance().setDefaultFrameworkVersion(context, detail.getBaseVersion());
        }
        return detail;
    }

    @Override
    public LiteAppDetail prepareLiteAppFromServer(String liteAppID) {
        if(TextUtils.isEmpty(liteAppID)){
            return null;
        }
        return LiteAppPackageManager.getInstance().getLiteAppDetailUpdate(context, liteAppID);
    }

    @Override
    public String getLiteAppFrameworkWebViewPart(@Nullable String liteAppID) {
        String baseVersion;
        if(TextUtils.isEmpty(liteAppID) || TextUtils.equals(liteAppID, "")){
            baseVersion = LiteAppFrameworkManager.getInstance().getDefaultFrameworkVersion(context);
        } else {
            baseVersion = LiteAppFrameworkManager.getInstance().getLiteAppFrameworkVersion(context, liteAppID);
        }
        return LiteAppFrameworkManager.getInstance().getLiteAppWebViewFramework(context,baseVersion);
    }

    @Override
    public String getLiteAppFrameworkJSCPart(@Nullable String liteAppID) {
        String baseVersion;
        if(TextUtils.isEmpty(liteAppID) || TextUtils.equals(liteAppID, "")){
            baseVersion = LiteAppFrameworkManager.getInstance().getDefaultFrameworkVersion(context);
        } else {
            baseVersion = LiteAppFrameworkManager.getInstance().getLiteAppFrameworkVersion(context, liteAppID);
        }
        return  LiteAppFrameworkManager.getInstance().getLiteAppFramework(context, baseVersion)
                + LiteAppFrameworkManager.getInstance().getLiteAppComponentJS(context, baseVersion);
    }

    @Override
    public String getLiteAppPageBundle(String liteAppID,String pagePath) {
        return LiteAppPackageManager.getInstance().getPageCache(context, liteAppID, pagePath);
    }

    @Override
    public String getLiteAppPageBundleCssPath(@Nullable String liteAppID, String pagePath) {
        return LiteAppPackageManager.getInstance().getCssPath(context,liteAppID,  pagePath);
    }

    @Override
    public String getLiteAppFile(String id, String filePath) {
        String packageResult = LiteAppPackageManager.getInstance().getFileCache(context,id,filePath);
        String baseVersion =  LiteAppFrameworkManager.getInstance().getLiteAppFrameworkVersion(context,id);
        if(packageResult == null && !TextUtils.isEmpty(baseVersion)){
            packageResult = LiteAppFrameworkManager.getInstance().getFileFromCache(context,
                    baseVersion, filePath);
        }
        return packageResult;
    }

    @Override
    public byte[] getLiteAppFileBytes(String id, String path) {
        byte[] resultByte =  LiteAppPackageManager.getInstance().getLiteAppFileByte(context,id,path);
        String baseVersion =  LiteAppFrameworkManager.getInstance().getLiteAppFrameworkVersion(context,id);
        if(resultByte == null && !TextUtils.isEmpty(baseVersion)){
            String temp = LiteAppFrameworkManager.getInstance().getFileFromCache(context,
                   baseVersion, path);
            return temp.getBytes();
        }
        return resultByte;
    }
}
