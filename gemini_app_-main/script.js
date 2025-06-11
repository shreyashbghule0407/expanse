const chatList = document.querySelector(".chat-list");



const typeText = (element, text, speed = 50) => {
    let index = 0;
    const intervalId = setInterval(() => {
        if (index < text.length) {
            element.innerText += text.charAt(index);
            index++;
        } else {
            clearInterval(intervalId);
        }
    }, speed);
};


document.getElementById('chat-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the form from submitting immediately

    // Show loader
    document.getElementById('chat-loader').style.display = 'flex';

    // Simulate waiting for a response
    setTimeout(function () {
        // Hide loader
        document.getElementById('chat-loader').style.display = 'none';

        // You can add code here to handle the actual form submission or response
    }, 3000); // Adjust the time as needed for your simulation
});

let userMessage = null;

const API_KEY = `AIzaSyCtaac7T9O732arGG_ouNKlX5IoJu65gtA`;

const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

const showLoadingAnimation = () => {
    const html = `
        <div class="message-content">
            <img src="OIP.jpeg" alt="user" class="avatar avatar-spinning">
            <p class="text"></p>
            <div class="chat-loader">
                <div class="loader-wrapper">
                    <div class="loader-line"></div>
                    <div class="loader-line"></div>
                    <div class="loader-line"></div>
                </div>
            </div>
            <span class="icon material-symbols-rounded">content_copy</span>
        </div>`;

    const incomingMessageDiv = createMessageElement(html, "incoming", "loading");

    chatList.appendChild(incomingMessageDiv);
    generateAPIResponse(incomingMessageDiv);
};


const createMessageElement = (content, ...classes) => {
    const div = document.createElement("div");
    div.classList.add("message", ...classes);
    div.innerHTML = content;
    return div;
};

const generateAPIResponse = async (incomingMessageDiv) => {
    const textElement = incomingMessageDiv.querySelector('.text');
    const loaderElement = incomingMessageDiv.querySelector('.chat-loader');
    const avatarElement = incomingMessageDiv.querySelector('.avatar');

    console.log("Starting API request...");

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{
                    role: "user",
                    parts: [{ text: userMessage }]
                }]
            })
        });

        const data = await response.json();

        console.log("API response received:", data);

        const apiResponse = data?.candidates[0].content.parts[0].text;

        // Apply typing effect to the response
        typeText(textElement, apiResponse);
    } catch (error) {
        console.log("API error:", error);
        textElement.innerText = "Error fetching response";
    } finally {
        // Hide or remove the loader and stop spinning animation
        if (loaderElement) {
            loaderElement.style.display = 'none';
        } else {
            console.error("Loader element not found");
        }
        if (avatarElement) {
            avatarElement.classList.remove('avatar-spinning');
        }
        incomingMessageDiv.classList.remove('loading');
    }
};


const handleOutgoingChat = () => {
    userMessage = typingForm.querySelector(".typing-input").value.trim();
    if (!userMessage) return;

    const html = `
        <div class="message-content">
            <img src="download (1).jpeg" alt="user" class="image-avatar">
            <p class="text"></p>
        </div>`;

    const outgoingMessageDiv = createMessageElement(html, "outgoing");
    outgoingMessageDiv.querySelector(".text").innerText = userMessage;
    chatList.appendChild(outgoingMessageDiv);
    typingForm.reset();

    setTimeout(showLoadingAnimation, 500);
};

const typingForm = document.querySelector('.typing-form');

typingForm.addEventListener("submit", (e) => {
    e.preventDefault();
    handleOutgoingChat();
});














// ===============================================================================================================================================================












// const chatList = document.querySelector(".chat-list");

// document.getElementById('chat-form').addEventListener('submit', function (event) {
//     event.preventDefault(); // Prevent the form from submitting immediately

//     // Show loader
//     document.getElementById('chat-loader').style.display = 'flex';

//     // Simulate waiting for a response
//     setTimeout(function () {
//         // Hide loader
//         document.getElementById('chat-loader').style.display = 'none';

//         // You can add code here to handle the actual form submission or response
//     }, 3000); // Adjust the time as needed for your simulation
// });

// let userMessage = null;

// const API_KEY = `AIzaSyBeO1zvSnc0u04Tcb8arO3xa-671czDHJU`;

// const API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${API_KEY}`;

// const showLoadingAnimation = () => {
//     const html = `
//         <div class="message-content">
//             <img src="OIP.jpeg" alt="user" class="avatar">
//             <p class="text"></p>
//             <div class="chat-list">
//                 <div id="chat-loader" class="chat-loader">
//                     <div class="loader-wrapper">
//                         <div class="loader-line"></div>
//                         <div class="loader-line"></div>
//                         <div class="loader-line"></div>
//                     </div>
//                 </div>
//             </div>
//             <span class="icon material-symbols-rounded">content_copy</span>
//         </div>`;

//     const incomingMessageDiv = createMessageElement(html, "incoming", "loading");

//     chatList.appendChild(incomingMessageDiv);
//     generateAPIResponse(incomingMessageDiv);
// };

// const createMessageElement = (content, ...classes) => {
//     const div = document.createElement("div");
//     div.classList.add("message", ...classes);
//     div.innerHTML = content;
//     return div;
// };

// const generateAPIResponse = async (incomingMessageDiv) => {
//     const textElement = incomingMessageDiv.querySelector('.text');

//     try {
//         const response = await fetch(API_URL, {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({
//                 contents: [{
//                     role: "user",
//                     parts: [{ text: userMessage }]
//                 }]
//             })
//         });

//         const data = await response.json();

//         const apiResponse = data?.candidates[0].content.parts[0].text;

//         textElement.innerText = apiResponse;
//     } catch (error) {
//         console.log(error);
//     } finally {
//         incomingMessageDiv.classList.remove('loading');
//     }
// };

// const handleOutgoingChat = () => {
//     userMessage = typingForm.querySelector(".typing-input").value.trim();
//     if (!userMessage) return;

//     const html = `
//         <div class="message-content">
//             <img src="download (1).jpeg" alt="user" class="image-avatar">
//             <p class="text"></p>
//         </div>`;

//     const outgoingMessageDiv = createMessageElement(html, "outgoing");
//     outgoingMessageDiv.querySelector(".text").innerText = userMessage;
//     chatList.appendChild(outgoingMessageDiv);
//     typingForm.reset();

//     setTimeout(showLoadingAnimation, 500);
// };

// const typingForm = document.querySelector('.typing-form');

// typingForm.addEventListener("submit", (e) => {
//     e.preventDefault();
//     handleOutgoingChat();
// });


// // const API_KEY = `AIzaSyBeO1zvSnc0u04Tcb8arO3xa-671czDHJU`;
