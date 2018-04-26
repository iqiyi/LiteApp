
var mTitle2={
isShowTitle:true,
packageId:"new_mp_package",
text:"hehe",
logoPath:"res/images/newfriend_icon@3x.png",
color:0xFF888888,
isShowIndicator:true,
mode:0,
isShowMenu:true,
menuList:[
{
    id:"1111",
    text:"1111",
    icon:"res/images/name_icon@3x.png",
},
{
    id:"222",
    text:"2222",
    icon:"res/images/name_icon@3x.png",
},
{
    id:"3333",
    text:"3333",
    icon:"res/images/name_icon@3x.png",
}
]
};

__base__.triggerEvent("setTitle", mTitle2,false);

var load={
action:"show",
cancelable:true,
};
__base__.triggerEvent("loading", load);
