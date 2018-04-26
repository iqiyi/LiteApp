import { extend } from '../../util/index';

export const confirm = {
  show : params => {
    console.info('confirm',params)
  }
}
export const loading = {
  show(params = {}){
    extend(
      (
        window.loadingDom = window.loadingDom || document.createElement('div')
      ),
      {
        className : `${params.className || 'qy-loading'}`,
        textContent : params.content || '',
      }
    )
    document.body.appendChild(window.loadingDom);
  },
  hide(params){
    console.log('loadingHide');
    if(window.loadingDom){
      window.loadingDom.parentNode.removeChild(window.loadingDom);
      window.loadingDom = null;
    }
  }
}

export const toast = {
  show : params => {
    extend(
      (
        window.toastDom = window.toastDom || document.createElement('div')
      ),
      {
        className : `${params.className || 'qy-toast'}`,
        textContent : params.content || '',
      }
    )
    document.body.appendChild(window.toastDom);

    setTimeout(()=>{
      window.toastDom.parentNode.removeChild(window.toastDom); 
    },params.duration || 3000)
  }
}
