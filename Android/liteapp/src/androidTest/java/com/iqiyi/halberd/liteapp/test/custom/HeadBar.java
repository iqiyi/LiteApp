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

import android.content.Context;
import android.graphics.Color;
import android.view.ViewGroup;
import android.widget.LinearLayout;
import android.widget.RelativeLayout;
/**
 * Created by xuyunhua on 2017/7/25.
 */
public class HeadBar {
    private TitleBarView titleBarView;
    private CustomProgressBar progressBar;
    private LinearLayout head;
    public  static HeadBar getInstance(){
        return new HeadBar();
    }
    public  LinearLayout initView(Context context){
        if(head==null){
            head=new LinearLayout(context);
            LinearLayout.LayoutParams params=new LinearLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT,ViewGroup.LayoutParams.WRAP_CONTENT);
            params.setMargins(0,0,0,0);
            head.setLayoutParams(params);
            head.setOrientation(LinearLayout.VERTICAL);
            initTitleBar(context);
            initProgressBar(context);
            if(titleBarView!=null)
                head.addView(titleBarView);
            if(progressBar!=null)
                head.addView(progressBar);
        }
        return  head;
    }
    public  void initTitleBar(Context context){
        if(titleBarView==null){
            titleBarView=TitleBarView.getInstance(context);
            RelativeLayout.LayoutParams params=new RelativeLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT,200);
            params.setMargins(0,0,0,0);
            titleBarView.setLayoutParams(params);
            titleBarView.setBackgroundColor(Color.parseColor("#1565C0"));
        }
    }
    public void initProgressBar(Context context){
        if(progressBar==null){
            progressBar=CustomProgressBar.getPogressBar(context);
            LinearLayout.LayoutParams params=new LinearLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT,10);
            params.setMargins(0,0,0,0);
            progressBar.setLayoutParams(params);
        }
    }

    public LinearLayout getHead(){
        return  this.head;
    }

    public TitleBarView getTitleBarView() {
        return titleBarView;
    }

    public void setTitleBarView(TitleBarView titleBarView) {
        this.titleBarView = titleBarView;
    }

    public CustomProgressBar getProgressBar() {
        return progressBar;
    }

    public void setProgressBar(CustomProgressBar progressBar) {
        this.progressBar = progressBar;
    }



}
