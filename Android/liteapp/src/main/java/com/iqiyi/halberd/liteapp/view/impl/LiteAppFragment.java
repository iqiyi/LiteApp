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
package com.iqiyi.halberd.liteapp.view.impl;

import android.annotation.SuppressLint;
import android.app.Fragment;
import android.content.Context;
import android.graphics.Color;
import android.os.Build;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.support.v4.view.PagerAdapter;
import android.support.v4.view.ViewPager;
import android.text.TextUtils;
import android.util.Log;
import android.util.SparseArray;
import android.view.LayoutInflater;
import android.view.MotionEvent;
import android.view.View;
import android.view.ViewGroup;
import android.view.animation.AccelerateDecelerateInterpolator;
import android.view.animation.Animation;
import android.view.animation.TranslateAnimation;
import android.widget.LinearLayout;

import com.iqiyi.halberd.liteapp.api.provider.LiteAppPackageProvider;
import com.iqiyi.halberd.liteapp.common.BridgeConstant;
import com.iqiyi.halberd.liteapp.common.LiteAppException;
import com.iqiyi.halberd.liteapp.context.ExecutorManager;
import com.iqiyi.halberd.liteapp.context.LiteAppFactory;
import com.iqiyi.halberd.liteapp.context.LiteAppPage;
import com.iqiyi.halberd.liteapp.event.BridgeEvent;
import com.iqiyi.halberd.liteapp.event.impl.EventBridgeImpl;
import com.iqiyi.halberd.liteapp.utils.DisplayUtils;
import com.iqiyi.halberd.liteapp.utils.LogUtils;

import org.json.JSONObject;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * Created by eggizhang@qiyi.com on 2017/7/25.
 * Lite app fragment host a lite app container and related items
 */
public class LiteAppFragment extends Fragment {
    /** use multiple lite app pages for tab view pager style*/
    SparseArray<LiteAppPage> liteAppPages = new SparseArray<>();
    String liteAppID;
    List<String> scripts = new ArrayList<>();
    List<View> pagerContent = new ArrayList<>();
    ViewPager viewPager;
    OnPageChangeListener onPageChangeListener;
    LinearLayout host;
    View tabView;
    View dividerView;
    Fragment preFragment;
    int preItem=0;

    public static Animation createInAnimation;
    public static Animation createOutAnimation;
    public static Animation destroyInAnimation;
    public static Animation destroyOutAnimation;

    private final static String TAG = LiteAppFragment.class.getName();

    public LiteAppFragment() {
        super();
        LogUtils.log(LogUtils.LOG_MINI_PROGRAM_PAGE_LIFE_CYCLE,LogUtils.LIFE_FRAGMENT+LogUtils.LIFE_OBJECT_CREATE);
    }

    public static LiteAppFragment requireInstance(Context context,
                                                      String liteAppID, List<String> pageName, List<String> sourceScripts, List<String> cssPath, JSONObject bundle) throws LiteAppException {
        LiteAppFragment instance = new LiteAppFragment();
        instance.liteAppID = liteAppID;
        instance.prepareView(context,pageName, sourceScripts,cssPath, bundle);
        return instance;
    }

    public static LiteAppFragment requireInstance(Context context,
                                                      String liteAppID, String pageName,  String sourceScript, String cssPath, JSONObject bundle) throws LiteAppException {
        return requireInstance(context,liteAppID, Collections.singletonList(pageName),
                Collections.singletonList(sourceScript), Collections.singletonList(cssPath), bundle);
    }

    public void setOnPageChangeListener(OnPageChangeListener listener){
        this.onPageChangeListener = listener;
    }

    public void setPage(int i){
        if(viewPager!=null){
            viewPager.setCurrentItem(i,false);
        }
    }

