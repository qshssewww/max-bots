const TelegramBot = require('node-telegram-bot-api');

const token = '6600155224:AAGRNk2AuigymlgCOEDzrvuldTVwB7pGpGY';

const bot = new TelegramBot(token, { polling: true });

let chatIds = [];

// const admins = ['Htubgi87', 'ggrrddoonn', 'kisa_mew']


function sendMessageToChats(message) {
    if (chatIds.length === 0){
        bot.sendMessage(msg.chat.id, 'список с чатами пустой!')
    }
    else {
        chatIds.forEach(chatId => {
            bot.sendMessage(chatId, message);
        });
    }
}


bot.onText(/\/sendMess (.+)/, (msg, match) => {
    if (msg.chat.username === 'Htubgi87' || msg.chat.username === 'ggrrddoonn' || msg.chat.username === 'kisa_mew'){
        const messageToSend = match[1];
        sendMessageToChats(messageToSend);
    }
});

bot.onText(/\/addGroup (.+)/, (msg, match) => {
    if (msg.chat.username === 'Htubgi87' || msg.chat.username === 'ggrrddoonn' || msg.chat.username === 'kisa_mew'){
        const index = chatIds.indexOf(match[1])
        if (index !== -1){
            bot.sendMessage(msg.chat.id, `группа ${match[1]} уже есть в списке!`)
        }
        else {
            const res = match[1].split(' ')
            chatIds = [...chatIds, ...res]
            console.log(chatIds, 'aaa')
            if (res.length > 1){
                bot.sendMessage(msg.chat.id, `группы ${match[1]} успешно добавлена`)
            }
            else {
                bot.sendMessage(msg.chat.id, `группа ${match[1]} успешно добавлена`)
            }
        }
    }
});

bot.onText(/\/removeGroup (.+)/, (msg, match) => {
    if (msg.chat.username === 'Htubgi87' || msg.chat.username === 'ggrrddoonn' || msg.chat.username === 'kisa_mew'){
        const index = chatIds.indexOf(match[1])
        if (index !== -1){
            chatIds.splice(index, 1)
            bot.sendMessage(msg.chat.id, `группа ${match[1]} успешно удалена`)
        }
        else {
            bot.sendMessage(msg.chat.id, 'такой группы нет')
        }
    }
});



bot.on('message', (msg) => {
    if (msg.text === '/start'){
        const chatId = msg.chat.id
        if (msg.chat.username === 'Htubgi87' || msg.chat.username === 'ggrrddoonn' || msg.chat.username === 'kisa_mew'){
            bot.sendMessage(chatId, '1 - добавьте бота в чат. 2 - Добавьте группу командой /addGroup @<ваша группа> (удалить /removeGroup @<ваша группа>) Для просмотра списка всех групп введите ' +
                'команду /groups. 3 - чтобы отправить сообщения введите команду /sendMess <ваше сообщение>')
        }
    }
    if (msg.text === '/groups' && (msg.chat.username === 'Htubgi87' || msg.chat.username === 'ggrrddoonn' || msg.chat.username === 'kisa_mew')){
        if (chatIds.length > 0){
            let res = ''
            chatIds.forEach(i => {
                res = res + ' ' + i
            })
            bot.sendMessage(msg.chat.id, res)
        }
        else {
            bot.sendMessage(msg.chat.id, 'список пустой')
        }
    }
});