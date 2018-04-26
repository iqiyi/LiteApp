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
package com.iqiyi.halberd.liteapp.export;

import com.iqiyi.halberd.liteapp.context.ExecutorManager;
import com.iqiyi.halberd.liteapp.context.LiteAppContext;

/**
 * Created by eggizhang@qiyi.com on 17-10-10.
 * using this object ref to refer to js objects from callback, and will
 * auto delete related js object when this object in java disposed;
 */

public class NativeObjectRef {
    public long objectNativeRef;
    public LiteAppContext context;

    public final static String TAG = NativeObjectRef.class.getName();

    @Override
    protected void finalize() throws Throwable {
        ExecutorManager.disposeNativeRef(this);
        context = null;
        objectNativeRef = 0;
        super.finalize();
    }
}
