
const view_counter = document.querySelector('#view_count');
const connections_counter = document.querySelector('#connect_count');
const counts_url = 'counts/'

function updateCounter(counter, count) {
    counter.innerText = `${count}`;
};

function getCount(request_url, counter) {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            console.log(request_url, xhr.response.count);
            updateCounter(counter, xhr.response.count);
        }
    }

    xhr.open('GET', request_url);
    xhr.send();
};


setInterval(() => getCount(counts_url + 'views', view_counter), 1000*5);
setInterval(() => getCount(counts_url + 'connections', connections_counter), 1000*5);