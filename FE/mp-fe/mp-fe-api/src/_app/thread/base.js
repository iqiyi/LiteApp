/* @flow */

// base call for call native 
export function baseCall( eventType , data ){
  // do something here
  console.log(`[api triggerEvent] : ${eventType} , ${JSON.stringify(data)}`)
  __base__.triggerEvent( eventType , data , function(callbackId){

  });
}

