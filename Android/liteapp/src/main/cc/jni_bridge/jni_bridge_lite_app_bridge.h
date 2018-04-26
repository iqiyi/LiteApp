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
#ifndef jni_bridge_lite_app_bridge
#define jni_bridge_lite_app_bridge
#include <jni.h>
#include <base/hal_inct.h>

namespace liteapp{
    namespace bridge {
        class jni_lite_app_bridge {
        public:
            static bool init(JNIEnv *env);
        };

        extern jclass jni_string;

        extern jclass jni_js_bridge_function;
        extern jmethodID jni_js_bridge_function_on_attach;
        extern jmethodID jni_js_bridge_function_on_called;
        extern jmethodID jni_js_bridge_function_on_disposed;

        extern jclass jni_hash_map;
        extern jmethodID jni_hash_map_init;
        extern jmethodID jni_hash_map_set_string;
        extern jmethodID jni_hash_map_set_number;
        extern jmethodID jni_hash_map_set_boolean;
        extern jmethodID jni_hash_map_set_object;
    }
}

#endif
