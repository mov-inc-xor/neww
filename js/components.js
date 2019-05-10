var widgetHeader = new Vue({
    el: '#widget-header',
    data: {
        topHeaderText: 'Привет 👋🏻',
        secondHeaderText: 'Напишите нам или закажите бесплатный звонок',

        mainState: true,
        chatState: false,
        callState: false,
    },
    methods: {
        setMainState: function() {
            widgetHeader.topHeaderText = 'Привет 👋🏻';
            widgetHeader.secondHeaderText = 'Напишите нам или закажите бесплатный звонок';

            this.mainState = true;
            this.chatState = false;
            this.callState = false;
            document.documentElement.scrollTop = 0;
        },
        setChatState: function() {
            widgetHeader.topHeaderText = 'Чат';
            widgetHeader.secondHeaderText = 'Задайте свой вопрос здесь';

            this.mainState = false;
            this.chatState = true;
            this.callState = false;
            setTimeout(function() { document.documentElement.scrollTop = document.documentElement.scrollHeight; }, 1);
        },
        setCallState: function() {
            widgetHeader.topHeaderText = 'Заказать звонок';
            widgetHeader.secondHeaderText = 'В течение близжайшего времени с Вами свяжутся наши специалисты';

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
});

var widgetBody = new Vue({
    el: '#widget-body',
    data: {
        msgContainerEmpty: true
    },
    methods: {
        sendMsg: function() {
            sendMsg();
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
});

(function enterAndShiftChanges() {
    let msgInput = document.getElementById('msg-input');

    msgInput.onkeypress = () => {
        if (event.keyCode == 13) {
            if (event.shiftKey==1) {
                return true;
            } else {
                sendMsg();
                return false;
            }
        }
    }
})();
