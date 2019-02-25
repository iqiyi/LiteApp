/*
 * Copyright (C) 2019 Facishare Technology Co., Ltd. All Rights Reserved.
 */
package com.iqiyi.halberd.demo;

import java.util.ArrayList;
import java.util.List;

import com.iqiyi.halberd.liteapp.context.LiteAppPage;
import com.iqiyi.halberd.liteapp.event.BridgeEvent;
import com.iqiyi.halberd.liteapp.plugin.BasePagePlugin;

import android.app.Activity;
import android.content.Intent;
import android.text.TextUtils;

/**
 * Created by xiongtj on 2019/02/20.
 */
public class ShowPlugin extends BasePagePlugin {

    public ShowPlugin(LiteAppPage liteAppPage) {
        super(liteAppPage);
    }

    @Override
    public boolean interceptEvent(BridgeEvent event) {
        return false;
        }

    @Override
    public void onEvent(BridgeEvent event) {
        if(TextUtils.equals(event.getType(), "showActivity")) {
            Activity context= (Activity) liteAppPage.getCurrentContext();
            context.startActivityForResult(new Intent(context,ShowActivity.class),1);
        }
    }

    @Override
    protected List<String> getEventFilter() {
        List<String> filter = new ArrayList<>();
        filter.add("showActivity");
        return filter;
    }
}
