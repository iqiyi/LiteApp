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
package com.iqiyi.halberd.liteapp;

import android.annotation.SuppressLint;
import android.app.Fragment;
import android.app.FragmentManager;
import android.app.FragmentTransaction;
import android.content.Intent;
import android.graphics.Color;
import android.graphics.drawable.BitmapDrawable;
import android.os.AsyncTask;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.text.TextUtils;
import android.util.Log;
import android.view.View;
import android.view.ViewGroup;
import android.widget.LinearLayout;

import com.iqiyi.halberd.liteapp.api.LiteAppGlobalConfig;
import com.iqiyi.halberd.liteapp.api.provider.LiteAppGlobalInitializer;
import com.iqiyi.halberd.liteapp.api.provider.LiteAppPackageProvider;
import com.iqiyi.halberd.liteapp.common.LiteAppException;
import com.iqiyi.halberd.liteapp.context.LiteAppContext;
import com.iqiyi.halberd.liteapp.context.LiteAppFactory;
import com.iqiyi.halberd.liteapp.manager.impl.LiteAppDetail;
import com.iqiyi.halberd.liteapp.utils.ColorUtils;
import com.iqiyi.halberd.liteapp.utils.DisplayUtils;
import com.iqiyi.halberd.liteapp.api.provider.LiteAppErrorProvider;
import com.iqiyi.halberd.liteapp.utils.LogUtils;
import com.iqiyi.halberd.liteapp.view.LiteAppBaseActivity;
import com.iqiyi.halberd.liteapp.view.impl.LiteAppFragment;
import com.iqiyi.halberd.liteapp.view.impl.TabBarItemView;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.ByteArrayInputStream;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by eggizhang@qiyi.com on 2017/7/25.
 * using this fragment activity
 */
@SuppressWarnings("deprecation")
public class LiteAppFragmentActivity extends LiteAppBaseActivity{
    FragmentManager fragmentManager;
    View fragmentLoadingView = null;

    //context for lite app app js executor
    LiteAppContext liteAppAppContext = null;
    List<TabBarItemView.TabBarItem> tabBarItems = new ArrayList<>();
    LinearLayout tabBarView = null;
    TabBarItemView selectedTab;
    List<TabBarItemView> tabBarItemViews = new ArrayList<>();
    LiteAppFragment rootFragment;
    View liteAppMainView;
    Bundle initPageData;
    int fragmentCount = 0;
    boolean saveInstanceFlag = false;
    boolean hasResume =false;
    boolean stopped = false;

    private static final String TAG = LiteAppFragmentActivity.class.getName();

    public interface OnBackPressedListener{
        void onBackPressed();
    }

    static OnBackPressedListener onBackPressedListener;

    public static void setOnBackPressedListener(OnBackPressedListener listener) {
        onBackPressedListener = listener;
    }

    public static void clearBackPressedListener(){
        onBackPressedListener=null;
    }

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        LogUtils.log(LogUtils.LOG_MINI_PROGRAM_ACTIVITY_LIFE_CYCLE,LogUtils.LIFE_ACTIVITY+LogUtils.LIFE_CREATE+LogUtils.ACTION_START);
        //2. starting UI
        setContentView(R.layout.activity_fragment_lite_app);
        super.onCreate(null);
//
//        // loading intent
//        Intent intentForLoading = new
//                Intent(this, LiteAppLoadingActivity.class);
//        startActivity(intentForLoading);

        //1. check initializer
        LiteAppGlobalInitializer initializer =
                LiteAppGlobalConfig.getLiteAppInitializer(this.getApplicationContext());
        if(initializer!=null){
            initializer.init(this.getApplicationContext());
        }

        fragmentLoadingView = findViewById(R.id.fragment_loading_progress);
        tabBarView = findViewById(R.id.app_fragment_tab_bar);
        DisplayUtils.tabBarHeight = tabBarView.getMeasuredHeight();
        DisplayUtils.containerHeight = tabBarView.getMeasuredHeight();

