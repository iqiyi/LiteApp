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
package com.iqiyi.halberd.liteapp.test.testFrame;

import android.content.Context;
import android.content.res.AssetManager;
import android.support.test.InstrumentationRegistry;
import android.text.TextUtils;
import android.util.Log;

import com.iqiyi.halberd.liteapp.manager.impl.LiteAppDescription;
import com.iqiyi.halberd.liteapp.manager.impl.LiteAppLocalPackageUtils;
import com.iqiyi.halberd.liteapp.utils.AssetsUtils;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.List;

/**
 * Created by xujiajia_sx on 2017/10/18.
 *
 */

public class LocalPackageClient {
    private static final String TAG = LocalPackageClient.class.getName();

    public List<LiteAppDescription> searchLiteApp(String searchText, Context context, boolean forceUpdate) {
        return null;
    }

    public byte[] getImageBytes(String id, String path) {
        return new byte[0];
    }

    public LiteAppDescription checkPackageUpdate(Context context, String id, String cachedVersion) {
        String result = AssetsUtils.getFromAssets(id + "/version", InstrumentationRegistry.getContext());

        if (TextUtils.isEmpty(result)) {
            return null;
        }
        try {
            JSONObject resultObj = new JSONObject(result);
            String version = resultObj.optString("version");
            LiteAppDescription description = LiteAppDescription.parse(result);
            if (description != null) {
                //设置每次都会更新内容
                description.setNeedUpdate(true);

                description.setCDN("");
                description.setManifestPath(resultObj.optString("manifest_url"));
                description.setId(id);
                description.setEnabled(true);
                description.setVersion(version);
                description.setName("");

                if (description.isNeedUpdate()) {
                    //下载所有base
                    String baseOutPath = context.getFilesDir().getAbsolutePath() + "/lite/base" ;
                    File file = new File(baseOutPath);
                    if (!file.exists()) {
                        file.mkdirs();
                    }
                    AssetManager am = InstrumentationRegistry.getContext().getAssets();
                    storeAppFile("base", baseOutPath, am);

                    //下载对应的小程序package
                    String packageOutPath = context.getFilesDir().getAbsolutePath() + "/lite/" + id;
                    storeAppFile(id, packageOutPath, am);

                    LiteAppLocalPackageUtils.storageLiteAppCache(context, id, "version", result);
                }
                description.setNeedUpdate(false);

                return description;
            } else {
                return null;
            }
        } catch (JSONException e) {
            Log.e(TAG, "exception in parse result update", e);
        }
        return null;
    }

    public String getLiteAppFile(String id, String filePath, Context context) {
        return null;
    }

    private void storeAppFile(String inPath, String outPath, AssetManager am) {
        try {
            String[] lis = am.list(inPath);
            for (String name : lis) {
                if (inPath.equals("base")||(!name.contains(".") && !name.equals("version"))) {
                    File outF = new File(outPath + "/" + name);
                    if (!outF.exists()) {
                        outF.mkdir();
                    }
                    storeAppFile(inPath + "/" + name, outPath + "/" + name, am);
                } else {
                    InputStream in = am.open(inPath + "/" + name);
                    OutputStream out = new FileOutputStream(outPath + "/" + name);
                    byte[] bytes = new byte[1024];
                    int len = -2;
                    while ((len = in.read(bytes)) != -1) {
                        out.write(bytes, 0, len);
                    }
                    in.close();
                    out.close();
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
