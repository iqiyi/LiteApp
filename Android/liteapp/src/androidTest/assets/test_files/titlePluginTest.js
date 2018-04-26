
function initConfig() {
    var TitleConfig={
        packageId: "",
        isShowTitle: true,
        text: "",
        color: -1,
        logoPath: "",
        isShowIndicator: true,
        indicatorPath: "",
        mode:-1,
        isShowMenu:false,
        menuList:[],
    };

    return JSON.parse(JSON.stringify(TitleConfig));
}

var mTitle2=initConfig();
mTitle2.isShowTitle=true;
mTitle2.packageId="new_mp_package";
mTitle2.text="设置标题";
mTitle2.logoPath="res/images/newfriend_icon@3x.png";
mTitle2.color=0xFF888888;
mTitle2.isShowIndicator=true;
mTitle2.mode=0;
mTitle2.isShowMenu=true;
mTitle2.menuList=[
{
    id:"123aww",
    text:"这是菜单选项",
    icon:"res/images/name_icon@3x.png",
},
{
    id:"dwqq11",
    text:"menu222",
    icon:"res/images/name_icon@3x.png",
},
{
    id:"dwa111",
    text:"menu333",
    icon:"res/images/name_icon@3x.png",
}
];

__base__.triggerEvent("setTitle", mTitle2,true);
