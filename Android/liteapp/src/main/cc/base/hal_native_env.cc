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
#include "hal_native_env.h"
using namespace liteapp;

JavaVM* hal_native_env::_g_vm = nullptr;
thread_local JNIEnv* _g_current_thread_env = nullptr;

JNIEnv* hal_native_env::current_env() {
    if (nullptr != _g_current_thread_env) {
        return _g_current_thread_env;
    }

    if (nullptr == hal_native_env::_g_vm) {
        return nullptr;
    }

    hal_native_env::_g_vm
            ->AttachCurrentThread(&_g_current_thread_env, nullptr);
    return _g_current_thread_env;
}
