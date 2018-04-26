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
package com.iqiyi.halberd.liteapp.context;

/**
 * Created by eggizhang@qiyi.com on 2017/9/6.
 * native part of executor manager
 */
@SuppressWarnings("unused")
public class ExecutorManagerNative {
    /* executor related */
    public native static long createAsyncExecutor();
    public native static long executeScript(long nativeHandle, String script);
    public native static void disposeAsyncExecutor(long nativeHandle);

    /* object operation related */
    public native static long getGlobalObjectRef(long nativeHandle);
    public native static long getObjectPropertyRef(long nativeHandle,long parentObjectRef, String name);
    public native static void addObjectProperty(long nativeHandle,long parentObjectRef
            , String name, String jsonContent);
    public native static long addObjectFunction(long nativeHandle,long parentObjectRef
            , String name);
    public native static void protectObjectRef(long nativeHandle, long nativeRefHandle);
    public native static void unprotectObjectRef(long nativeHandle, long nativeRefHandle);
    public native static void deletePurgedContextObjectRef(long nativeRefHandle);
    public native static long callObjectRefFunction(
            long nativeHandle, long nativeRefHandle, String argument);
    public native static long tickTimer(long nativeHandle);

    static{
        System.loadLibrary("gnustl_shared");
        System.loadLibrary("icu_common");
        System.loadLibrary("jsc");
        System.loadLibrary("halberd");
    }
}
