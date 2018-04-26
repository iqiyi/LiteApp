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
package com.iqiyi.halberd.liteapp.test.network;

import android.text.TextUtils;
import android.util.Log;

import com.iqiyi.halberd.liteapp.api.provider.LiteAppNetworkExecutor;
import com.iqiyi.halberd.liteapp.plugin.network.impl.LiteAppNetworkRequest;

import java.util.HashMap;
import java.util.Map;

import okhttp3.Call;
import okhttp3.Headers;
import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

/**
 * Created by eggizhang@qiyi.com on 2017/6/29.
 * wrapper of ok http client for network implementation of a network executor.
 *
 */
public class OKHttpExecutorImpl implements LiteAppNetworkExecutor {
    private String TAG = OKHttpExecutorImpl.class.getName();
    private OkHttpClient okHttpClient =new OkHttpClient();
    public static OKHttpExecutorImpl getInstance(){
        return Host.instance;
    }

    @Override
    public LiteAppNetworkRequest execute(LiteAppNetworkRequest liteAppNetworkRequest) {
        try {
            Headers.Builder requestHeaderBuilder = null;

            if(liteAppNetworkRequest.getRequestHeaders()!=null) {
                //put all request headers to map
                requestHeaderBuilder = new Headers.Builder();
                for (Map.Entry<String, String> entrySet : liteAppNetworkRequest.getRequestHeaders().entrySet()) {
                    requestHeaderBuilder.add(entrySet.getKey(), entrySet.getValue());
                }
            }

            RequestBody requestBody = null;
            if (!TextUtils.isEmpty(liteAppNetworkRequest.getBody())) {
                requestBody = RequestBody.create(
                        MediaType.parse("json"),
                        liteAppNetworkRequest.getBody()
                );
            }

            Request.Builder requestBuilder = new Request.Builder()
                    .url(liteAppNetworkRequest.getURL())
                    .method(liteAppNetworkRequest.getMethod().toUpperCase(), requestBody);
            if(requestHeaderBuilder!=null){
                requestBuilder.headers(requestHeaderBuilder.build());
            }

            final Request request = requestBuilder.build();
            Call mCall = okHttpClient.newCall(request);
            Response response = mCall.execute();

            liteAppNetworkRequest.setResultHeaders(transformHeaders(response.headers()));
            liteAppNetworkRequest.setResultCode(response.code());
            if(response.body() != null){
                byte[] resultBytes =  response.body().bytes();
                String resultString = new String(resultBytes);
                liteAppNetworkRequest.setResultData(resultString);
            }
            liteAppNetworkRequest.setSuccess(response.isSuccessful());
            return liteAppNetworkRequest;
        } catch (IllegalArgumentException e){
            Log.e(TAG,"illegal arguments for http request parser in halberd",e);
            return null;
        } catch (Exception e){
            Log.e(TAG,"unknown arguments error for http request parser in halberd",e);
            return null;
        }
    }

    private Map<String,String> transformHeaders(Headers headers) {
        if(headers!=null) {
            HashMap<String, String> map = new HashMap<>();
            for (int i = 0; i < headers.size(); i++) {
                String name = headers.name(i);
                map.put(name, headers.get(name));
            }
            return map;
        }
        return null;
    }


    private OKHttpExecutorImpl(){}

    private static class Host{
        private static final OKHttpExecutorImpl instance = new OKHttpExecutorImpl();
    }
}
