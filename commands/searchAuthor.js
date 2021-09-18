const axios = require('axios')
const { JSDOM } = require('jsdom')

function setPhrasesArray(param) {
    const arrayElements = []
    for (const element of param) {
        arrayElements.push(element.innerHTML)
    }
    return arrayElements
}
async function getPhrase(chosenAuthor, page) {
    const phrase = await axios.get(`https://www.pensador.com/${chosenAuthor}/${page}`).then(res => {
        const dom = new JSDOM(res.data)
        const phrasesElements = dom.window.document.getElementsByClassName('frase fr')
        const phrases = setPhrasesArray(phrasesElements)
        const index = Math.floor(Math.random() * 10 + 1)
        return phrases[index]
    })
    return phrase
}
module.exports.run = async (message, args) => {
    const chosenAuthor = args[1] ? `${args[0]}_${args[1]}` : args[0]
    const page = Math.floor(Math.random() * 5 + 1)
    try {
        const phrase = await getPhrase(chosenAuthor, page)
        return message.reply(phrase)
    } catch (error) {
        /* Se a pesquisa não resultar em mais de uma página, a busca pode falhar.
        Nesse caso, uma nova busca apenas na primeira página vai acontecer. */
        const newPage = 1
        const phrase = await getPhrase(chosenAuthor, newPage)
        return message.reply(phrase)
    }
}