// | ------------------------------
// |    Message Web-Component
// | ------------------------------
class Message extends HTMLDivElement {
    constructor() {
        // Always call super first in constructor
        super();

        // Element functionality written in here
        // Create a shadow root
        this.attachShadow({ mode: "open" }); // sets and returns 'this.shadowRoot'

        // Create (nested) span elements
        const user = document.createElement("p");
        user.id = "user";
        const text = document.createElement("p");
        text.id = "text";
        const time = document.createElement("span");

        // attach the created elements to the shadow DOM
        this.shadowRoot.append(user);
        this.shadowRoot.append(text);
        this.shadowRoot.append(time);

        // Apply external styles to the shadow DOM
        const linkElem = document.createElement("link");
        linkElem.setAttribute("rel", "stylesheet");
        linkElem.setAttribute("href", "chatMessageStyle.css");

        // Attach the created element to the shadow DOM
        this.shadowRoot.appendChild(linkElem);
    }

    connectedCallback(elem) {
        const shadow = this.shadowRoot;

        const user = shadow.querySelector("#user");
        user.innerText = this.getAttribute("user");

        const p = shadow.querySelector("#text");
        p.innerText = this.getAttribute("messageText");

        const span = shadow.querySelector("span")
        span.innerText = this.getAttribute("time");
        span.setAttribute("class", "time-right");
    }

}

customElements.define("chat-message", Message, { extends: "div" });

//define constants
const button = document.getElementById("button");
const input = document.getElementById("message");
const user = document.getElementById("user");
const scrollContainer = document.getElementById("scrollContainer");
const errorMessage = document.getElementById("errorMessage");

//create web-socket
var HOST = location.origin.replace(/^http/, 'ws')
const ws = new WebSocket(HOST);

//add event listeners
ws.addEventListener("open", () => {
    console.log("We are connected");
});

ws.addEventListener('message', function (event) {
    let data = JSON.parse(event.data);
    let time = new Date();

    const message = document.createElement("div", { is: "chat-message" });
    message.setAttribute("messageText", data.message);
    message.setAttribute("time", time.toLocaleString());
    message.setAttribute("user", data.user);
    if(data.user.localeCompare(user.value)){
        message.setAttribute("class", "container darker");
    }else{
        message.setAttribute("class", "container");
    }
    
    scrollContainer.insertBefore(message, scrollContainer.firstChild);
});

button.addEventListener("click", () => {
    if(user.value === "" && input.value === ""){
        errorMessage.innerText = "Bitte Name und Nachricht angeben :-)";
        return;
    }
    if(user.value === ""){
        errorMessage.innerText = "Bitte Name angeben :-)";
        return;
    }
    if(input.value === ""){
        errorMessage.innerText = "Bitte Nachricht eingeben :-)";
        return
    }
    errorMessage.innerText = "";
    let message = {
        "message": input.value,
        "user": user.value
    }
    ws.send(JSON.stringify(message));
    input.value = "";
})