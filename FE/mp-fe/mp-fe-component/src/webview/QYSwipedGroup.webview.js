import Swiped from './scripts/Swiped';

export default {
  swipeToDelete : function(){
    console.log('swipeToDeleteInit');
    if(window.swiped){
      return;
    }
    window.swiped = Swiped.init({
      query: '.qy-swiped-group .qy-swipe_to_delete',
      list: true,
      left : 0,
      right: 80
    });
  }
}
