const express = require('express');
const { readFile, writeFile } = require('fs').promises;

const app = express();
const count_file_path = (process.env.SHARED_DIR || 'lib') + '/count.txt';
const html_path = 'src/index.html';
const port = process.env.PORT || 3000;
let view_count = 0;
let connect_count = 0;

readFile(count_file_path, 'utf-8').then((data) => {
    view_count += parseInt(data);
    console.log('Read count as #' + view_count);
}).catch(() => {
    console.log('Could not find view count file ' + count_file_path);
})

const incrementViewCount = async () => {
    view_count++;
    await writeFile(count_file_path, view_count.toString(), 'utf-8');
};

const server = app.listen(port, () => { console.log(`App available on http://localhost:${port}`) })
    .on('connection', (socket) => {
        connect_count++;
        socket.on('close', () => {
            connect_count--;
        })
    });

app.get('/', async (request, response) => {
    await incrementViewCount()
        .then(() => { console.log(`Request received! #${view_count}`) });

    await readFile(html_path, 'utf-8')
        .then((html) => {
            response.send(html.replace('id="view_count">0<',`id="view_count">${view_count}<`)
                .replace('id="connect_count">0<',`id="connect_count">${connect_count}<`));
        }).catch(() => {
            console.error('Something went wrong?');
            response.status(500).send("This wasn't meant to happen?!");
        });
});
