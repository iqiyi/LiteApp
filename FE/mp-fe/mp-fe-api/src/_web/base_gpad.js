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
export function baseCall_gpad( baseCall ){
    return function( eventType , data ){
        baseCall.call(this,...arguments);
        switch( eventType ){
            case 'webopen':
                location.href = data.url;
                break;
            case 'dialog':
                dialog.init(data);
                break;
            case 'popPage':
                history.go(-1);
                break;
        }
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
                ${left_button ? `<div class="gpad_dialog_btn" id="gpad_dialog_left_btn">${left_button}</div>` : ''}
                ${right_button ? `<div class="gpad_dialog_btn" id="gpad_dialog_right_btn">${right_button}</div>` : ''}
            </div>
        `
        const _style = `
            <style>
                .gpad_dialog{ position:fixed;left:50%;top:50%;transition:translate(50%,50%); }
            </style>
        `
        const dialogDom = document.createElement('div');
        dialogDom.innerHTML = `${_html}${_style}`;
        left_button && dialogDom.getElementById('gpad_dialog_left_btn').addEventListener('click',dialog_left_button_click || this.hide)
        right_button && dialogDom.getElementById('gpad_dialog_right_btn').addEventListener('click',dialog_right_button_click || this.hide)
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
