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
#include<include/JavaScriptCore/JSContextRef.h>
#include "jsc_bridge/jsc_object_lite_app_timer.h"
#include <jsc_bridge/jsc_bridge_executor.h>

using namespace liteapp::bridge;

namespace liteapp{
    namespace bridge {
        JSClassRef lite_app_timer_set_timeout_function_class = nullptr;
        JSClassRef lite_app_timer_set_interval_function_class = nullptr;
        JSClassRef lite_app_timer_clear_function_class = nullptr;

        JSStringRef const_string_set_timeout = ::JSStringCreateWithUTF8CString("setTimeout");
        JSStringRef const_string_set_interval = ::JSStringCreateWithUTF8CString("setInterval");
        JSStringRef const_string_clear = ::JSStringCreateWithUTF8CString("clearTimer");
    }
}

void timer::init_lite_app_timer(){

    const static JSClassDefinition timer_set_timeout_class_definition = {
            0,                          //version
            kJSClassAttributeNone,      //attributes
            "set_timeout",                     //className
            0,                          //parentClass
            0,                          //staticValues
            0,                           //staticFunctions
            0,                          //Initialize
            0,                          //Finalize
            0,                          //has Property
            0,                          //get Property
            0,                          //set Property
            0,                          //delete Property
            0,                          //getPropertyNames
            util_set_timeout,         //callAsFunction
            0,                          //hasInstance
            0,                          //callAsConstructor
            0                           //convertToType
    };

    const static JSClassDefinition timer_set_interval_class_definition = {
            0,                          //version
            kJSClassAttributeNone,   //attributes
            "set_interval",           //className
            0,                          //parentClass
            0,                          //staticValues
            0,                           //staticFunctions
            0,                          //Initialize
            0,                          //Finalize
            0,                          //has Property
            0,                          //get Property
            0,                          //set Property
            0,                          //delete Property
            0,                          //getPropertyNames
            util_set_interval,          //callAsFunction
            0,                          //hasInstance
            0,                          //callAsConstructor
            0                           //convertToType
    };

    const static JSClassDefinition timer_clear_class_definition = {
            0,                          //version
            kJSClassAttributeNone,      //attributes
            "clear_timer",                     //className
            0,                          //parentClass
            0,                          //staticValues
            0,                           //staticFunctions
            0,                          //Initialize
            0,                          //Finalize
            0,                          //has Property
            0,                          //get Property
            0,                          //set Property
            0,                          //delete Property
            0,                          //getPropertyNames
            util_clear_timer,           //callAsFunction
            0,                          //hasInstance
            0,                          //callAsConstructor
            0                           //convertToType
    };

    lite_app_timer_set_timeout_function_class = JSClassCreate
            (&timer_set_timeout_class_definition);
    lite_app_timer_set_interval_function_class = JSClassCreate
            (&timer_set_interval_class_definition);
    lite_app_timer_clear_function_class = JSClassCreate
            (&timer_clear_class_definition);
}

timer::timer() {
    pool_.push_back(std::make_shared<timer_item>());
    begin_ = std::chrono::high_resolution_clock::now();
}

timer::~timer() {

}

bool timer::init(JSContextRef context) {
    if (nullptr == context) {
        return false;
    }
    context_ = context;
    return true;
}

