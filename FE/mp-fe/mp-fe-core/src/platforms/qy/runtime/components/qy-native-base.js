/* @flow */

import * as nativeOps from '../../bridge/qnode-ops.native';
import { isDef , isUndef } from 'shared/util'

export default {
  props : ['hover','nativeTag','nativeData'],
  name : 'QYNativeBase',
  mounted : function(){
    nativeOps.createNative({
      _uid : this._vnode.elm._uid,
      nativeTag : this.nativeTag,
      hover : isDef(this.hover) ? true : false,
      data : this.nativeData || {}
    });
    this.$watch('nativeData',()=>{
      nativeOps.removeNative({
        _uid : this._vnode.elm._uid
      })
      nativeOps.createNative({
        _uid : this._vnode.elm._uid,
        nativeTag : this.nativeTag,
        hover : isDef(this.hover) ? true : false,
        data : this.nativeData || {}
      });
    })
  },
  destroyed : function(){
    nativeOps.removeNative({
      _uid : this._vnode.elm._uid
    })
  },
  render : function( _c ){
    return _c('div',{class:'qy-native-component',attrs:{data:JSON.stringify(this.nativeData)}});
  },
  updated : function(){
      debugger;
  }
}
