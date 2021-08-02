const { readFile } = require('fs').promises;
const express = require('express');

const app = express()

app.get('/', async (request, response) => {
    console.log('Request received!');
    await readFile('./sandbox.html', 'utf-8')
        .then((html) => {
            response.send(html);
        })
        .catch(() => {
            console.error('Something went wrong?');
            response.status(500).send('Well that was unexpected!');
        });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('App available on http://localhost:' + port));