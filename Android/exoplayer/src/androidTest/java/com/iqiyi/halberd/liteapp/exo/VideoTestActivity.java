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
package com.iqiyi.halberd.liteapp.exo;

import android.app.Activity;
import android.os.Bundle;

public class VideoTestActivity extends Activity {
    LiteAppExoVideoView liteAppVideoView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        liteAppVideoView = new LiteAppExoVideoView(this);
        setContentView(liteAppVideoView);
        liteAppVideoView.init();
        liteAppVideoView.loadMp4UriSource("http://119.84.28.1/videos/v0/20171124/d8/d6/aa0b15158e22fb6c799444f46ca5f1d4.mp4?key=0f7293bc5d96f5f668db4285352269d5d&dis_k=20928c9f68149d557208268e920245325&dis_t=1512459448&dis_dz=CT-QIYI_SHMinRun&dis_st=44&src=iqiyi.com&uuid=add4ab1-5a264cb8-b8&m=v&qd_ip=65e30cfd&qd_p=65e30cfd&qd_k=c20be0aa2ce227f00b1b5a780c2c80a5&qd_src=02028001010000000000&ssl=1&ip=101.227.12.253&qd_vip=0&dis_src=vrs&qd_uid=0&qdv=1&qd_tm=1512459448604");
        liteAppVideoView.start();
    }
}
