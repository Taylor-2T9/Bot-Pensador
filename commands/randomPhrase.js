const axios = require('axios')
const { JSDOM } = require('jsdom')

function setPhrasesArray(param) {
    const arrayElements = []
    for (const element of param) {
        arrayElements.push(element.innerHTML)
    }
    return arrayElements
}
async function getPhrase(page) {
    const phrase = await axios.get(`https://www.pensador.com/frases/${page}`).then(res => {
        const dom = new JSDOM(res.data)
        const phrasesElements = dom.window.document.getElementsByClassName('frase fr')
        const phrases = setPhrasesArray(phrasesElements)
        const index = Math.floor(Math.random() * 10 + 1)
        return phrases[index]
    })
    return phrase
}
module.exports.run = async (message) => {
    const page = Math.floor(Math.random() * 300 + 1)
    const phrase = await getPhrase(page)
    return message.reply(phrase)
}