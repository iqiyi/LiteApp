/*
 * Copyright (C) 2019 Facishare Technology Co., Ltd. All Rights Reserved.
 */
package com.iqiyi.halberd.liteapp.plugin;

import java.util.List;

import com.iqiyi.halberd.liteapp.api.provider.LiteAppContextInitManager;
import com.iqiyi.halberd.liteapp.api.provider.LiteAppContextInitProvider;
import com.iqiyi.halberd.liteapp.context.LiteAppContext;
import com.iqiyi.halberd.liteapp.context.LiteAppPage;
import com.iqiyi.halberd.liteapp.event.IBridgeEventListener;
import com.iqiyi.halberd.liteapp.event.IEventBridge;
import com.iqiyi.halberd.liteapp.event.impl.EventBridgeImpl;

/**
 * Created by xiongtj on 2019/02/19.
 */
public abstract class BasePagePlugin extends BasePlugin implements IBridgeEventListener, LiteAppContextInitProvider {
    protected abstract List<String> getEventFilter();
    protected LiteAppPage liteAppPage;

    public BasePagePlugin(LiteAppPage liteAppPage){
        this.liteAppPage=liteAppPage;
    }

    public void attach() {
        LiteAppContextInitManager.addLiteAppContextInitProvider(this);

        IEventBridge mBridge = EventBridgeImpl.getInstance();
        List<String> filter = getEventFilter();
        if(filter == null){
            return;
        }
        for (String items : filter) {
            mBridge.registerBridgeListener(items, this, liteAppPage);
        }
    }
}
