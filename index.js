const express = require('express');
const { readFile, writeFile } = require('fs').promises;

const app = express();
const count_file_path = './count.txt'
let view_count = 0

readFile(count_file_path, 'utf-8').then((data) => {
    view_count += parseInt(data);
    console.log('Read count as #' + view_count);
});

const incrementViewCount = async () => {
    view_count++;
    await writeFile(count_file_path, view_count.toString(), 'utf-8')
}

app.get('/', async (request, response) => {
    await incrementViewCount()
        .then(() => { console.log('Request received! #' + view_count) });

    await readFile('./sandbox.html', 'utf-8')
        .then((html) => {
            response.send(html);
        }).catch(() => {
            console.error('Something went wrong?');
            response.status(500).send("This wasn't meant to happen?!");
        });
});

const port = process.env.PORT || 3000;
app.listen(port, () => { console.log('App available on http://localhost:' + port) });