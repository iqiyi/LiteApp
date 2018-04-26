import Cookies from "./scripts/Cookies";

export function getAppData(){
  console.log('[api getAppData]')
  return {
    baselineInfo:{
      version : '1.0',
      authcookie : Cookies.get('P00001'),
      qypid : '02032001010000000000'
    }
  }
}

