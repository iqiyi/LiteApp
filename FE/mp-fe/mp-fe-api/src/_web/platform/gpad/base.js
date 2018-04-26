/**
 *
 * Copyright 2018 iQIYI.com
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */


// gpad call
export function baseCall_gpad( eventType,data ){
    switch( eventType ){
        case 'webopen':
            location.href = data.url;
            break;
        case 'dialog':
            dialog.init(data);
            break;
    }
}

const dialog = {
    dom : null,
    init : function(data){
        const {
            title,
            content,
            left_button,
            right_button,
            dialog_left_button_click,
            dialog_right_button_click 
        } = data;
        const _html = `
            <div class="gpad_dialog">
                <header class="gpad_dialog_title">${title}</header>
                <div class="gpad_dialog_content">${content}</div>
                <div class="gpad_dialog_btn-wrap">
                    ${left_button ? `<div class="gpad_dialog_btn" id="gpad_dialog_left_btn">${left_button}</div>` : ''}
                    ${right_button ? `<div class="gpad_dialog_btn" id="gpad_dialog_right_btn">${right_button}</div>` : ''}
                </div>
            </div>
        `
        const _style = `
            <style>
                .gpad_dialog{ position:fixed;left:50%;top:50%;transform:translate(-50%,-50%);background:black;color:white; text-align:center;min-width:200px;}
                .gpad_dialog_title{font-size:18px;padding:10px;}
                .gpad_dialog_content{font-size:14px;padding:10px;text-align:left;}
                .gpad_dialog_btn-wrap{margin-top:20px;display:flex;}
                .gpad_dialog_btn{flex:1;border:1px solid red;padding:10px 0;}
            </style>
        `
        const dialogDom = document.createElement('div');
        dialogDom.innerHTML = `${_html}${_style}`;
        dialogDom.addEventListener('click',(e) => {
            if(e.target.id == 'gpad_dialog_left_btn' ){
                dialog_left_button_click ? dialog_left_button_click() : this.hide();
            }
            if(e.target.id == 'gpad_dialog_right_btn' ){
                dialog_right_button_click ? dialog_right_button_click() : this.hide();
            }
        })
        this.dom = dialogDom;
        this.show();
    },
    show : function(){
        document.body.appendChild(this.dom);
    },
    hide : function(){
        document.body.removeChild(this.dom);
    }
}


