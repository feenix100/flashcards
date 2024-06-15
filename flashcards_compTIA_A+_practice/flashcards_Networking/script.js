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
    { question: "What type of cable is used to connect a cable modem to the Internet?", answer: `coaxial cable

    Explanation:
    Cable Internet service uses coaxial cable, the same type used for cable TV. It has a shielded single solid copper core.` },
    { question: "Which protocol is associated with TCP/IP port 53?", answer: `Domain Name System (DNS)

    Explanation:
    DNS uses port 53 and translates domain names into IP addresses.` },
    { question: "If a host does not get a dynamic IP address from DHCP, an address can be manually configured. What type of IP address is this?", answer: `static IP address

    Explanation:
    IP addresses can be dynamic or static. DHCP assigns dynamic addresses, while static addresses are manually configured.` },
    { question: "A(n) ____ area network would most likely be used in an office setting", answer: `Local Area Network (LAN)

    Explanation:
    Smaller local networks, like inside an office, communicate within a LAN, and typically use ethernet for connections.` },
    { question: "What networking tool is used to remove the sheathing from cables?", answer: `cable stripper

    Explanation:
    A cable stripper is a networking tool that can remove the outer sheathing from a cable without damaging the underlying cable.` },
    { question: "What type of router connects your home network to another network, typically the internet?", answer: `gateway router

    Explanation:
    A gateway router sits between two networks, most commonly a local network and the internet.` },
    { question: "What governing body defines communications channels in the US?", answer: `Federal Communications Commission (FCC)

    Explanation:
    The FCC regulates communications channels in the US and has defined the 11 22 MHz wireless channels available for public use in the US.` },
    { question: "What does SSH stand for?", answer: `Secure Shell

    Explanation:
    SSH uses port 22 and provides a secure way to access a remote systems terminal.` },
    { question: "What type of modem provides connectivity through a fiber-optic cable?", answer: `optical network terminal modem

    Explanation:
    An optical network terminal (ONT) modem is a modem that uses a fiber-optic cable for connectivity.` },
    { question: "What does QoS stand for?", answer: `Quality of Service

    Explanation:
    QoS allows for networks to be able to prioritize traffic, most commonly sensitive voice traffic like VoIP.` },
    { question: "Which technology uses the wires in an ethernet cable to send electrical power to a device?", answer: `Power over Ethernet (PoE)

    Explanation:
    PoE allows you to make use of your existing ethernet cable infrastructure and use it to power devices in places where there is no power connection. A common use is for VoIP phones.` },
    { question: "Network cabling in a building is typically organized by bringing all cables into a wiring closet and connecting them to a ____, where cable interconnections can easily be made.", answer: `patch panel or punch down block

    Explanation:
    Network cabling is terminated at a punch down block connected to a patch panel where connections are made.` },
    { question: "This type of device provides communication between networks and is often used as an endpoint in WAN connections.", answer: `router

    Explanation:
    A router routes information between different networks, most commonly WANs.` },
    { question: "Which type of plug is used to test the functionality of your network interface card (NIC)?", answer: `loopback plug

    Explanation:
    A loopback plug is wired to send and receive signals to itself, for use in testing a network interface card or network connection solely using the plug.` },
    { question: "What type of device, either hardware or software, filters network traffic based on a set of predefined rules?", answer: `firewall

    Explanation:
    A firewall can be either a hardware or software device and is designed to filter traffic based on specified rules. A firewall should be placed physically or logically between the internal network and the internet to provide maximum security.` },
    { question: "Which protocol is considered connectionless and insecure?", answer: `UDP

    Explanation:
    User datagram protocol (UDP) sends data without establishing a verified connection to the target destination, making it a connectionless protocol. Due to this lack of verified connection, the UDP protocol is also considered insecure.` },
    { question: "DHCP runs on what port(s)?", answer: `67 and 68

    Explanation:
    DHCP uses ports 67 and 68 to dynamically assign IP addresses to clients.` },
    { question: "What device is also known as a multiport repeater?", answer: `hub

    Explanation:
    A hub, also known as a multiport repeater, is a layer 1 dumb device that sends incoming transmissions to all connected devices as a broadcast` },
    { question: "What are the two operating frequencies for Wi-Fi?", answer: `2.4 and 5 GHz

    Explanation:
    Wi-Fi uses 2.4 and 5 GHz frequencies for wireless transmissions. A 2.4 GHz frequency offers a longer range with slower transmission while a 5 GHz frequency has a shorter range but faster transmission speed.` },
    { question: "What server acts as a gatekeeper for critical network components?", answer: `AAA

    Explanation:
    An authentication, authorization, and accounting (triple A or AAA) server provides security to a network by acting as a gatekeeper for critical components. An AAA server is also known as a domain controller.` },
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
