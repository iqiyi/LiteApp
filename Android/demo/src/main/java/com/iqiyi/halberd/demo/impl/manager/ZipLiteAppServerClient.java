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
package com.iqiyi.halberd.demo.impl.manager;

import android.annotation.SuppressLint;
import android.content.Context;
import android.text.TextUtils;

import com.iqiyi.halberd.liteapp.manager.impl.LiteAppDescription;
import com.iqiyi.halberd.liteapp.utils.AssetsUtils;
import com.iqiyi.halberd.liteapp.utils.LogUtils;

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
 * Zip filed lite app package downloader and version checker
 */
public class ZipLiteAppServerClient {
    private final static String TAG = ZipLiteAppServerClient.class.getName();
    private String mHost = "10.127.18.211:8008";

    /**
     * providing this search lite app feature if you need to search lite apps from server
     * Its ok that providing an empty implementation
     * @param searchText text to search lite app for
     * @param context android context provided for your searching
     * @param forceUpdate to show if you need to update your lite app list
     */
    public List<LiteAppDescription> searchLiteApp(String searchText, Context context,
                                                          boolean forceUpdate) {
        //use lite app description only local
        String versionString = AssetsUtils.getFromAssets("demoAppList.json", context);
        return LiteAppDescription.parseList(versionString);
    }

    public byte[] getImageBytes(String id, String path) {
        return null;
    }

    /**
     * Providing this to check lite app version and update local package if needed,
     * will give you a cached version to compare with your server version
     * @param context android context provided to update lite app
     * @param id lite app id to check lite app update
     * @param cachedVersion current cached lite app version
     * */
    public LiteAppDescription checkPackageUpdate(Context context, String id
            , String cachedVersion) {
        String urlBase = "http://" + mHost + "/";
        String queryURL = urlBase +
                id + "/version";
        String versionFileResult = getStringResultFromURL(queryURL);
        if(TextUtils.isEmpty(versionFileResult)){
            return null;
        }
        LiteAppDescription description = LiteAppDescription.parse(versionFileResult);
        if(description!=null) {
            description.setCDN("");
            description.setId(id);
            description.setEnabled(true);
            description.setName("");
            description.setNeedUpdate(!TextUtils.equals(cachedVersion, description.getVersion()));

            //storage zip file
            if (description.isNeedUpdate()) {
                LiteAppPackageManager.getInstance().markMemoryCacheDirty(true);
                LogUtils.log(LogUtils.LOG_MINI_PROGRAM_CACHE, LogUtils.CACHE_FILE + LogUtils.CACHE_NETWORK + LogUtils.ACTION_START);
                //here download zip file
                String zipQueryString = urlBase + id + "/" + "package.zip";
                downloadAndUnpackZip(context,id,zipQueryString);

                //download related zip file before storage version file to ensure exist
                LiteAppLocalPackageUtils.storageLiteAppCache(context, id, "version", versionFileResult);
            }
            description.setNeedUpdate(false);


            //update base
            if (!TextUtils.equals(id, "base")) {
                String requiredBaseVersion = description.getBaseVersion();
                String requiredBaseID = "base/" + requiredBaseVersion;
                //Try get current base version
                String cachedBaseVersionFile = LiteAppLocalPackageUtils.getLiteAppCache
                        (context, requiredBaseID , "version");

                if(TextUtils.isEmpty(cachedBaseVersionFile)) {
                    //if not have download related version of detail
                    String baseQueryUrl = urlBase +requiredBaseID + "/version";
                    String baseVersionFileResult = getStringResultFromURL(baseQueryUrl);
                    //download related zip file before storage version file to ensure exist
                    String baseZipQueryString = urlBase + requiredBaseID + "/package.zip";
                    downloadAndUnpackZip(context, requiredBaseID, baseZipQueryString);
                    LiteAppLocalPackageUtils.storageLiteAppCache(
                            context,"base/" + requiredBaseVersion,"version", baseVersionFileResult);
                }
            }

            return description;
        } else {
            return null;
        }
    }

    public String getLiteAppFile(String id, String filePath, Context context) {
        //get from local zip
        return LiteAppLocalPackageUtils.getLiteAppCache(context,id,filePath);
    }

    private void downloadAndUnpackZip(Context context,String id, String zipQueryString){
        HttpURLConnection conn = null;
        try {
            URL url = new URL(zipQueryString);
            conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("GET");
            conn.setConnectTimeout(3000);
            conn.connect();
            InputStream zipIn = conn.getInputStream();
            LiteAppLocalPackageUtils.storageLiteAppStreamCache(
                    context, id, "package.zip", zipIn);
            String path = context.getFilesDir().getAbsolutePath() + "/lite/" + id + "/";
            InputStream inputStream = LiteAppLocalPackageUtils
                    .getLiteAppStreamCache(context, id, "package.zip");
            if (inputStream != null) {
                LiteAppPackageManager.getInstance().cleanMemoryCache();
                LiteAppLocalPackageUtils.cleanLiteAppWithID(context, id);
                unpackZip(path, new ZipInputStream(inputStream));
            }
            LogUtils.log(LogUtils.LOG_MINI_PROGRAM_CACHE, LogUtils.CACHE_FILE + LogUtils.CACHE_NETWORK + LogUtils.ACTION_STOP);
        } catch (IOException e) {
            LogUtils.logError(TAG, "network error for lite app ", e);
        } finally {
            //最后将conn断开连接
            if (conn != null) {
                conn.disconnect();
            }
        }
    }

    @SuppressWarnings("unused")
    private void unpackZip(String path, ZipInputStream zipInputStream) {
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
        }

    }

    private String getStringResultFromURL(String urlString){
        HttpURLConnection conn = null;
        try {
            //https trust
            SSLContext sc = SSLContext.getInstance("TLS");
            sc.init(null, new TrustManager[] { new MyTrustManager() },
                    new SecureRandom());
//            HttpsURLConnection
//                    .setDefaultSSLSocketFactory(sc.getSocketFactory());
//            HttpsURLConnection
//                    .setDefaultHostnameVerifier(new MyHostnameVerifier());


            URL url = new URL(urlString);
            //conn = (HttpsURLConnection) url.openConnection();
            conn = (HttpURLConnection)url.openConnection();
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
            LogUtils.logError(LogUtils.LOG_MINI_PROGRAM_ERROR,"network error for lite app ",e);
        } catch (NoSuchAlgorithmException | KeyManagementException e) {
            LogUtils.logError(LogUtils.LOG_MINI_PROGRAM_ERROR,"unexpected error for lite app ",e);
        } finally {
            //最后将conn断开连接
            if (conn != null) {
                conn.disconnect();
            }
        }

        return null;
    }


    private class MyHostnameVerifier implements HostnameVerifier {
        @SuppressLint("BadHostnameVerifier")
        @Override
        public boolean verify(String hostname, SSLSession session) {
            // TODO Auto-generated method stub
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
}
