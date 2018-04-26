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
#ifndef js_bridge_js_bridge_executor
#define js_bridge_js_bridge_executor

#include <base/hal_inct.h>
#include <jsc_bridge/jsc_object_lite_app_timer.h>
#include <string>
#include <memory>
#include <base/hal_native_task.h>

using namespace std;
namespace liteapp{
    namespace bridge{
        extern JSStringRef const_string_global;

        class jsc_bridge_executor{
        public:
            jsc_bridge_executor();
            ~jsc_bridge_executor();

            void gc();
            bool executor_script(const char* buffer, std::string& e);
            bool call_object_function(JSContextRef ctx,JSObjectRef ref,
                                      std::string argument);
            liteapp::bridge::timer timer_;
            JSGlobalContextRef executor_context_ = nullptr;
            JSObjectRef global_ = nullptr;
            hal_javascript_object_ref global_ref;
        private:
            std::string executor_last_error_ = "";
            std::string executor_last_error_info_ = "";
        };
    }
}
#endif
