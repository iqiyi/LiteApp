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
package com.iqiyi.halberd.demo.impl;

import android.app.Dialog;
import android.content.Context;
import android.graphics.Color;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.view.Gravity;
import android.view.View;
import android.view.ViewGroup;
import android.view.Window;
import android.widget.FrameLayout;
import android.widget.LinearLayout;
import android.widget.ProgressBar;
import android.widget.TextView;

import com.iqiyi.halberd.demo.R;
import com.iqiyi.halberd.liteapp.plugin.loading.LoadingViewFactory;

/**
 * Created by xujiajia_sx on 2017/12/14.
 * loading view provider provide loading view for lite app,
 * you can call by call loading in javascript and dismiss them.
 */

class LoadingViewFactoryImpl implements LoadingViewFactory {

    public Dialog createLoadingDialog(Context context){
        return new LoadingDialog(context);
    }

    @Override
    public void show(Dialog dialog) {
        if (dialog != null) {
            dialog.show();
        }
    }

    @Override
    public void hide(Dialog dialog) {
        if(dialog!=null) {
            dialog.cancel();
        }
    }

    @Override
    public void setCancelable(Dialog dialog, boolean isCancelable) {
        if(dialog!=null) {
            dialog.setCanceledOnTouchOutside(isCancelable);
        }
    }

    class LoadingDialog extends Dialog {

        LoadingDialog(@NonNull Context context) {
            super(context);
            init();
        }

        private void init(){
            if(getWindow()!=null) {
                getWindow().setBackgroundDrawable(getContext().getResources().getDrawable(R.drawable.corner_black_background));
            }
            requestWindowFeature(Window.FEATURE_NO_TITLE); //before
        }

        @Override
        protected void onCreate(Bundle savedInstanceState) {
            super.onCreate(savedInstanceState);
            setContentView(createLoadingView(getContext()));
            this.setCancelable(true);
        }

        private View createLoadingView(Context context) {
            float density=context.getResources().getDisplayMetrics().density;
            FrameLayout frameLayout1=new FrameLayout(context);
            frameLayout1.setLayoutParams(new FrameLayout.LayoutParams(
                    ViewGroup.LayoutParams.WRAP_CONTENT, ViewGroup.LayoutParams.WRAP_CONTENT));
            LinearLayout linearLayout=new LinearLayout(context);
            linearLayout.setLayoutParams(new FrameLayout.LayoutParams((int)(density*100),(int)(density*100)));
            linearLayout.setOrientation(LinearLayout.VERTICAL);
            linearLayout.setPadding((int)(density*8),(int)(density*16),(int)(density*8),(int)(density*16));
            FrameLayout frameLayout2=new FrameLayout(context);
            frameLayout2.setLayoutParams(new LinearLayout.LayoutParams(
                    ViewGroup.LayoutParams.MATCH_PARENT, 0,1));
            ProgressBar progressBar=new ProgressBar(context);
            progressBar.setLayoutParams(new FrameLayout.LayoutParams(
                    (int)(density*25),(int)(density*25), Gravity.CENTER));
            TextView textView=new TextView(context);
            textView.setLayoutParams(new FrameLayout.LayoutParams(
                    ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT));
            textView.setGravity(Gravity.CENTER);
            textView.setMaxLines(1);
            textView.setTextColor(Color.WHITE);
            textView.setText(R.string.loading);

            linearLayout.addView(frameLayout2);
            linearLayout.addView(textView);
            frameLayout2.addView(progressBar);
            frameLayout1.addView(linearLayout);
            return frameLayout1;
        }

    }
}
