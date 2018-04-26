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
package com.iqiyi.halberd.liteapp.event.impl;

import android.content.Context;

import com.iqiyi.halberd.liteapp.context.LiteAppContext;
import com.iqiyi.halberd.liteapp.context.LiteAppPage;
import com.iqiyi.halberd.liteapp.event.BridgeEvent;
import com.iqiyi.halberd.liteapp.event.IBridgeEventListener;
import com.iqiyi.halberd.liteapp.event.IEventBridge;
import com.iqiyi.halberd.liteapp.export.NativeContextRef;
import com.iqiyi.halberd.liteapp.utils.LogUtils;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

/**
 * Created by eggizhang@qiyi.com on 2017/7/17.
 * Using this web view bridge to communicate with web view
 */
public class EventBridgeImpl implements IEventBridge {
    private HashMap<String,List<IBridgeEventListener>> globalListenerMap = new HashMap<>();

    public static EventBridgeImpl getInstance(){
        return Host.instance;
    }
    private static final String TAG = EventBridgeImpl.class.getName();

    @Override
    public void registerBridgeListener(String eventType, IBridgeEventListener listener, LiteAppContext context) {
        if(context == null) {
            List<IBridgeEventListener> list;
            if (!globalListenerMap.containsKey(eventType)) {
                list = new ArrayList<>();
                globalListenerMap.put(eventType, list);
            } else {
                list = globalListenerMap.get(eventType);
            }
            list.add(listener);
        } else {
            context.registerLocalEventListener(eventType, listener);
        }
    }

    @Override
    public void triggerEvent(BridgeEvent event) {
        LogUtils.log(LogUtils.LOG_MINI_PROGRAM_EVENT,
                LogUtils.EVENT_TYPE+" "+  event.getType() + " "+ "isLocal: " +event.isLocal());

        if(!event.isLocal()){
            //trigger events in context map
            for(int i = 0; i < NativeContextRef.getContextMap().size(); i++) {
                LiteAppContext item = NativeContextRef.getContextMap().valueAt(i);
                BridgeEvent copiedEvent = new BridgeEvent();
                copiedEvent.setLocal(false);
                copiedEvent.setData(event.getData());
                copiedEvent.setType(event.getType());
                copiedEvent.setContext(item);
                copiedEvent.setNativeObjectHandles(event.getNativeObjectHandles());
                triggerLocalEvent(item, event);
                // trigger global events listeners for event times
                List<IBridgeEventListener> listenerList = globalListenerMap.get(event.getType());
                if(listenerList!=null){
                    boolean intercepted = event.isIntercepted();
                    for(IBridgeEventListener itemListener: listenerList){
                        if(itemListener.interceptEvent(event)){
                            intercepted = true;
                        }
                    }
                    event.setIntercepted(intercepted);
                    if(!intercepted){
                        for(IBridgeEventListener itemListener: listenerList){
                            itemListener.onEvent(event);
                        }
                    }
                }
            }
        } else {
            triggerLocalEvent(event.getContext(), event);
            // trigger global listeners
            List<IBridgeEventListener> listenerList = globalListenerMap.get(event.getType());
            if(listenerList!=null){
                boolean intercepted = event.isIntercepted();
                for(IBridgeEventListener item: listenerList){
                    if(item.interceptEvent(event)){
                        intercepted = true;
                    }
                }
                event.setIntercepted(intercepted);
                if(!intercepted){
                    for(IBridgeEventListener item: listenerList){
                        item.onEvent(event);
                    }
                }
            }
        }
    }

    private void triggerLocalEvent(LiteAppContext context, BridgeEvent event){
        //go back and trigger container event
        if (context == null) {
            return;
        }
        //trigger local events
        context.triggerEvent(event);

        if (context.getType() == LiteAppContext.CONTEXT_TYPE_PAGE) {
            ((LiteAppPage) context).getContainer().onEvent(event);
        }
    }

    private static class Host{
        private final static EventBridgeImpl instance = new EventBridgeImpl();
    }
    private EventBridgeImpl(){}
}
