'use strict;'

let channel = 'widget';

let msgWs = new WebSocket('ws://localhost:8000/msg');

let dialogId = 0;

msgWs.onmessage = (e) => {
    let msg = JSON.parse(e.data);
    dialogId = msg.dialog_id
    addConsultantMsgOnDom(msg.time, msg.text);
};

let addClientMsgOnDom = (mTime, mText) => {
    let msgContainer = document.getElementById('msg-container');
    let msgInput = document.getElementById('msg-input');

    let div = document.createElement('div');
    div.className = 'msg client-msg';

    let time = document.createElement('span');
    time.className = 'time';
    time.innerText = mTime;

    let msg = document.createElement('p');
    msg.className = 'semilight color-dark-blue';
    msg.innerText = mText;

    div.appendChild(time);
    div.appendChild(msg);

    msgContainer.appendChild(div);

    msgInput.innerText = '';

    widgetBody.msgContainerEmpty = false;

    widgetBody.msgContainerMarginControl();
};

let sendMsg = () => {
    let msgInput = document.getElementById('msg-input');

    if (isStrEmpty(msgInput.innerText)) {
        return;
    }

    let msgText = msgInput.innerText.trim();

    let date = new Date();
    var options = {
        timezone: 'UTC',
        hour: 'numeric',
        minute: 'numeric',
    };
    let time = date.toLocaleString("ru", options);

    msgWs.send(JSON.stringify({
        channel: channel,
        text: msgText,
        time: time,
        dialog_id: dialogId
    }));

    addClientMsgOnDom(time, msgText);
};

let addConsultantMsgOnDom = (msgTime, msgText) => {
    let msgContainer = document.getElementById('msg-container');

    let div = document.createElement('div');
    div.className = 'msg consultant-msg';

    let time = document.createElement('span');
    time.className = 'time left-10';
    time.innerText = msgTime;

    let msg = document.createElement('p');
    msg.className = 'semilight color-dark-blue';
    msg.innerText = msgText;

    div.appendChild(time);
    div.appendChild(msg);

    msgContainer.appendChild(div);

    widgetBody.msgContainerEmpty = false;

    widgetBody.msgContainerMarginControl();

    var audio = new Audio();
    audio.preload = 'auto';
    audio.src = 'income_msg.mp3';
    audio.play();
};

let isStrEmpty = (str) => {
    if (str != null && typeof str !== "undefined") {
       str = str.trim();
    }

    if (!str) {
       return true;
    }

    return false;
};
