
const counters = {
    views: document.querySelector('#view_count'),
    connections: document.querySelector('#connect_count')
}
const counts_url = 'counts/'

function updateCounterText(counter, count) {
    counter.innerText = `${count}`;
};

function updateCounters(counters, counts) {
    updateCounterText(counters.views, counts.views)
    updateCounterText(counters.connections, counts.connections)
}

function getCounts(request_url, counter) {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            console.table(request_url, xhr.response);
            updateCounters(counters, xhr.response);
        }
    }

    xhr.open('GET', request_url);
    xhr.send();
};


setInterval(() => getCounts(counts_url, counters), 1000*5);