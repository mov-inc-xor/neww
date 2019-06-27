const firstHiHeader = 'Привет';
const secondHiHeader = 'Напишите нам или закажите бесплатный звонок';

const firstChatHeader = 'Чат';
const secondChatHeader = 'Задайте свой вопрос здесь';

const firstCallHeader = 'Заказать звонок';
const secondCallHeader = '';

const STATES = {
    MAIN: 0,
    CHAT: 1,
    CALL: 2
};

let globalState = {

    firstHeader: firstHiHeader,
    secondHeader: secondHiHeader,
    state: STATES.MAIN,

    setMainState: function() {
        this.firstHeader = firstHiHeader;
        this.secondHeader = secondHiHeader;

        this.state = STATES.MAIN;

        document.documentElement.scrollTop = 0;
    },
    setChatState: function() {
        this.firstHeader = firstChatHeader;
        this.secondHeader = secondChatHeader;

        this.state = STATES.CHAT;
        setTimeout(function() { document.documentElement.scrollTop = document.documentElement.scrollHeight; }, 1);
    },
    setCallState: function() {
        this.firstHeader = firstCallHeader;
        this.secondHeader = secondCallHeader;

        this.state = STATES.CALL;
    }
};

var widgetHeader = new Vue({
    el: '#widget-header',
    data: {
        gState: globalState,
    },
    methods: {
        setMainState: function() {
            this.gState.setMainState();
        },
        setChatState: function() {
            this.gState.setChatState();
        },
        setCallState: function() {
            this.gState.setCallState();
        }
    },
    computed: {
        backButtonVisible: function () {
            return this.gState.state != STATES.MAIN;
        },
        chatCallButtonsVisible: function() {
            return this.gState.state == STATES.MAIN;
        },
        widgetHeaderClass: function() {
            return {
                'justify-space-between': this.gState.state == STATES.MAIN,
                'justify-start': this.gState.state != STATES.MAIN,
                'widget-header-chat': this.gState.state == STATES.CHAT
            }
        }
    }
});

var widgetBody = new Vue({
    el: '#widget-body',
    data: {
        msgContainerEmpty: true,
        gState: globalState
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
            return this.gState.state == STATES.MAIN;
        },
        msgPanelVisible: function() {
            return this.gState.state == STATES.CHAT;
        },
        callContainerVisible: function() {
            return this.gState.state == STATES.CALL;
        },
        msgContainerVisible: function() {
            return this.gState.state == STATES.CHAT;
        },
        offerVisible: function() {
            return this.gState.state == STATES.CHAT && this.msgContainerEmpty;
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
