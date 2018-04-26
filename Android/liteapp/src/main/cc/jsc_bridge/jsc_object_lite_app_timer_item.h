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
#ifndef jsc_object_lite_app_timer_item_h_
#define jsc_object_lite_app_timer_item_h_

#include "base/hal_inct.h"

namespace liteapp {
    namespace bridge {
        class timer_index {
        public:
            int index_ = 0;
        };

        class timer_item {
        public:
            int         id_ = 0;
            long        interval_ = 0;
            int64_t     timeout_ = 0;
            bool        is_loop_ = false;
            JSObjectRef callback_ = nullptr;
            int64_t     last_call_ = 0;
            std::shared_ptr<timer_index> index_;
        };
    }
}
#endif
