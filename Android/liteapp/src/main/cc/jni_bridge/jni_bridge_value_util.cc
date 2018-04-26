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
#include "jni_bridge/jni_bridge_value_util.h"
#include "jni_bridge_lite_app_bridge.h"

using namespace liteapp;
using namespace bridge;

jsc_value_util::jsc_value_util(
        JSContextRef& ctx, JSValueRef& val)
        :value_(val), context_(ctx) {
}

bool jsc_value_util::is_valid() const {
    return value_ && context_;
}

bool jsc_value_util::is_null() {
    if (!context_ || !value_) {
        return false;
    }
    return ::JSValueIsNull(context_, value_);
}

bool jsc_value_util::is_undefined() {
    if (!context_ || !value_) {
        return false;
    }
    return ::JSValueIsUndefined(context_, value_);
}

bool jsc_value_util::is_number() {
    if (!context_ || !value_) {
        return false;
    }
    return ::JSValueIsNumber(context_, value_);
}

bool jsc_value_util::is_boolean() {
    if (!context_ || !value_) {
        return false;
    }
    return ::JSValueIsBoolean(context_, value_);
}

bool jsc_value_util::is_object() {
    if (!context_ || !value_) {
        return false;
    }
    return ::JSValueIsObject(context_, value_);
}

bool jsc_value_util::is_string() {
    if (!context_ || !value_) {
        return false;
    }
    return ::JSValueIsString(context_, value_);
}

bool jsc_value_util::convert_to_boolean(bool& val) {
    if (!context_ || !value_) {
        return false;
    }
    val = ::JSValueToBoolean(context_, value_);
    return true;
}

bool jsc_value_util::convert_to_double(double& val) {
    if (!context_ || !value_) {
        return false;
    }

    JSValueRef exception = nullptr;
    val = ::JSValueToNumber(context_, value_, &exception);
    return nullptr == exception;
}

bool jsc_value_util::convert_to_string(std::string& val) {
    if (!context_ || !value_) {
        return false;
    }

    JSValueRef exception = nullptr;
    ::JSStringRef jstr = ::JSValueToStringCopy(context_, value_, &exception);
    if (nullptr != exception || nullptr == jstr) return false;
    val.resize(::JSStringGetMaximumUTF8CStringSize(jstr), 0);
    val.resize(::JSStringGetUTF8CString(jstr, &val[0], val.length()) -1);
    ::JSStringRelease(jstr);

    return true;
}

bool jsc_value_util::convert_to_object(JSObjectRef& obj) {
    if (!context_ || !value_) {
        return false;
    }

    JSValueRef exception = nullptr;
    obj = ::JSValueToObject(context_, value_, &exception);
    return nullptr == exception;
}

bool jsc_value_util::convert_to_json_string(std::string& val) {
    if (!context_ || !value_) return false;
    JSStringRef jstr = ::JSValueCreateJSONString(context_, value_, 0, nullptr);
    if (nullptr == jstr) return false;
    val.resize(::JSStringGetMaximumUTF8CStringSize(jstr), 0);
    val.resize(::JSStringGetUTF8CString(jstr, &val[0], val.length()) -1);
    ::JSStringRelease(jstr);

    return true;
}

bool jsc_value_util::convert_to_jni_hash_map(jobject &obj, int level)  {
    if (!context_ || !value_) return false;
    JNIEnv* env = hal_native_env::current_env();
    if (nullptr == env) return false;
    if (!::JSValueIsObject(context_, value_)) return false;
    JSObjectRef object = ::JSValueToObject(context_, value_, nullptr);
    if (nullptr == object) return false;
    obj = env->NewObject(jni_hash_map, jni_hash_map_init);
    if (nullptr == obj) return false;
    JSPropertyNameArrayRef keys = ::JSObjectCopyPropertyNames(context_, object);
    if (nullptr == keys) return true;

    size_t size = ::JSPropertyNameArrayGetCount(keys);
    for (size_t i = 0; i < size; ++i) {
        JSStringRef key = ::JSPropertyNameArrayGetNameAtIndex(keys, i);
        if (nullptr == key) continue;

        jstring hkey = nullptr;
        {
            char _buffer[64] = {0};
            ::JSStringGetUTF8CString(key, _buffer, 63);
            hkey = env->NewStringUTF(_buffer);
        }

        JSValueRef value = ::JSObjectGetProperty(context_, object, key, nullptr);
        if (nullptr == value) continue;

        jsc_value_util util(context_, value);
        if (util.is_number()) {
            double number = 0;
            util.convert_to_double(number);
            env->CallVoidMethod(obj, jni_hash_map_set_number, hkey, number);
        } else if (util.is_boolean()) {
            bool boolean = false;
            util.convert_to_boolean(boolean);
            env->CallVoidMethod(obj, jni_hash_map_set_boolean, hkey,boolean);
        } else if (util.is_string()) {
            std::string str = "";
            util.convert_to_string(str);
            jstring jstr = env->NewStringUTF(str.c_str());
            env->CallVoidMethod(obj, jni_hash_map_set_string, hkey, jstr);
            env->DeleteLocalRef(jstr);
        } else if (util.is_object() && level > 0) {
            jobject itemObject = nullptr;
            util.convert_to_jni_hash_map(itemObject, --level);
            if (nullptr == itemObject) continue;
            env->CallVoidMethod(obj, jni_hash_map_set_object, hkey, itemObject);
        }

        env->DeleteLocalRef(hkey);
    }
    return true;
}
