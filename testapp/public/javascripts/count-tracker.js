const { readFile, writeFile } = require('fs').promises;


const loadCount = (file_path) => {
    return readFile(file_path, 'utf-8').then((data) => {
        return parseInt(data);
    }).catch((err) => {
        console.log('Error loading count file ' + file_path);
        return 0;
    });
};

const writeCount = async (file_path, count) => {
    await writeFile(file_path, count.toString(), 'utf-8');
};

module.exports.loadCount = loadCount;
module.exports.writeCount = writeCount;