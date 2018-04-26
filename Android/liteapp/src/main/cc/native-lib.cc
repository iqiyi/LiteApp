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
#include <jni.h>
#include <base/hal_native_task_executor.h>
#include "base/hal_native_env.h"
#include <jsc_bridge/jsc_bridge_executor.h>
#include <jsc_bridge/jsc_object_java_related_function.h>
#include <jsc_bridge/jsc_object_lite_app_timer.h>
#include <jni_bridge/jni_bridge_lite_app_bridge.h>
#include <jni_bridge/jni_bridge_value_util.h>

using namespace liteapp;

extern "C"{
JNIEXPORT jint JNI_OnLoad(JavaVM* vm, void* reserved) {
    if (nullptr == vm) {
        return -1;
    }

    JNIEnv *env = nullptr;
    if (vm->GetEnv((void **) &env, JNI_VERSION_1_6) != JNI_OK) {
        return -1;
    }

    if (nullptr == env) {
        return -1;
    }

    hal_native_env::_g_vm = vm;
    bridge::timer::init_lite_app_timer();
    jni_lite_app_bridge::init(env);

    return JNI_VERSION_1_6;
}

JNIEXPORT jlong JNICALL
Java_com_iqiyi_halberd_liteapp_context_ExecutorManagerNative_createAsyncExecutor(
        JNIEnv *env, jobject instance) {
    jsc_bridge_executor* context =  hal_native_task_executor::createNewExecutor();
    return reinterpret_cast<jlong>(context);
}

JNIEXPORT jlong JNICALL
Java_com_iqiyi_halberd_liteapp_context_ExecutorManagerNative_executeScript(
        JNIEnv *env, jclass type, jlong nativeHandle, jstring script_) {
    jboolean copy = JNI_FALSE;
    const char *script = env->GetStringUTFChars(script_, &copy);
    hal_native_task_executor::postTaskToExecutor(
            reinterpret_cast<jsc_bridge_executor*>(nativeHandle), (char *) script);
    env->ReleaseStringUTFChars(script_, script);
    return 1;
}

JNIEXPORT void JNICALL
Java_com_iqiyi_halberd_liteapp_context_ExecutorManagerNative_disposeAsyncExecutor(
        JNIEnv *env, jclass type, jlong nativeHandle){
    hal_native_task_executor::disposeExecutor(reinterpret_cast<jsc_bridge_executor*>(nativeHandle));
}


JNIEXPORT jlong JNICALL
Java_com_iqiyi_halberd_liteapp_context_ExecutorManagerNative_getGlobalObjectRef(
        JNIEnv *env, jclass type, jlong nativeHandle) {
    return reinterpret_cast<jlong>(&(reinterpret_cast<jsc_bridge_executor*>(nativeHandle)->global_ref));
}

JNIEXPORT jlong JNICALL
Java_com_iqiyi_halberd_liteapp_context_ExecutorManagerNative_getObjectPropertyRef(
        JNIEnv *env, jclass type, jlong nativeHandle, jlong parentHandle, jstring name_) {
    const char *name = env->GetStringUTFChars(name_, 0);
    jsc_bridge_executor* executor = reinterpret_cast<jsc_bridge_executor*>(nativeHandle);
    JSContextRef context = executor->executor_context_;
    hal_javascript_object_ref* parent = reinterpret_cast<hal_javascript_object_ref*>(parentHandle);
    if(!JSValueIsObject(context, parent->refValue)){
        return 0;
    }
    JSObjectRef parentObject = JSValueToObject(context, parent->refValue, nullptr);
    JSStringRef propertyNameRef = JSStringCreateWithUTF8CString(name);
    JSValueRef propertyValue = JSObjectGetProperty(context, parentObject ,propertyNameRef,0);
    hal_javascript_object_ref* object_ref = new hal_javascript_object_ref;
    object_ref->refValue = propertyValue;
    JSValueProtect(context, object_ref->refValue);
    env->ReleaseStringUTFChars(name_, name);

    return reinterpret_cast<jlong>(object_ref);
}

JNIEXPORT void JNICALL
Java_com_iqiyi_halberd_liteapp_context_ExecutorManagerNative_addObjectProperty(
        JNIEnv *env, jclass type, jlong nativeHandle, jlong parentHandle, jstring name_, jstring content_) {
    const char *name = env->GetStringUTFChars(name_, 0);
    const char *jsonContent = env->GetStringUTFChars(content_, 0);

    jsc_bridge_executor* executor = reinterpret_cast<jsc_bridge_executor*>(nativeHandle);
    JSContextRef context = executor->executor_context_;
    JSValueRef addObject;
    if(content_!= nullptr){
        JSStringRef jsonString = JSStringCreateWithUTF8CString(jsonContent);
        addObject = JSValueMakeFromJSONString(context, jsonString);
    } else{
        addObject = JSObjectMake(context, nullptr, nullptr);
    }
    hal_javascript_object_ref* parent = reinterpret_cast<hal_javascript_object_ref*>(parentHandle);
    if(!JSValueIsObject(context, parent->refValue)){
        return;
    }
    JSObjectRef parentObject = JSValueToObject(context, parent->refValue, nullptr);
    JSStringRef propertyNameRef = JSStringCreateWithUTF8CString(name);

    JSObjectSetProperty(context,parentObject, propertyNameRef,addObject,kJSPropertyAttributeNone, nullptr);

    env->ReleaseStringUTFChars(name_, name);
    env->ReleaseStringUTFChars(content_, jsonContent);
    return ;
}

JNIEXPORT jlong JNICALL
Java_com_iqiyi_halberd_liteapp_context_ExecutorManagerNative_addObjectFunction(
        JNIEnv *env, jclass type, jlong nativeHandle, jlong parentHandle, jstring name_) {
    const char *name = env->GetStringUTFChars(name_, 0);
    jsc_bridge_executor* executor = reinterpret_cast<jsc_bridge_executor*>(nativeHandle);
    JSContextRef context = executor->executor_context_;
    hal_javascript_object_ref* child = jsc_java_related_function::createFromJavaFunction(context);
    hal_javascript_object_ref* parent = reinterpret_cast<hal_javascript_object_ref*>(parentHandle);
    if(parent == nullptr ){
        return 0;
    }
    if(!JSValueIsObject(context, parent->refValue)){
        return reinterpret_cast<jlong>(child);
    }
    JSObjectRef parentObject = JSValueToObject(context, parent->refValue, nullptr);
    JSStringRef propertyNameRef = JSStringCreateWithUTF8CString(name);
    JSObjectSetProperty(context,parentObject, propertyNameRef, child->refValue, kJSPropertyAttributeNone, nullptr);

    env->ReleaseStringUTFChars(name_, name);
    return reinterpret_cast<jlong>(child);
}

JNIEXPORT void JNICALL
Java_com_iqiyi_halberd_liteapp_context_ExecutorManagerNative_protectObjectRef(
        JNIEnv *env, jclass type, jlong nativeHandle, jlong nativeRefHandle) {
    jsc_bridge_executor* executor = reinterpret_cast<jsc_bridge_executor*>(nativeHandle);
    hal_javascript_object_ref* protected_ref = reinterpret_cast<hal_javascript_object_ref*>(nativeRefHandle);
    if(executor == nullptr || protected_ref == nullptr){
        return;
    }
    JSValueProtect(executor->executor_context_, protected_ref->refValue);
    return;
}

JNIEXPORT void JNICALL
Java_com_iqiyi_halberd_liteapp_context_ExecutorManagerNative_deletePurgedContextObjectRef(
        JNIEnv *env, jclass type, jlong nativeRefHandle) {
    hal_javascript_object_ref* unprotected_ref= reinterpret_cast<hal_javascript_object_ref*>(nativeRefHandle);
    if(unprotected_ref!= nullptr) {
        delete unprotected_ref;
    }
}

JNIEXPORT void JNICALL
Java_com_iqiyi_halberd_liteapp_context_ExecutorManagerNative_unprotectObjectRef(
        JNIEnv *env, jclass type, jlong nativeHandle, jlong nativeRefHandle) {
    hal_native_task_executor::disposeProtectedRef(
            reinterpret_cast<jsc_bridge_executor*>(nativeHandle),
            reinterpret_cast<hal_javascript_object_ref*>(nativeRefHandle));
}

JNIEXPORT jlong JNICALL
Java_com_iqiyi_halberd_liteapp_context_ExecutorManagerNative_callObjectRefFunction(
        JNIEnv *env, jclass type, jlong nativeHandle, jlong nativeRefHandle,
         jstring argument_) {
    const char *argument = env->GetStringUTFChars(argument_, 0);
    hal_native_task_executor::callNativeRefFunction(
            reinterpret_cast<jsc_bridge_executor*>(nativeHandle),
            reinterpret_cast<hal_javascript_object_ref *>(nativeRefHandle)
            , argument);
    env->ReleaseStringUTFChars(argument_, argument);
    return 1;
}

JNIEXPORT jlong JNICALL
Java_com_iqiyi_halberd_liteapp_context_ExecutorManagerNative_getTimerTimeout(
        JNIEnv *env, jclass type,jlong nativeHandle) {
    return reinterpret_cast<jsc_bridge_executor*>(nativeHandle)->timer_.get_timeout();
}

JNIEXPORT jlong JNICALL
Java_com_iqiyi_halberd_liteapp_context_ExecutorManagerNative_tickTimer(
        JNIEnv *env, jclass type,jlong nativeHandle) {
    jsc_bridge_executor* context = reinterpret_cast<jsc_bridge_executor*>(nativeHandle);
    context->timer_.tick();
    return context->timer_.get_timeout();
}
}