let msgTime = '12:32', msgText = 'qweqwe';
let messages = [];
let addConsultantMsgOnDom = (msgTime, msgText) => {
        let msgContainer = document.getElementById('msg-container');

        let div = document.createElement('div');
        div.className = 'msg consultant-msg';

        let time = document.createElement('span');
        time.className = 'time';
        time.innerText = msgTime;

        let msg = document.createElement('p');
        msg.className = 'semilight color-dark-blue';
        msg.innerText = msgText;

        div.appendChild(time);
        div.appendChild(msg);

        msgContainer.appendChild(div);

        widgetBody.msgContainerEmpty = false;

        widgetBody.msgContainerMarginControl();

        messages.push(['consultant', msgTime, msgText]);
        localStorage.setItem('messages', JSON.stringify(messages));
}

document.addEventListener('keydown', function(e) {
    if (e.keyCode == 83) addConsultantMsgOnDom(msgTime, msgText);
})

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

    messages.push(['client', time.innerText, msg.innerText]);
    localStorage.setItem('messages', JSON.stringify(messages));
};
