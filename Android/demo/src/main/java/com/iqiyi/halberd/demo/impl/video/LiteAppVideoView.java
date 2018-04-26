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
package com.iqiyi.halberd.demo.impl.video;

import android.app.Activity;
import android.content.Context;
import android.content.pm.ActivityInfo;
import android.graphics.Color;
import android.media.MediaPlayer;
import android.os.Build;
import android.util.AttributeSet;
import android.util.Log;
import android.view.Gravity;
import android.view.LayoutInflater;
import android.view.MotionEvent;
import android.view.View;
import android.view.ViewGroup;
import android.widget.FrameLayout;
import android.widget.LinearLayout;
import android.widget.RelativeLayout;
import android.widget.SeekBar;
import android.widget.TextView;
import android.widget.Toast;
import com.iqiyi.halberd.liteapp.LiteAppFragmentActivity;
import com.iqiyi.halberd.liteapp.R;
import com.iqiyi.halberd.liteapp.exo.LiteAppExoVideoView;
import com.wang.avi.AVLoadingIndicatorView;

import java.util.Timer;
import java.util.TimerTask;

/**
 * Created by cw on 2017/8/15.
 * ijkplayer example
 */

public class LiteAppVideoView extends RelativeLayout {

    //VideoView videoView;
    LiteAppExoVideoView videoView;

    //subbar
    private View subBar;

    //暂停按钮
    private PlayPauseButton mPauseButton;
    //当前时间
    private TextView mCurrentTime;
    //进度条
    private SeekBar mSeekBar;
    //总时间
    private TextView mTotalTime;
    //全屏切换按钮
    private View mFullScreenButton;
    //是否全屏
    private boolean isFullScreen = false;
    //视频是否暂停
    private boolean isPaused = false;
    //seekbar是否在移动
    private boolean isSeekBarMoving = false;
    //seekbar移动后的值
    private int seekBarProgress;

    private AVLoadingIndicatorView mLoadingView;

    private Context mContext;

    private String cacheUrl;

    private ViewGroup viewLayerWhatEverHolderView;
    private int cacheWidth;
    private int cacheHeight;
    private int cacheProgress;

    private boolean isResize;
    private volatile long lastTouchTime;

    private Timer mTimer;

    private static String TAG = LiteAppVideoView.class.getName();

    public LiteAppVideoView(Context context) {
        this(context, null);
    }

    public LiteAppVideoView(Context context, AttributeSet attrs) {
        this(context, attrs, 0);
    }

    public LiteAppVideoView(Context context, AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
        mContext = context;
        initViews(context);

    }

    public void dispose(){
        videoView.release();
        mTimer.cancel();
        //videoView.suspend(true);
    }
    private void initViews(Context context) {
        addVideoView(context);
        addLoadingView(context);
        addProgressView(context);
        mTimer=new Timer();
    }

    private void addLoadingView(Context context) {
        mLoadingView = new AVLoadingIndicatorView(context);
        LayoutParams params = new LayoutParams(100, 100);
        mLoadingView.setIndicator("BallClipRotatePulseIndicator");
        mLoadingView.setIndicatorColor(Color.WHITE);
        params.addRule(CENTER_IN_PARENT);
        addView(mLoadingView, params);
    }

