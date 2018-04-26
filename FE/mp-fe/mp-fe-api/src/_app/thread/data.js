import { isUndef } from '../../util/index';

export function getAppData(){
  if( typeof baselineInfo === 'undefined' || typeof userInfo === 'undefined' ){
    console.log('[thread api getAppData] no baselineInfo or userInfo,try __app__data')
    if(typeof __app__data !== 'undefined'){
      console.log('[thread api getAppData]' + JSON.stringify(__app__data))
      return __app__data;
    }else{
      throw new Error('[thread api getAppData] no __app__data')
    }
  }else{
    console.log('[thread api getAppData]' + JSON.stringify({baselineInfo,userInfo}))
    return {
      baselineInfo,userInfo
    }
  }
}
