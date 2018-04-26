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

import android.text.TextUtils;
import android.util.Log;

import com.iqiyi.halberd.liteapp.export.JsObject;
import com.iqiyi.halberd.liteapp.export.NativeObjectRef;
import com.iqiyi.halberd.liteapp.utils.LogUtils;

/**
 * Created by eggizhang@qiqi.com on 2017/7/13.
 * using this class to manage executor
 */

public class ExecutorManager {
    private static final String TAG = ExecutorManager.class.getName();

    @SuppressWarnings("unused")
    public static NativeObjectRef getGlobalObjectRef(final LiteAppContext context){
        if(context.isPurged()){
            return null;
        }
        long globalHandle = ExecutorManagerNative.getGlobalObjectRef(context.nativeHandle);
        NativeObjectRef nativeObjectRef = new NativeObjectRef();
        nativeObjectRef.context = context;
        nativeObjectRef.objectNativeRef = globalHandle;
        return nativeObjectRef;
    }

    public static void addObjectToGlobal(final LiteAppContext context,final String name, final JsObject object){
        if(context.isPurged()){
            return;
        }
        if(object.disposed){
            return;
        }
        long globalHandle = ExecutorManagerNative.getGlobalObjectRef(context.nativeHandle);
        long objectRef = ExecutorManagerNative.addObjectFunction(context.nativeHandle, globalHandle, name);
        JsObject.onNativeAttached(object, objectRef);
        object.signature = name;
    }

    public static void addObjectToObject(
            final LiteAppContext context,final JsObject parent,final String name, final JsObject object){
        if(parent.disposed){
            return;
        }
        if(object.disposed){
            return;
        }
        long objectRef = ExecutorManagerNative.addObjectFunction(context.nativeHandle, parent.selfHandle, name);
        JsObject.onNativeAttached(object, objectRef);
        object.signature = parent.signature + "." + name;
    }

    public static void executeScript(final LiteAppContext context, final String script){
        if(context.isPurged()){
            return;
        }
        context.getThread().getHandler().post(new Runnable() {
            @Override
            public void run() {
                if(context.isPurged()){
                    return;
                }
                if(context.nativeHandle == 0 ){
                    LogUtils.logError(LogUtils.LOG_MINI_PROGRAM_ERROR,
                            "null reference for executing script " ,null);
                    return;
                }
                if(TextUtils.isEmpty(script)){
                    return;
                }
                long timeout = ExecutorManagerNative.executeScript(context.nativeHandle,script);
                tickTimerDelay(context,timeout,context.nativeHandle);
            }
        });
    }

    public static void disposeNativeRef(NativeObjectRef nativeRef){
        final LiteAppContext context = nativeRef.context;
        final long objectRefLong = nativeRef.objectNativeRef;

        if(context == null){
            Log.w(TAG,"release reference when context has been recycled");
            return;
        }
        if(context.isPurged()){
            ExecutorManagerNative.deletePurgedContextObjectRef(objectRefLong);
            Log.w(TAG,"release reference when context has been purged");
            return;
        }
        context.getThread().getHandler().post(new Runnable() {
            @Override
            public void run() {
                if(context.isPurged()){
                    ExecutorManagerNative.deletePurgedContextObjectRef(objectRefLong);
                    Log.w(TAG,"release reference when context.has been purged");
                    return;
                }
                if(context.nativeHandle == 0 || objectRefLong == 0){
                    Log.w(TAG,"release null reference for dispose native ref");
                    return;
                }
//                Log.e(TAG,"release reference" + context.isPurged() +"  "+ context.hashCode() +"  " +
//                        Thread.currentThread().getId() + " " + context.nativeHandle +"  " + objectRefLong);

                ExecutorManagerNative.unprotectObjectRef(context.nativeHandle, objectRefLong);
            }
        });
    }

    public static void callNativeRefFunction(
            final LiteAppContext context, final NativeObjectRef nativeRef, final String argument){
        if(context.isPurged()){
            return;
        }
        context.getThread().getHandler().post(new Runnable() {
            @Override
            public void run() {
                if(context.isPurged()){
                    return;
                }
                if(context.nativeHandle == 0 || nativeRef.objectNativeRef == 0){
                    LogUtils.logError(LogUtils.LOG_MINI_PROGRAM_ERROR,
                            "null reference for jni call native ref function", null);
                    return;
                }
                String notNullArgument = "";
                if(argument != null){
                    notNullArgument = argument;
                }
                long timeout = ExecutorManagerNative.callObjectRefFunction(
                        context.nativeHandle, nativeRef.objectNativeRef, notNullArgument);
                tickTimerDelay(context,timeout,context.nativeHandle);
            }
        });
    }

    public static NativeObjectRef getPropertyFromJSObject(final NativeObjectRef nativeObjectRef, final String name){
        if(nativeObjectRef.context == null){
            return null;
        }
        if(nativeObjectRef.context.isPurged()){
            return null;
        }
        NativeObjectRef propertyRef = new NativeObjectRef();
        propertyRef.context = nativeObjectRef.context;
        propertyRef.objectNativeRef =
                ExecutorManagerNative.getObjectPropertyRef(nativeObjectRef.context.nativeHandle,
                        nativeObjectRef.objectNativeRef, name);
        return propertyRef;
    }

    private static void tickTimerDelay(final LiteAppContext context,
                                       final long delay, final long nativeHandle){
        Log.v(TAG,"tick after " + delay);
        if(delay > 100000){
            return;
        }
        if(context.isPurged()){
            return;
        }
        context.getThread().getHandler().postDelayed(new Runnable() {
            @Override
            public void run() {
                if(context.isPurged()){
                    return;
                }
                long timeout = ExecutorManagerNative.tickTimer(nativeHandle);
                tickTimerDelay(context,timeout,nativeHandle);
            }
        },delay);
    }
}
