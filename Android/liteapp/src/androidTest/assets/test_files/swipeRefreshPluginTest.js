
var mSwipeRefresh={
    enabled:true,
    color:0xffffffff,
    background:0xFF888888,
    refresh:function(){
        console.log("swipeRefreshPlugin refresh");
    },
}
__base__.triggerEvent("setSwipeRefresh", mSwipeRefresh);