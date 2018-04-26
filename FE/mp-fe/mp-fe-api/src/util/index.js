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


export * from './env';
export * from './network';

export function isUndef (v) {
  return v === undefined || v === null
}

export function isDef (v){
  return v !== undefined && v !== null
}

/**
 * Mix properties into target object.
 */
export function extend (to, _from){
  for (const key in _from) {
    to[key] = _from[key]
  }
  return to
}
