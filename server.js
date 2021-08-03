const express = require('express');
const { readFile, writeFile } = require('fs').promises;

const app = express();
const count_file_path = './count.txt';
const port = process.env.PORT || 3000;
let view_count = 0;

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

app.get('/', async (request, response) => {
    await incrementViewCount()
        .then(() => { console.log(`Request received! #${view_count}`) });

    await readFile('./index.html', 'utf-8')
        .then((html) => {
            response.send(html.replace(`id="count">0<`,`id="count">${view_count}<`));
        }).catch(() => {
            console.error('Something went wrong?');
            response.status(500).send("This wasn't meant to happen?!");
        });
});

app.listen(port, () => { console.log(`App available on http://localhost:${port}`) });