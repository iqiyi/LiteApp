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

import com.iqiyi.halberd.liteapp.plugin.network.impl.LiteAppNetworkRequest;

/**
 * Created by eggizhang@qiyi.com on 2017/6/29.
 * Ust this interface to make network executing
 * default executor: {@link LiteAppNetworkProvider}
 */

public interface LiteAppNetworkExecutor {
    /**
     * Use this method to execute a network request
     * @param liteAppNetworkRequest a network request from javascript {@link LiteAppNetworkRequest}
     *                          can be created by {@link LiteAppNetworkProvider} all properties must not be configured but only set
     *                          with NDK
     * */

    LiteAppNetworkRequest execute(LiteAppNetworkRequest liteAppNetworkRequest);
}