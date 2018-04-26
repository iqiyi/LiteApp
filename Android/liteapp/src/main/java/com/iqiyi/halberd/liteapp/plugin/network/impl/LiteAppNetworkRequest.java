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
package com.iqiyi.halberd.liteapp.plugin.network.impl;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by eggizhang@qiyi.com on 2017/6/28.
 * this is a model
 */
@SuppressWarnings("unused")
public class LiteAppNetworkRequest {
    private Map<String,String> requestHeaders = new HashMap<>();
    private String URL;
    private String method;
    private String body;

    private Map<String,String> resultHeaders = new HashMap<>();
    private int resultCode;
    private boolean isSuccess;
    private String resultData;

    public Map<String, String> getRequestHeaders() {
        return requestHeaders;
    }

    public LiteAppNetworkRequest setRequestHeaders(HashMap<String, String> requestHeaders) {
        this.requestHeaders = requestHeaders;
        return this;
    }

    public String getURL() {
        return URL;
    }

    public LiteAppNetworkRequest setURL(String URL) {
        this.URL = URL;
        return this;
    }

    public String getMethod() {
        return method;
    }

    public LiteAppNetworkRequest setMethod(String method) {
        this.method = method;
        return this;
    }

    public String getBody() {
        return body;
    }

    public LiteAppNetworkRequest setBody(String body) {
        this.body = body;
        return this;
    }

    public LiteAppNetworkRequest setResultHeaders(Map<String,String> resultHeaders) {
        this.resultHeaders = resultHeaders;
        return this;
    }

    public Map<String,String> getResultHeaders(){
        return resultHeaders;
    }

    public void setResultCode(int resultCode) {
        this.resultCode = resultCode;
    }

    public int getResultCode() {
        return resultCode;
    }

    public boolean isSuccess() {
        return isSuccess;
    }

    public LiteAppNetworkRequest setSuccess(boolean success) {
        isSuccess = success;
        return this;
    }

    public String getResultData() {
        return resultData;
    }

    public LiteAppNetworkRequest setResultData(String resultData) {
        this.resultData = resultData;
        return this;
    }
}
