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
package com.iqiyi.halberd.liteapp.plugin.title;

import android.app.Activity;
import android.content.res.Configuration;
import android.graphics.BitmapFactory;
import android.graphics.drawable.BitmapDrawable;
import android.graphics.drawable.ColorDrawable;
import android.graphics.drawable.Drawable;
import android.os.Build;
import android.util.Log;
import android.view.View;

import com.iqiyi.halberd.liteapp.LiteAppFragmentActivity;
import com.iqiyi.halberd.liteapp.common.BridgeConstant;
import com.iqiyi.halberd.liteapp.context.ExecutorManager;
import com.iqiyi.halberd.liteapp.event.BridgeEvent;
import com.iqiyi.halberd.liteapp.plugin.BasePlugin;
import com.iqiyi.halberd.liteapp.utils.LogUtils;
import com.iqiyi.halberd.liteapp.view.LiteAppBaseActivity;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import static com.iqiyi.halberd.liteapp.context.LiteAppContext.TAG_TITLE_CONFIG;

/**
 * Created by xujiajia_sx on 2017/10/17.
 * using this plugin to modify title bar for lite app page activity.
 */

public class SetTitlePlugin extends BasePlugin {
    public static final String TAG = SetTitlePlugin.class.getName();

    @Override
    public boolean interceptEvent(BridgeEvent event) {
        return false;
    }

