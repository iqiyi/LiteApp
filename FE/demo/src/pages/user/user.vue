<template>
    <div class="container" :style="style['container']">
        <div class="m-box-my" :style="style['m-box-my']">
            <div class="c-login-pic" :style="style['c-login-pic']">
                <img class="c-not-login_pic" :style="style['c-not-login_pic']" :src="require('res/images/user-not-login.png')"/>
            </div>
            <div class="c-user-login_box" :style="style['c-user-login_box']">
                <div class="c-user-login_btn" :style="style['c-user-login_btn']">微信登录</div>
            </div>
        </div>
        <div class="m-box-my" :style="style['m-box-my']">
            <div class="m-title" :style="style['m-title']">
                <span class="m-title_h" :style="style['m-title_h']">播放历史</span>
            </div>
            <div class="m-list-text" :style="style['m-list-text']">
                <div class="m-list-text-items" :style="style['m-list-text-items']">
                    <div class="m-list-text-items-nolog" :style="style['m-list-text-items-nolog']">
                        <span>暂无播放记录</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="m-box-my" :style="style['m-box-my']">
            <div class="m-from-user-contact" :style="style['m-from-user-contact']">
                <div class="m-from-user-contact_btn" :style="style['m-from-user-contact_btn']">设置</div>
                <div class="m-from-user-contact_link" :style="style['m-from-user-contact_link']">
                    <image class="c-icon-more" :style="style['c-icon-more']" :src="require('res/images/c-icon-arrow.png')" />
                </div>
            </div>
        </div>
        <div style="position:fixed;width:100%;height:100%;left:0;top:0;">
            <div style="width:100%;height:100%;background:rgba(0,0,0,.6);"></div>
            <div style="width:100%;color:#fff;position:absolute;left:0;top:45%;text-align:center;font-size:2rem;">功能开发中～敬请期待～</div>
        </div>
    </div>
</template>
<script>
export default {
    data : function(){
        return {
            style : style
        }
    }
}

const style = {
    'container' : ' position:absolute; top:0; bottom:0; left:0; right:0; display:block; height:100%; flex-direction:column; align-items:center; justify-content:space-between; box-sizing:border-box; background-color:#fafafa; ',
    'm-box-my' : ' margin-top:1rem; background-color:#fff; display:block; width:100%; ',
    'c-login-pic' : ' font-size:0; ',
    'c-not-login_pic' : ' margin-left:50%; transform:translateX(-50%); width:8rem; height:8rem; border-radius:50%; margin-top:3rem; ',
    'c-user-login_box' : ' display:inline-block; overflow:hidden; margin:2rem 0 3rem;margin-left:50%; transform:translateX(-50%);  ',
    'c-user-login_btn' : ' width:15rem; height:4.5rem; line-height:4.5rem; border-radius:2.25rem; background-color:#0bbe06; color:#fff; font-size:1.5rem; text-align:center; ',
    'm-box-my' : ' margin-top:1rem; background-color:#fff; display:block; width:100%; ',
    'm-title' : ' width:100%; height:6rem; box-sizing:border-box; padding:2.25rem 1rem; display:-webkit-flex; display:flex; justify-content:space-between; font-size:1.5rem; line-height:1.5rem; color:#333; ',
    'm-title_h' : ' display:block; font-weight:700; -webkit-box-flex:1; box-flex:1; ',
    'm-list-text' : ' padding:.75rem 1rem; border-top:1px solid #f0f0f0; ',
    'm-list-text-items' : ' display:flex; ',
    'm-list-text-items-nolog' : ' font-size:1.4rem; color:#999; flex:1; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; line-height:3.9rem; ',
    'm-box-my' : ' margin-top:1rem; background-color:#fff; display:block; width:100%; ',
    'm-from-user-contact' : ' position:relative; ',
    'm-from-user-contact_btn' : ' text-align:left; background-color:#fff; width:100%; height:6rem; box-sizing:border-box; padding:2.25rem 1rem; display:-webkit-flex; display:flex; justify-content:space-between; font-size:1.5rem; line-height:1.5rem; color:#333; border:none; font-weight:700; ',
    'm-from-user-contact_link' : ' position:absolute; top:1.75rem; right:10px; ',
    'c-icon-more' : ' margin-top:-.05rem; display:inline-block; width:1.5rem; height:1.5rem; vertical-align:middle; '
}
</script>
