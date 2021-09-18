const { Client, Intents } = require('discord.js')
const bot = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.GUILD_MESSAGES ] })
const config = require('../config.json')

bot.login('Your_Token')

console.log('Estou pronto!')

bot.on('messageCreate', async message => {
    if (message.content.startsWith(config.prefix)) {
        const args = message.content.slice(1).split(' ')
        const chosenAuthor = args[0]
        if (chosenAuthor === 'random') {
            try {
                const commandFile = require('../commands/randomPhrase.js')
                delete require.cache[require.resolve('./commands/randomPhrase.js')]
                return (commandFile.run(message))
            }
            catch (error) {
                console.log('Erro: ' + error)
            }
        } else {
            try {
                const commandFile = require('../commands/searchAuthor.js')
                delete require.cache[require.resolve('./commands/searchAuthor.js')]
                return (commandFile.run(message, args))
            } catch (error) {
                console.log('Erro: ' + error)
            }
        }   
    } else if (message.content.includes('O Pensador')){
        message.channel.send('Quem me chamou?')
    } else {
        return
    }
})

