/*
 * Copyright (C) 2019 Facishare Technology Co., Ltd. All Rights Reserved.
 */
package com.iqiyi.halberd.demo;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;

public class ShowActivity extends Activity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_show);
        setTitle("我是原生页面");


        findViewById(R.id.show_button).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent();
                intent.putExtra("name","ceshi");
                setResult(0,intent);
                finish();
            }
        });

    }

    protected void onResume() {
        super.onResume();
    }
}
