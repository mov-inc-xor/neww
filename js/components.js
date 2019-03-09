var widgetHeader = new Vue({
    el: '#widget-header',
    data: {
        topHeaderText: 'Спортмастер',
        secondHeaderText: 'Воспользуйтесь нашим виджетом',

        mainState: true,
        chatState: false,
        callState: false,
    },
    methods: {
        setMainState: function() {
            widgetHeader.topHeaderText = 'Спортмастер';
            widgetHeader.secondHeaderText = 'Воспользуйтесь нашим виджетом';

            this.mainState = true;
            this.chatState = false;
            this.callState = false;
            document.documentElement.scrollTop = 0;
        },
        setChatState: function() {
            widgetHeader.topHeaderText = 'Чат';
            widgetHeader.secondHeaderText = '2 консультанта (-ов) онлайн';

            this.mainState = false;
            this.chatState = true;
            this.callState = false;
            setTimeout(function() { document.documentElement.scrollTop = document.documentElement.scrollHeight; }, 1);
        },
        setCallState: function() {
            widgetHeader.topHeaderText = 'Заказать звонок';
            widgetHeader.secondHeaderText = '';

            this.mainState = false;
            this.chatState = false;
            this.callState = true;
        }
    },
    computed: {
        widgetHeaderClass: function() {
            return {
                'justify-space-between': this.mainState,
                'justify-start': !this.mainState,
                'widget-header-chat': this.chatState
            }
        }
    }
})

var widgetBody = new Vue({
    el: '#widget-body',
    data: {
        msgContainerEmpty: true
    },
    methods: {
        sendMsg: function() {
            addClientMsgOnDom();
        },
        msgContainerMarginControl: function() {
            let msgContainer = document.getElementById('msg-container');
            let msgPanel = document.getElementById('msg-panel');
            msgContainer.style.marginBottom = msgPanel.clientHeight + 10 + 'px';
            document.documentElement.scrollTop = document.documentElement.scrollHeight;
        }
    },
    computed: {
        modulesVisible: function() {
            return widgetHeader.mainState;
        },
        msgPanelVisible: function() {
            return widgetHeader.chatState;
        },
        callContainerVisible: function() {
            return widgetHeader.callState;
        },
        msgContainerVisible: function() {
            return widgetHeader.chatState;
        },
        offerVisible: function() {
            return widgetHeader.chatState && this.msgContainerEmpty;
        }
    }
})

let addClientMsgOnDom = () => {
    let msgContainer = document.getElementById('msg-container');
    let msgInput = document.getElementById('msg-input');

    if (isStrEmpty(msgInput.innerText)) {
        return;
    }

    let div = document.createElement('div');
    div.className = 'msg client-msg';

    let time = document.createElement('span');
    time.className = 'time';
    time.innerText = '11:11';

    let msg = document.createElement('p');
    msg.className = 'semilight color-dark-blue';
    msg.innerText = msgInput.innerText.trim();

    div.appendChild(time);
    div.appendChild(msg);

    msgContainer.appendChild(div);

    msgInput.innerText = '';

    widgetBody.msgContainerEmpty = false;

    widgetBody.msgContainerMarginControl();
}

(function enterAndShiftChanges() {
    let msgInput = document.getElementById('msg-input');

    msgInput.onkeypress = () => {
        if (event.keyCode == 13) {
            if (event.shiftKey==1) {
                return true;
            } else {
                addClientMsgOnDom();
                return false;
            }
        }
    }
})();

let isStrEmpty = (str) => {
    if (str != null && typeof str !== "undefined") {
       str = str.trim();
    }

    if (!str) {
       return true;
    }

    return false;
}
