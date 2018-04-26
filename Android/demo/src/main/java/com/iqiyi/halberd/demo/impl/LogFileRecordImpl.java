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
package com.iqiyi.halberd.demo.impl;

import android.annotation.SuppressLint;
import android.os.Handler;
import android.text.TextUtils;
import android.util.SparseArray;

import com.iqiyi.halberd.liteapp.utils.LogUtils;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStreamWriter;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collections;

/**
 * Created by xujiajia_sx on 2017/10/31.
 * Implement {@link LogUtils.LogProvider} to storage lite app log files to
 * local storage, you can change this provider for uploading to server side
 */

class LogFileRecordImpl implements LogUtils.LogProvider{
    private int nowSize;
    private String logBuffer;
    private static final int WRITE_FILE_SIZE = 50;
    private static final int STORAGE_FILE_MAX_NUM=5;
    private static final String LOG_FOLDER = "lite/logFiles";

    private LogFileRecordImpl() {
        logBuffer = "";
        nowSize = 0;
    }

    private static class Host {
        private final static LogFileRecordImpl instance= new LogFileRecordImpl();
    }

    static LogFileRecordImpl getInstance() {
        return Host.instance;
    }

    @Override
    public void doRecord(LogUtils.Record record, Exception e) {
        logBuffer += record.toString() + ";";
        nowSize++;

        @SuppressLint("SimpleDateFormat")
        SimpleDateFormat format =  new SimpleDateFormat("yyyyMMdd");
        final String time=format.format(record.getTime());

        if (nowSize >= WRITE_FILE_SIZE) {
            storageLogAtFileLast(LOG_FOLDER + "/"+time);
        }
        if (record.getContent().equals(LogUtils.LIFE_ACTIVITY + LogUtils.LIFE_DESTROY+LogUtils.ACTION_START)) {
            new Handler().postDelayed(new Runnable() {
                @Override
                public void run() {
                    storageLogAtFileLast(LOG_FOLDER + "/"+time);
                }
            }, 2000);
        }
    }

    @Override
    public void clearLogFile(String applicationFilesDir) {
        File folder = new File(applicationFilesDir+"/"+LOG_FOLDER);
        File f[]=folder.listFiles();
        if(f == null){
            return;
        }
        if(f.length < STORAGE_FILE_MAX_NUM -1){
            return;
        }
        SparseArray<File> fileArray=new SparseArray<>();
        ArrayList<Integer> fileNames=new ArrayList<>();
        for (File aF : f) {
            String name = aF.getName();
            if (name.length() != 8) {
                aF.delete();
            } else {
                fileNames.add(Integer.parseInt(name));
                fileArray.put(Integer.parseInt(name), aF);
            }
        }
        Collections.sort(fileNames);
        for(int i=0;i<fileNames.size()-STORAGE_FILE_MAX_NUM;i++){
            fileArray.get(fileNames.get(i)).delete();
        }
    }

    private void createParentPath(File file) {
        File parent = file.getParentFile();
        if (!parent.exists()) {
            createParentPath(parent);
            parent.mkdir();
        }
    }

    private boolean storageLogAtFileLast(String path) {
        try {
            if (TextUtils.isEmpty(logBuffer)) {
                return false;
            }
            File file = new File(LogUtils.getInstance().getApplicationFilesDir()+"/"+ path);

            createParentPath(file);
            file.createNewFile();

            BufferedWriter out = new BufferedWriter(new OutputStreamWriter(
                    new FileOutputStream(file, true)));
            out.write(logBuffer);
            nowSize = 0;
            logBuffer = "";
            out.flush();
            return true;
        } catch (Exception e) {
            LogUtils.logError(LogUtils.LOG_MINI_PROGRAM_ERROR, "error when creating log file", e);
        }
        return false;
    }
}
