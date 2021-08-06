const express = require('express');
const io = require('socket.io');
const { readFile, writeFile } = require('fs').promises;

const port = process.env.PORT ?? 3000;
const count_file_path = (process.env.SHARED_DIR ?? 'lib') + '/count.txt';
const html_path = 'src/index.html';
const indexjs_path = 'src/index.js';

let view_count = 0;
let connect_count = 0;

const app = express();
const server = io(app.listen(port, () => console.log(`App available on http://localhost:${port}/app`)), {
    cors: { origin: '*'}
});

server.on('connection', socket => {
    connect_count++;
    console.log('User Connected!');
    io.emit('connect count', connect_count)
});

readFile(count_file_path, 'utf-8').then((data) => {
    view_count += parseInt(data);
    console.log('Read count as #' + view_count);
}).catch(() => {
    console.log('Could not find view count file ' + count_file_path);
});

const incrementViewCount = async () => {
    view_count++;
    await writeFile(count_file_path, view_count.toString(), 'utf-8');
};

app.get('/app', async (request, response) => {
    await incrementViewCount()
        .then(() => { console.log(`HTML Request received! #${view_count}`) });

    await readFile(html_path, 'utf-8').then(html => {
        response.send(html.replace('id="view_count">0<',`id="view_count">${view_count}<`)
            .replace('id="connect_count">0<',`id="connect_count">${connect_count}<`));
    }).catch(() => {
        console.error('Something went wrong?');
        response.status(500).send("This wasn't meant to happen?!");
    });
});

app.get('/index.js', async (request, response) => {
    await readFile(indexjs_path, 'utf-8').then(indexjs => response.send(indexjs)).catch(() => {
        console.error('Something went wrong I think?');
        response.status(500).send("This probably wasn't meant to happen?!");
    });
});

app.get('/counts', (request, response) => {
    const reply = {
        views: view_count,
        connections: connect_count
    }
    console.log('Count request recieved');
    console.log(reply)
    response.send(reply);
});