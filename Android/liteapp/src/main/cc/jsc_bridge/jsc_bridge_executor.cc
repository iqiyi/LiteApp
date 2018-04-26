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
#include <jsc_bridge/jsc_bridge_executor.h>

using namespace liteapp::bridge;

namespace liteapp{
    namespace bridge{
        JSStringRef const_string_global = ::JSStringCreateWithUTF8CString("global");
    }
}

jsc_bridge_executor::jsc_bridge_executor() {
    executor_context_ = ::JSGlobalContextCreate(nullptr);
    if (nullptr != executor_context_) {
        global_ = ::JSContextGetGlobalObject(executor_context_);
        global_ref.refValue = global_;
    }

    ::JSObjectSetProperty(executor_context_, global_,
                          const_string_global, global_, kJSPropertyAttributeReadOnly, nullptr);

    timer_.init(executor_context_);
    //init timer
    JSObjectRef timerRef = JSObjectMake(executor_context_, lite_app_timer_set_timeout_function_class, this);

    ::JSObjectSetProperty(executor_context_, global_,
                          const_string_set_timeout,
                          timerRef,
                          kJSPropertyAttributeReadOnly, nullptr);

    jsc_bridge_executor* privat = (jsc_bridge_executor*)::JSObjectGetPrivate(timerRef);

    ::JSObjectSetProperty(executor_context_, global_,
                          const_string_set_interval,
                          JSObjectMake(executor_context_, lite_app_timer_set_interval_function_class, this),
                          kJSPropertyAttributeReadOnly, nullptr);

    ::JSObjectSetProperty(executor_context_, global_,
                          const_string_clear,
                          JSObjectMake(executor_context_, lite_app_timer_clear_function_class, this),
                          kJSPropertyAttributeReadOnly, nullptr);
}

jsc_bridge_executor::~jsc_bridge_executor() {
    timer_.remove_all();
    if (nullptr != executor_context_) {
        ::JSGlobalContextRelease(executor_context_);
    }
}

bool jsc_bridge_executor::call_object_function(JSContextRef ctx, JSObjectRef ref,
                                               std::string argument) {
    JSStringRef argument_ref = JSStringCreateWithUTF8CString(argument.c_str());
    JSValueRef  argument_value_ref = JSValueMakeString(ctx, argument_ref);
    JSValueRef exception = nullptr;
    ::JSObjectCallAsFunction(ctx, ref, 0, 1, &argument_value_ref , &exception);
    if (nullptr != exception) {
        JSStringRef str = ::JSValueToStringCopy(
                executor_context_, exception, nullptr);
        if (nullptr != str) {
            argument.resize(::JSStringGetMaximumUTF8CStringSize(str));
            argument.resize(::JSStringGetUTF8CString(str, &argument[0], argument.length()));
            ::JSStringRelease(str);
            executor_last_error_ = argument;
            __android_log_write(ANDROID_LOG_ERROR, "js object function error", executor_last_error_.c_str());
        }

        JSStringRef lineStr = ::JSValueCreateJSONString(
                executor_context_, exception, 0, nullptr);
        if (nullptr != lineStr) {
            std::string lineError = "";
            lineError.resize(::JSStringGetMaximumUTF8CStringSize(lineStr));
            lineError.resize(::JSStringGetUTF8CString(
                    lineStr, &lineError[0], lineError.length()));
            ::JSStringRelease(lineStr);
            executor_last_error_info_ = lineError;
            __android_log_write(ANDROID_LOG_ERROR, "js object function error info ",
                                executor_last_error_info_.c_str());
        }
        //__android_log_write(ANDROID_LOG_ERROR, "js object function success ","");
    }
    JSStringRelease(argument_ref);
    return true;
}

bool jsc_bridge_executor::executor_script(const char *buffer, std::string &e) {
    if (nullptr == buffer || nullptr == executor_context_) {
        return false;
    }

    executor_last_error_ = "";
    executor_last_error_info_ = "";
    JSValueRef exception = nullptr;
    __android_log_write(ANDROID_LOG_INFO, "js script executing", "executing");
    JSStringRef script = ::JSStringCreateWithUTF8CString(buffer);
    ::JSEvaluateScript(executor_context_, script, 0, 0, 0, &exception);
    if (nullptr != exception) {
        JSStringRef str = ::JSValueToStringCopy(
                executor_context_, exception, nullptr);
        if (nullptr != str) {
            e.resize(::JSStringGetMaximumUTF8CStringSize(str));
            e.resize(::JSStringGetUTF8CString(str, &e[0], e.length()));
            ::JSStringRelease(str);
            executor_last_error_ = e;
            __android_log_write(ANDROID_LOG_ERROR, "js script error", executor_last_error_.c_str());
        }

        JSStringRef lineStr = ::JSValueCreateJSONString(
                executor_context_, exception, 0, nullptr);
        if (nullptr != lineStr) {
            std::string lineError = "";
            lineError.resize(::JSStringGetMaximumUTF8CStringSize(lineStr));
            lineError.resize(::JSStringGetUTF8CString(
                    lineStr, &lineError[0], lineError.length()));
            ::JSStringRelease(lineStr);
            executor_last_error_info_ = lineError;
            __android_log_write(ANDROID_LOG_ERROR, "js script error info ", executor_last_error_info_.c_str());
        }
    }
    __android_log_write(ANDROID_LOG_INFO, "js script success", "success");
    ::JSStringRelease(script);
    return nullptr == exception;
}

void jsc_bridge_executor::gc() {

}