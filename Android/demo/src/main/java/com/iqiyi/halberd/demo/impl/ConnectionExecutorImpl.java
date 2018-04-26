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
import android.text.TextUtils;

import com.iqiyi.halberd.liteapp.api.provider.LiteAppNetworkExecutor;
import com.iqiyi.halberd.liteapp.plugin.network.impl.LiteAppNetworkRequest;
import com.iqiyi.halberd.liteapp.utils.LogUtils;

import java.io.DataOutputStream;
import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.security.SecureRandom;
import java.security.cert.CertificateException;
import java.security.cert.X509Certificate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Scanner;

import javax.net.ssl.HostnameVerifier;
import javax.net.ssl.HttpsURLConnection;
import javax.net.ssl.SSLContext;
import javax.net.ssl.SSLSession;
import javax.net.ssl.TrustManager;
import javax.net.ssl.X509TrustManager;

/**
 * Created by eggizhang@qiyi.com on 2017/6/29.
 * wrapper of ok http client for network implementation of a network executor.
 * Implement default https.
 */
public class ConnectionExecutorImpl implements LiteAppNetworkExecutor {
    private String TAG = ConnectionExecutorImpl.class.getName();
    public static ConnectionExecutorImpl getInstance(){
        return Host.instance;
    }

    @Override
    public LiteAppNetworkRequest execute(LiteAppNetworkRequest liteAppNetworkRequest) {
        try {
            HttpURLConnection conn = null;
            try {
                //https trust
                SSLContext sc = SSLContext.getInstance("TLS");
                sc.init(null, new TrustManager[] { new MyTrustManager() },
                        new SecureRandom());
                HttpsURLConnection
                        .setDefaultSSLSocketFactory(sc.getSocketFactory());
                HttpsURLConnection
                        .setDefaultHostnameVerifier(new MyHostnameVerifier());

                URL url = new URL(liteAppNetworkRequest.getURL());
                conn = (HttpURLConnection) url.openConnection();
                if(TextUtils.isEmpty(liteAppNetworkRequest.getMethod())) {
                    conn.setRequestMethod("GET");
                } else {
                    conn.setRequestMethod(liteAppNetworkRequest.getMethod());
                }
                if(liteAppNetworkRequest.getRequestHeaders()!=null) {
                    for (Map.Entry<String, String> entrySet : liteAppNetworkRequest.getRequestHeaders().entrySet()) {
                        conn.addRequestProperty(entrySet.getKey(), entrySet.getValue());
                    }
                }
                if (liteAppNetworkRequest.getBody() != null) {
                    conn.setDoOutput(true);
                    DataOutputStream out = new DataOutputStream(conn.getOutputStream());
                    out.writeBytes(liteAppNetworkRequest.getBody());
                }

                conn.setConnectTimeout(3000);
                conn.connect();

                liteAppNetworkRequest.setResultHeaders(transformHeaders(conn.getHeaderFields()));
                liteAppNetworkRequest.setResultCode(conn.getResponseCode());

                Scanner s = new Scanner(conn.getInputStream()).useDelimiter("\\A");
                String result = s.hasNext() ? s.next() : "";
                liteAppNetworkRequest.setResultData(result);
                liteAppNetworkRequest.setSuccess(true);
                LogUtils.log(LogUtils.LOG_MINI_PROGRAM_CACHE, LogUtils.CACHE_FILE + LogUtils.CACHE_NETWORK + LogUtils.ACTION_STOP);
            } catch (IOException e) {
                LogUtils.logError(TAG, "network error for lite app ", e);
                liteAppNetworkRequest.setSuccess(false);
            } finally {
                //最后将conn断开连接
                if (conn != null) {
                    conn.disconnect();
                }
            }
            return liteAppNetworkRequest;
        } catch (IllegalArgumentException e){
            LogUtils.logError(LogUtils.LOG_MINI_PROGRAM_ERROR,"illegal arguments for http request parser in halberd",e);
            return null;
        } catch (Exception e){
            LogUtils.logError(LogUtils.LOG_MINI_PROGRAM_ERROR,"unknown arguments error for http request parser in halberd",e);
            return null;
        }
    }

    private Map<String,String> transformHeaders(Map<String,List<String>> headers) {
        if(headers!=null) {
            HashMap<String, String> map = new HashMap<>();
            for (String key: headers.keySet()) {
                List<String> headerStringList = headers.get(key);
                if (headerStringList == null) {
                    continue;
                }
                if (headerStringList.size() > 0) {
                    map.put(key, headerStringList.get(0));
                }
            }
            return map;
        }
        return null;
    }

    private class MyHostnameVerifier implements HostnameVerifier {
        @SuppressLint("BadHostnameVerifier")
        @Override
        public boolean verify(String hostname, SSLSession session) {
            return true;
        }

    }

    @SuppressLint("TrustAllX509TrustManager")
    private class MyTrustManager implements X509TrustManager {
        @Override
        public void checkClientTrusted(X509Certificate[] chain, String authType)
                throws CertificateException {
        }

        @Override
        public void checkServerTrusted(X509Certificate[] chain, String authType)
                throws CertificateException {
        }

        @Override
        public X509Certificate[] getAcceptedIssuers() {
            return null;
        }
    }


    private ConnectionExecutorImpl(){}

    private static class Host{
        private static final ConnectionExecutorImpl instance = new ConnectionExecutorImpl();
    }
}
