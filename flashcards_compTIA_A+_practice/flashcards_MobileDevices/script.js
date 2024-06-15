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
    { question: "What does SO-DIMM stand for?", answer: `Small Outline Dual Inline Memory Module

    Explanation:
    This type of memory module is smaller than a full DIMM slot found on desktops. It is used to add additional RAM to your laptop.` },
    { question: "Nickel-cadmium (NiCd), lithium-ion (Li-ion), nickel-metal hydride (NiMH), and lithium-polymer (Li-poly) are all types of what?", answer: `batteries

    Explanation:
    Batteries are named based on their chemistry and each kind is suitable for certain devices and applications.` },
    { question: "Which type of drive has faster access time: magnetic disk or solid state drive?", answer: `solid state drive (SSD)

    Explanation:
    Solid state drives use non-volatile RAM to store data so there are no moving parts. Magnetic disk drives have rotating disks that require longer access times.` },
    { question: "Which device enables your laptop to effectively record sound?", answer: `microphone

    Explanation:
    Most laptops come built in with microphones, and they can be located within the display or along the edges of the keyboard, among other places. This enables your laptop to record audio.` },
    { question: "Which type of technology allows you to write directly on the laptop display?", answer: `digitizer

    Explanation:
    A digitizer is commonly found on devices that function as a 2-in-1 laptop and tablet combination. This enables your display to receive input when touched by a finger or stylus, similarly to how most touchscreen phones work today.` },
    { question: "Which device allows you to participate in video calls directly from your laptop?", answer: `webcam

    Explanation:
    A webcam is typically built into the laptop above the display, although it can be an external stand-alone device as well, and it allows you to communicate via real-time video with other individuals who agree to a video call.` },
    { question: "What form factors do HDDs and SSDs come in?", answer: `2.5”, 1.8”, and M.2

    Explanation:
    It is important to know these to ensure compatibility of the components` },
    { question: "Which is typically smaller, a desktop or laptop keyboard?", answer: `a laptop keyboard

    Explanation:
    Keyboards on a laptop are typically smaller than on a desktop to allow for greater portability.` },
    { question: "NFC only works within close proximity, typically up to how many centimeters?", answer: `10 cm

    Explanation:
    Near-field communication (NFC) works up to 10 cm from another compatible device.` },
    { question: "What type of communication is used for contactless payment systems?", answer: `near field communication (NFC)

    Explanation:
    NFC is limited to a range of a few centimeters, so two devices have to be very close to communicate.` },
    { question: "IPS, TN, and VA are all types of what kind of display?", answer: `LCD

    Explanation:
    IPS, TN, and VA are all types of liquid crystal display (LCD). The variants indicate how the transistors and liquid crystals work together to form an image.` },
    { question: "What is the process that Bluetooth devices use to discover and connect to each other?", answer: `pairing

    Explanation:
    Before Bluetooth devices can communicate, they must accept each other’s connection in the pairing process.` },
    { question: "Which display type does not require a backlight?", answer: `OLED

    Explanation:
    In an OLED display, the organic light-emitting compound produces its own light, negating the need for a backlight.` },
    { question: "The antenna is usually located in what portion of the clamshell?", answer: `the upper or top portion

    Explanation:
    The top of the clamshell contains the Wi-Fi antenna, which is placed there for better signal reception.` },
    { question: "What is the function of an inverter in an LCD screen?", answer: `to convert DC power to AC power

    Explanation:
    An inverter converts DC current into the AC current needed to backlight the LCD display` },
    { question: "What type of security uses physical measures to enhance device security?", answer: `biometrics

    Explanation:
    Biometrics use physical characteristics such as facial recognition or fingerprints to enhance security on mobile devices.` },
    { question: "What type of memory is used to expand memory in Android phones?", answer: `microSD

    Explanation:
    MicroSD memory cards have a very small form factor and are used to expand memory in small devices.` },
    { question: "What number uniquely identifies a mobile device?", answer: `the International Mobile Equipment Identity (IMEI)

    Explanation:
    The IMEI is hard-coded into a device, similar to a MAC address in a computer.` },
    { question: "When an Android device synchronizes data with the cloud, where does that data get stored?", answer: `the user’s Google Drive

    Explanation:
    Google account users get limited free storage in the Google Cloud in an area dedicated as their Google Drive.` },
    { question: "How does a VPN provide security on an otherwise insecure network?", answer: `It encrypts the data.

    Explanation:
    A VPN encrypts data between the user and the VPN server to protect confidentiality on the local network.` },
    { question: "What are the three most common USB form factors?", answer: `USB-C, micro USB, mini USB

    Explanation:
    They each have various uses and applications, and the charging/connection cords are not interchangeable.` },
    { question: "Global System for Mobile Communication (GSM) and Code-Division Multiple Access (CDMA) were both cellular connection standards used with which cellular generation?", answer: `3G

    Explanation:
    3G used Global System for Mobile Communication (GSM) and Code-Division Multiple Access (CDMA) as cellular standards. The two standards were not compatible with each other and were used by different carriers.` },
    { question: "What service uses the following three primary components: the satellite constellation, the ground control network, and the receiver?", answer: `GPS

    Explanation:
    GPS use is on the increase and is finding its way into many new applications.` },
    { question: "MDM and MAM are both types of software used for what type of security?", answer: `mobile device security

    Explanation:
    Companies use mobile application management (MAM) and mobile device management (MDM) to ensure the security of mobile devices.` },
    { question: "Microsoft 365, iCloud, and Google Workspace can all be used for what?", answer: `mobile device synchronization

    Explanation:
    Microsoft 365, iCloud, and Google Workspace can all be used for mobile device synchronization via a wired connection, Bluetooth connection, Wi-Fi connection, or cellular connection.` },
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
