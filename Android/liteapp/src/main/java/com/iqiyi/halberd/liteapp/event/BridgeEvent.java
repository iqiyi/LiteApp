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
package com.iqiyi.halberd.liteapp.event;

import com.iqiyi.halberd.liteapp.context.LiteAppContext;
import com.iqiyi.halberd.liteapp.export.NativeObjectRef;

/**
 * Created by eggizhgang@qiyi.com on 2017/7/17.
 * Using this type to trigger js script methods in executor.from view layer
 */
@SuppressWarnings("unused")
public class BridgeEvent {
    //event :"Hal:{event:"testEvent",data:"data"}"
    public final static String jsConsoleEventType = "type";
    public final static String jsConsoleEventData = "data";
    public final static String jsConsoleEventIntercepted = "intercept";

    /**
     * Event name used as type or key for each type
     * */
    private String type;
    /**
     * Event data usually a json object
     * */
    private String data;

    /**
     * Is event local
     * */
    private boolean local = false;

    /**
     * Show if this event has been intercepted
     **/
    private boolean intercepted = false;

    /***
     * Retained protect
     */
    private boolean retainedProtect = false;

    /**
     * Context for this bridge event
     * */
    private LiteAppContext context;

    /**
     * Related native event callback object native pointer,
     * should be attached to javascript event object to protect
     * native event and call event callbacks
     **/
    private NativeObjectRef nativeObjectHandle;

    public String getType() {
        return type;
    }

    public void setLocal(boolean local){
        this.local = local;
    }

    public boolean isLocal(){
        return local;
    }

    public BridgeEvent setType(String type) {
        this.type = type;
        return this;
    }

    /**
     * check if this event's protect handle is retained by other plugins
     * */
    public boolean isProtectRetained(){
        return retainedProtect;
    }

    /**
     * using this method to retain event protect and protect this event from JS GC release
     * after this you should call expose native object by your self
     * */
    public void retainProtect(){
        retainedProtect = true;
    }

    public String getData() {
        return data;
    }

    public BridgeEvent setData(String data) {
        this.data = data;
        return this;
    }

    public LiteAppContext getContext() {
        return context;
    }

    public BridgeEvent setContext(LiteAppContext context) {
        this.context = context;
        return this;
    }

    public NativeObjectRef getNativeObjectHandles(){
        return nativeObjectHandle;
    }

    public BridgeEvent setNativeObjectHandles(NativeObjectRef nativeObjectHandle){
        this.nativeObjectHandle = nativeObjectHandle;
        return this;
    }

    public boolean isIntercepted() {
        return intercepted;
    }

    public BridgeEvent setIntercepted(boolean intercepted) {
        this.intercepted = intercepted;
        return this;
    }
}
