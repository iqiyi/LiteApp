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
#ifndef jsc_bridge_jsc_object_java_related_function
#define jsc_bridge_jsc_object_java_related_function

#include <base/hal_inct.h>
#include <base/hal_native_task.h>

namespace liteapp{
    namespace bridge{
        class jsc_java_related_function{
        private:
            static void init_java_related_function();
        public:
            static void onDispose(JSObjectRef object);
            static JSValueRef callAsFunction(JSContextRef context, JSObjectRef function
                    , JSObjectRef thisObject, size_t argumentCount, const JSValueRef arguments[],
                    JSValueRef *exception);
            //using this method to create only
            static hal_javascript_object_ref* createFromJavaFunction(JSContextRef context);
       };

        extern JSClassRef lite_app_java_related_function_class;
        extern bool jsc_java_related_function_inited;
    }
}
#endif
