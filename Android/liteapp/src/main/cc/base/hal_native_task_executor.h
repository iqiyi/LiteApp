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
#ifndef _base_hal_native_task_executor_h_
#define _base_hal_native_task_executor_h_

#include "base/hal_inct.h"
#include "base/hal_native_task.h"
#include <jsc_bridge/jsc_bridge_executor.h>

using namespace std;
using namespace liteapp::bridge;

namespace liteapp {

    class hal_native_task_executor {
    public :
        //create new executor and return thread id
        static jsc_bridge_executor *createNewExecutor();
        static long postTaskToExecutor(jsc_bridge_executor *context, char *jsJobString);
        static bool disposeExecutor(jsc_bridge_executor *context);
        static bool disposeProtectedRef(jsc_bridge_executor *context, hal_javascript_object_ref* unprotected_ref);
        static long callNativeRefFunction( jsc_bridge_executor* context, hal_javascript_object_ref *objRef
                , string args);

        static jsc_bridge_executor* current_executor();
    };
}
#endif
