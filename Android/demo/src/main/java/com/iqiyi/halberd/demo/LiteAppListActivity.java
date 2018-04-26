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
package com.iqiyi.halberd.demo;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.os.AsyncTask;
import android.os.Bundle;
import android.view.Gravity;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.BaseAdapter;
import android.widget.ListView;
import android.widget.TextView;

import com.iqiyi.halberd.demo.impl.LiteAppDemoConfig;
import com.iqiyi.halberd.liteapp.api.LiteAppHelper;
import com.iqiyi.halberd.demo.impl.manager.LiteAppPackageManager;
import com.iqiyi.halberd.liteapp.manager.impl.LiteAppDescription;

import java.util.List;

public class LiteAppListActivity extends Activity {
    ListView listView;
    List<LiteAppDescription> descriptionList;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        LiteAppDemoConfig.validate(this);
        setContentView(R.layout.activity_lite_app_list);
        setTitle("Lite App List");
        listView = findViewById(R.id.lite_app_list);
        LiteAppListTask task = new LiteAppListTask();
        task.executeOnExecutor(LiteAppListTask.THREAD_POOL_EXECUTOR);
        LiteAppHelper.prepareLiteAppPage(this);

        listView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                LiteAppDescription item = descriptionList.get(position);
                if(item!=null){
                    //on click to auth page

                    Bundle initData = new Bundle();
                    initData.putInt("tvid",841976700);
                    LiteAppHelper.startLiteAppPackage(LiteAppListActivity.this, item.getId(),true, initData,false);
                }
            }
        });
    }
    @SuppressLint("StaticFieldLeak")
    private class LiteAppListTask extends AsyncTask<Void,Void,List<LiteAppDescription>> {
        @Override
        protected List<LiteAppDescription> doInBackground(Void... params) {
            return LiteAppPackageManager.getInstance().getSearchLiteApp
            (LiteAppListActivity.this,"",false);
        }

        @Override
        protected void onPostExecute(List<LiteAppDescription> liteAppDescriptions) {
            super.onPostExecute(liteAppDescriptions);
            if(liteAppDescriptions!=null){
                descriptionList = liteAppDescriptions;
                listView.setAdapter(new LiteAppAdapter());
            }
        }
    }

    private class LiteAppAdapter extends BaseAdapter{
        @Override
        public int getCount() {
            return descriptionList.size();
        }

        @Override
        public Object getItem(int position) {
            return descriptionList.get(position);
        }

        @Override
        public long getItemId(int position) {
            return position;
        }

        @Override
        public View getView(int position, View convertView, ViewGroup parent) {
            if(convertView == null){
                convertView = new TextView(parent.getContext());
                convertView.setLayoutParams(new ListView.LayoutParams(
                        ViewGroup.LayoutParams.MATCH_PARENT,150));
                ((TextView)convertView).setGravity(Gravity.CENTER);
            }
            ((TextView)convertView).setText(descriptionList.get(position).getName());
            return convertView;
        }
    }
}