        ((ViewGroup)tabBarView.getParent()).removeView(tabBarView);
        fragmentManager = getFragmentManager();
        fragmentManager.addOnBackStackChangedListener(new FragmentManager.OnBackStackChangedListener() {
            @Override
            public void onBackStackChanged() {
                Log.d(TAG,"onBackStackChanged");
                if(hasResume) {
                    if(getTopFragmentFromManager(fragmentManager)!=null) {
                        ((LiteAppFragment) getTopFragmentFromManager(fragmentManager)).onPageResume();
                    }
                }
            }
        });
        //load
        Intent intent = getIntent();
        liteAppID = intent.getStringExtra(MINI_PROGRAM_ID);
        needUpdate = intent.getBooleanExtra(
                MINI_PROGRAM_NEED_UPDATE,true);
        initPageData = intent.getBundleExtra(MINI_PROGRAM_PAGE_DATA_MAP);
        liteAppMainView = findViewById(R.id.lite_app_main_view);
        try{
            validateAppIDWithCache();
        }catch (Exception e){
            LogUtils.logError(LogUtils.LOG_MINI_PROGRAM_ERROR,"validate app fail in OnCreate()",e);
            coldStart();
        }
        LogUtils.log(LogUtils.LOG_MINI_PROGRAM_ACTIVITY_LIFE_CYCLE,LogUtils.LIFE_ACTIVITY+LogUtils.LIFE_CREATE+LogUtils.ACTION_STOP);
    }

    @Override
    protected void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
    }

    @Override
    protected void onStart() {
        LogUtils.log(LogUtils.LOG_MINI_PROGRAM_ACTIVITY_LIFE_CYCLE,LogUtils.LIFE_ACTIVITY+LogUtils.LIFE_START);
        stopped = false;
        super.onStart();
    }

    @Override
    protected void onStop() {
        stopped = true;
        LogUtils.log(LogUtils.LOG_MINI_PROGRAM_ACTIVITY_LIFE_CYCLE,LogUtils.LIFE_ACTIVITY+LogUtils.LIFE_STOP);
        super.onStop();
    }

    protected void onSaveInstanceState(Bundle outState) {
        saveInstanceFlag = true;
        super.onSaveInstanceState(outState);
    }

    @Override
    protected void onResume(){
        LogUtils.log(LogUtils.LOG_MINI_PROGRAM_ACTIVITY_LIFE_CYCLE, LogUtils.LIFE_ACTIVITY + LogUtils.LIFE_RESUME);
        super.onResume();
        hasResume=true;
        if(getTopFragmentFromManager(fragmentManager)!=null) {
            ((LiteAppFragment) getTopFragmentFromManager(fragmentManager)).onPageResume();
        }
    }

    @Override
    protected void onPause() {
        LogUtils.log(LogUtils.LOG_MINI_PROGRAM_ACTIVITY_LIFE_CYCLE, LogUtils.LIFE_ACTIVITY + LogUtils.LIFE_PAUSE);
        super.onPause();
        if(getTopFragmentFromManager(fragmentManager)!=null) {
            ((LiteAppFragment)getTopFragmentFromManager(fragmentManager)).onPagePause();
        }
    }

    protected void validateAppIDWithCache(){
        if(stopped){
            finish();
            return;
        }
        tabBarView.removeAllViews();
        if(!TextUtils.isEmpty(liteAppID)){
            //1. first try cache, if cache is provided, will load view immediately
            boolean useCache = true;
            List<String> pageName = new ArrayList<>();
            List<String> cachedString = new ArrayList<>();
            List<String> cssPath = new ArrayList<>();
            List<byte[]> cachedIconDrawable = new ArrayList<>();
            liteAppDetail = LiteAppPackageProvider.getClient().prepareLiteAppIfCache(liteAppID);
            if(liteAppDetail!=null){
//                LiteAppFrameworkManager.getInstance().setDefaultFrameworkVersion(
//                        this,LiteAppFrameworkManager.getInstance().getLiteAppFrameworkVersion(this,liteAppID));
                if(liteAppDetail.getTabBar()!=null) {
                    for (LiteAppDetail.TabBarDetail tabBarDetail :
                            liteAppDetail.getTabBar()) {
                        String pageString = LiteAppPackageProvider.getClient()
                                .getLiteAppPageBundle(liteAppID,
                                        liteAppDetail.getPageByName(tabBarDetail.getPageName()).getPath());
                        if (TextUtils.isEmpty(pageString)) {
                            useCache = false;
                            break;
                        }
                        pageName.add(tabBarDetail.getPageName());
                        cachedString.add(pageString);
                        String pageCssPath = LiteAppPackageProvider.getClient()
                                .getLiteAppPageBundleCssPath(liteAppID,
                                        liteAppDetail.getPageByName(tabBarDetail.getPageName()).getPath());
                        if (TextUtils.isEmpty(pageCssPath)) {
                            cssPath.add("");
                        } else {
                            cssPath.add(pageCssPath);
                        }

                        String selectIconPath = tabBarDetail.getSelectedIcon();
                        if (!TextUtils.isEmpty(selectIconPath)) {
                            if(selectIconPath.startsWith("/")){
                                selectIconPath = selectIconPath.substring(1);
                            }
                            byte[] cacheByte = LiteAppPackageProvider.
                                    getClient().getLiteAppFileBytes(liteAppID, selectIconPath);
                            if (cacheByte == null) {
                                useCache = false;
                                break;
                            }
                            cachedIconDrawable.add(cacheByte);
                        }
                        String unSelectIconPath = tabBarDetail.getUnselectedIcon();
                        if (!TextUtils.isEmpty(unSelectIconPath)) {
                            if(unSelectIconPath.startsWith("/")){
                                unSelectIconPath = unSelectIconPath.substring(1);
                            }
                            byte[] cacheByte = LiteAppPackageProvider.
                                    getClient().getLiteAppFileBytes(liteAppID, unSelectIconPath);
                            if (cacheByte == null) {
                                useCache = false;
                                break;
                            }
                            cachedIconDrawable.add(cacheByte);
                        }
                    }
                } else {
                    //no tab bar
                    String indexPage = liteAppDetail.getIndex();
                    String pageString = LiteAppPackageProvider.getClient().getLiteAppPageBundle(
                            liteAppID, liteAppDetail.getPageByName(indexPage).getPath());
                    if (TextUtils.isEmpty(pageString)) {
                        coldStart();
                        return;
                    }
                    cachedString.add(pageString);
                    String pageCssPath = LiteAppPackageProvider.getClient()
                            .getLiteAppPageBundleCssPath(liteAppID,  liteAppDetail.getPageByName(indexPage).getPath());
                    if (TextUtils.isEmpty(pageCssPath)) {
                        cssPath.add("");
                    } else {
                        cssPath.add(pageCssPath);
                    }
                }
            } else {
                useCache = false;
            }
            if(useCache) {
                LogUtils.log(LogUtils.LOG_MINI_PROGRAM_PAGE_LIFE_CYCLE, "using cache start lite app fragment activity");
                loadTab(liteAppDetail,cachedIconDrawable);
                try {
                    validateRootView(pageName, cachedString, cssPath);
                } catch (LiteAppException e) {
                    LogUtils.logError(LogUtils.LOG_MINI_PROGRAM_ERROR,"base cache error",e);
                    showRetry();
                }
            } else {
                //3. zip package already downloaded, no need to validate
                //LiteAppLoadingTask loadTask = new LiteAppLoadingTask();
                //loadTask.executeOnExecutor(AsyncTask.THREAD_POOL_EXECUTOR);
                coldStart();
            }
        } else {
            coldStart();
        }
    }

    @Override
    public void routerGoPage(String pageName,JSONObject bundle) {
        //router is to push new fragment into this activity
        Log.v(TAG,"inner router to page " + pageName);
        new PushFragmentTask(pageName, bundle).executeOnExecutor(AsyncTask.THREAD_POOL_EXECUTOR);
    }

    protected void loadTab(LiteAppDetail detail, List<byte[]> images){
        try {
            if (detail == null) {
                return;
            }
            List<LiteAppDetail.TabBarDetail> tabBarDetails = detail.getTabBar();
            if (tabBarDetails != null) {
                int index = 0;
                for (LiteAppDetail.TabBarDetail tabBarDetail : tabBarDetails) {
                    TabBarItemView.TabBarItem item = new TabBarItemView.TabBarItem();
                    item.textBarText = tabBarDetail.getTitle();
                    if(!TextUtils.isEmpty(tabBarDetail.getSelectedColor())) {
                        item.selectedTextColor = ColorUtils.parseColor(
                                tabBarDetail.getSelectedColor());
                    } else {
                        item.selectedTextColor = Color.parseColor("#9E9E9E");
                    }
                    if(!TextUtils.isEmpty(tabBarDetail.getUnselectedColor())) {
                        item.unselectedTextColor = ColorUtils.parseColor(
                                tabBarDetail.getUnselectedColor());
                    } else {
                        item.unselectedTextColor = Color.parseColor("#9E9E9E");
                    }
                    item.textBarText = tabBarDetail.getTitle();
                    if (!TextUtils.isEmpty(tabBarDetail.getSelectedIcon())) {
                        if(index < images.size()){
                            ByteArrayInputStream is = new ByteArrayInputStream(images.get(index));
                            index = index + 1;
                            item.selectedDrawable = new BitmapDrawable(getResources(), is);
                        }else {
                            coldStart();
                        }
                    }
                    if (!TextUtils.isEmpty(tabBarDetail.getUnselectedIcon())) {
                        if (index < images.size()) {
                            ByteArrayInputStream is = new ByteArrayInputStream(images.get(index));
                            index = index + 1;
                            item.unselectedDrawable = new BitmapDrawable(getResources(), is);
                        } else {
                            coldStart();
                        }
                    }
                    tabBarItems.add(item);
                }
            }
        }catch (Exception e){
            LogUtils.logError(LogUtils.LOG_MINI_PROGRAM_ERROR,"failed to load fragment stream",e);
        }
    }

    /**using this method to start lite app from code, either from short cut or package not yet ready  */
    public void coldStart(){
        Log.v(TAG,"cold start lite app fragment activity");
        runOnUiThread(new Runnable() {
            @SuppressLint("StaticFieldLeak")
            @Override
            public void run() {
                new LiteAppLoadingTask(liteAppID){
                    @Override
                    protected void onPostExecute(LiteAppDetail detail) {
                        super.onPostExecute(detail);
                        if(detail == null){
                            showRetry();
                        } else {
                            LiteAppPackageProvider.getClient().cleanMemoryCache();
                            validateAppIDWithCache();
                            needUpdate=false;
                        }
                    }
                }.executeOnExecutor(AsyncTask.SERIAL_EXECUTOR);
            }
        });
    }

    public void showRetry(){
        runOnUiThread(new Runnable() {
            @Override
            public void run() {
                fragmentLoadingView.setVisibility(View.VISIBLE);

                LiteAppErrorProvider.error(getString(R.string.load_interface_error));
            }
        });
    }


    @SuppressLint("ResourceType")
    protected void validateRootView(List<String> pageName, List<String> tabScripts, List<String> css) throws LiteAppException {
        if(tabBarItems.size() > 0) {
            invalidTab();
        } else {
            tabBarView.setVisibility(View.GONE);
        }
        JSONObject bundle = new JSONObject();
        if(initPageData!=null) {
            try {
                for (String key : initPageData.keySet()) {
                    bundle.put(key, initPageData.get(key));
                }
                bundle.put("displayWidth", DisplayUtils.getWidth(getApplicationContext()));
                bundle.put("displayHeight", DisplayUtils.getNoTabBarHeight(getApplicationContext()));
                bundle.put("packageid", liteAppID);
            } catch (JSONException e) {
                LogUtils.logError(LogUtils.LOG_MINI_PROGRAM_ERROR, "failed to get screen width height", e);
            }
        }
        LiteAppFragment fragment = LiteAppFragment.
                requireInstance(LiteAppFragmentActivity.this, liteAppID, pageName, tabScripts,css, bundle);
        rootFragment = fragment;
        rootFragment.setOnPageChangeListener(new LiteAppFragment.OnPageChangeListener() {
            @Override
            public void OnPageChanged(int index) {
                selectedTab.toggleSelect(false);
                tabBarItemViews.get(index).toggleSelect(true);
                selectedTab = tabBarItemViews.get(index);
            }
        });
        rootFragment.setTabView(tabBarView);
        String tag = MINI_PROGRAM_ID + "/root/" + String.valueOf(fragmentCount);
        fragmentCount = fragmentCount +1;
        //pop up back stacks if activity is restored
        FragmentTransaction transaction = fragmentManager.beginTransaction();
        if (fragmentManager.getBackStackEntryCount() > 0){
            transaction.replace(R.id.lite_app_container_fragment, fragment, tag);
        } else {
            transaction.add(R.id.lite_app_container_fragment, fragment, tag);
        }
        LogUtils.log(LogUtils.LOG_MINI_PROGRAM_FRAGMENT_LIFE_CYCLE,LogUtils.LIFE_FRAGMENT+LogUtils.FRAGMENT_PUSH);
        transaction.setTransition(FragmentTransaction.TRANSIT_NONE);
        transaction.addToBackStack(tag);
        transaction.commit();
        stopLoading();
        liteAppMainView.setVisibility(View.VISIBLE);

        //after load ,if need update update in back ground
        if(needUpdate){
            @SuppressLint("StaticFieldLeak")
            LiteAppLoadingTask task = new LiteAppLoadingTask(liteAppID){
                @Override
                protected void onPostExecute(LiteAppDetail detail) {
                    if (detail==null){
                        LogUtils.log(LogUtils.LOG_MINI_PROGRAM_CACHE, LogUtils.CACHE_NETWORK + LogUtils.CACHE_CHECK_UPDATE + LogUtils.COMMON_FAIL);
                    } else {
                        needUpdate = false;
                        LogUtils.log(LogUtils.LOG_MINI_PROGRAM_CACHE, LogUtils.CACHE_NETWORK + LogUtils.CACHE_CHECK_UPDATE + LogUtils.COMMON_SUCCESS);
                    }
                    super.onPostExecute(detail);
                }
            };
            task.executeOnExecutor(AsyncTask.THREAD_POOL_EXECUTOR);
        }
    }

    public void invalidTab(){
        tabBarView.removeAllViews();
        tabBarItemViews.clear();
        int index = 0;
        for(TabBarItemView.TabBarItem item : tabBarItems){
            final TabBarItemView tab = getLayoutInflater()
                    .inflate(R.layout.widget_tab_bar_item,tabBarView, false)
                    .findViewById(R.id.tab_bar_item_view);
            tabBarView.addView(tab);
            tabBarItemViews.add(tab);
            tab.setTabBarItem(item);
            int currentIndex = index++;
            tab.setTag(currentIndex);
            tab.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    if(selectedTab!=null){
                        selectedTab.toggleSelect(false);
                    }
                    if(!tab.isSelected()){
                        tab.toggleSelect(true);
                        tabSwitchCurrentFragment((int)v.getTag());
                        selectedTab = tab;
                    }
                }
            });
            if(selectedTab ==null){
                selectedTab = tab;
                tab.toggleSelect(true);
            }
        }
    }

    public void tabSwitchCurrentFragment(int selectIndex){
        rootFragment.setPage(selectIndex);
    }

    boolean popping = false;

    @Override
    public void onBackPressed() {
        if(onBackPressedListener!=null){
            onBackPressedListener.onBackPressed();
            return;
        }
        if(fragmentManager.getBackStackEntryCount() <= 1){
            Fragment topFragment = getTopFragmentFromManager(fragmentManager);
            if(topFragment!=null){
                ((LiteAppFragment)topFragment).onPagePause();
            }
            //root view back ,finish activity
            if(getIntent().getBooleanExtra(MINI_PROGRAM_NEW_TASK,false)){
                moveTaskToBack(true);
            } else {
                //avoid memory leaks
                fragmentManager.popBackStackImmediate(null, FragmentManager.POP_BACK_STACK_INCLUSIVE);
                finish();
            }
        } else {
            popFragmentAnimate();
        }
    }

    public void stopLoading(){
        fragmentLoadingView.setVisibility(View.GONE);
    }

    @Override
    protected void onDestroy() {
        LogUtils.log(LogUtils.LOG_MINI_PROGRAM_ACTIVITY_LIFE_CYCLE,LogUtils.LIFE_ACTIVITY+LogUtils.LIFE_DESTROY+LogUtils.ACTION_START);
        if(liteAppAppContext!=null) {
            LiteAppFactory.disposeLiteAppContext(liteAppAppContext);
        }
        rootFragment = null;
        //avoid memory leaks
        setContentView(new View(this));
        super.onDestroy();
        LiteAppPackageProvider.getClient().cleanMemoryCache();
        LogUtils.log(LogUtils.LOG_MINI_PROGRAM_ACTIVITY_LIFE_CYCLE,LogUtils.LIFE_ACTIVITY+LogUtils.LIFE_DESTROY+LogUtils.ACTION_STOP);
    }

    @SuppressLint("StaticFieldLeak")
    private class PushFragmentTask extends AsyncTask<Void,Void,Void>{
        String pageName;
        JSONObject bundle;
        String script= "";
        String cssPath = "";

        PushFragmentTask(String path, JSONObject bundle){
            this.pageName = path;
            this.bundle = bundle;
        }

        @Override
        protected Void doInBackground(Void... params) {
            script = LiteAppPackageProvider.getClient().getLiteAppPageBundle(liteAppID
                    , liteAppDetail.getPageByName(pageName).getPath());
            cssPath = LiteAppPackageProvider.getClient().getLiteAppPageBundleCssPath(
                    liteAppID, liteAppDetail.getPageByName(pageName).getPath());

            runOnUiThread(new Runnable() {
                @SuppressLint("ResourceType")
                @Override
                public void run() {
                    stopLoading();
                    if(bundle == null){
                        bundle = new JSONObject();
                    }
                    try {
                        bundle.put("displayWidth", DisplayUtils.getWidth(getApplicationContext()));
                        bundle.put("displayHeight", DisplayUtils.getNoTabBarHeight(getApplicationContext()));
                        bundle.put("packageid", liteAppID);
                    } catch (JSONException e) {
                        LogUtils.logError(LogUtils.LOG_MINI_PROGRAM_ERROR,"failed to get screen width height",e);
                    }
                    final LiteAppFragment fragment;
                    try {
                        fragment = LiteAppFragment.
                                requireInstance(LiteAppFragmentActivity.this, liteAppID, pageName, script, cssPath, bundle);
                        final FragmentTransaction transaction = fragmentManager.beginTransaction();
                        String newFragmentTag = MINI_PROGRAM_ID + "/" + pageName + "/" + fragmentCount;
                        fragmentCount = fragmentCount +1;
                        transaction.add(R.id.lite_app_container_fragment, fragment,newFragmentTag);
                        LogUtils.log(LogUtils.LOG_MINI_PROGRAM_FRAGMENT_LIFE_CYCLE,LogUtils.LIFE_FRAGMENT+LogUtils.FRAGMENT_PUSH);
                        String oldFragmentTag = fragmentManager.getBackStackEntryAt(
                                fragmentManager.getBackStackEntryCount() - 1).getName();
                        transaction.hide(fragmentManager.findFragmentByTag(oldFragmentTag));
                        transaction.show(fragment);
                        transaction.addToBackStack(newFragmentTag);
                        ((LiteAppFragment)fragmentManager.findFragmentByTag(oldFragmentTag)).onPagePause();
                        fragment.setPreFragment(fragmentManager.findFragmentByTag(oldFragmentTag));

                        liteAppMainView.postDelayed(new Runnable() {
                            @Override
                            public void run() {
                                transaction.commit();
                                titleBarShowBackButton();
                            }
                        },150);
                    } catch (LiteAppException e) {
                        LogUtils.logError(LogUtils.LOG_MINI_PROGRAM_ERROR,"base cache error",e);
                    }
                }
            });
            return null;
        }
    }

    public void popFragmentAnimate(){
        if(popping){
            return;
        }
        popping = true;
        LogUtils.log(LogUtils.LOG_MINI_PROGRAM_FRAGMENT_LIFE_CYCLE,LogUtils.LIFE_FRAGMENT+LogUtils.FRAGMENT_POP);
        Fragment top = getTopFragmentFromManager(fragmentManager);
        Fragment second = getSecondStackFragmentFromManager(fragmentManager);
        if(top !=null && second !=null) {
            if(top.getView()!=null&& second.getView()!=null) {
                top.getView().startAnimation(LiteAppFragment.destroyOutAnimation);
                second.getView().startAnimation(LiteAppFragment.destroyInAnimation);
            }
            ((LiteAppFragment) getTopFragmentFromManager(fragmentManager)).onPagePause();
            getWindow().getDecorView().postDelayed(new Runnable() {
                @Override
                public void run() {
                    //after transaction animation
                    popping = false;
                    fragmentManager.popBackStack();
                }
            }, 300);
        }
        if(fragmentManager.getBackStackEntryCount() <= 2){
            //root view back ,finish activity
            titleBarShowCloseButton();
        }
    }

    public static Fragment getTopFragmentFromManager(FragmentManager manager){
        if(manager!=null) {
            int count = manager.getBackStackEntryCount();
            if (count>0){
                String fragmentTag = manager.getBackStackEntryAt(count - 1).getName();
                return manager.findFragmentByTag(fragmentTag);
            }
        }
        return null;
    }

    public static Fragment getSecondStackFragmentFromManager(FragmentManager manager){
        if(manager!=null) {
            int count = manager.getBackStackEntryCount();
            if (count>1){
                String fragmentTag = manager.getBackStackEntryAt(count - 2).getName();
                return manager.findFragmentByTag(fragmentTag);
            }
        }
        return null;
    }

}
