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
#include <base/hal_native_env.h>
#include <base/hal_native_task_executor.h>
#include "jni_bridge/jni_bridge_lite_app_bridge.h"
#include "jni_bridge/jni_bridge_value_util.h"

using namespace liteapp;
using namespace liteapp::bridge;

namespace liteapp{
    namespace bridge{
        jclass jni_string = nullptr;
        jclass jni_js_bridge_function = nullptr;
        jmethodID jni_js_bridge_function_on_attach = nullptr;
        jmethodID jni_js_bridge_function_on_called = nullptr;
        jmethodID jni_js_bridge_function_on_disposed = nullptr;

        jclass jni_hash_map = nullptr;
        jmethodID jni_hash_map_init = nullptr;
        jmethodID jni_hash_map_set_string = nullptr;
        jmethodID jni_hash_map_set_number = nullptr;
        jmethodID jni_hash_map_set_boolean = nullptr;
        jmethodID jni_hash_map_set_object = nullptr;
    }
}

bool jni_lite_app_bridge::init(JNIEnv *env){
    jni_string = env->FindClass("java/lang/String");
    jni_js_bridge_function = (jclass)env->NewGlobalRef(
            env->FindClass("com/iqiyi/halberd/liteapp/export/JsObject"));
    if (nullptr == jni_js_bridge_function) return false;
    jni_js_bridge_function_on_called = (jmethodID)env->GetStaticMethodID(
            jni_js_bridge_function, "onNativeCalled", "(JJ[J[Ljava/lang/String;)J");
    if(nullptr ==  jni_js_bridge_function_on_called){
        return false; }
    jni_js_bridge_function_on_disposed = (jmethodID)env->GetStaticMethodID(
            jni_js_bridge_function, "onNativeDisposed", "(J)V");
    if(nullptr ==  jni_js_bridge_function_on_disposed){
        return false; }
    jni_js_bridge_function_on_attach = (jmethodID)env->GetStaticMethodID(
            jni_js_bridge_function, "onNativeAttached", "(Lcom/iqiyi/halberd/liteapp/export/JsObject;J)V");
    if(nullptr ==  jni_js_bridge_function_on_attach){
        return false; }

    /* note: hash map */
    jni_hash_map = (jclass)env->NewGlobalRef(
            (env)->FindClass("com/iqiyi/halberd/liteapp/export/JsNativeHashMap"));
    if (nullptr == jni_hash_map) return false;
    jni_hash_map_init = (jmethodID)env->GetMethodID(
            jni_hash_map, "<init>", "()V");
    if (nullptr == jni_hash_map_init) return false;
    jni_hash_map_set_string = (jmethodID)env->GetMethodID(
            jni_hash_map, "set", "(Ljava/lang/String;Ljava/lang/String;)V");
    if (nullptr == jni_hash_map_set_string) return false;
    jni_hash_map_set_number = (jmethodID)env->GetMethodID(
            jni_hash_map, "set", "(Ljava/lang/String;D)V");
    if (nullptr == jni_hash_map_set_number) return false;
    jni_hash_map_set_boolean = (jmethodID)env->GetMethodID(
            jni_hash_map, "set", "(Ljava/lang/String;Z)V");
    if (nullptr == jni_hash_map_set_boolean) return false;
    jni_hash_map_set_object = (jmethodID)env->GetMethodID(
            jni_hash_map, "set", "(Ljava/lang/String;Ljava/lang/Object;)V");
    if (nullptr == jni_hash_map_set_object) return false;

    return true;
}