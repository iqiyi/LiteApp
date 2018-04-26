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

import android.text.TextUtils;

import com.iqiyi.halberd.liteapp.utils.LogUtils;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by eggizhang@qiyi.com on 2017/7/24.
 * use this class as a detailed description of lite app app
 */
public class LiteAppDetail {
    /** Identical unique Lite App ID used for lite app*/
    private String id;
    /** Version of this lite app cache*/
    private String version;
    /** Base version of this lite app */
    private String baseVersion;
    /** Window definition of this detail*/
    private WindowDetail window;
    /** Index home page of this detail*/
    private String index;
    /** Tab bar definitions for this detail*/
    private List<TabBarDetail> tabBar;
    /** Pages in this lite app*/
    private List<LiteAppPageDetail> pages;
    /** Permission used by this lite app*/
    private List<LiteAppPermission> permissions;

    public String getId() {
        return id;
    }

    public void setVersion(String version){
        this.version = version;
    }

    public String getVersion() {
        return version;
    }

    public void setBaseVersion(String baseVersion){
        this.baseVersion = baseVersion;
    }

    public String getBaseVersion() {
        return baseVersion;
    }

    public List<LiteAppPageDetail> getPages() {
        return pages;
    }

    public WindowDetail getWindow() {
        return window;
    }

    public String getIndex() {
        return index;
    }

    public List<TabBarDetail> getTabBar() {
        return tabBar;
    }

    @SuppressWarnings("unused")
    public List<LiteAppPermission> getPermissions() {
        return permissions;
    }

    public LiteAppPageDetail getPageByName(String name){
        if(pages!=null){
            for(LiteAppPageDetail pageDetail: pages){
                if(TextUtils.equals(pageDetail.getName(),name)){
                    return pageDetail;
                }
            }
        }
        return null;
    }

    public static LiteAppDetail parse(String source, String id){
        LiteAppDetail detail = new LiteAppDetail();
        try {
            JSONObject detailObject= new JSONObject(source);
            detail.id = detailObject.optString("id");
            if(TextUtils.isEmpty(detail.id)){
                detail.id = id;
            }
            detail.version= detailObject.optString("version");
            detail.baseVersion = detailObject.optString("baseVersion");
            detail.index = detailObject.optString("index");

            JSONObject windowsObject = detailObject.optJSONObject("window");
            if(windowsObject!=null) {
                WindowDetail windowDetail = new WindowDetail();
                windowDetail.title = windowsObject.optString("title");
                windowDetail.titleTextColor = windowsObject.optString("titleTextColor");
                windowDetail.backGroundColor = windowsObject.optString("backgroundColor");
                windowDetail.pullRefresh = windowsObject.optBoolean("pullrefresh");
                windowDetail.loadingColor = windowsObject.optString("loadingColor");
                detail.window = windowDetail;
            }

            JSONObject tabBarPropertyObject = detailObject.optJSONObject("tabbar");
            if(tabBarPropertyObject!=null) {
                JSONArray tabBarDetailArray = tabBarPropertyObject.optJSONArray("items");
                if (tabBarDetailArray != null) {
                    List<TabBarDetail> tabBarDetails = new ArrayList<>();
                    for (int i = 0; i < tabBarDetailArray.length(); i++) {
                        JSONObject tabBarObject = tabBarDetailArray.optJSONObject(i);
                        TabBarDetail tabBarDetail = new TabBarDetail();
                        tabBarDetail.unselectedIcon = tabBarObject.optString("unselectedIcon");
                        tabBarDetail.selectedIcon = tabBarObject.optString("selectedIcon");
                        tabBarDetail.title = tabBarObject.optString("title");
                        tabBarDetail.unselectedColor = tabBarObject.optString("titleUnselectedColor");
                        tabBarDetail.selectedColor = tabBarObject.optString("titleSelectedColor");
                        tabBarDetail.pageName = tabBarObject.optString("path");
                        tabBarDetails.add(tabBarDetail);
                    }
                    detail.tabBar = tabBarDetails;
                }
            }

            JSONArray page = detailObject.optJSONArray("pages");
            if(page!=null) {
                List<LiteAppDetail.LiteAppPageDetail> pageDetails = new ArrayList<>();
                for (int i = 0; i < page.length(); i++) {
                    JSONObject pageObject = page.optJSONObject(i);
                    if (pageObject!=null) {
                        LiteAppDetail.LiteAppPageDetail liteAppPageDetail =
                                new LiteAppDetail.LiteAppPageDetail();
                        liteAppPageDetail.path = pageObject.optString("path");
                        liteAppPageDetail.name = pageObject.optString("name");
                        pageDetails.add(liteAppPageDetail);
                    }
                }
                detail.pages = pageDetails;
            }
            JSONArray permissions = detailObject.optJSONArray("permission");
            if(permissions != null) {
                List<LiteAppDetail.LiteAppPermission> pagePermissions = new ArrayList<>();
                for (int i = 0; i < permissions.length(); i++) {
                    JSONObject permissionObj = permissions.optJSONObject(i);
                    String permissionID = permissionObj.optString("id");
                    String description = permissionObj.optString("desc");
                    LiteAppDetail.LiteAppPermission appPermission =
                            new LiteAppDetail.LiteAppPermission();
                    appPermission.id = permissionID;
                    appPermission.description = description;
                    pagePermissions.add(appPermission);
                }
                detail.permissions = pagePermissions;
            }
        } catch (JSONException e) {
            LogUtils.logError(LogUtils.LOG_MINI_PROGRAM_ERROR,"error query lite app manifest manifest",e);
        }
        return detail;
    }

    /**
     * Inner class to describe a lite app page
     * */
    public static class LiteAppPageDetail{
        /** name for this page*/
        String name;
        /** the js pageName for this lite app page*/
        String path;

        public String getName(){
            return name;
        }

        public String getPath() {
            return path;
        }
    }

    /** Global window definition for this lite app*/
    @SuppressWarnings("unused")
    public static class WindowDetail {
        /** Global name of this lite app */
        String title;
        /** Title bar text color */
        String titleTextColor;
        /** Back ground color*/
        String backGroundColor;
        /** Is pull refresh enabled for this lite app */
        boolean pullRefresh;
        /** back ground color when loading this lite app*/
        String loadingColor;

        public String getTitle() {
            return title;
        }

        public String getTitleTextColor() {
            return titleTextColor;
        }

        public String getBackGroundColor() {
            return backGroundColor;
        }

        public boolean isPullRefresh() {
            return pullRefresh;
        }

        public String getLoadingColor() {
            return loadingColor;
        }

    }

    /**
     * Tab bar definition for this lite app
     **/
    public static class TabBarDetail{
        /** tab bar icon when unselected*/
        String unselectedIcon;
        /** tab bar icon when selected*/
        String selectedIcon;
        /** tab bar title*/
        String title;
        /** tab bar unselected color */
        String selectedColor;
        /** tab bar selected color*/
        String unselectedColor;
        /** tab bar pageName to a page definition*/
        String pageName;

        public String getUnselectedIcon() {
            return unselectedIcon;
        }

        public String getSelectedIcon() {
            return selectedIcon;
        }

        public String getTitle() {
            return title;
        }

        public String getSelectedColor() {
            return selectedColor;
        }

        public String getUnselectedColor() {
            return unselectedColor;
        }

        public String getPageName() {
            return pageName;
        }
    }

    /** A permission used for this lite app  */
    public static class LiteAppPermission{
        /** permission type*/
        String id;
        /** description for why need these permission */
        String description;

        public String getID() {
            return id;
        }

        public String getDescription() {
            return description;
        }
    }
}
