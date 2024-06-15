const flashcard = document.getElementById('flashcard');
const questionEl = document.getElementById('question');
const answerEl = document.getElementById('answer');
const backButton = document.getElementById('back-button');
const flipButton = document.getElementById('flip-button');
const nextButton = document.getElementById('next-button');
const counterEl = document.getElementById('counter');

let currentCardIndex = 0;

/* 
use ticks `` (top left of keyboard) to add questions or answers with multiple lines.
this tells the html to render it correctly
`example question why do this?:
    answer:
    new lines will be rendered as <br> line breaks
`
*/

const flashcards = [
    { 
        question: "Which RAID array only offers mirroring?", 
        answer: `RAID 1 
        Explanation:
        RAID 1 only offers mirroring, without any striping or parity.` 
    },
    { 
        question: "Which video connector type can run as a single link and dual link connection?", 
        answer: `DVI

        Explanation:
        DVI supports both single and dual link connections, with 3.7 and 7.4 gbps throughput, respectively.` 
    },
    { 
        question: "Which connector type is primarily used for ethernet?", 
        answer: `RJ-45
        Explanation:
        RJ-45 is used in ethernet applications, and uses all eight wires inside the cable to send and receive data.` 
    },
    { 
        question: "The ____ does a basic check of your hardware, verifying CPU and memory requirements are met before loading the operating system.", 
        answer: `Power On Self Test (POST\)

        Explanation: POST is initialized by the BIOS upon system startup, where it verifies all components are in order to proceed with booting the operating system.` 
    },
    { 
        question: "This technology can identify errors in memory, and then correct them as it operates.", 
        answer: `ECC

        Explanation:
        Error Correcting Code memory is an expensive type of memory, typically reserved for high-end systems.` 
    },
    { 
        question: "What modern BIOS can boot from removable media and support GPT disks?", 
        answer: `UEFI BIOS

        Explanation:
        The modern BIOS provides a host of new capabilities, which include a pre-boot environment and remote connectivity` 
    },
    { 
        question: "The total capacity of the power supply is called the _____.", 
        answer: `wattage rating

        Explanation:
        The wattage rating is the total measure of the power supply capacity of a device.` 
    },
    { 
        question: "What is the standard that broadcasts and receives signals on 2.4GHz and 5GHz frequencies?", 
        answer: `802.11

        Explanation:
        The IEEE defined the 802.11 standard for wireless communication with the 2.4GHz and 5GHz frequency bands.` 
    },
    { 
        question: "What form of contactless communication is used for tap pay devices?", 
        answer: `NFC

        Explanation:
        Near field communication (NFC) is used for contactless payments if the payment card or device is with a few centimeters of the tap pay device.` 
    },
    { 
        question: "What is the maximum distance for Bluetooth communications?", 
        answer: `10 meters

        Explanation:
        Bluetooth is used mostly for personal peripherals like headsets and wearables that would be close to the device.` 
    },
    { 
        question: "DDR4 memory is faster than its DDR2 and DDR3 predecessors. Does it consume more or less power?", 
        answer: `less

        Explanation:
        While it sounds counterintuitive, new memory technology provides higher speeds with less power consumption.` 
    },
    { 
        question: " Which printer language is device dependent?", 
        answer: `PCL

        Explanation:
        PCL is a newer printer language and is device dependent.` 
    },
    { 
        question: " What type of cooling is most effective for the most powerful processors?", 
        answer: `liquid cooling

        Explanation:
        Liquid cooling or water cooling is the most effective way to draw heat away from processors.` 
    },
    { 
        question: " What is the fastest form of SSD?", 
        answer: `NVME

        Explanation:
        Non-volatile memory express is a form of memory that uses the M.2 form factor. It is the fastest SSD available today.` 
    },
    { 
        question: " What is the most commonly used type of connector for cable Internet service?", 
        answer: `RG-6

        Explanation:
        RG-6 connectors are cylindrical connectors with a threaded end to make a secure connection. It is similar to the RG-59 connectors used for cable TV, but slightly larger.` 
    },
    { 
        question: "Landscape mode and portrait mode are examples of what?", 
        answer: `orientation

        Explanation:
        Orientation settings within a printer determine the layout of a print and can be either landscape (wider than tall) or portrait (taller than wide).` 
    },
    { 
        question: "Where can a record of all print jobs on a printer be located?", 
        answer: `in the audit logs

        Explanation:
        Audit logs keep a record of all print activity, as well as print origination location.` 
    },
    { 
        question: "Which type of scanner is best suited to scan multiple pages quickly?", 
        answer: `ADF scanner

        Explanation:
        An ADF scanner will scan multiple pages quickly through the use of a feeder.` 
    },
    { 
        question: "What two substances can a 3-D printer use?", 
        answer: `filament or resin

        Explanation:
        Depending on the type of 3-D printer, it can use either filament or resin to print.` 
    },
    { 
        question: "What is expressed in dots per inch?", 
        answer: `resolution

        Explanation:
        Print resolution is expressed in dots per inch and is directly related to print quality.` 
    },
    
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
