
var mNetwork={
url:"https://www.iqiyi.com",
method:"GET",
success:function(s){
    console.log("network success "+s);
},
fail:function(s){
    console.log("network fail "+s);
},
}

__base__.triggerEvent("network", mNetwork);