/*
 * Copyright (C) 2019 Facishare Technology Co., Ltd. All Rights Reserved.
 */
package com.iqiyi.halberd.liteapp.plugin.fs;

import java.util.ArrayList;
import java.util.List;

import org.json.JSONException;
import org.json.JSONObject;

import com.iqiyi.halberd.liteapp.LiteAppFragmentActivity;
import com.iqiyi.halberd.liteapp.context.LiteAppPage;
import com.iqiyi.halberd.liteapp.event.BridgeEvent;
import com.iqiyi.halberd.liteapp.plugin.BasePagePlugin;
import com.iqiyi.halberd.liteapp.utils.LogUtils;
import com.iqiyi.halberd.liteapp.view.LiteAppBaseActivity;

import android.app.Activity;
import android.content.Intent;
import android.text.TextUtils;
import android.util.Log;
import android.view.KeyEvent;

/**
 * Created by xiongtj on 2019/02/19.
 */
public class PageApiPlugin extends BasePagePlugin {

    public PageApiPlugin(LiteAppPage liteAppPage) {
        super(liteAppPage);
    }

    @Override
    public boolean interceptEvent(BridgeEvent event) {
        return false;
        }

    @Override
    public void onEvent(BridgeEvent event) {
        if(TextUtils.equals(event.getType(), "setResult")) {
            Activity context= (Activity) liteAppPage.getCurrentContext();
            String data = event.getData();
            Intent intent = new Intent();
            intent.putExtra("data",data);
            context.setResult(0,intent);
        }else if(TextUtils.equals(event.getType(), "finish")) {
            final Activity context= (Activity) liteAppPage.getCurrentContext();
            context.runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    context.finish();
                }
            });

        }else if(TextUtils.equals(event.getType(), "goBack")){
            final Activity context= (Activity) liteAppPage.getCurrentContext();
            context.runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    context.onBackPressed();
                }
            });

        }
    }

    @Override
    protected List<String> getEventFilter() {
        List<String> filter = new ArrayList<>();
        filter.add("setResult");
        filter.add("finish");
        filter.add("goBack");
        return filter;
    }
}
