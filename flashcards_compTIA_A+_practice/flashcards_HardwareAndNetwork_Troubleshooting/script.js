const flashcard = document.getElementById('flashcard');
const questionEl = document.getElementById('question');
const answerEl = document.getElementById('answer');
const backButton = document.getElementById('back-button');
const flipButton = document.getElementById('flip-button');
const nextButton = document.getElementById('next-button');
const counterEl = document.getElementById('counter');

let currentCardIndex = 0;

/* 
"question and answer": {
    "prefix": "question",
    "body": [
        "{ question: \" ?\", answer: \"\" },"
    ],
    "description": "update flashcard questions"
}
*/

const flashcards = [
    { 
        question: "What does POST stand for?", 
        answer: `Power-On Self-Test

        Explanation:
        The POST is special software stored on your system’s read-only memory, which runs every time your machine boots. It runs a check on system components to ensure they are working properly (e.g., your keyboard and mouse).` 
    },
    { question: "What is IOPS?", answer: `input/output operations per second

    Explanation:
    IOPS is the number of read/write operations a storage device, such as a NAS or RAID device, can perform per second. A decline in the IOPS number of a storage device can be an indication of failure.` },

{ question: "What does RAID stand for?", answer: `Redundant Array of Inexpensive Disks

Explanation:
“Independent” is also used interchangeably with “Inexpensive.” RAID is a standard for providing redundancy within disk drives to protect data.` },
{ question: "What is S.M.A.R.T.?", answer: `self-monitoring, analysis, and reporting technology

Explanation:
S.M.A.R.T. metrics are used to measure hard drive reliability and performance and can create benchmarks for later comparison of performance.` },
{ question: "What is “burn-in” on a monitor?", answer: `an image that has become permanent on the display

Explanation:
This can happen with any type of monitor, and some monitors have automatic features, such as pixel shifting, to help avoid these issues.` },
{ question: "What is a dead pixel?", answer: `a pixel that does not display any color

Explanation:
Dead pixels always stay black and never display any color.` },
{ question: "What is a stuck pixel?", answer: `a pixel that always displays a color

Explanation:
Stuck pixels will always have a color shining through them, even on a completely dark screen.` },
{ question: "What does APIPA stand for?", answer: `Automatic Private IP Addressing

Explanation:
APIPA is used when a client is using dynamic host configuration protocol (DHCP) addressing but is unable to reach the DHCP server.` },
{ question: "What does SSID stand for?", answer: `Service Set Identifier

Explanation:
The SSID is a unique name selected to define and identify a wireless network.` },
{ question: "What causes mobile batteries to become swollen?", answer: `internal components that begin to build up gas

Explanation:
Lithium-Ion batteries are prone to failure and may sometimes begin building up gas when components fail. They become swollen because the battery case is designed to hold this gas inside and not release it into the atmosphere.` },
{ question: "What is ghost cursor?", answer: `a cursor on the screen that moves without being manipulated

Explanation:
Also known as pointer drift, ghost cursor can happen if you have the wrong drivers installed, or if your touchpad is configured improperly.` },
{ question: "What is the reason for creased paper coming out of a printer?", answer: `partial obstruction of the paper path

Explanation:
This is usually the result of something being in the way of the print path, but can also result from using the wrong weight of paper in your printer.` },
{ question: "What are ghost images?", answer: `previously printed images appearing on your paper

Explanation:
Ghost images occur when excess toner has not been removed from the imaging drum by the cleaning process.` },
{ question: "What is an LED status indicator?", answer: `an LED light visible on storage devices

Explanation:
The LED status indicator light on storage devices can indicate the health of the device. Some LED status lights blink when functioning properly or remain solid if functioning improperly. To assess the meaning of the LED status light, check for vendor-specific information about the device.` },
{ question: "What is an indicator of a bad CMOS battery?", answer: `inaccurate system date and time

Explanation:
The CMOS battery is responsible for retaining basic information, such as date and time, even when a system is without power. If the CMOS battery is faulty, it may result in inaccurate system date and time.` },
{ question: "Application crashes are an indicator of problems with what component?", answer: `memory

Explanation:
Application crashes are often caused by full or failing memory, resulting in the improper running of the application, which causes the application to crash.` },
{ question: "What is the BSOD?", answer: `blue screen of death

Explanation:
The blue screen of death is the proprietary error screen of Windows operating systems and is an indication of a potentially fatal error in the system.` },
{ question: "What is the best practice methodology?", answer: `a basic outline of principles that should be followed when troubleshooting

Explanation:
The best practice methodology is designed to systematically work a technician through the troubleshooting process to ensure the best possible outcome.` },
{ question: "Where would you look if you suspect capacitor swelling?", answer: `on the motherboard

Explanation:
Capacitors are located on the motherboard and can swell and produce a brownish-red residue when they fail.` },
{ question: "What is the MBR?", answer: `master boot record

Explanation:
The master boot record is located on the hard drive and contains the information the computer needs to load the operating system.` },
    // Add more flashcards here
];
/*
const flashcards = [
    { question: "Which RAID array only offers mirroring?", answer: "RAID 1 
    'Explanation:
     RAID 1 only offers mirroring, without any striping or parity."' },
    { question: "What is 2 + 2?", answer: "4" },
    { question: "What is the color of the sky?", answer: "Blue" },
    { question: " ?", answer: "" },
    // Add more flashcards here
];
*/
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
