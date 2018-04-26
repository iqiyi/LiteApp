/* @flow */
import {
  makeMap
} from 'shared/util';
import { getElm } from './elm-ops';
import { callThreadEvent } from '../event/bridge';
import { FilteredEvent } from '../event/FilteredEvent';

export function addEvent( qnode ){
  let elm = getElm( qnode );
  const callbackHandler = function(e){
    callThreadEvent(qnode,qnode.event,new FilteredEvent(e))
  }
  elm.addEventListener( qnode.event , callbackHandler );
}

export function removeEvent( qnode , event  ){
  let elm = getElm( qnode );
  elm.removeEventListener( event );
}