    public void setTabView(View newTabView){
        Context viewContext = newTabView.getContext();
        if(tabView!=null){
            host.removeView(tabView);
        }
        if(dividerView!=null){
            host.removeView(dividerView);
        }
        tabView = newTabView;
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            tabView.setElevation(DisplayUtils.dip2px(viewContext,2));
        }
        dividerView = new View(viewContext);
        dividerView.setLayoutParams(new LinearLayout.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT,1)
        );
        dividerView.setBackgroundColor(Color.parseColor("#BDBDBD"));

        if(tabView.getParent()!=null){
            return;
        }
        if(host!=null) {
            host.addView(dividerView);
            host.addView(tabView);
        }
    }

    private void prepareView(Context context, List<String> pageName, final List<String> scripts,final List<String> cssPath, JSONObject bundle) throws LiteAppException {
        this.scripts = scripts;
        if(scripts.size() == 1) {
            //create view immediately and return one page, no view pager
            LiteAppPage page = LiteAppFactory.getWebViewLiteAppPageCache
                    (context, LiteAppPackageProvider.getClient().prepareLiteAppIfCache(liteAppID),bundle);
            page.setAppID(liteAppID);
            if(cssPath!=null){
                if(cssPath.size()>0){
                    page.injectPageCss(cssPath.get(0));
                }
            }
            liteAppPages.put(0,page);
            if(!TextUtils.isEmpty(scripts.get(0))) {
                ExecutorManager.executeScript(page, scripts.get(0));
            }
        }
        if(scripts.size() > 1){
            //prepare views
            for(int position=0; position<scripts.size(); position ++){
                Log.w(TAG, "start create fragment item");
                if(liteAppPages.get(position) == null){
                    try {
                        bundle.put("pageid", pageName.get(position));
                    } catch (Exception e) {
                        LogUtils.logError(LogUtils.LOG_MINI_PROGRAM_ERROR, "pageid put bundle error.",e);
                    }
                    LiteAppPage newPage = LiteAppFactory
                            .getWebViewLiteAppPageCache(context,
                                    LiteAppPackageProvider.getClient().prepareLiteAppIfCache(liteAppID),bundle);
                    newPage.setAppID(liteAppID);
                    if(cssPath!=null) {
                        if(cssPath.size()> position) {
                            newPage.injectPageCss(cssPath.get(position));
                        }
                    }
                    if(!TextUtils.isEmpty(scripts.get(position))) {
                        ExecutorManager.executeScript(newPage, scripts.get(position));
                    }
                    liteAppPages.put(position,newPage);

                }
                View view = liteAppPages.get(position).getContainer().getView();
                liteAppPages.get(position).getContainer().onMounted();
                pagerContent.add(view);
                view.setTag(position);
                Log.w(TAG, "finish create fragment item");
            }
            viewPager = new ViewPager(context){
                @SuppressLint("ClickableViewAccessibility")
                @Override
                public boolean onTouchEvent(MotionEvent ev) {
                    return false;
                }

                @Override
                public boolean onInterceptTouchEvent(MotionEvent ev) {
                    return false;
                }
            };
            //mainly we use 5 tabs, so we cache all five pages for performance
            viewPager.setOffscreenPageLimit(4);
            viewPager.setAdapter(new PagerAdapter() {
                @Override
                public int getCount() {
                    return scripts.size() ;
                }

                @Override
                public boolean isViewFromObject(View view, Object object) {
                    return view.getTag().equals(object);
                }

                @Override
                public Object instantiateItem(ViewGroup container, int position) {
                    container.addView(pagerContent.get(position));
                    return position;
                }

                @Override
                public void destroyItem(ViewGroup container, int position, Object object) {
                    container.removeView(liteAppPages.get(position).getContainer().getView());
                }
            });
            viewPager.setCurrentItem(0);
            viewPager.addOnPageChangeListener(new ViewPager.OnPageChangeListener() {
                @Override
                public void onPageScrolled(int position, float positionOffset, int positionOffsetPixels) {

                }

                @Override
                public void onPageSelected(int position) {
                    if(preItem!=position) {
                        for (int i = 0; i < liteAppPages.size(); i++) {
                            if (i == preItem) {
                                BridgeEvent resumeEvent = new BridgeEvent();
                                resumeEvent.setType(BridgeConstant.BRIDGE_ON_PAUSE);
                                resumeEvent.setData("{}");
                                resumeEvent.setContext(liteAppPages.get(i));
                                resumeEvent.setIntercepted(false);
                                resumeEvent.setLocal(true);
                                EventBridgeImpl.getInstance().triggerEvent(resumeEvent);
                            }
                        }
                        for (int i = 0; i < liteAppPages.size(); i++) {
                            if (i == position) {
                                BridgeEvent resumeEvent = new BridgeEvent();
                                resumeEvent.setType(BridgeConstant.BRIDGE_ON_RESUME);
                                resumeEvent.setData("{}");
                                resumeEvent.setContext(liteAppPages.get(i));
                                resumeEvent.setIntercepted(false);
                                resumeEvent.setLocal(true);
                                EventBridgeImpl.getInstance().triggerEvent(resumeEvent);
                            }
                        }
                        preItem=position;
                    }
                    //page selected
                    if(onPageChangeListener!=null){
                        onPageChangeListener.OnPageChanged(position);
                    }
                }

                @Override
                public void onPageScrollStateChanged(int state) {

                }
            });
            host = new LinearLayout(context);
            LinearLayout.LayoutParams params = new LinearLayout.LayoutParams(
                    ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT);
            params.weight = 1;
            viewPager.setLayoutParams(params);
            host.addView(viewPager);
            host.setLayoutParams(new ViewGroup.LayoutParams(
                    ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT));
            host.setOrientation(LinearLayout.VERTICAL);
            if(tabView!=null){
                host.addView(tabView);
            }
            Log.w(TAG, "finish create fragment view");
        }
    }

    public void setPreFragment(Fragment preFragment) {
        if(preFragment.getView()!=null)
            this.preFragment = preFragment;
    }

    @Override
    public void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        initAnimation();
    }

    private void initAnimation() {
        if(createInAnimation == null) {
            AccelerateDecelerateInterpolator interpolator = new AccelerateDecelerateInterpolator();

            createOutAnimation = new TranslateAnimation(Animation.ABSOLUTE, 0,
                    Animation.RELATIVE_TO_PARENT, -1, Animation.ABSOLUTE, 0, Animation.ABSOLUTE, 0);
            createInAnimation = new TranslateAnimation(Animation.RELATIVE_TO_PARENT, 1,
                    Animation.ABSOLUTE, 0, Animation.ABSOLUTE, 0, Animation.ABSOLUTE, 0);
            createOutAnimation.setInterpolator(interpolator);
            createOutAnimation.setDuration(300);
            createInAnimation.setInterpolator(interpolator);
            createInAnimation.setDuration(300);

            destroyOutAnimation = new TranslateAnimation(Animation.ABSOLUTE, 0,
                    Animation.RELATIVE_TO_PARENT, 1, Animation.ABSOLUTE, 0, Animation.ABSOLUTE, 0);
            destroyInAnimation = new TranslateAnimation(Animation.RELATIVE_TO_PARENT, -1,
                    Animation.ABSOLUTE, 0, Animation.ABSOLUTE, 0, Animation.ABSOLUTE, 0);
            destroyOutAnimation.setInterpolator(interpolator);
            destroyOutAnimation.setDuration(300);
            destroyInAnimation.setInterpolator(interpolator);
            destroyInAnimation.setDuration(300);
        }
    }


    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container, Bundle savedInstanceState) {
        LogUtils.log(LogUtils.LOG_MINI_PROGRAM_PAGE_LIFE_CYCLE,LogUtils.LIFE_FRAGMENT+LogUtils.LIFE_CREATE_VIEW+LogUtils.ACTION_START);
        Log.w(TAG, "start create fragment view");
        if(scripts.size() == 1){
            LiteAppPage page =  liteAppPages.get(0);
            page.getContainer().onMounted();
            if(preFragment!=null){
                if(preFragment.getView()!=null) {
                    preFragment.getView().startAnimation(createOutAnimation);
                    page.getContainer().getView().startAnimation(createInAnimation);
                }
            }
            LogUtils.log(LogUtils.LOG_MINI_PROGRAM_PAGE_LIFE_CYCLE,LogUtils.LIFE_FRAGMENT+LogUtils.LIFE_CREATE_VIEW+LogUtils.ACTION_STOP);
            return page.getContainer().getView();
        }
        if(scripts.size() >1){
            if(preFragment!=null){
                if(preFragment.getView()!=null) {
                    preFragment.getView().startAnimation(createOutAnimation);
                    host.startAnimation(createInAnimation);
                }
            }
            LogUtils.log(LogUtils.LOG_MINI_PROGRAM_PAGE_LIFE_CYCLE,LogUtils.LIFE_FRAGMENT+LogUtils.LIFE_CREATE_VIEW+LogUtils.ACTION_STOP);
            return host;
        }
        return null;
    }

    @Override
    public void onStart() {
        LogUtils.log(LogUtils.LOG_MINI_PROGRAM_PAGE_LIFE_CYCLE,LogUtils.LIFE_FRAGMENT+LogUtils.LIFE_START);
        super.onStart();
    }

    public void onPageResume() {
        LogUtils.log(LogUtils.LOG_MINI_PROGRAM_PAGE_LIFE_CYCLE,LogUtils.LIFE_PAGE+LogUtils.LIFE_RESUME);
        int current=0;
        if(viewPager!=null){
            current=viewPager.getCurrentItem();
        }
        for(int i = 0 ; i < liteAppPages.size(); i++) {
            if(i==current) {
                BridgeEvent resumeEvent = new BridgeEvent();
                resumeEvent.setType(BridgeConstant.BRIDGE_ON_RESUME);
                resumeEvent.setData("{}");
                resumeEvent.setContext(liteAppPages.get(i));
                resumeEvent.setIntercepted(false);
                resumeEvent.setLocal(true);
                EventBridgeImpl.getInstance().triggerEvent(resumeEvent);
            }
        }
    }

    public void onPagePause() {
        LogUtils.log(LogUtils.LOG_MINI_PROGRAM_PAGE_LIFE_CYCLE,LogUtils.LIFE_PAGE+LogUtils.LIFE_PAUSE);
        if(liteAppPages==null){
            return;
        }
        int current=0;
        if(viewPager!=null){
            current=viewPager.getCurrentItem();
        }
        for(int i = 0 ; i < liteAppPages.size(); i++) {
            if(i==current) {
                BridgeEvent pauseEvent = new BridgeEvent();
                pauseEvent.setType(BridgeConstant.BRIDGE_ON_PAUSE);
                pauseEvent.setData("{}");
                pauseEvent.setContext(liteAppPages.get(i));
                pauseEvent.setIntercepted(false);
                pauseEvent.setLocal(true);
                EventBridgeImpl.getInstance().triggerEvent(pauseEvent);
            }
        }
    }

    @Override
    public void onDestroy() {
        LogUtils.log(LogUtils.LOG_MINI_PROGRAM_PAGE_LIFE_CYCLE,LogUtils.LIFE_FRAGMENT+LogUtils.LIFE_DESTROY);
        super.onDestroy();
    }
