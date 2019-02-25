/*
 * Copyright (C) 2019 Facishare Technology Co., Ltd. All Rights Reserved.
 */
package com.iqiyi.halberd.liteapp.plugin;

import java.lang.reflect.Constructor;
import java.lang.reflect.InvocationTargetException;

import com.iqiyi.halberd.liteapp.context.LiteAppPage;

/**
 * Created by xiongtj on 2019/02/19.
 */
public class BasePagePluginHolder {

    private final Class<? extends BasePagePlugin> mClz;

    public BasePagePluginHolder(Class<? extends BasePagePlugin> clz) {
        this.mClz = clz;
    }

    public Class getClassIns() {
        return this.mClz;
    }

    public BasePagePlugin createInstance(LiteAppPage liteAppPage) throws IllegalAccessException,
            InvocationTargetException, InstantiationException, NoSuchFieldException {
        Constructor constructor = loadConstructor();
        BasePagePlugin plugin;
        plugin = (BasePagePlugin) constructor.newInstance(liteAppPage);
        return plugin;
    }

    private Constructor loadConstructor() throws NoSuchFieldException {
        Class c = this.mClz;

        Constructor constructor = null;
        try {
            constructor = c.getConstructor(LiteAppPage.class);
        } catch (NoSuchMethodException var8) {
            throw new NoSuchFieldException("Can't find constructor of plugin.");
        }

        return constructor;
    }
}
