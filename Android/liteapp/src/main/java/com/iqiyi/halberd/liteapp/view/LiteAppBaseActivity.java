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
package com.iqiyi.halberd.liteapp.view;


import android.annotation.SuppressLint;
import android.app.ActionBar;
import android.app.Activity;
import android.content.Context;
import android.content.res.Configuration;
import android.graphics.Color;
import android.graphics.PorterDuff;
import android.graphics.PorterDuffColorFilter;
import android.graphics.drawable.ColorDrawable;
import android.graphics.drawable.Drawable;
import android.os.Build;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;
import android.view.View;
import android.view.ViewGroup;
import android.view.WindowManager;
import android.widget.AdapterView;
import android.widget.BaseAdapter;
import android.widget.FrameLayout;
import android.widget.ImageView;
import android.widget.ListView;
import android.widget.PopupWindow;
import android.widget.TextView;

import com.iqiyi.halberd.liteapp.R;
import com.iqiyi.halberd.liteapp.api.provider.LiteAppTitleBarProvider;
import com.iqiyi.halberd.liteapp.manager.impl.LiteAppDetail;
import com.iqiyi.halberd.liteapp.plugin.title.ILiteAppTitleBarFactory;
import com.iqiyi.halberd.liteapp.plugin.title.TitleMenuItem;
import com.iqiyi.halberd.liteapp.utils.LogUtils;

import org.json.JSONObject;

import java.lang.ref.WeakReference;
import java.util.ArrayList;

/**
 * Created by eggizhang@qiyi.com on 2017/7/26.
 * using this base activity to extend base compat activity
 * used as lite app activity base theme
 */
@SuppressWarnings("deprecation")
public abstract class LiteAppBaseActivity extends Activity {
    public static final String TAG = LiteAppBaseActivity.class.getName();

    public static final String MINI_PROGRAM_ID = "lite_app_id";
    public static final String MINI_PROGRAM_NEED_UPDATE = "lite_app_need_update";
    public static final String MINI_PROGRAM_NEW_TASK = "lite_app_new_task";
    public static final String MINI_PROGRAM_PAGE_DATA_MAP = "lite_app_page_data_map";

    protected String liteAppID;
    protected LiteAppDetail liteAppDetail = null;
    protected boolean needUpdate;
    private ArrayList<TitleMenuItem> titleMenuArray;
    public static WeakReference<LiteAppBaseActivity> topInstance = null;

    private boolean isShowMenu=false;
    private int menuMode=MENU_MODE_LIST;
    public static final int MENU_MODE_LIST=0;
    public static final int MENU_MODE_SINGLE=1;
    private FrameLayout customActionBarHost;

    private View customActionBarView;
    private ActionBar defaultActionBar;
    private ILiteAppTitleBarFactory titleBarFactory;

