const express = require('express')
const app = express()
const axios = require('axios');
const bodyParser = require('body-parser');
const port = 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const vowels = ['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U']

function translateNormal(text) {
    let translatedText = ''
    for (let i = 0; i < text.length; i++) {
        let e = text[i]
        if (vowels.includes(e) || !(/[a-zA-Z]/).test(e)) {
            translatedText += e
        } else {
            translatedText += e + 'o' + e
        }
    }
    return translatedText;
}

function translateRovarsprak(text) {
    let translatedText = ''
    for (let i = 0; i < text.length; i++) {
        let e = text[i]
        if (vowels.includes(e) || !(/[a-zA-Z]/).test(e)) {
            translatedText += e
        } else {
            translatedText += e
            i += 2
        }
    }
    return translatedText;
}

app.post('/translate/normal', (req, res) => {
    const { text } = req.body
    const result = translateNormal(text.trim())
    res.send(result)
})

app.post('/translate/rovarsprak', (req, res) => {
    const { text } = req.body
    const result = translateRovarsprak(text.trim())
    res.send(result)
})

app.post('/translate/joke', (req, res) => {
    let defaultUrl = "https://v2.jokeapi.dev/joke/Any?type=single"
    let { url } = req.body
    if (url) {
        defaultUrl = url
    }

    axios
        .get(defaultUrl)
        .then(response => {
            const { joke } = response.data;
            const result = translateNormal(joke.trim())
            res.send(result)
        })
        .catch(error => {
            console.error(error);
        });
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})