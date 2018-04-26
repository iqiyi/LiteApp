
var mStorage={
packageId:"liteIqiyi",
key:"hehe",
data:"aaaaaaaaaaaaaaaaaaaaaa",
sync:false,
action:"insert",
success:function(){
    console.log("storagePlugin success");
},
fail:function(){
    console.log("storagePlugin fail");
},
complete:function(){
    console.log("storagePlugin complete");
},
}
__base__.triggerEvent("storage", mStorage);

//var mStorage2={
//packageId:"liteIqiyi222",
//key:"hehe2",
//data:"ccccccccccccc",
//sync:false,
//action:"insert",
//}
//__base__.triggerEvent("storage", mStorage2);

//var mStorage3={
//packageId:"liteIqiyi222",
//key:"hehe2",
//sync:false,
//action:"delete",
//}
//__base__.triggerEvent("storage", mStorage3);
