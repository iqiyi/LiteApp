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
package com.iqiyi.halberd.liteapp.utils;

import android.content.Context;
import android.content.Intent;
import android.content.pm.ShortcutInfo;
import android.content.pm.ShortcutManager;
import android.graphics.Bitmap;
import android.graphics.drawable.Icon;

import java.util.Collections;

/**
 * Created by eggizhang@qiyi.com on 2017/8/21.
 * using this to add short cuts to lite app
 */
public class ShortCutUtils {
    private static final String ACTION_ADD_SHORTCUT = "com.android.launcher.action.INSTALL_SHORTCUT";
    public static void addShortcut(Context context, Intent actionIntent, String name, Bitmap iconBitmap) {

        //short cut after 7.1
        ShortcutInfo shortcut = null;
        if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.N_MR1) {
            ShortcutManager shortcutManager = context.getSystemService(ShortcutManager.class);
            shortcut = new ShortcutInfo.Builder(context, "id1")
                    .setShortLabel(name)
                    .setLongLabel(name)
                    .setIcon(Icon.createWithBitmap(iconBitmap))
                    .setIntent(new Intent(actionIntent))
                    .build();
            if (shortcutManager != null) {
                shortcutManager.setDynamicShortcuts(Collections.singletonList(shortcut));
            }
        } else {
            Intent addShortcutIntent = new Intent(ACTION_ADD_SHORTCUT);
            addShortcutIntent.putExtra("duplicate", true);
            addShortcutIntent.putExtra(Intent.EXTRA_SHORTCUT_NAME, name);
            addShortcutIntent.putExtra(Intent.EXTRA_SHORTCUT_ICON, iconBitmap);
            addShortcutIntent.putExtra(Intent.EXTRA_SHORTCUT_INTENT, actionIntent);
            addShortcutIntent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            context.sendBroadcast(addShortcutIntent);
        }
    }
}
