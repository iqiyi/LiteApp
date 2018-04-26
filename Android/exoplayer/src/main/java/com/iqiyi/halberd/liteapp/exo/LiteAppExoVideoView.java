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
package com.iqiyi.halberd.liteapp.exo;

import android.content.Context;
import android.graphics.Color;
import android.media.MediaPlayer;
import android.net.Uri;
import android.view.Gravity;
import android.view.TextureView;
import android.widget.RelativeLayout;

import com.google.android.exoplayer2.ExoPlayerFactory;
import com.google.android.exoplayer2.Player;
import com.google.android.exoplayer2.SimpleExoPlayer;
import com.google.android.exoplayer2.extractor.DefaultExtractorsFactory;
import com.google.android.exoplayer2.extractor.ExtractorsFactory;
import com.google.android.exoplayer2.source.ExtractorMediaSource;
import com.google.android.exoplayer2.source.MediaSource;
import com.google.android.exoplayer2.source.TrackGroupArray;
import com.google.android.exoplayer2.trackselection.AdaptiveTrackSelection;
import com.google.android.exoplayer2.trackselection.DefaultTrackSelector;
import com.google.android.exoplayer2.trackselection.TrackSelection;
import com.google.android.exoplayer2.trackselection.TrackSelectionArray;
import com.google.android.exoplayer2.trackselection.TrackSelector;
import com.google.android.exoplayer2.upstream.BandwidthMeter;
import com.google.android.exoplayer2.upstream.DataSource;
import com.google.android.exoplayer2.upstream.DefaultBandwidthMeter;
import com.google.android.exoplayer2.upstream.DefaultDataSourceFactory;

import static com.iqiyi.halberd.liteapp.exo.AspectRatioFrameLayout.RESIZE_MODE_FIT;

/**
 * Created by eggizhang@qiyi.com on 17-12-5.
 * using this lite app exo player to deal with difficult video play senarios
 * such as https or non standard streaming videos
 */
public class LiteAppExoVideoView extends RelativeLayout {
    SimpleExoPlayer mPlayer;
    AspectRatioFrameLayout aspectRatioFrameLayout;
    TextureView mPlayerView;
    ComponentListener componentListener = new ComponentListener();

    float widthHeightRatio = 1f/1.6f;
    private MediaPlayer.OnPreparedListener onPreparedListener;
    private MediaPlayer.OnCompletionListener onCompletionListener;
    private MediaPlayer.OnErrorListener onErrorListener;
    private MediaPlayer.OnInfoListener onInfoListener;

    public LiteAppExoVideoView(Context context) {
        super(context);
        init();
    }


    public void init() {
        // 1. Create a default TrackSelector
        BandwidthMeter bandwidthMeter = new DefaultBandwidthMeter();
        TrackSelection.Factory videoTrackSelectionFactory =
                new AdaptiveTrackSelection.Factory(bandwidthMeter);
        TrackSelector trackSelector =
                new DefaultTrackSelector(videoTrackSelectionFactory);
        // 3. Create the player
        mPlayer =
                ExoPlayerFactory.newSimpleInstance(getContext(), trackSelector);
        aspectRatioFrameLayout = new AspectRatioFrameLayout(getContext());
        aspectRatioFrameLayout.setResizeMode(RESIZE_MODE_FIT);
        aspectRatioFrameLayout.setAspectRatio(widthHeightRatio);
        mPlayerView =new TextureView(getContext());
        mPlayer.setVideoTextureView(mPlayerView);
        mPlayer.addVideoListener(componentListener);
        mPlayer.addListener(componentListener);
        addView(aspectRatioFrameLayout);
        aspectRatioFrameLayout.addView(mPlayerView);
        setGravity(Gravity.CENTER);
        setBackgroundColor(Color.BLACK);
    }

    public void loadMp4UriSource(String url){
        Uri mp4VideoUri = Uri.parse(url);
        // Produces DataSource instances through which media data is loaded.
        DataSource.Factory dataSourceFactory = new DefaultDataSourceFactory(
                getContext(),"yourApplicationName");
        // Produces Extractor instances for parsing the media data.
        ExtractorsFactory extractorsFactory = new DefaultExtractorsFactory();
        // This is the MediaSource representing the media to be played.

        MediaSource videoSource = new ExtractorMediaSource(mp4VideoUri,
                new CacheDataSourceFactory(getContext(), 1000 * 1024 * 1024,50 * 1024 * 1024),
                new DefaultExtractorsFactory(), null, null);

        // Prepare the player with the source.
        mPlayer.prepare(videoSource);
    }

    public void start(){
        mPlayer.setPlayWhenReady(true);
    }

    public void stop(){
        mPlayer.setPlayWhenReady(false);
        mPlayer.stop();
    }

    public void pause(){
        mPlayer.setPlayWhenReady(false);
    }

    public void resume(){
        mPlayer.setPlayWhenReady(true);
    }

    public void release(){
        if(mPlayer!=null) {
            mPlayer.stop();
            mPlayer.release();
            mPlayer.removeListener(componentListener);
            mPlayer.removeVideoListener(componentListener);
            mPlayer = null;
        }
    }

    public int getDuration() {
        return (int)mPlayer.getDuration();
    }

    public int getBufferPosition(){
        return (int)mPlayer.getBufferedPosition();
    }

    public void setVideoPath(String videoPath) {
        loadMp4UriSource(videoPath);
    }

    public void seekTo(int currentPosition) {
        mPlayer.seekTo(currentPosition);
    }

    public void setOnPreparedListener(MediaPlayer.OnPreparedListener onPreparedListener) {
        this.onPreparedListener = onPreparedListener;
    }

    public void setOnCompletionListener(MediaPlayer.OnCompletionListener onCompletionListener) {
        this.onCompletionListener = onCompletionListener;
    }

    public void setOnErrorListener(MediaPlayer.OnErrorListener onErrorListener) {
        this.onErrorListener = onErrorListener;
    }

    public void setOnInfoListener(MediaPlayer.OnInfoListener onInfoListener) {
        this.onInfoListener = onInfoListener;
    }

    public int getCurrentPosition() {
        return (int) mPlayer.getCurrentPosition();
    }


    private final class ComponentListener extends Player.DefaultEventListener implements
            SimpleExoPlayer.VideoListener {
        private int currentPosition;

        // SimpleExoPlayer.VideoInfoListener implementation

        @Override
        public void onVideoSizeChanged(int width, int height, int unappliedRotationDegrees,
                                       float pixelWidthHeightRatio) {
            widthHeightRatio = height == 0 ? 1 : (width * pixelWidthHeightRatio) / height;
            aspectRatioFrameLayout.setAspectRatio(widthHeightRatio);
        }

        @Override
        public void onRenderedFirstFrame() {
            if(onPreparedListener!=null){
                onPreparedListener.onPrepared(null);
            }
        }

        @Override
        public void onTracksChanged(TrackGroupArray tracks, TrackSelectionArray selections) {

        }

        // Player.EventListener implementation

        @Override
        public void onPlayerStateChanged(boolean playWhenReady, int playbackState) {

        }

        @Override
        public void onPositionDiscontinuity(@Player.DiscontinuityReason int reason) {

        }
    }
}