//    public void addOnPageChangeListener(ViewPager.OnPageChangeListener listener){
//        if(viewPager!=null){
//            viewPager.addOnPageChangeListener(listener);
//        }
//    }

    public interface OnPageChangeListener{
        void OnPageChanged(int index);
    }

    @Override
    public void onDestroyView() {
        LogUtils.log(LogUtils.LOG_MINI_PROGRAM_PAGE_LIFE_CYCLE,LogUtils.LIFE_FRAGMENT+LogUtils.LIFE_DESTROY_VIEW+LogUtils.ACTION_START);
        if(viewPager!=null) {
            viewPager.setAdapter(null);
            viewPager.setOnPageChangeListener(null);
        }
        for(int i = 0; i< scripts.size(); i++){
            LiteAppPage page = liteAppPages.get(i);
            if(page!=null){
                BridgeEvent destroyEvent = new BridgeEvent();
                destroyEvent.setType(BridgeConstant.BRIDGE_ON_DESTROY);
                destroyEvent.setData("{}");
                destroyEvent.setContext(liteAppPages.get(i));
                destroyEvent.setIntercepted(false);
                destroyEvent.setLocal(true);
                EventBridgeImpl.getInstance().triggerEvent(destroyEvent);
                page.getContainer().destroy();
                LiteAppFactory.disposeLiteAppContext(page);
            }
        }
        liteAppPages = null;
        onPageChangeListener = null;
        super.onDestroyView();
        LogUtils.log(LogUtils.LOG_MINI_PROGRAM_PAGE_LIFE_CYCLE,LogUtils.LIFE_FRAGMENT+LogUtils.LIFE_DESTROY_VIEW+LogUtils.ACTION_STOP);
    }
}
