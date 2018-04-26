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
#include <base/hal_native_task_executor.h>

using namespace std;
using namespace liteapp;

namespace liteapp{
    thread_local jsc_bridge_executor* current_thread_executor = nullptr;

    jsc_bridge_executor* hal_native_task_executor::current_executor() {
        return current_thread_executor;
    }

    jsc_bridge_executor * hal_native_task_executor::createNewExecutor() {
        if(current_thread_executor== nullptr){
            current_thread_executor = new jsc_bridge_executor;
        }
        return current_thread_executor;
    }

    long hal_native_task_executor::postTaskToExecutor(jsc_bridge_executor* executor, char* jsJobString){
        if(executor== nullptr || jsJobString == nullptr){
            return false;
        }
        if(strlen(jsJobString) > 0) {
            std::string exception = "";
            executor->executor_script(jsJobString, exception);
        }
        return true;
    }

    bool hal_native_task_executor::disposeExecutor(jsc_bridge_executor* executor){
        delete executor;
        return true;
    }

    bool hal_native_task_executor::disposeProtectedRef(
            jsc_bridge_executor* context, hal_javascript_object_ref* unprotected_ref){
        if(context == nullptr || unprotected_ref == nullptr){
            return false;
        }
        JSValueUnprotect(context->executor_context_, unprotected_ref->refValue);
        delete unprotected_ref;
        return true;
    }

    long hal_native_task_executor::callNativeRefFunction(
            jsc_bridge_executor* executor, hal_javascript_object_ref * objRef, string args){
        if(executor == nullptr || objRef == nullptr){
            return false;
        }
        JSContextRef ctx = executor->executor_context_;
        JSValueRef calledObject = objRef->refValue;
        if(!JSValueIsObject(ctx,calledObject)){
            return false;
        }
        JSObjectRef obj = JSValueToObject(ctx, calledObject, nullptr);
        executor->call_object_function(
                ctx,
                obj ,
                args
        );
        return true;
    }
}