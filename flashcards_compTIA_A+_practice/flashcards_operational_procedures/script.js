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
    { question: "What is ESD?", answer: `electrostatic discharge

    Explanation:
    This is the discharge of static electricity caused by two electrically charged objects making contact with each other. It takes less than 100 volts (V) of this type of discharge to damage a computer. This is a very small amount.` },
    { question: "What types of codes or regulations are required to be met to remain in compliance with the local government?", answer: `electrical codes, fire prevention codes, building codes, and environmental codes

    Explanation:
    All these codes outline how computing systems or cabling can be set up in commercial or industrial areas. They are often put in place to ensure safety.` },
    { question: "What is automation?", answer: `a script designed to perform a task that remains constant

    Explanation:
    Automation is useful in performing basic tasks that need to remain the same each time a script is run. Basic automation scripts can be written to perform tasks such as adding new users to a group in a network.` },
    { question: "What is SDS?", answer: `safety data sheet

    Explanation:
    These sheets outline how you should properly handle and dispose of certain hazardous materials.` },
    { question: "What is OSHA?", answer: `Occupational Safety and Health Administration

    Explanation:
    This is the federal organization that oversees the SDS program (formerly MSDS program), along with numerous other safety programs and initiatives in the United States.` },
    { question: "What is the EPA?", answer: `Environmental Protection Agency

    Explanation:
    This is the federal program tasked with overall protection of the environment and atmosphere. They are concerned with ensuring that toxic or hazardous materials do not endanger the environment and are handled according to federal regulations.` },
    { question: "What is DRM?", answer: `digital rights management

    Explanation:
    DRM controls what can be done with software and enforces certain security measures. This is common in audio and video electronics.` },
    { question: "What is a EULA?", answer: `end user license agreement

    Explanation:
    This agreement specifies what users can do with a piece of software when they are given access to it. It may include language like “Do Not Reproduce” and other constraints.` },
    { question: "What is PII?", answer: `personally identifiable information

    Explanation:
    This is detailed information about someone that can be used as a means to identify them or link them with a certain role. Examples include a person’s first and last name, address, date of birth, and social security number.` },
    { question: "What is an enterprise license?", answer: `a license granting businesses the authority to use software for commercial purposes

    Explanation:
    This type of license is usually given to larger companies and is usually sold by the number of users or number of seats using the software on a subscription basis. A popular one is Microsoft Volume Licensing, which grants a license key for a certain number of users to download and authenticate their Office programs.` },
    { question: "What is chain of custody?", answer: `a set of measures that proves evidence has maintained integrity during an incident response

    Explanation:
    Chain of custody provides a means to ensure that no part of evidence has changed while it is being handled. It provides the names of evidence handlers, a record of what was done with the evidence and when it was done, as well as other pertinent information. It ensures nothing has been tampered with to influence the outcome of an investigation.` },
    { question: "What is an acceptable use policy?", answer: `company policy outlining how the information systems may be used

    Explanation:
    This is a policy that organizations require employees to sign before beginning work. It clearly outlines what can be done on the systems that are the property of the company and what can be done on the company network with any device.` },
    { question: "What is open-source software?", answer: `software whose code is freely available for anyone to use or modify as they wish

    Explanation:
    Open-source software, sometimes known as Free and Open Source Software (FOSS), refers to any software whose code is freely available to anyone for use and modifications.` },
    { question: "What is used to prepare for power surges and blackouts?", answer: `surge suppressors and battery backups

    Explanation:
    Surge suppressors help reroute or suppress voltage spikes that come into the line, so that they don’t do damage to production systems. Battery backups ensure that critical systems will remain online in the event of a power loss.` },
    { question: "What is a personal license?", answer: `a single user license granted for noncommercial purposes

    Explanation:
    A personal license is a genuine copy of a piece of software, which is intended only for individual use. This is sometimes granted to students enabling access to popular software while they attend school.` },
    { question: "What is VNC?", answer: `virtual network computing

    Explanation:
    Virtual network computing (VNC) is an open-source protocol run on a client-server model that provides a method for remotely sharing desktops.` },
    { question: "What protocol runs on port 3389?", answer: `RDP

    Explanation:
    Remote desktop protocol (RDP) is a Microsoft proprietary protocol that allows for remote access to Windows computers via port 3389.` },
    { question: "What is mapping?", answer: `mounting a remote file system to a drive letter

    Explanation:
    Sometimes a file system will need to have its drive letter changed. Creating a script can be useful in creating a reproducible result each time a file system is remapped.` },
    { question: "What is an antistatic bag?", answer: `a bag designed to protect an electronic device from static charges

    Explanation:
    An antistatic bag, typically pink or silver in color, is a bag that collects electrical charges, such as static charges on its exterior, effectively protecting the enclosed component from damage.` },
    { question: "Where should backups be kept according to the 3-2-1 backup rule?", answer: `onsite and offsite

    Explanation:
    The 3-2-1 backup rule states that three backups should be taken with two remaining onsite and one stored offsite for the most comprehensive protection against data destruction or failure. This ensures that a working backup is available in case of a minor or major catastrophe.` },
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
