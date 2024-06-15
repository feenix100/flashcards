const flashcard = document.getElementById('flashcard');
const questionEl = document.getElementById('question');
const answerEl = document.getElementById('answer');
const backButton = document.getElementById('back-button');
const flipButton = document.getElementById('flip-button');
const nextButton = document.getElementById('next-button');
const counterEl = document.getElementById('counter');

let currentCardIndex = 0;

/* if using vscode to add new questions with autocomplete, copy this code snippet below into javascript.json user snippet
"question and answer": {
    "prefix": "question",
    "body": [
        "{ question: \" ?\", answer: \"\" },"
    ],
    "description": "update flashcard questions"
}
*/

const flashcards = [
    { question: "20/21—File Transfer Protocol (FTP)", answer: `File Transfer Protocol (FTP) is used to manipulate files. FTP can copy files, list and manipulate directories, and view file contents. FTP runs on ports 20 and 21. Port 21 is mainly used for file management and port 20 is used for data transfer. FTP is not secure and transmits in plain text.` },
    { question: "22—Secure Shell (SSH)", answer: `Secure Shell (SSH) is a connection-oriented protocol used to set up secure Telnet connections for remote logins. SSH is secure and runs on port 22.` },
    { question: "23—Telnet", answer: `Telnet is a terminal emulation program that allows for remote access to text on another computer. Telnet is not secure and transmits plaintext. Telnet uses port 23.` },
    { question: "25—Simple Mail Transfer Protocol (SMTP)", answer: `Simple Mail Transfer Protocol (SMTP) is used to send email only and is a push protocol. SMTP uses port 25.` },
    { question: "53—Domain Name System (DNS)", answer: `The Domain Name System (DNS) is used to resolve hostnames to IP addresses and uses port 53.` },
    { question: "67/68—Dynamic Host Configuration Protocol (DHCP)", answer: `Dynamic Host Configuration Protocol (DHCP) assigns IP addresses dynamically to network clients. DHCP uses port 67 for the server and port 68 for the client.` },
    { question: "80—Hypertext Transfer Protocol (HTTP)", answer: `Hypertext Transfer Protocol (HTTP) manages communications between a web server and a client to view internet content. HTTP is not secure and transmits in plain text. HTTP uses port 80.` },
    { question: "110—Post Office Protocol 3 (POP3)", answer: `Post Office Protocol 3 (POP3) is used for downloading email. POP3 uses port 110.` },
    { question: "137/139—Network Basic Input/Output System (NetBIOS)/NetBIOS over TCP/IP (NetBT)", answer: `Network Basic Input/Output System (NetBIOS) is an API for communication between computers over a network. NetBIOS works over OSI layer 4 and needs to work with a layer 5 protocol, namely TCP/IP, to function properly. NetBIOS over TCP/IP is called NetBT. NetBIOS runs on ports 137/139.` },
    { question: "143—Internet Message Access Protocol (IMAP)", answer: `Internet Message Access Protocol (IMAP) is currently in its fourth version, or IMAP4, and is used for downloading email. IMAP4 is secure and runs over port 143.` },
    { question: "161/162—Simple Network Management Protocol (SNMP)", answer: `Simple Network Management Protocol (SNMP) is used for network management. SNMP uses port 161 for sending and receiving requests and port 162 for receiving transmissions from managed devices.` },
    { question: "389—Lightweight Directory Access Protocol (LDAP)", answer: `Lightweight Directory Access Protocol (LDAP) is used for accessing information stored in an information directory. LDAP uses port 389.` },
    { question: "443—Hypertext Transfer Protocol Secure (HTTPS)", answer: `Hypertext Transfer Protocol Secure (HTTPS) is the secure version of HTTP. HTTPS uses port 443.` },
    { question: "445—Server Message Block (SMB)/Common Internet File System (CIFS)", answer: `Server Message Block (SMB) is primarily a Microsoft protocol used for shared file access. Common Internet File System (CIFS) is an enhanced version of SMB. SMB/CIFS use port 445.` },
    { question: "3389—Remote Desktop Protocol (RDP)", answer: `Remote Desktop Protocol (RDP) allows for remote connection to computers. RDP uses port 3389.` },
    // Add more flashcards here
];

function showFlashcard(index) {
    const card = flashcards[index];
    questionEl.textContent = card.question;
    answerEl.innerHTML = card.answer.replace(/\n/g, '<br>'); // Replace newlines with <br> for HTML rendering
    flashcard.classList.remove('is-flipped');
    updateCounter(index);
}

function updateCounter(index) {
    counterEl.textContent = `Flashcard ${index + 1} of ${flashcards.length}`;
}

flipButton.addEventListener('click', () => {
    flashcard.classList.toggle('is-flipped');
});

nextButton.addEventListener('click', () => {
    // Temporarily hide the flashcard content
    flashcard.style.visibility = 'hidden';
    
    // Flip back to the front before showing the next flashcard
    flashcard.classList.remove('is-flipped');
    
    // Wait for the flip animation to complete (200ms) before showing the next flashcard
    setTimeout(() => {
        currentCardIndex = (currentCardIndex + 1) % flashcards.length;
        showFlashcard(currentCardIndex);
        flashcard.style.visibility = 'visible';
    }, 200);
});

backButton.addEventListener('click', () => {
    // Temporarily hide the flashcard content
    flashcard.style.visibility = 'hidden';
    
    // Flip back to the front before showing the previous flashcard
    flashcard.classList.remove('is-flipped');
    
    // Wait for the flip animation to complete (200ms) before showing the previous flashcard
    setTimeout(() => {
        currentCardIndex = (currentCardIndex - 1 + flashcards.length) % flashcards.length;
        showFlashcard(currentCardIndex);
        flashcard.style.visibility = 'visible';
    }, 200);
});

// Initialize the first flashcard
showFlashcard(currentCardIndex);
