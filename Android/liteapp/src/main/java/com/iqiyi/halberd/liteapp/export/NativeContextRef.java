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

import android.support.v4.util.LongSparseArray;

import com.iqiyi.halberd.liteapp.context.LiteAppContext;

/**
 * Created by eggiZhang@qiyi.com on 2017/7/17.
 * using this context ref to refer to native contexts and related
 * lite app context
 */

public class NativeContextRef {
    private static LongSparseArray<LiteAppContext> contextHashMap = new LongSparseArray<>();
    public static void put(Long nativeHandle, LiteAppContext context){
        contextHashMap.put(nativeHandle,context);
    }

    public static LongSparseArray<LiteAppContext> getContextMap (){
        return contextHashMap;
    }

    public static LiteAppContext get(Long nativeHandle){
        return contextHashMap.get(nativeHandle);
    }

    public static void remove(Long nativeHandle){
        contextHashMap.remove(nativeHandle);
    }
}
