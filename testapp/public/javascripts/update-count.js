const socket = io('ws://localhost:8080');
const counters = {
    views: document.querySelector('#view_count'),
    connections: document.querySelector('#connect_count')
}

socket.on('update', (counts) => {
    console.log(counts);
    counters.views.innerText = counts.views;
    counters.connections.innerText = counts.connections;
});