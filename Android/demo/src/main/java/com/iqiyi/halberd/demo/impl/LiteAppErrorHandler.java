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
package com.iqiyi.halberd.demo.impl;

import android.app.AlertDialog;
import android.content.DialogInterface;
import android.content.Intent;
import android.support.annotation.Nullable;

import com.iqiyi.halberd.demo.R;
import com.iqiyi.halberd.demo.impl.manager.LiteAppFrameworkManager;
import com.iqiyi.halberd.demo.impl.manager.LiteAppLocalPackageUtils;
import com.iqiyi.halberd.demo.impl.manager.LiteAppMirrorPackageLoader;
import com.iqiyi.halberd.demo.impl.manager.LiteAppPackageManager;
import com.iqiyi.halberd.liteapp.api.LiteAppHelper;
import com.iqiyi.halberd.liteapp.api.provider.LiteAppErrorProvider;
import com.iqiyi.halberd.liteapp.view.LiteAppBaseActivity;

/**
 * Created by xujiajia_sx on 2017/12/13.
 * using this handler to deal with lite app loading error
 */
public class LiteAppErrorHandler implements LiteAppErrorProvider.OnErrorListener{
    @Override
    public void onError(final String description, @Nullable final LiteAppBaseActivity errorActivity) {
        if(errorActivity==null) {
            return;
        }
        //clean lite app cache
        LiteAppLocalPackageUtils.cleanAlLiteappCache(errorActivity);

        //clean memory cache
        LiteAppPackageManager.getInstance().cleanMemoryCache();
        LiteAppFrameworkManager.getInstance().cleanMemoryCacheAndDefaultPreference(errorActivity);

        //clear mirror package usage and mirror package will be reloaded again
        LiteAppMirrorPackageLoader.clearMirrorPackage(errorActivity);
        LiteAppMirrorPackageLoader.validateMirror(errorActivity);

        //clean lite app process
        LiteAppHelper.cleanLiteAppProcess(errorActivity);

        AlertDialog.Builder alert = new AlertDialog.Builder(errorActivity);
        alert.setMessage(description)
                .setNegativeButton(R.string.exit, new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int which) {
                        errorActivity.finish();
                    }
                })
                .setPositiveButton(R.string.go_on, new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int which) {
                        Intent intent = errorActivity.getIntent();
                        intent.setClass(errorActivity, errorActivity.getClass());
                        errorActivity.finish();
                        errorActivity.startActivity(intent);
                    }
                })
                .create()
                .show();

    }
}