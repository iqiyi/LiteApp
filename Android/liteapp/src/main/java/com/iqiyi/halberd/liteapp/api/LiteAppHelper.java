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
package com.iqiyi.halberd.liteapp.api;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;

import com.iqiyi.halberd.liteapp.LiteAppFragmentActivity;
import com.iqiyi.halberd.liteapp.LiteAppService;

import static com.iqiyi.halberd.liteapp.view.LiteAppBaseActivity.MINI_PROGRAM_ID;
import static com.iqiyi.halberd.liteapp.view.LiteAppBaseActivity.MINI_PROGRAM_NEED_UPDATE;
import static com.iqiyi.halberd.liteapp.view.LiteAppBaseActivity.MINI_PROGRAM_NEW_TASK;
import static com.iqiyi.halberd.liteapp.view.LiteAppBaseActivity.MINI_PROGRAM_PAGE_DATA_MAP;

/**
 * Created by eggizhang@qiyi.com on 2017/8/31.
 * This helper is an entrance for lite app.
 * For each lite app ,user should prepare & start lite app using this helper to ensure
 * lite app run faster.
 *
 */
@SuppressWarnings("unused")
public class LiteAppHelper {
    /**
     * Using this lite app prepare page to prepare lite app instance before loading
     * because web view usually takes long to start, setting this instance count, and cache
     * related module will keep preparing such number of instance before current process
     * finish
     * @param context context to prepare page for
     **/
    public static void prepareLiteAppPage(Context context){
        Intent intent = new Intent(context, LiteAppService.class);
        intent.setAction(LiteAppService.ACTION_PREPARE);
        context.startService(intent);
    }

    /**
     * Start lite app package with its related service
     * @param activity activity from which to start lite app
     * @param liteAppID lite app ID for started lite app
     * @param needUpdate is this lite app need update
     **/
    public static void startLiteAppPackage(Activity activity, String liteAppID, boolean needUpdate, boolean newTask) {
        //check lite app package exist before enter
       startLiteAppPackage(activity,liteAppID,needUpdate, null, newTask);
    }

    /**
     * Start lite app package with its related service
     * @param activity activity from which to start lite app
     * @param liteAppID lite app ID for started lite app
     * @param needUpdate is this lite app need update
     * @param pageDataMap lite app page start data
     **/
    public static void startLiteAppPackage(Activity activity, String liteAppID, boolean needUpdate, Bundle pageDataMap, boolean newTask) {
        //check lite app package exist before enter
        Intent intent = new Intent(activity, LiteAppFragmentActivity.class);
        intent.putExtra(MINI_PROGRAM_ID, liteAppID );
        intent.putExtra(MINI_PROGRAM_NEED_UPDATE, needUpdate);
        intent.putExtra(MINI_PROGRAM_PAGE_DATA_MAP, pageDataMap);

        if(newTask) {
            intent.putExtra(MINI_PROGRAM_NEW_TASK, true);
            intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        }
        activity.startActivityForResult(intent,1);
    }


    /**
     * finish lite app with this instruction
     * @param context context for this lite app
     * */
    public static void cleanLiteAppProcess(Context context) {
        Intent intent = new Intent(context, LiteAppService.class);
        intent.setAction(LiteAppService.CLEAR_MEMORY);
        context.startService(intent);
    }
}
