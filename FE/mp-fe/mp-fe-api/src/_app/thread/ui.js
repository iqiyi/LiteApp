import { baseCall } from './base';

export const confirm = {
  show : params => {
    let yes = __thread__.callback.saveCallback( params.yes )
    let no = __thread__.callback.saveCallback( params.no )

    __thread__.api.webviewCall('confirm.show',{
      content : params.content,
      buttons : params.buttons,
      yes : yes,
      no : no
    })
  }
}
export const loading = {
  show : params => {
    console.log('loadingShow');
    baseCall('loading',{
      action : 'show'
    });
    //__thread__.api.webviewCall('loading.show',params)
  },
  hide : params => {
    console.log('loadingHide');
    baseCall('loading',{
      action : 'hide'
    });
    //__thread__.api.webviewCall('loading.hide',params)
  }
}

export const toast = {
  show : params => {
    __thread__.api.webviewCall('toast.show',params);
  }
}
