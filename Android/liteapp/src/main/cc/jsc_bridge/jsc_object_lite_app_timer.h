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
#ifndef _base_jni_hal_executor_timer_h_
#define _base_jni_hal_executor_timer_h_

#include <base/hal_inct.h>
#include <jsc_bridge/jsc_object_lite_app_timer_item.h>

namespace liteapp {
    namespace bridge {
        class timer {
        public:
            timer();
            virtual ~timer();
            bool init(JSContextRef context);
            bool tick();
            bool remove_all();
            int add_new_timer(JSObjectRef callback, int timeout, bool loop);
            bool remove_timer(int id);
            int64_t get_timeout();

        private:
            int current_id_ = 0;
            JSContextRef context_ = nullptr;
            std::map<int, std::shared_ptr<timer_index>> index_;
            std::vector<std::shared_ptr<timer_item>> pool_;
            std::chrono::time_point<std::chrono::high_resolution_clock> begin_;

            int64_t current_time();
            bool swap_timer_item(int i, int j);
            bool erase_index(int index, bool rmcb);

        public:
            static JSValueRef util_set_timeout(__jsc_param);
            static JSValueRef util_set_interval(__jsc_param);
            static JSValueRef util_clear_timer(__jsc_param);

        public:
            static void init_lite_app_timer();
        };

        extern JSClassRef lite_app_timer_set_timeout_function_class;
        extern JSClassRef lite_app_timer_set_interval_function_class;
        extern JSClassRef lite_app_timer_clear_function_class;

        extern JSStringRef const_string_set_timeout;
        extern JSStringRef const_string_set_interval;
        extern JSStringRef const_string_clear;
    }
}
#endif
