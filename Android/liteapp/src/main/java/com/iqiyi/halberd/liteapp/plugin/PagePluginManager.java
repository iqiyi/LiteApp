/*
 * Copyright (C) 2019 Facishare Technology Co., Ltd. All Rights Reserved.
 */
package com.iqiyi.halberd.liteapp.plugin;

import java.util.HashSet;
import java.util.Set;

import com.iqiyi.halberd.liteapp.context.LiteAppPage;

/**
 * Created by xiongtj on 2019/02/19.
 */
public class PagePluginManager {

    private static Set<BasePagePluginHolder> pluginHolders = new HashSet<>();

    public static void registPagePlugin(Class<? extends BasePagePlugin> pluginClass){
        pluginHolders.add(new BasePagePluginHolder(pluginClass));
    }

    public static void initPagePlugin(LiteAppPage liteAppPage){
        for(BasePagePluginHolder pluginHolder:pluginHolders){
            try {
                BasePagePlugin plugin=pluginHolder.createInstance(liteAppPage);
                plugin.attach();
            } catch (Exception e) {
                e.printStackTrace();
            }

        }
    }

}
