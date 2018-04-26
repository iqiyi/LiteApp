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
package com.iqiyi.halberd.liteapp.plugin.loading;

import android.app.Dialog;
import android.content.Context;

/**
 * Created by xujiajia_sx on 2017/12/14.
 *
 */

public interface LoadingViewFactory {

    Dialog createLoadingDialog(Context context);

    void show(Dialog dialog);

    void hide(Dialog dialog);

    void setCancelable(Dialog dialog,boolean isCancelable);
}
