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
package com.iqiyi.halberd.liteapp.test.custom;

import android.app.Activity;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.Color;
import android.os.Bundle;
import android.provider.MediaStore;
import android.widget.ImageView;
import android.widget.RelativeLayout;
/**
 * Created by xuyunhua on 2017/7/21.
 */

public class OpenCameraTestActivity extends Activity {
    private RelativeLayout container;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        container=new RelativeLayout(getApplicationContext());
        container.setGravity(RelativeLayout.CENTER_HORIZONTAL);
        container.setBackgroundColor(Color.BLUE);
        setContentView(container);
        Intent intent=new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
        startActivityForResult(intent,1);
    }
    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if(requestCode==1&&resultCode==RESULT_OK){

            final ImageView imageView=new ImageView(getApplicationContext());
            imageView.setImageBitmap((Bitmap) data.getExtras().get("data"));
            RelativeLayout.LayoutParams layoutParams = new RelativeLayout.LayoutParams(400,400);
            layoutParams.setMargins(200,400,0,0);
            imageView.setLayoutParams(layoutParams);
            container.post(new Runnable() {
                @Override
                public void run() {
                    container.addView(imageView);
                }
            });
        }
    }
}
