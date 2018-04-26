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
#include <jsc_bridge/jsc_object_java_related_function.h>
#include <base/hal_native_env.h>
#include <jni_bridge/jni_bridge_lite_app_bridge.h>
#include <jni_bridge/jni_bridge_value_util.h>
#include <base/hal_native_task_executor.h>

using namespace liteapp::bridge;

namespace liteapp{
    namespace bridge{
        JSClassRef lite_app_java_related_function_class = nullptr;
        bool jsc_java_related_function_inited = false;
    }
}

void jsc_java_related_function::init_java_related_function() {
    static JSClassDefinition java_related_function_class_definition = {
            0,                          //version
            kJSClassAttributeNone,  //attributes
            "__lite_api",             //className
            0,                          //parentClass
            0,                          //staticValues
            0,                          //staticFunctions
            0,                          //Initialize
            onDispose,                  //Finalize
            0,                          //has Property
            0,                          //get Property
            0,                          //set Property
            0,                          //delete Property
            0,                          //getPropertyNames
            callAsFunction,             //callAsFunction
            0,                          //hasInstance
            0,                          //callAsConstructor
            0                           //convertToType
    };
    lite_app_java_related_function_class = JSClassCreate
            (&java_related_function_class_definition);
    jsc_java_related_function_inited = true;
}

void jsc_java_related_function::onDispose(JSObjectRef object){
    hal_javascript_object_ref* ref = reinterpret_cast<hal_javascript_object_ref*>(JSObjectGetPrivate(object));
    JNIEnv* env = hal_native_env::current_env();
    //dispose on java
    env->CallStaticVoidMethod(jni_js_bridge_function, jni_js_bridge_function_on_disposed, reinterpret_cast<jlong>(ref));
    delete(ref);
}

JSValueRef jsc_java_related_function::callAsFunction(JSContextRef context, JSObjectRef function
        , JSObjectRef thisObject, size_t argumentCount, const JSValueRef arguments[],
                                        JSValueRef *exception){
    hal_javascript_object_ref* ref = reinterpret_cast<hal_javascript_object_ref*>(JSObjectGetPrivate(function));
    JNIEnv* env = hal_native_env::current_env();

    if (argumentCount == 0) {
        return nullptr;
    }

    if (!env) {
        return nullptr;
    }

    jlongArray longArray = env->NewLongArray(argumentCount);
    jlong nativeObjectPtr[argumentCount];
    for (int i = 0; i < argumentCount ; i++) {
        hal_javascript_object_ref* argumentRef = new hal_javascript_object_ref();
        argumentRef->refValue = arguments[i];
        nativeObjectPtr[i] = reinterpret_cast<jlong>(argumentRef);
        JSValueProtect(context, arguments[i]);
    }

    jclass jstringClass = env->FindClass("java/lang/String");
    env->SetLongArrayRegion(longArray, 0, argumentCount, nativeObjectPtr);
    jobjectArray parameterArray =
            env->NewObjectArray(argumentCount,jstringClass ,0);
    env->DeleteLocalRef(jstringClass);

    jstring stringParaArray[argumentCount];
    for(int i=0;i< argumentCount;i++) {
        string temp;
        JSValueRef argumentRef = arguments[i];
        jsc_value_util utils(context, argumentRef);
        if(JSValueIsString(context,argumentRef)){
            utils.convert_to_string(temp);
        } else{
            utils.convert_to_json_string(temp);
        }
        stringParaArray[i] = env->NewStringUTF(temp.c_str());
        env->SetObjectArrayElement(parameterArray, i, stringParaArray[i]);
    }

    jlong resultPtr = env->CallStaticLongMethod(
            jni_js_bridge_function,
            jni_js_bridge_function_on_called,
            reinterpret_cast<jlong>(hal_native_task_executor::current_executor()),
            reinterpret_cast<jlong>(ref),
            longArray, parameterArray);


    env->DeleteLocalRef(longArray);
    env->DeleteLocalRef(parameterArray);
    for (int i = 0; i < argumentCount ; i++) {
        env->DeleteLocalRef(stringParaArray[i]);
    }

    //process return values
    if(resultPtr!= 0){
        hal_javascript_object_ref* object_ref = reinterpret_cast<hal_javascript_object_ref*>(resultPtr);
        return object_ref->refValue;
    }
    return nullptr;
};

liteapp::hal_javascript_object_ref* jsc_java_related_function::createFromJavaFunction(JSContextRef context){
    if(!jsc_java_related_function_inited){
        init_java_related_function();
    }
    hal_javascript_object_ref* ref = new hal_javascript_object_ref;
    JSObjectRef lite_app_object = ::JSObjectMake(context, lite_app_java_related_function_class
            , ref);
    JSValueProtect(context,lite_app_object);
    ref->refValue = lite_app_object;
    JNIEnv* env = hal_native_env::current_env();

    return ref;
}

