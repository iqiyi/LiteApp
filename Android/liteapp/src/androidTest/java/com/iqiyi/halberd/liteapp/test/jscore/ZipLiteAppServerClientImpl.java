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
package com.iqiyi.halberd.liteapp.test.jscore;

import android.app.Activity;
import android.content.Context;
import android.text.TextUtils;
import android.util.Log;

import com.iqiyi.halberd.liteapp.manager.impl.LiteAppDescription;
import com.iqiyi.halberd.liteapp.manager.impl.LiteAppLocalPackageUtils;
import com.iqiyi.halberd.liteapp.utils.AssetsUtils;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.security.KeyManagementException;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.security.cert.CertificateException;
import java.security.cert.X509Certificate;
import java.util.List;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

import javax.net.ssl.HostnameVerifier;
import javax.net.ssl.HttpsURLConnection;
import javax.net.ssl.SSLContext;
import javax.net.ssl.SSLSession;
import javax.net.ssl.TrustManager;
import javax.net.ssl.X509TrustManager;

/**
 * Created by eggizhang@qiyi.com on 2017/8/11.
 * using this class to retrieve zip file from server side
 */
public class ZipLiteAppServerClientImpl {
    private final static String TAG = ZipLiteAppServerClientImpl.class.getName();
    private String mHost = "10.127.18.211:8003";

    public ZipLiteAppServerClientImpl(Context context){
        String host = context.getSharedPreferences("demo", Activity.MODE_PRIVATE).getString("devHost",null);
        if(!TextUtils.isEmpty(host)){
            mHost = host;
        }
    }

    public static void setHost(String host, Context context) {
        context.getSharedPreferences("demo",Activity.MODE_PRIVATE).edit().putString("devHost", host).apply();
    }

    public List<LiteAppDescription> searchLiteApp(String searchText, Context context,
                                                          boolean forceUpdate) {
        //use lite app description only local
        String versionString = AssetsUtils.getFromAssets("demoAppList.json", context);
        return LiteAppDescription.parseList(versionString);
    }

    public byte[] getImageBytes(String id, String path) {
        return null;
    }

    public LiteAppDescription checkPackageUpdate(Context context, String id
            , String cachedVersion) {
        String queryURL =  "http://" + mHost + "/" +
                id + "/version";
        String result = getStringResultFromURL(queryURL);
        if(TextUtils.isEmpty(result)){
            return null;
        }
        try {
            JSONObject resultObj = new JSONObject(result);
            String version = resultObj.optString("version");
            LiteAppDescription description = new LiteAppDescription();
            description.setNeedUpdate(!TextUtils.equals(cachedVersion,version));
            description.setCDN("");
            description.setManifestPath("conf/manifest.json");
            description.setId(id);
            description.setEnabled(true);
            description.setVersion(version);
            description.setName("");

            //storage zip file
            if(description.isNeedUpdate()){
                //here download zip file
                String zipQueryString = "http://" + mHost + "/" + id + "/" + "package.zip";
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


                    URL url = new URL(zipQueryString);
                    conn = (HttpURLConnection) url.openConnection();
                    conn.setRequestMethod("GET");
                    conn.setConnectTimeout(3000);
                    conn.connect();
                    InputStream zipIn = conn.getInputStream();
                    LiteAppLocalPackageUtils.storageLiteAppStreamCache(
                                context,id,"package.zip",zipIn);
                    String path = context.getFilesDir().getAbsolutePath() + "/lite/" + id + "/";
                    InputStream inputStream = LiteAppLocalPackageUtils
                            .getLiteAppStreamCache(context,id,"package.zip");
                    if(inputStream!=null) {
                        LiteAppLocalPackageUtils.cleanLiteAppWithID(context, id);
                        unpackZip(path, new ZipInputStream(inputStream));
                    }
                } catch (IOException e) {
                    Log.e(TAG,"network error for lite app ",e);
                } catch (NoSuchAlgorithmException e) {
                    Log.e(TAG,"network error for lite app ",e);
                } catch (KeyManagementException e) {
                    Log.e(TAG,"network error for lite app ",e);
                } finally {
                    //最后将conn断开连接
                    if (conn != null) {
                        conn.disconnect();
                    }
                }
            }
            description.setNeedUpdate(false);
            return description;
        } catch (JSONException e) {
            Log.e(TAG,"exception in parse result update",e);
        }
        return null;
    }

    public String getLiteAppFile(String id, String filePath, Context context) {
        //get from local zip
        return LiteAppLocalPackageUtils.getLiteAppCache(context,id,filePath);
    }

    protected boolean unpackZip(String path, ZipInputStream zipInputStream) {
        InputStream is;
        ZipInputStream zis;
        try {
            String filename;
            zis = zipInputStream;
            ZipEntry zipEntry;
            byte[] buffer = new byte[1024];
            int count;
            while ((zipEntry = zis.getNextEntry()) != null) {
                filename = zipEntry.getName();
                // Need to create directories if not exists, or
                // it will generate an Exception...
                if (zipEntry.isDirectory()) {
                    File fmd = new File(path + filename.replace("package/", ""));
                    fmd.mkdirs();
                    continue;
                }
                FileOutputStream fileOutputStream = new FileOutputStream(path + filename.replace("package/", ""));
                while ((count = zis.read(buffer)) != -1) {
                    fileOutputStream.write(buffer, 0, count);
                }
                fileOutputStream.close();
                zis.closeEntry();
            }
            zis.close();
        }
        catch(IOException e) {
            e.printStackTrace();
            return false;
        }

        return true;
    }

    private String getStringResultFromURL(String urlString){
        HttpURLConnection conn = null;
        try {
            URL url = new URL(urlString);
            conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("GET");
            conn.setConnectTimeout(3000);
            conn.connect();
            InputStream is = conn.getInputStream();
            StringBuilder sb = new StringBuilder();
            BufferedReader reader = new BufferedReader(new InputStreamReader(is));
            String line;
            while ((line = reader.readLine()) != null) {
                sb.append(line).append("\n");
            }
            reader.close();
            return sb.toString();
        } catch (IOException e) {
            Log.e(TAG,"network error for lite app ",e);
        } finally {
            //最后将conn断开连接
            if (conn != null) {
                conn.disconnect();
            }
        }

        return null;
    }



    private class MyHostnameVerifier implements HostnameVerifier {
        @Override
        public boolean verify(String hostname, SSLSession session) {
            return true;
        }

    }

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
}