    private void addProgressView(final Context context) {
        LinearLayout linearLayout = (LinearLayout) LayoutInflater.from(context).inflate(R.layout.video_view_progress_view, null, false);
        subBar = linearLayout;
        subBar.setVisibility(INVISIBLE);
        linearLayout.setOrientation(LinearLayout.HORIZONTAL);
        linearLayout.setGravity(Gravity.BOTTOM);
        //暂停按钮
        mPauseButton = (PlayPauseButton) linearLayout.findViewById(R.id.pause);
        mPauseButton.setPlayed(true);
        mPauseButton.setColor(Color.parseColor("#FFFFFF"));
        mPauseButton.setOnControlStatusChangeListener(new PlayPauseButton.OnControlStatusChangeListener() {
            @Override
            public void onStatusChange(View view, boolean state) {
                if(state) {
                    start();
                } else {
                    pause();
                }
            }
        });

        //当前时间
        mCurrentTime = (TextView) linearLayout.findViewById(R.id.currentTime);

        //进度条
        mSeekBar = (SeekBar) linearLayout.findViewById(R.id.seekBar);
        mSeekBar.setMax(100);
        mSeekBar.setOnSeekBarChangeListener(new SeekBar.OnSeekBarChangeListener() {
            @Override
            public void onProgressChanged(SeekBar seekBar, int progress, boolean fromUser) {
                seekBarProgress = progress;
                int currentTime = (int) (seekBarProgress *videoView.getDuration() /100.0);
                mCurrentTime.setText(timeToText(currentTime));
            }

            @Override
            public void onStartTrackingTouch(SeekBar seekBar) {
                isSeekBarMoving = true;
                videoView.pause();
            }

            @Override
            public void onStopTrackingTouch(SeekBar seekBar) {
                // TODO: 2017/8/16 拖拽seekbar后松手 视频时间貌似会回退一点
                int currentPosition = (int) (seekBarProgress *videoView.getDuration() /100.0);
                videoView.setVideoPath(cacheUrl);

                mLoadingView.setVisibility(VISIBLE);
                videoView.seekTo(currentPosition);
                isSeekBarMoving = false;
                videoView.start();
            }

        });

        //总时间
        mTotalTime = (TextView) linearLayout.findViewById(R.id.totalTime);
        LayoutParams layoutParams = new LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT);
        layoutParams.addRule(ALIGN_PARENT_BOTTOM, TRUE);
        linearLayout.setLayoutParams(layoutParams);
        LayoutParams params = new LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT);
        params.addRule(ALIGN_PARENT_BOTTOM);
        addView(linearLayout, params);

        mFullScreenButton = linearLayout.findViewById(R.id.fullScreenChange);
        mFullScreenButton.setOnClickListener(new OnClickListener() {
            @Override
            public void onClick(View v) {
                // TODO: 2017/8/16 问题
                if (isFullScreen){
                    setNormalScreenMode();
                }else {
                    setFullScreenMode();
                }
            }
        });

    }

    @Override
    public boolean onTouchEvent(MotionEvent event) {
        if(event.getAction()== MotionEvent.ACTION_DOWN || event.getAction() == MotionEvent.ACTION_UP){
            subBar.setVisibility(VISIBLE);
            lastTouchTime = System.currentTimeMillis();
            //post delay and show
            postDelayed(new Runnable() {
                @Override
                public void run() {
                    if(System.currentTimeMillis() - lastTouchTime > 3000){
                        //hide seek bar
                        subBar.setVisibility(INVISIBLE);
                    }
                }
            },4000);
        }
        return super.onTouchEvent(event);
    }

    private void addVideoView(Context context){
        videoView = new LiteAppExoVideoView(context);
        //ijkVideoView = new IjkVideoView(context);
        //IjkMediaPlayer.loadLibrariesOnce(null);
        //IjkMediaPlayer.native_profileBegin("libijkplayer.so");
        //ijkVideoView.setHudView(new TableLayout(context));

        LayoutParams lp = new LayoutParams(
                FrameLayout.LayoutParams.MATCH_PARENT,
                FrameLayout.LayoutParams.MATCH_PARENT);
        lp.addRule(CENTER_IN_PARENT);
        videoView.setLayoutParams(lp);
        addView(videoView);
        setBackgroundColor(Color.BLACK);
        videoView.setOnPreparedListener(new MediaPlayer.OnPreparedListener() {
            @Override
            public void onPrepared(MediaPlayer mediaPlayer) {
                int length = videoView.getDuration();
                mTotalTime.setText(timeToText(length));
                startTimerTask();
                start();
                mLoadingView.setVisibility(GONE);
            }
        });

        videoView.setOnCompletionListener(new MediaPlayer.OnCompletionListener() {
            @Override
            public void onCompletion(MediaPlayer iMediaPlayer) {
            }
        });

        videoView.setOnErrorListener(new MediaPlayer.OnErrorListener() {
            @Override
            public boolean onError(MediaPlayer iMediaPlayer, int what, int extra) {
                                    /*
                    错误常数

MEDIA_ERROR_IO
文件不存在或错误，或网络不可访问错误
值: -1004 (0xfffffc14)

MEDIA_ERROR_MALFORMED
流不符合有关标准或文件的编码规范
值: -1007 (0xfffffc11)

MEDIA_ERROR_NOT_VALID_FOR_PROGRESSIVE_PLAYBACK
视频流及其容器不适用于连续播放视频的指标（例如：MOOV原子）不在文件的开始.
值: 200 (0x000000c8)

MEDIA_ERROR_SERVER_DIED
媒体服务器挂掉了。此时，程序必须释放MediaPlayer 对象，并重新new 一个新的。
值: 100 (0x00000064)

MEDIA_ERROR_TIMED_OUT
一些操作使用了过长的时间，也就是超时了，通常是超过了3-5秒
值: -110 (0xffffff92)

MEDIA_ERROR_UNKNOWN
未知错误
值: 1 (0x00000001)

MEDIA_ERROR_UNSUPPORTED
比特流符合相关编码标准或文件的规格，但媒体框架不支持此功能
值: -1010 (0xfffffc0e)


what int: 标记的错误类型:
    MEDIA_ERROR_UNKNOWN
    MEDIA_ERROR_SERVER_DIED
extra int: 标记的错误类型.
    MEDIA_ERROR_IO
    MEDIA_ERROR_MALFORMED
    MEDIA_ERROR_UNSUPPORTED
    MEDIA_ERROR_TIMED_OUT
    MEDIA_ERROR_SYSTEM (-2147483648) - low-level system error.

* */
                Log.e(TAG, " "+ what +"  " +  extra);
                if(what==MediaPlayer.MEDIA_ERROR_SERVER_DIED){
                    //媒体服务器挂掉了。此时，程序必须释放MediaPlayer 对象，并重新new 一个新的。
                    Toast.makeText(LiteAppVideoView.this.getContext(),
                            "网络服务错误",
                            Toast.LENGTH_LONG).show();
                }else if(what==MediaPlayer.MEDIA_ERROR_UNKNOWN){
                    if(extra==MediaPlayer.MEDIA_ERROR_IO){
                        //文件不存在或错误，或网络不可访问错误
                        Toast.makeText(LiteAppVideoView.this.getContext(),
                                "网络文件错误",
                                Toast.LENGTH_LONG).show();
                    } else if(extra==MediaPlayer.MEDIA_ERROR_TIMED_OUT){
                        //超时
                        Toast.makeText(LiteAppVideoView.this.getContext(),
                                "网络超时",
                                Toast.LENGTH_LONG).show();
                    }
                }
                return false;
            }
        });
    }

    // 展示视频信息
    private void showMeidaInfo(){
        videoView.setOnInfoListener(new MediaPlayer.OnInfoListener() {
            @Override
            public boolean onInfo(MediaPlayer mediaPlayer, int i, int i1) {
                return false;
            }
        });
    }

    public void start(){
        videoView.start();
        isPaused = false;
    }

    public void pause(){
        videoView.pause();
        isPaused = true;
    }

    private void setFullScreenMode(){
        isResize = true;
        Activity topActivity = null;
        if (LiteAppFragmentActivity.topInstance != null) {
            topActivity = LiteAppFragmentActivity.topInstance.get();
        }
        if( topActivity ==null) {
            return;
        }
        topActivity.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE);
        FrameLayout topLayer = (FrameLayout)getActivityContentView(topActivity);
        topLayer.getChildAt(0).setVisibility(INVISIBLE);
        viewLayerWhatEverHolderView =  (ViewGroup) this.getParent();
        cacheProgress = videoView.getCurrentPosition();
        ((ViewGroup)this.getParent()).removeView(this);
        cacheWidth = getLayoutParams().width;
        cacheHeight = getLayoutParams().height;
        getLayoutParams().height = ViewGroup.LayoutParams.MATCH_PARENT;
        getLayoutParams().width = ViewGroup.LayoutParams.MATCH_PARENT;

        topLayer.addView(this);
        isFullScreen = true;

        if (Build.VERSION.SDK_INT >= 19) {
            //for new api versions.
            View decorView = topActivity.getWindow().getDecorView();
            int uiOptions = View.SYSTEM_UI_FLAG_HIDE_NAVIGATION
                    | View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY | View.SYSTEM_UI_FLAG_FULLSCREEN;
            decorView.setSystemUiVisibility(uiOptions);
        }
        //mFullScreenButton.setText("常规切换");
        LiteAppFragmentActivity.setOnBackPressedListener(new LiteAppFragmentActivity.OnBackPressedListener() {
            @Override
            public void onBackPressed() {
                setNormalScreenMode();
            }
        });
    }

    private View getActivityContentView(Activity activity){
        return (View) activity.findViewById(R.id.fragment_loading_progress).getParent();
    }

    private void setNormalScreenMode(){
        isResize = true;
        Activity topActivity = null;
        if (LiteAppFragmentActivity.topInstance != null) {
            topActivity = LiteAppFragmentActivity.topInstance.get();
        }
        if( topActivity ==null) {
            return;
        }
        topActivity.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);
        FrameLayout topLayer = (FrameLayout)getActivityContentView(topActivity);
        topLayer.getChildAt(0).setVisibility(VISIBLE);
        cacheProgress = videoView.getCurrentPosition();
        ((ViewGroup)this.getParent()).removeView(this);
        getLayoutParams().height = cacheHeight;
        getLayoutParams().width = cacheWidth;
        viewLayerWhatEverHolderView.addView(this);
        isFullScreen = false;

        if (Build.VERSION.SDK_INT >= 19) {
            //for new api versions.
            View decorView = topActivity.getWindow().getDecorView();
            //clear
            decorView.setSystemUiVisibility(0);
        }
        LiteAppFragmentActivity.clearBackPressedListener();
    }

    public void setVideoUri(String url){
        if (url == null){
            return;
        }

        cacheUrl = url;
        videoView.setVideoPath(cacheUrl);
        mLoadingView.setVisibility(VISIBLE);
        Log.i(TAG,"video" + url);
    }

    private void startTimerTask(){
        mTimer.schedule(new TimerTask() {
            @Override
            public void run() {
                videoView.post(new Runnable() {
                    @Override
                    public void run() {
                        if (!isSeekBarMoving){
                            if(videoView == null){
                                mTimer.purge();
                                mTimer.cancel();
                                mTimer = new Timer();
                                return;
                            }
                            if(videoView.getDuration() != 0 && videoView.getCurrentPosition()!=0 && videoView.getDuration() > videoView.getCurrentPosition()) {
                                int currentPosition = videoView.getCurrentPosition();
                                int bufferedPosiiton = videoView.getBufferPosition();
                                mCurrentTime.setText(timeToText(currentPosition));
                                int percent = currentPosition * 100 / videoView.getDuration();
                                mSeekBar.setProgress(percent);
                                int bufferPercent = bufferedPosiiton *100/videoView.getDuration();
                                mSeekBar.setSecondaryProgress(bufferPercent);
                            }
                            //todo 获得缓冲比,在进度跳上显示
//                            ijkVideoView.getBufferPercentage();
                        }
                    }
                });
            }
        }, 0, 800);
    }

    @Override
    protected void onDetachedFromWindow() {
        super.onDetachedFromWindow();
        if(!isResize) {
            dispose();
            videoView = null;
        } else {
            isResize = false;
        }
    }

    private String timeToText(int time){
        time = time/1000;
        int second = time%60;
        int minutes = time/60;
        String secondString;

        if(second == 0){
            secondString = "00";
        } else {
            secondString = String.valueOf(second);
            if (secondString.length() < 2) {
                secondString = "0" + secondString;
            }
        }
        return String.valueOf(minutes) + ":" + secondString;
    }
}