    @Override
    public void onEvent(final BridgeEvent event) {
        Log.d(TAG,event.getType());
        if (BridgeConstant.BRIDGE_SET_TITLE.equals(event.getType())) {
            LiteAppBaseActivity topActivity=null;
            if (LiteAppFragmentActivity.topInstance != null) {
                topActivity = LiteAppFragmentActivity.topInstance.get();
            }
            if( topActivity ==null){
                return;
            }
            final LiteAppBaseActivity activity = topActivity;
            TitleConfig titleConfig =(TitleConfig) event.getContext().getTag(TAG_TITLE_CONFIG);
            if(titleConfig==null) {
                titleConfig=new TitleConfig();
                titleConfig.init(activity);
            }
            try {
                JSONObject dataObj = new JSONObject(event.getData());
                final String packageId = dataObj.optString("packageId");
                final String text = dataObj.optString("text");
                final int color = dataObj.optInt("color", -1);
                final Drawable logo = getPictureFromFile(activity, packageId, dataObj.optString("logoPath"));
                final boolean isShowTitle = dataObj.optBoolean("isShowTitle", true);
                final int mode = dataObj.optInt("mode", -1);
                final boolean isShowMenu = dataObj.optBoolean("isShowMenu", false);
                final String menuList=dataObj.optString("menuList","");

                if (!text.equals(""))
                    titleConfig.setText(text);
                if (color != -1)
                    titleConfig.setColor(color);
                if (logo != null)
                    titleConfig.setLogo(logo);
                titleConfig.setShowTitle(isShowTitle);
                if(mode!=-1){
                    titleConfig.setMode(mode);
                }
                titleConfig.setShowMenu(isShowMenu);
                if(!menuList.equals(""))
                    transformMenuList(event, activity, packageId, titleConfig.getTitleMenuArray(),menuList);

                if(event.getContext().getTag(TAG_TITLE_CONFIG)==null) {
                    event.getContext().setTag(TAG_TITLE_CONFIG, titleConfig);
                }
                activity.runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        refreshTitle(activity,(TitleConfig) event.getContext().getTag(TAG_TITLE_CONFIG));
                    }
                });
            } catch (JSONException e) {
                LogUtils.logError(LogUtils.LOG_MINI_PROGRAM_ERROR, "error in set title bar ",e);
            }
        }else if (BridgeConstant.BRIDGE_ON_RESUME.equals(event.getType())) {
            LiteAppBaseActivity topActivity=null;
            if (LiteAppFragmentActivity.topInstance != null) {
                topActivity = LiteAppFragmentActivity.topInstance.get();
            }
            if( topActivity ==null){
                return;
            }
            refreshTitle(topActivity,(TitleConfig) event.getContext().getTag(TAG_TITLE_CONFIG));
        }else if (BridgeConstant.BRIDGE_ON_PAUSE.equals(event.getType())){
            LiteAppBaseActivity topActivity=null;
            if (LiteAppFragmentActivity.topInstance != null) {
                topActivity = LiteAppFragmentActivity.topInstance.get();
            }
            if( topActivity ==null){
                return;
            }
            topActivity.cleanMenu();
        }else if(BridgeConstant.BRIDGE_CLEAN_MENU.equals(event.getType())){
            LiteAppBaseActivity topActivity=null;
            if (LiteAppFragmentActivity.topInstance != null) {
                topActivity = LiteAppFragmentActivity.topInstance.get();
            }
            if( topActivity ==null){
                return;
            }
            final LiteAppBaseActivity activity = topActivity;

            TitleConfig titleConfig =(TitleConfig) event.getContext().getTag(TAG_TITLE_CONFIG);
            if(titleConfig!=null) {
                titleConfig.getTitleMenuArray().clear();
            }
            activity.cleanMenu();

        }
    }

    private static void refreshTitle(LiteAppBaseActivity activity,TitleConfig titleConfig) {
        if(activity==null){
            return;
        }
        if(titleConfig==null){
            titleConfig=new TitleConfig();
            titleConfig.init(activity);
        }
        if(activity.getResources().getConfiguration().orientation== Configuration.ORIENTATION_LANDSCAPE){
            if (Build.VERSION.SDK_INT >= 19) {
                //for new api versions.
                View decorView = activity.getWindow().getDecorView();
                int uiOptions = View.SYSTEM_UI_FLAG_HIDE_NAVIGATION
                        | View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY | View.SYSTEM_UI_FLAG_FULLSCREEN;
                decorView.setSystemUiVisibility(uiOptions);
            }
            return;
        }
        boolean isShowTitle = titleConfig.isShowTitle();
        boolean isShowMenu = titleConfig.isShowMenu();
        String text = titleConfig.getText();
        int color = titleConfig.getColor();
        Drawable logo = titleConfig.getLogo();
        int mode=titleConfig.getMode();
        ArrayList<TitleMenuItem> titleMenuArray = titleConfig.getTitleMenuArray();

        if(text.equals("")){
            text="爱奇艺";
        }
        if(color==-1){
            color=0x424242;
        }

        if (isShowTitle) {
            activity.showTitleBar();
        } else {
            activity.hideTitleBar();
        }
        activity.setTitle(text);
        activity.setTitleBarBackground(new ColorDrawable(color));
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            //设置状态栏颜色
            activity.getWindow().setStatusBarColor(color);
        }
        activity.setTitleBarLogo(logo);

        if(mode!=-1){
            activity.setMenuMode(mode);
        }
        activity.setShowActionMenu(isShowMenu);
        if(titleMenuArray!=null) {
            for (int i = 0; i < titleMenuArray.size(); i++)
                activity.addTitleMenuItem(titleMenuArray.get(i));
        }
        activity.invalidateOptionsMenu();
    }


    private void transformMenuList(final BridgeEvent event, Activity activity, String packageId,
                                   ArrayList<TitleMenuItem> titleMenuArray, String menuString) {
        if (!menuString.equals("")) {
            try {
                JSONArray jsonArray = new JSONArray(menuString);
                for(int i=0;i<jsonArray.length();i++){
                    JSONObject jsonObject=jsonArray.getJSONObject(i);
                    final String id=jsonObject.optString("id");
                    final String text=jsonObject.optString("text");
                    final String icon=jsonObject.optString("icon");
                    TitleMenuItem item=new TitleMenuItem(id, text, getPictureFromFile(activity, packageId, icon),
                            new TitleMenuItem.OnClickListener() {
                                @Override
                                public void onClick() {
                                    try {
                                        JSONObject clickEvent=new JSONObject();
                                        clickEvent.put("id",id);
                                        clickEvent.put("type","MenuItemClick");
                                        ExecutorManager.executeScript(event.getContext(),
                                                "__thread__.getEvent(" + clickEvent.toString() + ");");
                                    } catch (JSONException e) {
                                        LogUtils.logError(LogUtils.LOG_MINI_PROGRAM_ERROR, "menuItemClick error",e);
                                    }
                                }
                            }
                    );
                    titleMenuArray.add(item);
                }
            } catch (JSONException e) {
                LogUtils.logError(LogUtils.LOG_MINI_PROGRAM_ERROR, "menuList transform error.",e);
            }
        }
    }

    private Drawable getPictureFromFile(Activity activity, String packageId, String path) {
        if (path.equals("")) {
            return null;
        } else {
            String storagePath = "lite/" + packageId + "/" + path;
            try {
                File file = new File(activity.getFilesDir(), storagePath);
                if(!file.exists()){
                    return null;
                }
                FileInputStream fin = new FileInputStream(file);
                byte[] readBuffer = new byte[fin.available()];
                fin.read(readBuffer);
                return new BitmapDrawable(activity.getResources(),
                        BitmapFactory.decodeByteArray(readBuffer, 0, readBuffer.length));
            } catch (IOException e) {
                LogUtils.logError(LogUtils.LOG_MINI_PROGRAM_ERROR,
                        "can not find the picture." ,e);
                return null;
            }
        }
    }

    @Override
    protected List<String> getEventFilter() {
        ArrayList<String> filter = new ArrayList<>();
        filter.add(BridgeConstant.BRIDGE_SET_TITLE);
        filter.add(BridgeConstant.BRIDGE_ON_RESUME);
        filter.add(BridgeConstant.BRIDGE_ON_PAUSE);
        filter.add(BridgeConstant.BRIDGE_CLEAN_MENU);
        return filter;
    }
}
