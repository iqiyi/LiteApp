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
import android.util.Log;
/**
 * Created by eggizhang@qiyi.com on 2017/9/6.
 * using this bridge function to inject as property of a javascript object
 **/
@SuppressWarnings("unused")
public class JsObject {
    /** if this js object is disposed */
    public boolean disposed;

    private static LongSparseArray<JsObject> objectMap = new LongSparseArray<>();
    public long selfHandle;
    public String signature;
    public static final String TAG = JsObject.class.getName();

    /*
     * using this method as a javascript callback function, all parameters and parameter handlers
     * are listed and convert to string, you can return long reference as callback result
     *
     * @param nativeRefs handles for javascript function parameters, will automatically release related
     *                   js object when java GC
     * @param parameters json parameters for javascript parameters
     * @return function result handles
     *
     **/
    protected long onCalled(NativeObjectRef nativeRefs[], String[] parameters){
        return 0;
    }

    static long onNativeCalled(long nativeContextHandle, long nativeRef, long[] callbackHandles, String[] parameters){
        NativeObjectRef nativeRefs[] = new NativeObjectRef[callbackHandles.length];
        for(int i = 0 ;i<callbackHandles.length; i++){
            nativeRefs[i] = new NativeObjectRef();
            nativeRefs[i].context = NativeContextRef.get(nativeContextHandle);
            nativeRefs[i].objectNativeRef = callbackHandles[i];
        }
        return objectMap.get(nativeRef).onCalled(nativeRefs, parameters);
    }

    /**
     * this method called when this js object is created in javascript context
     * carry back its native reference
     * */
    static public void onNativeAttached(JsObject object,long nativeRef){
        object.selfHandle = nativeRef;
        objectMap.put(nativeRef, object);
    }

    /**
     * this method will be called when object disposed in javascript side
     **/
    static void onNativeDisposed(long nativeRef){
        objectMap.get(nativeRef).disposed = true;
//        Log.d(TAG, "release native bridge object");
        objectMap.remove(nativeRef);
    }
}
