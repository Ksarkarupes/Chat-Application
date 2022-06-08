const socket = io('http://localhost:8000');

const form = document.getElementById('send-form');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector('.container');
var audio = new Audio('noti.mp3');

const append = (message, positions)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(positions);
    messageContainer.append(messageElement);
    if(positions == 'left'){
        audio.play();
    }
}
form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send',message);
    messageInput.value='';
})
const name = window.prompt("Enter your name: ");
socket.emit('new-user-joined', name);

socket.on('user-joined', name=>{
append(`${name} joined the chat`, 'left');
})

socket.on('recieve', data=>{
    append(`${data.name}: ${data.message}`, 'left');
})

socket.on('leave', name=>{
    append(`${name} left the chat`, 'left');
})