    /**
     * router to indicated lite app pagePath.
     * If with tab bar, the pagePath will indicate the index of this package's tab bar
     * If without tab bar, the pagePath will indicate the single page to router to
     *
     * For other
     * */
    public abstract void routerGoPage(String pagePath, JSONObject bundle);

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        LogUtils.getInstance().setLiteAppIdIfNull(getIntent().getStringExtra(MINI_PROGRAM_ID));
        super.onCreate(savedInstanceState);
        topInstance = new WeakReference<>(this);
        customActionBarHost = findViewById(R.id.lite_app_action_bar_host);
        defaultActionBar = getActionBar();
        initTitle();
    }

    @Override
    public void onConfigurationChanged(Configuration newConfig) {
        super.onConfigurationChanged(newConfig);
        Log.i(TAG, "onConfigurationChanged");
        if(newConfig.orientation== Configuration.ORIENTATION_LANDSCAPE){
            hideTitleBar();
        }else{
            showTitleBar();
        }
    }

    protected void initTitle() {
        titleBarFactory = LiteAppTitleBarProvider.getLiteAppTitleBarFactory();
        if(titleBarFactory!=null) {
            customActionBarView = titleBarFactory.createTitleBar(this);
        }
        if(customActionBarView!=null){
            customActionBarHost.addView(customActionBarView);
            if(defaultActionBar!=null){
                defaultActionBar.hide();
                defaultActionBar = null;
            }
        } else if(defaultActionBar!=null) {
            Drawable mDrawable = getResources().getDrawable(R.drawable.ic_close_black_24dp);
            mDrawable.setColorFilter(new PorterDuffColorFilter(Color.WHITE, PorterDuff.Mode.SRC_IN));

            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.JELLY_BEAN_MR2) {
                defaultActionBar.setHomeAsUpIndicator(mDrawable);
            }

            defaultActionBar.show();
            defaultActionBar.setDisplayShowHomeEnabled(true);
            defaultActionBar.setDisplayUseLogoEnabled(true);
            defaultActionBar.setHomeButtonEnabled(true);
            defaultActionBar.setDisplayShowCustomEnabled(true);
            defaultActionBar.setDisplayHomeAsUpEnabled(true);
            defaultActionBar.setLogo(null);
            defaultActionBar.setIcon(null);

            defaultActionBar.setTitle(getString(R.string.default_title));
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
                //设置状态栏颜色
                getWindow().setStatusBarColor(getResources().getColor(R.color.app_material_grey_100));
            } else if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
                getWindow().addFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS);
            }

            defaultActionBar.setBackgroundDrawable(
                    new ColorDrawable(getResources().getColor(R.color.app_material_grey_100)));

            titleMenuArray = new ArrayList<>();
        }
    }

    public void showTitleBar(){
        if(customActionBarView!=null){
            customActionBarView.setVisibility(View.VISIBLE);
        } else if(defaultActionBar!=null){
                defaultActionBar.show();
        }
    }

    public void hideTitleBar(){
        if(customActionBarView!=null){
            customActionBarView.setVisibility(View.GONE);
        } else if(defaultActionBar!=null){
            defaultActionBar.hide();
        }
    }

    public void setTitle(String title){
        if(customActionBarView!=null){
             titleBarFactory.setTitle(customActionBarView, title);
        } else if(defaultActionBar!=null){
            defaultActionBar.setTitle(title);
        }
    }

    public void setTitleBarBackground(Drawable drawable){
        if(customActionBarView!=null){
            titleBarFactory.setBackgroundDrawable(customActionBarView, drawable);
        } else if(defaultActionBar!=null){
            defaultActionBar.setBackgroundDrawable(drawable);
        }
    }

    public void setTitleBarLogo(Drawable logo){
        if(customActionBarView!=null){
            titleBarFactory.setLogo(customActionBarView, logo);
        } else if(defaultActionBar!=null){
            defaultActionBar.setLogo(logo);
        }
    }

    protected void titleBarShowBackButton(){
        if(defaultActionBar !=null) {
            Drawable mDrawable = getResources().getDrawable(R.drawable.ic_arrow_back_black_24dp);
            mDrawable.setColorFilter(new PorterDuffColorFilter(Color.WHITE, PorterDuff.Mode.SRC_IN));
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.JELLY_BEAN_MR2) {
                defaultActionBar.setHomeAsUpIndicator(mDrawable);
            }
        }
    }

    protected void titleBarShowCloseButton(){
        if(defaultActionBar!=null) {
            Drawable mDrawable = getResources().getDrawable(R.drawable.ic_close_black_24dp);
            mDrawable.setColorFilter(new PorterDuffColorFilter(Color.WHITE, PorterDuff.Mode.SRC_IN));
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.JELLY_BEAN_MR2) {
                defaultActionBar.setHomeAsUpIndicator(mDrawable);
            }
        }
    }

    public void addTitleMenuItem(TitleMenuItem titleMenuItem) {
        if(titleMenuItem!=null) {
            boolean isAdd=true;
            for (int i = 0; i < titleMenuArray.size(); i++) {
                if (titleMenuItem.getId().equals(titleMenuArray.get(i).getId())) {
                    isAdd=false;
                }
            }
            if(isAdd){
                titleMenuArray.add(titleMenuItem);
            }
        }
        if(titleBarFactory!= null){
            titleBarFactory.changeTitleMenuItem(customActionBarView, titleMenuArray);
        }
    }

    public void cleanMenu(){
        if(titleMenuArray!=null) {
            titleMenuArray.clear();
        }
        if(titleBarFactory!= null){
            titleBarFactory.changeTitleMenuItem(customActionBarView, titleMenuArray);
        }
    }

    public void setShowActionMenu(boolean isShowMenu) {
        this.isShowMenu = isShowMenu;
        //call onPrepareOptionsMenu()
    }

    public void setMenuMode(int menuMode) {
        this.menuMode = menuMode;
    }

    @Override
    public boolean onPrepareOptionsMenu(Menu menu) {
        if(isShowMenu) {
            menu.clear();
            if (menuMode == MENU_MODE_LIST) {
                MenuInflater inflater = getMenuInflater();
                inflater.inflate(R.menu.menu_mode_list, menu);
                menu.getItem(0).setShowAsAction(MenuItem.SHOW_AS_ACTION_ALWAYS);
            } else if (menuMode == MENU_MODE_SINGLE) {
                MenuInflater inflater = getMenuInflater();
                inflater.inflate(R.menu.menu_mode_single, menu);
                //最多只显示3个menu（只获取titleMenuArray中的3个数据）
                for (int i = 0; i < menu.size(); i++) {
                    MenuItem item = menu.getItem(i);
                    if (i < titleMenuArray.size()) {
                        TitleMenuItem itemInfo = titleMenuArray.get(i);
                        if (itemInfo != null) {
                            Drawable icon = itemInfo.getIcon();
                            String text = itemInfo.getText();
                            if (icon != null) {
                                item.setIcon(icon);
                            }
                            if (!text.equals("")) {
                                item.setTitle(text);
                            }
                        }
                        item.setVisible(true);
                        item.setShowAsAction(MenuItem.SHOW_AS_ACTION_ALWAYS);
                    } else {
                        item.setVisible(false);
                    }
                }
            }
        }
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        if (item.getItemId() == R.id.action_menu) {
            View anchor = findViewById(R.id.action_menu);
            final PopupWindow popupWindow=new PopupWindow(this);
            popupWindow.setBackgroundDrawable(null);
            popupWindow.setOutsideTouchable(true);
            popupWindow.setAnimationStyle(-1);
            MenuListView menuListView=new MenuListView(this);
            menuListView.setDivider(null);
            menuListView.setBackgroundDrawable(getResources().getDrawable(R.drawable.menu_list_background));
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
                popupWindow.setElevation(10);
            }
            menuListView.setAdapter(new MenuListAdapter());
            menuListView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
                @Override
                public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                    if (titleMenuArray != null) {
                        TitleMenuItem titleMenuItem=titleMenuArray.get(position);
                        if (titleMenuItem != null) {
                            titleMenuItem.itemClick();
                        }
                    }
                    popupWindow.dismiss();
                }
            });
            popupWindow.setContentView(menuListView);

            popupWindow.showAsDropDown(anchor);
            return true;
        }else if(item.getItemId()==R.id.single_menu_one){
            TitleMenuItem titleMenuItem=titleMenuArray.get(0);
            if (titleMenuItem != null) {
                titleMenuItem.itemClick();
            }
        }else if(item.getItemId()==R.id.single_menu_two){
            TitleMenuItem titleMenuItem=titleMenuArray.get(1);
            if (titleMenuItem != null) {
                titleMenuItem.itemClick();
            }
        }else if(item.getItemId()==R.id.single_menu_three){
            TitleMenuItem titleMenuItem=titleMenuArray.get(2);
            if (titleMenuItem != null) {
                titleMenuItem.itemClick();
            }
        }else {
            onBackPressed();
        }
        return true;
    }

    //通过自定义ListView，在measure的时候每次重新计算宽高,否则在popupWindow中会显示错误
    private class MenuListView extends ListView {

        public MenuListView(Context context) {
            super(context);
        }

        @Override
        protected void onMeasure(int widthMeasureSpec, int heightMeasureSpec) {
            int width = getMaxWidthOfChildren() + getPaddingLeft() + getPaddingRight();
            int highSpec = MeasureSpec.makeMeasureSpec(Integer.MAX_VALUE >> 2, MeasureSpec.AT_MOST);
            super.onMeasure(MeasureSpec.makeMeasureSpec(width, MeasureSpec.EXACTLY), highSpec);
        }

        private int getMaxWidthOfChildren() {
            int maxWidth = 0;
            View view = null;
            int count = getAdapter().getCount();
            for (int i = 0; i < count; i++) {
                view = getAdapter().getView(i, view, this);
                view.measure(MeasureSpec.UNSPECIFIED, MeasureSpec.UNSPECIFIED);
                if (view.getMeasuredWidth() > maxWidth)
                    maxWidth = view.getMeasuredWidth();
            }
            return maxWidth;
        }
    }
    private class MenuListAdapter extends BaseAdapter{

        @Override
        public int getCount() {
            return titleMenuArray.size();
        }

        @Override
        public Object getItem(int position) {
            return titleMenuArray.get(position);
        }

        @Override
        public long getItemId(int position) {
            return 0;
        }

        @SuppressLint("InflateParams")
        @Override
        public View getView(int position, View convertView, ViewGroup parent) {
            ViewHolder holder;
            if(convertView==null){
                LayoutInflater inflater=LayoutInflater.from(LiteAppBaseActivity.this);
                holder=new ViewHolder();
                convertView=inflater.inflate(R.layout.list_item_base_activity_menu,null);
                holder.menuIcon= convertView.findViewById(R.id.iv_base_activity_menu);
                holder.menuText= convertView.findViewById(R.id.tv_base_activity_menu);
                convertView.setTag(holder);
            }else{
                holder=(ViewHolder) convertView.getTag();
            }
            if(titleMenuArray!=null) {
                TitleMenuItem titleMenuItem=titleMenuArray.get(position);
                if(titleMenuItem!=null) {
                    holder.menuIcon.setImageDrawable(titleMenuItem.getIcon());
                    holder.menuText.setText(titleMenuItem.getText());
                }
            }
            return convertView;
        }

        class ViewHolder{
            ImageView menuIcon;
            TextView menuText;
        }
    }


    @Override
    protected void onDestroy() {
        super.onDestroy();
        topInstance = null;
    }
}
