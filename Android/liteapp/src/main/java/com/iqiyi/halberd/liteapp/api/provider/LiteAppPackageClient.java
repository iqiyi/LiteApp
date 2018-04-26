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
package com.iqiyi.halberd.liteapp.api.provider;

import android.support.annotation.Nullable;

import com.iqiyi.halberd.liteapp.common.LiteAppException;
import com.iqiyi.halberd.liteapp.manager.impl.LiteAppDetail;

/**
 * Created by eggizhang@qiyi.com on 2017/7/19.
 * used to get lite app packages and info from internet you should provide an implementation
 * of this client to support lite app updating and fetching
 */
public interface LiteAppPackageClient {

    /**
     * use this to clean lite app memory cache
     * */
    void cleanMemoryCache();

    /**
     * Providing this method to give lite app detailed description to lite app
     * framework, files in this description will be loaded and run as lite app
     * you can refer to demo lite app package and documents.
     *
     * First, we try to get lite app detail from cache , if return null, you should
     * retrieve lite app from net, using {@link #prepareLiteAppFromServer(String)}.
     * @param id lite app id
     * */
    LiteAppDetail prepareLiteAppIfCache(String id);

    /**
     * Provide this method to give lite app detail, if you have to access internet
     * to get lite app detail, you should return null in {@link #prepareLiteAppIfCache(String)}
     * and access internet here to return true lite app detail content, by doing so , you
     * ensure all files related to this lite app are downloaded and prepared.
     * @param id lite app id
     * */
    LiteAppDetail prepareLiteAppFromServer(String id);

    /**
     * Providing this method to give lite app framework template.html, you can refer to document
     * or demo.
     * @param id lite app id null for default lite app id (last used or most used)
     **/
    String getLiteAppFrameworkWebViewPart(@Nullable String id);

    /**
     * Providing this method to give lite app framework base.js, you can refer to document
     * or demo.
     * @param id lite app id null for default lite app id (last used or most used)
     * */
    String getLiteAppFrameworkJSCPart(@Nullable  String id) throws LiteAppException;

    /**
     * Providing this method to give lite app framework bundle.js, you can refer to document
     * or demo.
     * @param id lite app id null for default lite app id (last used or most used)
     * @param pagePath page path of lite app page
     * */
    String getLiteAppPageBundle(@Nullable  String id, String pagePath);

    /**
     * Providing this method to give lite app framework bundle.css you can refer to document
     * or demo.
     * @param id lite app id null for default lite app id (last used or most used)
     * @param pagePath page path of lite app page
     * */
    String getLiteAppPageBundleCssPath(@Nullable  String id, String pagePath);

    /**
     * Providing this to get lite app files
     * @param id lite app id
     * @param filePath lite app file path
     * */
    @SuppressWarnings("unused")
    String getLiteAppFile(String id, String filePath);

    /**
     * Providing this get image bytes interface for users to get lite app images or other
     * streaming data from your lite app package server.
     * @param id lite app id
     * @param path lite app image bytes path
     **/
    byte[] getLiteAppFileBytes(String id, String path);
}
