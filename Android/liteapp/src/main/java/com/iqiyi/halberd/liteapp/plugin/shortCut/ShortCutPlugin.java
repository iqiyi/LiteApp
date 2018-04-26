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
package com.iqiyi.halberd.liteapp.plugin.shortCut;

import android.app.Activity;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.util.Log;

import com.iqiyi.halberd.liteapp.common.BridgeConstant;
import com.iqiyi.halberd.liteapp.event.BridgeEvent;
import com.iqiyi.halberd.liteapp.plugin.BasePlugin;
import com.iqiyi.halberd.liteapp.utils.ShortCutUtils;
import com.iqiyi.halberd.liteapp.view.LiteAppBaseActivity;

import org.json.JSONObject;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by xujiajia_sx on 2017/11/29.
 *
 */

public class ShortCutPlugin extends BasePlugin {
    private static final String TAG = ShortCutPlugin.class.getName();

    @Override
    public boolean interceptEvent(BridgeEvent event) {
        return false;
    }

    @Override
    public void onEvent(BridgeEvent event) {
        Log.d(TAG,event.getType());

        if (BridgeConstant.BRIDGE_SHORT_CUT.equals(event.getType())) {
            try {
                Activity activity = (Activity) event.getContext().getAndroidContext();
                JSONObject jsonObject=new JSONObject(event.getData());
                final String liteAppId=jsonObject.getString("liteAppId");
                final boolean needUpdate=jsonObject.getBoolean("needUpdate");
                final String iconPath=jsonObject.getString("iconPath");
                final String name=jsonObject.getString("name");

                Intent shortIntent = new Intent();
                shortIntent.setAction("android.intent.action.liteapp");
                shortIntent.putExtra(LiteAppBaseActivity.MINI_PROGRAM_ID, liteAppId);
                shortIntent.putExtra(LiteAppBaseActivity.MINI_PROGRAM_NEED_UPDATE, needUpdate);
                ShortCutUtils.addShortcut(activity, shortIntent, name, getPictureFromFile(activity,liteAppId,iconPath));
            }catch (Exception e){
                Log.d(TAG,"ShortCutPlugin event error",e);
            }
        }
    }

    private Bitmap getPictureFromFile(Activity activity, String liteAppId, String path) {
        if (path.equals("")) {
            return null;
        } else {
            String storagePath = "lite/" + liteAppId + "/" + path;
            try {
                File file = new File(activity.getFilesDir(), storagePath);
                if(!file.exists()){
                    return null;
                }
                FileInputStream fin = new FileInputStream(file);
                byte[] readBuffer = new byte[fin.available()];
                fin.read(readBuffer);
                return BitmapFactory.decodeByteArray(readBuffer, 0, readBuffer.length);
            } catch (IOException e) {
                Log.d(TAG, "can not find the picture.");
                return null;
            }
        }
    }

    @Override
    protected List<String> getEventFilter() {
        ArrayList<String> filter = new ArrayList<>();
        filter.add(BridgeConstant.BRIDGE_SHORT_CUT);
        return filter;
    }
}
