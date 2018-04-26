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
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
import android.graphics.RectF;
import android.support.annotation.Nullable;
import android.util.AttributeSet;
import android.view.View;
/**
 * Created by xuyunhua on 2017/7/24.
 */
public class CustomProgressBar extends View {
    private Paint paint;
    private int backColor= Color.parseColor("#1565C0");
    private int barColor=Color.parseColor("#D32F2F");
    private int radius;
    private int progress;
    private int h=0,w=0;
    private boolean isVisible=true;
    private RectF r;
    private  RectF bar;
    public CustomProgressBar(Context context) {
        super(context);
        init();
    }

    public CustomProgressBar(Context context, @Nullable AttributeSet attrs) {
        super(context, attrs);
        init();
    }

    public CustomProgressBar(Context context, @Nullable AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
    }
    public void init(){
        paint=new Paint(Paint.ANTI_ALIAS_FLAG);
        progress=0;
        radius=0;
        r=new RectF();
        bar=new RectF();
    }

    @Override
    protected void onMeasure(int widthMeasureSpec, int heightMeasureSpec) {
        super.onMeasure(widthMeasureSpec, heightMeasureSpec);
        w=getSize(1080,widthMeasureSpec);
        h=getSize(5,heightMeasureSpec);
        radius=h/50;
        setMeasuredDimension(w,h);

    }

    @Override
    protected void onDraw(Canvas canvas) {
        paint.setColor(backColor);
        paint.setStyle(Paint.Style.FILL_AND_STROKE);
        r.set(0,0,getMeasuredWidth(),getMeasuredHeight());
        canvas.drawRoundRect(r,radius,radius,paint);
        paint.setColor(barColor);
        paint.setStyle(Paint.Style.FILL_AND_STROKE);
        paint.setStrokeWidth(10f);
        bar.set(0,0,getMeasuredWidth()*progress/100f,getMeasuredHeight());
        canvas.drawRoundRect(bar,radius,radius,paint);
    }

    private int getSize(int defaultSize,int measureSpc){
        int size=0;
        int mode=0;
        int mSize=defaultSize;
        size=MeasureSpec.getSize(measureSpc);
        mode=MeasureSpec.getMode(measureSpc);
        switch (mode){
            case MeasureSpec.AT_MOST:
            case MeasureSpec.UNSPECIFIED:
                mSize=defaultSize;
                break;
            case MeasureSpec.EXACTLY:
                mSize=size;
                break;
        }
        return mSize;
    }

    public void setProgress(int p){
        if(p>100||p<0){
            progress=0;
            setInvisible();
            return;
        }
        this.progress=++p;
        invalidate();
    }

    public int getProgress(){
        return this.progress;
    }

    public void setup(){
       this.setVisibility(View.VISIBLE);
        isVisible=true;
        init();
        invalidate();
    }
    public void setInvisible(){
        this.setVisibility(View.INVISIBLE);
        isVisible=false;
    }

    public static CustomProgressBar getPogressBar(Context context){
        return new CustomProgressBar(context);
    }
    public boolean isVisible(){
        return isVisible;
    }


}