bool timer::tick() {
    //__android_log_write(ANDROID_LOG_ERROR,"timer", "tick");
    if (!context_ || pool_.size() <= 1) {
        //__android_log_write(ANDROID_LOG_ERROR,"timer", "timer pool failed");
        return false;
    }

    int64_t current = current_time();
    //__android_log_write(ANDROID_LOG_ERROR,"timer", "before pool ");
    while (pool_.size() > 1) {
        auto item = pool_[1];
        if (item->timeout_ > current || item->last_call_ == current) {
            break;
        }

        JSValueRef exception = nullptr;
        std::string e;
        std::string executor_last_error_;
        std::string executor_last_error_info_;
        //__android_log_write(ANDROID_LOG_ERROR,"timer", "before call ");
        if (nullptr != item->callback_) {
            ::JSObjectCallAsFunction(context_, item->callback_, 0, 0, 0, &exception);
        }
        if (nullptr != exception) {
            JSStringRef str = ::JSValueToStringCopy(
                    context_, exception, nullptr);
            if (nullptr != str) {
                e.resize(::JSStringGetMaximumUTF8CStringSize(str));
                e.resize(::JSStringGetUTF8CString(str, &e[0], e.length()));
                ::JSStringRelease(str);
                executor_last_error_ = e;
                __android_log_write(ANDROID_LOG_ERROR, "js timer callback error", executor_last_error_.c_str());
            }

            JSStringRef lineStr = ::JSValueCreateJSONString(
                    context_, exception, 0, nullptr);
            if (nullptr != lineStr) {
                std::string lineError = "";
                lineError.resize(::JSStringGetMaximumUTF8CStringSize(lineStr));
                lineError.resize(::JSStringGetUTF8CString(
                        lineStr, &lineError[0], lineError.length()));
                ::JSStringRelease(lineStr);
                executor_last_error_info_ = lineError;
                __android_log_write(ANDROID_LOG_ERROR, "js timer callback error info ", executor_last_error_info_.c_str());
            }
        }
        //__android_log_write(ANDROID_LOG_ERROR, "js timer callback success", executor_last_error_.c_str());

        if (pool_.size() > 1) {
            if (pool_[1]->id_ != item->id_) {
                return true;
            }
        }

        if (!item->is_loop_) {
            auto iter = index_.find(item->id_);
            if (index_.end() != iter) {
                index_.erase(iter);
            }
            return erase_index(1, true);
        } else {
            erase_index(1, false);
            item->last_call_ = current;
            item->timeout_ = current + item->interval_;
            item->index_->index_ = pool_.size();
            pool_.push_back(item);

            int current_index = pool_.size() -1;
            while (1) {
                int parent_index = current_index /2;
                if (0 == parent_index) {
                    break;
                }

                if (pool_[parent_index]->timeout_ <= item->timeout_) {
                    break;
                }

                swap_timer_item(parent_index, current_index);
                current_index = parent_index;
            }
        }
    }
    return true;
}

bool timer::remove_all() {
    if (!context_) return false;
    index_.clear();
    for (size_t i = 0; i < pool_.size(); ++i) {
        ::JSValueUnprotect(context_, pool_[i]->callback_);
    }
    pool_.clear();
    return true;
}

int timer::add_new_timer(
        JSObjectRef callback, int timeout, bool loop) {
    if (!callback || !context_ || timeout < 0) {
        return 0;
    }

    if (!::JSObjectIsFunction(context_, callback)) {
        return 0;
    }
    ::JSValueProtect(context_, callback);

    int id = ++current_id_;

    auto item = std::make_shared<timer_item>();
    item->id_ = id;
    item->interval_ = timeout;
    item->is_loop_ = loop;
    item->timeout_ = current_time() + timeout;
    item->callback_ = callback;
    item->index_ = std::make_shared<timer_index>();
    item->index_->index_ = (int)pool_.size();

    pool_.push_back(item);
    index_[id] = item->index_;
    int current_index = pool_.size() -1;
    while (1) {
        int parent_index = current_index /2;
        if (pool_[parent_index]->timeout_ <= item->timeout_) {
            break;
        }
        swap_timer_item(parent_index, current_index);
        current_index = parent_index;
    }
    return id;
}

bool timer::remove_timer(int id) {
    if (!context_ || id <= 0) {
        return false;
    }

    auto iter = index_.find(id);
    if (index_.end() == iter) {
        return false;
    }
    return erase_index(iter->second->index_, true);
}

int64_t timer::get_timeout() {
    if (1 == pool_.size()) {
        return INT_MAX;
    }
    int64_t timeout=  pool_[1]->timeout_ - current_time();
    //通过递归tick 所有已经timeout 的计时器
    if(timeout < -1) {
        tick();
        timeout = get_timeout();
    }
    return timeout;
}

int64_t timer::current_time() {
    return std::chrono::duration_cast<std::chrono::milliseconds>(
            std::chrono::high_resolution_clock::now() - begin_).count();
}

