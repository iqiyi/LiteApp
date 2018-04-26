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
package com.iqiyi.halberd.liteapp.plugin.storage;

import android.app.Activity;
import android.content.ContentValues;
import android.database.sqlite.SQLiteDatabase;
import android.util.Log;

import com.iqiyi.halberd.liteapp.common.BridgeConstant;
import com.iqiyi.halberd.liteapp.context.ExecutorManager;
import com.iqiyi.halberd.liteapp.context.LiteAppContext;
import com.iqiyi.halberd.liteapp.event.BridgeEvent;
import com.iqiyi.halberd.liteapp.export.NativeObjectRef;
import com.iqiyi.halberd.liteapp.plugin.BasePlugin;
import com.iqiyi.halberd.liteapp.utils.LogUtils;

import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by eggizhang@qiyi.com on 17-11-20.
 * using this plugin to storage lite app json objects with keys in a lite app scope.
 */

public class StoragePlugin extends BasePlugin {
    public static final String TAG = StoragePlugin.class.getName();

    @Override
    public void invalid(final LiteAppContext context) {
        super.invalid(context);
    }

    @Override
    public boolean interceptEvent(BridgeEvent event) {
        return false;
    }

    @Override
    public void onEvent(BridgeEvent event) {
        Log.d(TAG, event.getType());

        if (BridgeConstant.BRIDGE_STORAGE.equals(event.getType())) {
            try {

                JSONObject dataObj = new JSONObject(event.getData());
                final String packageId = dataObj.optString("packageId");
                final String key = dataObj.optString("key");
                final String data = dataObj.optString("data");
                final boolean sync = dataObj.optBoolean("sync", false);
                final String action = dataObj.optString("action");
                final NativeObjectRef success = ExecutorManager.getPropertyFromJSObject(
                        event.getNativeObjectHandles(), "success");
                final NativeObjectRef fail = ExecutorManager.getPropertyFromJSObject(
                        event.getNativeObjectHandles(), "fail");
                final NativeObjectRef complete = ExecutorManager.getPropertyFromJSObject(
                        event.getNativeObjectHandles(), "complete");

                try {
                    StorageDataBaseHelper dbHelper = new StorageDataBaseHelper(event.getContext().getAndroidContext(),
                            packageId+".db", null, 1);
                    final SQLiteDatabase db = dbHelper.getReadableDatabase();
                    db.setMaximumSize(10 * 1024 * 1024);

                    if (sync) {
                        final Activity activity = (Activity) (event.getContext().getAndroidContext());
                        activity.runOnUiThread(new Runnable() {
                            @Override
                            public void run() {
                                operateDatabase(db, action, key, data);
                            }
                        });
                    } else {
                        operateDatabase(db, action, key, data);
                    }
                    ExecutorManager.callNativeRefFunction(event.getContext(), success, "");

                } catch (Exception e) {
                    LogUtils.logError(LogUtils.LOG_MINI_PROGRAM_ERROR, "StoragePlugin SQLite error",e);
                    ExecutorManager.callNativeRefFunction(event.getContext(), fail, "");
                }
                ExecutorManager.callNativeRefFunction(event.getContext(), complete, "");

            } catch (Exception e) {
                LogUtils.logError(LogUtils.LOG_MINI_PROGRAM_ERROR, "StoragePlugin event error",e);
            }
        }
    }

    private void operateDatabase(SQLiteDatabase db, String action, String key, String data) {
        if (action.equals("insert")) {
            ContentValues values = new ContentValues();
            values.put("key", key);
            values.put("data", data);
            db.replace("storage", null, values);
        } else if (action.equals("delete")) {
            db.delete("storage", "key= ?", new String[]{key});
        }
    }

    @Override
    protected List<String> getEventFilter() {
        ArrayList<String> filter = new ArrayList<>();
        filter.add(BridgeConstant.BRIDGE_STORAGE);
        return filter;
    }
}
