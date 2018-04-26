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
package com.iqiyi.halberd.liteapp.manager.impl;

import com.iqiyi.halberd.liteapp.utils.LogUtils;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by eggizhang@qiyi.com on 2017/7/19.
 * A description for a lite app
 */
@SuppressWarnings("unused")
public class LiteAppDescription {
    /** id of a lite app */
    private String id;
    /** shown name for a lite app*/
    private String name;
    /** version of a lite app */
    private String version;
    /** version of this lite app base framework*/
    private String baseVersion;
    /** is this app currently disables*/
    private boolean enabled;
    /** check is need update*/
    private boolean needUpdate;
    /** cdn of this app*/
    private String CDN;
    /** configuration for manifest file of this lite app */
    private String manifestPath;
    /** package location of this lite app*/
    private String packagePath;

    private final static String TAG = LiteAppDescription.class.getName();

    public static LiteAppDescription parse(String source){
        try {
            JSONObject searchResultObject = new JSONObject(source);
            LiteAppDescription description = new LiteAppDescription();
            description.setId(searchResultObject.optString("id"));
            description.setName(searchResultObject.optString("name"));
            description.setBaseVersion(searchResultObject.optString("base_version"));
            description.setVersion(searchResultObject.optString("version"));
            description.setCDN(searchResultObject.optString("cdn"));
            description.setEnabled(searchResultObject.optBoolean("enabled"));
            description.setNeedUpdate(searchResultObject.optBoolean("update"));
            description.setManifestPath(searchResultObject.optString("manifest_url"));
            description.setPackagePath(searchResultObject.optString("package"));
            return description;

        } catch (JSONException e){
            LogUtils.logError(LogUtils.LOG_MINI_PROGRAM_ERROR,"search lite app result format error",e);
        }
        return null;
    }

    public static List<LiteAppDescription> parseList(String source){
        try {
            JSONObject searchResultObject = new JSONObject(source);
            boolean success = searchResultObject.getBoolean("success");
            if(success){
                List<LiteAppDescription> descriptions = new ArrayList<>();
                JSONArray resultArray = searchResultObject.getJSONArray("data");
                for(int i = 0; i <resultArray.length(); i++){
                    JSONObject item = resultArray.optJSONObject(i);
                    LiteAppDescription description = new LiteAppDescription();
                    description.setId(item.optString("id"));
                    description.setName(item.optString("name"));
                    description.setVersion(item.optString("version"));
                    description.setBaseVersion(searchResultObject.optString("base_version"));
                    description.setCDN(item.optString("cdn"));
                    description.setEnabled(item.optBoolean("enabled"));
                    description.setNeedUpdate(searchResultObject.optBoolean("update"));
                    description.setManifestPath(searchResultObject.optString("manifest_url"));
                    description.setPackagePath(searchResultObject.optString("package"));
                    descriptions.add(description);
                }
                return descriptions;
            }
        } catch (JSONException e) {
            LogUtils.logError(LogUtils.LOG_MINI_PROGRAM_ERROR,"search lite app result format error",e);
        }
        return null;
    }

    public String getId() {
        return id;
    }

    public LiteAppDescription setId(String id) {
        this.id = id;
        return this;
    }

    public String getBaseVersion() {
        return baseVersion;
    }

    public void setBaseVersion(String baseVersion) {
        this.baseVersion = baseVersion;
    }

    public String getName() {
        return name;
    }

    public LiteAppDescription setName(String name) {
        this.name = name;
        return this;
    }

    public String getPackagePath() {
        return packagePath;
    }

    public void setPackagePath(String packagePath) {
        this.packagePath = packagePath;
    }

    public String getVersion() {
        return version;
    }

    public LiteAppDescription setVersion(String version) {
        this.version = version;
        return this;
    }

    public boolean isEnabled() {
        return enabled;
    }

    public LiteAppDescription setEnabled(boolean disabled) {
        this.enabled = disabled;
        return this;
    }

    public String getCDN() {
        return CDN;
    }

    public LiteAppDescription setCDN(String CDN) {
        this.CDN = CDN;
        return this;
    }

    public String getManifestPath() {
        return manifestPath;
    }

    public LiteAppDescription setManifestPath(String manifestPath) {
        this.manifestPath = manifestPath;
        return this;
    }

    public boolean isNeedUpdate() {
        return needUpdate;
    }

    public LiteAppDescription setNeedUpdate(boolean needUpdate) {
        this.needUpdate = needUpdate;
        return this;
    }

}
