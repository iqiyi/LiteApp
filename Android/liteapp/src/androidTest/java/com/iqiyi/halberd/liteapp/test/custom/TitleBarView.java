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
import android.util.AttributeSet;
import android.view.View;
import android.widget.Button;
import android.widget.RelativeLayout;

import com.iqiyi.halberd.liteapp.event.BridgeEvent;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by xuyunhua on 2017/7/24.
 */

public class TitleBarView extends RelativeLayout {
    private Button back;
    private BridgeEvent event;
    private RelativeLayout.LayoutParams lp;
    private Context currentContext;
    private List<Context>historyContext=new ArrayList<>();
    private ListenerContext lis;
    public TitleBarView(Context context) {
        super(context);
        init();
    }
    public TitleBarView(Context context, AttributeSet attrs) {
        super(context, attrs);
        init();
    }
    public TitleBarView(Context context, AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
        init();
    }
    public void init() {
        this.setBackgroundColor(Color.parseColor("#1565C0"));
    }
    public void setVisible(boolean visible){
        if(visible){
            this.setVisibility(View.VISIBLE);
            return;
        }
        this.setVisibility(View.INVISIBLE);
    }
    public BridgeEvent getEvent() {
        return event;
    }
    public void setEvent(BridgeEvent event) {
        this.event = event;
    }
    public  static TitleBarView getInstance(Context context){
        return  new TitleBarView(context);
    }
    interface ListenerContext{
        Context setCurrentContext();
        Context distoryContext();
    }
    public void setListenerContext(ListenerContext l){
        if(l!=null)
            this.lis=l;
    }
    public Context attachContext(){
        currentContext=lis.setCurrentContext();
        if(!historyContext.contains(currentContext))
              historyContext.add(currentContext);
        return currentContext;
    }
    public void distachContext(){
        Context con=lis.distoryContext();
        if(historyContext.contains(con))
            historyContext.remove(con);
    }
}
