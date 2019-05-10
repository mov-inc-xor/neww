window.onload = function () {

    if (localStorage.getItem('messages') !== null) {
        let messages = JSON.parse(localStorage.getItem('messages'));
        for (let i = 0; i < messages.length; i++) {
            let message = messages[i];
            if (message[0] == 'client') addClientMsgOnDom(message[1], message[2]);
            else addConsultantMsgOnDom(message[1], message[2]);

            console.log(message);
        }
    }

    if (localStorage.getItem('chatState') === 'true') {
        widgetHeader.setChatState();
    } else if (localStorage.getItem('callState') === 'true') {
        widgetHeader.setCallState();
    } else {
        widgetHeader.setMainState();
    }
}

var widgetHeader = new Vue({
    el: '#widget-header',
    data: {
        topHeaderText: '',
        secondHeaderText: '',

        neutralState: true,
        mainState: false,
        chatState: false,
        callState: false,
    },
    methods: {
        setMainState: function() {
            widgetHeader.topHeaderText = 'Спортмастер';
            widgetHeader.secondHeaderText = 'Воспользуйтесь нашим виджетом';

            localStorage.setItem('mainState', true);
            localStorage.setItem('chatState', false);
            localStorage.setItem('callState', false);

            this.neutralState = false;
            this.mainState = true;
            this.chatState = false;
            this.callState = false;
            setTimeout(function () {
                widgetBody.showModules();
            }, 100);
            document.documentElement.scrollTop = 0;
        },
        setChatState: function() {
            widgetBody.hideModules();
            let time = (document.getElementsByClassName('module').length + 1) * widgetBody.delay;

            localStorage.setItem('mainState', false);
            localStorage.setItem('chatState', true);
            localStorage.setItem('callState', false);
            setTimeout(function () {
                widgetHeader.topHeaderText = 'Чат';
                widgetHeader.secondHeaderText = '2 консультанта (-ов) онлайн';
                widgetHeader.neutralState = false;
                widgetHeader.mainState = false;
                widgetHeader.chatState = true;
                widgetHeader.callState = false;
                setTimeout(function() { document.documentElement.scrollTop = document.documentElement.scrollHeight; }, 1);
            }, time);

        },
        setCallState: function() {
            widgetBody.hideModules();
            let time = document.getElementsByClassName('module').length * widgetBody.delay;

            localStorage.setItem('mainState', false);
            localStorage.setItem('chatState', false);
            localStorage.setItem('callState', true);
            setTimeout(function () {
                widgetHeader.topHeaderText = 'Заказать звонок';
                widgetHeader.secondHeaderText = '';
                widgetHeader.neutralState = false;
                widgetHeader.mainState = false;
                widgetHeader.chatState = false;
                widgetHeader.callState = true;
            }, time)
        }
    },
    computed: {
        headerState: function () {
            if (this.mainState) return 'mainState';
            else if (this.chatState) return 'chatState';
            else return 'callState';
        },
        widgetHeaderClass: function() {
            return {
                'widget-header-height-15': this.neutralState,
                'widget-header-height-40': this.callState,
                'widget-header-height-55': this.chatState,
                'widget-header-height-75': this.mainState,
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
        delay: 150,
        //chat
        msgContainerEmpty: true,
        //call
        countries: {
            'Россия': {
                'Код': '+7',
                'Номер': '(000) 000-00-00',
                'Сокращение': 'RUS'
            },
            'Украина': {
                'Код': '+380',
                'Номер': '00 00-00-00',
                'Сокращение': 'UKR'
            },
            'Беларусь': {
                'Код': '+375',
                'Номер': '00 00-00-00',
                'Сокращение': 'BLR'
            }
        },
        currentCountry: 'Россия',
        showCountries: false,
        checkBoxChecked: false,
        callSubmited: false,
        //poll
        options: [
             'Ассортимент',
             'Доставка',
             'Качество'
        ],
        pollSubmited: false
    },
    methods: {
        showModules: function() {
            let modules = document.getElementsByClassName('module');
            let time = widgetBody.delay;
            for (let i = 0; i < modules.length; i++) {
                setTimeout(function() {
                    modules[i].classList.remove('hide-module');
                    modules[i].classList.add('show-module');
                }, time);
                time += widgetBody.delay;
            }
        },
        hideModules: function() {
            let modules = document.getElementsByClassName('module');
            let time = widgetBody.delay;
            for (let i = modules.length - 1; i >= 0; i--) {
                setTimeout(function() {
                    modules[i].classList.remove('show-module');
                    modules[i].classList.add('hide-module');
                }, time);
                time += widgetBody.delay;
            }
        },
        //chat
        sendMsg: function() {
            beforeAddClientMsgOnDom();
        },
        msgContainerMarginControl: function() {
            let msgContainer = document.getElementById('msg-container');
            let msgPanel = document.getElementById('msg-panel');
            msgContainer.style.marginBottom = msgPanel.clientHeight + 10 + 'px';
            document.documentElement.scrollTop = document.documentElement.scrollHeight;
        },
        //call
        toggleMenuCountries: function () {
            widgetBody.showCountries = !widgetBody.showCountries;
        },
        toggleCheckBox: function() {
            widgetBody.checkBoxChecked = !widgetBody.checkBoxChecked;
        },
        toggleCallSubmit: function() {
            widgetBody.callSubmited = !widgetBody.callSubmited;
        },
        setCurrentCountry: function(key) {
            widgetBody.currentCountry = key;

            //update input name field
            let inputNumber = document.getElementById('call-number-input');
            inputNumber.value = '';
            maskNumber.mask =  widgetBody.countries[widgetBody.currentCountry]['Номер'];
            maskNumber.updateValue();
        },
        submitCall: function() {
            let fail = false;
            let inputName = document.getElementById('call-name-input'),
                inputNumber = document.getElementById('call-number-input');
            let button = document.getElementById('call-button-submit');

            if(button.classList.contains('blur-btn')) {
                return;
            }

            if (inputName.value.length <= 1) {
                inputName.parentNode.style.border = '1px solid red';
                fail = true;
            } else {
                inputName.parentNode.style.border = '1px solid #F3F3F3';
            }

            if (inputNumber.value.length != widgetBody.countries[widgetBody.currentCountry]['Номер'].length) {
                inputNumber.parentNode.style.border = '1px solid red';
                fail = true;
            } else {
                inputNumber.parentNode.style.border = '1px solid #F3F3F3';
            }

            if (!fail) {
                alert(inputName.value + ' ' + widgetBody.countries[widgetBody.currentCountry]['Код'] + ' ' + inputNumber.value);
                document.getElementById('call-check-box').checked = false;
                widgetBody.toggleCheckBox();
                widgetBody.toggleCallSubmit();
            }
        },
        //poll
        submitPoll: function(option) {
            widgetBody.pollSubmited = !widgetBody.pollSubmited;

            let submited = document.getElementById('poll-submited-container');
            submited.className = "animated fadeIn";
            //alert(option);
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

let beforeAddClientMsgOnDom = () => {
    let msgInput = document.getElementById('msg-input');
    if (isStrEmpty(msgInput.innerText)) {
        return;
    }

    let c = 0;
    let msg = msgInput.innerText.split('\n').map(function(line) {
        if (line.replace(/\s/g, '').length) return c++ ? '\n' + line.replace(/\s+/g, ' ').trim() : line.replace(/\s+/g, ' ').trim();
        else return '';
    }).join('');
    
    addClientMsgOnDom('11:67', msg);
}

(function enterAndShiftChanges() {
    let msgInput = document.getElementById('msg-input');

    msgInput.onkeypress = () => {
        if (event.keyCode == 13) {
            if (event.shiftKey==1) {
                return true;
            } else {
                beforeAddClientMsgOnDom();
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

let inputNumber = document.getElementById('call-number-input');
let maskNumber = new IMask(inputNumber, {
        mask: widgetBody.countries[widgetBody.currentCountry]['Номер']
});

let inputName = document.getElementById('call-name-input');
if (inputName !== null) {
    let maskName = new IMask(inputName, {
            mask: /^[a-zA-Zа-яА-ЯёЁ\s]{0,30}$/
    });
}
