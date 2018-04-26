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
#ifndef _base_jsc_base_hal_value_util_h_
#define _base_jsc_base_hal_value_util_h_

#include "base/hal_inct.h"

namespace liteapp {
    namespace bridge {
        class jsc_value_util {
        public:
            jsc_value_util(JSContextRef& ctx, JSValueRef& val);

        public:
            bool is_valid() const;

        public:
            bool is_null();
            bool is_undefined();
            bool is_number();
            bool is_boolean();
            bool is_object();
            bool is_string();

        public:
            bool convert_to_boolean(bool& val);
            bool convert_to_double(double& val);
            bool convert_to_string(std::string& val);
            bool convert_to_object(JSObjectRef& obj);
            bool convert_to_json_string(std::string& val);
            bool convert_to_jni_hash_map(jobject &obj, int level);

        private:
            JSValueRef& value_;
            JSContextRef& context_;
        };
    }
}
#endif//_base_jsc_base_hal_value_util_h_