bool timer::swap_timer_item(int i, int j) {
    if (i <=0 || i >= pool_.size()) {
        return false;
    }

    if (j <= 0 || j >= pool_.size()) {
        return false;
    }

    pool_[i]->index_->index_ = j;
    pool_[j]->index_->index_ = i;
    std::swap(pool_[i], pool_[j]);
    return true;
}

bool timer::erase_index(int index, bool rmcb) {
    if (!context_ || index <= 0 || index >= pool_.size()) {
        return false;
    }

    if (rmcb) {
        auto item = pool_[index];
        ::JSValueUnprotect(context_, item->callback_);
        item->callback_ = nullptr;
    }

    size_t len = pool_.size();
    if (index == len -1) {
        pool_.resize(len -1);
        return true;
    }

    pool_[index] = pool_[len -1];
    pool_.resize(len -1); len = len -1;

    int current = index;
    while (1) {
        int min_index = current;
        int64_t min_timeout = pool_[current]->timeout_;

        int l_child = current *2;
        if (l_child >= len) {
            break;
        }

        {
            auto item = pool_[l_child];
            if (item->timeout_ <= min_timeout) {
                min_timeout = item->timeout_;
                min_index = l_child;
            }
        }

        int r_child = current * 2 + 1;
        if (r_child < len) {
            auto item = pool_[r_child];
            if (item->timeout_ <= min_timeout) {
                min_timeout = item->timeout_;
                min_index = r_child;
            }
        }

        if (min_index == current) {
            break;
        }

        swap_timer_item(min_index, current);
        current = min_index;
    }
    return true;
}

inline jsc_bridge_executor* _obtian_executor(JSObjectRef obj) {
    if (nullptr == obj) return nullptr;
    return (jsc_bridge_executor*)::JSObjectGetPrivate(obj);
}

JSValueRef timer::util_set_timeout(__jsc_param) {
    //__android_log_write(ANDROID_LOG_ERROR,"timer","set timer");
    auto executor = _obtian_executor(func);
    if (nullptr == executor) return nullptr;
    if (argumentsCount < 1|| !arguments[0] || !arguments[1]) {
        return nullptr;
    }

    if (!::JSValueIsObject(ctx, arguments[0])) {
        return nullptr;
    }
    auto callback = ::JSValueToObject(ctx, arguments[0], nullptr);
    if (nullptr == callback) return nullptr;
    double timeout = 0;
    if (argumentsCount > 1 ) {
        if (!::JSValueIsNumber(ctx, arguments[1])) {
            return nullptr;
        }

        JSValueRef e = nullptr;
        timeout = ::JSValueToNumber(ctx, arguments[1], &e);
        if (nullptr != e) return nullptr;

    }
    int ret = executor->timer_
            .add_new_timer(callback, (int)timeout, false);
    if (0 == ret) return nullptr;
    return ::JSValueMakeNumber(ctx, ret);
}

JSValueRef timer::util_set_interval(__jsc_param) {
    auto executor = _obtian_executor(func);
    if (nullptr == executor) return nullptr;
    if (argumentsCount < 2 || !arguments[0] || !arguments[1]) {
        return nullptr;
    }

    if (!::JSValueIsObject(ctx, arguments[0])) {
        return nullptr;
    }
    auto callback = ::JSValueToObject(ctx, arguments[0], nullptr);
    if (nullptr == callback) return nullptr;
    if (!::JSValueIsNumber(ctx, arguments[1])) {
        return nullptr;
    }

    JSValueRef e = nullptr;
    double timeout = ::JSValueToNumber(ctx, arguments[1], &e);
    if (nullptr != e) return nullptr;
    int ret = executor->timer_
            .add_new_timer(callback, (int)timeout, true);
    if (0 == ret) return nullptr;
    return ::JSValueMakeNumber(ctx, ret);
}

JSValueRef timer::util_clear_timer(__jsc_param) {
    auto executor = _obtian_executor(func);
    if (nullptr == executor) return nullptr;
    if (argumentsCount < 1 || !arguments[0]) {
        return nullptr;
    }

    JSValueRef e = nullptr;
    double id = ::JSValueToNumber(ctx, arguments[0], &e);
    if (nullptr != e) return nullptr;
    bool ret = executor->timer_.remove_timer((int)id);
    return ::JSValueMakeBoolean(ctx, ret);
}