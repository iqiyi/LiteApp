
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
#ifndef _base_hal_inct_h
#define _base_hal_inct_h

#include <map>
#include <vector>
#include <string>
#include <limits.h>
#include <functional>
#include <mutex>
#include <thread>
#include <jni.h>
#include <android/log.h>

#include "JavaScriptCore/JavaScript.h"

#define __jsc_param                                                 \
    JSContextRef ctx, JSObjectRef func, JSObjectRef thiz,           \
    size_t argumentsCount, const JSValueRef arguments[],            \
    JSValueRef* exception

#endif//_base_hal_inct_h
