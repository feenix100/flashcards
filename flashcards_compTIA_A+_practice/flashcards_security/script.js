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
    { question: "You are responsible for securing a large server room. You want to prevent unauthorized personnel from gaining entrance by simply following an authorized user into the room (a security breach referred to as tailgating). Which common prevention method would you incorporate to best secure the area?", answer: `a mantrap

    Explanation:
    A mantrap (access control vestibule) would prevent unauthorized users from following someone into a secure area. There are a number of different configurations of a mantrap. One is a small room with two doors that have to be accessed independently to gain access to the secure area. There could also be something as simple as a turnstile in place.` },
    { question: "What type of threat occurs within an organization?", answer: `insider threat

    Explanation:
    An insider threat is one that occurs within the organization and can be the most harmful, due to the potential scope of access by the threat actor, as well as the hardest to detect, for the same reason.` },
    { question: "What is a commonly used method to prevent the theft of laptops?", answer: `a cable lock

    Explanation:
    On nearly all laptops, there is a reinforced clip that allows a cable to be securely attached. Keep in mind that this is a less than perfect solution, since someone with a bolt cutter can defeat a cable lock.` },
    { question: "You work in an environment where your laptop is clearly visible to people nearby. You want to prevent other individuals from viewing your screen. What could you do to help prevent this from happening?", answer: `Use a privacy screen.

    Explanation:
    Privacy screens prevent viewing a screen from any angle except directly in front of the screen. Anyone viewing at an angle would see the screen as black.` },
    { question: "What is a security device that users carry with them, usually in the form of a key fob?", answer: `token

    Explanation:
    Security tokens are devices carried by individuals that contain various types of authorization information such as passwords, digital certificates, and randomly generated numbers that are used to verify user authenticity.` },
    { question: "This type of list permits or denies a user’s access inside a network, such as being able to access a server or specific files.", answer: `access control list

    Explanation:
    Access Control List (ACL) is the mechanism used to set various permissions to allow or deny access rights. Depending on the device, there can be various security attributes to identify rights and privileges.` },
    { question: "This Windows® feature allows users to encrypt an entire volume, making it secure even if the drive is stolen.", answer: `BitLocker®

    Explanation:
    BitLocker encrypts an entire volume, making it completely inaccessible without authentication credentials. If the drive is stolen, the data would remain encrypted.` },
    { question: "What type of attack attempts to embed malicious script within a legitimate website?", answer: `XSS

    Explanation:
    A cross-site scripting (XSS) attack is commonly used on legitimate websites to embed malicious scripts intended to coax the user into installing malware on their device.` },
    { question: "This security threat occurs when someone on your network can monitor a conversation in both directions and can secretively modify the contents of the communications.", answer: `an on-path attack

    Explanation:
    When someone on a network can capture and modify communication sessions in both directions, it is referred to as an “on-path attack.” This was formerly known as a “man-in-the-middle attack.” The easiest way to prevent this type of attack is to encrypt the data being sent.` },
    { question: "When a vulnerability exists in software that is, as yet, unknown to the vendor, but known to a hacker, this is referred to as a ____.", answer: `zero-day attack

    Explanation:
    Software vendors attempt to release patches as soon as they are discovered to prevent security breaches. Occasionally, hackers will discover these vulnerabilities before the vendor is aware and will attempt to exploit it before a patch is created.` },
    { question: "Changing a MAC address to match another host address in order to appear to be a trusted host on a network is referred to as ____.", answer: `spoofing

    Explanation:
    MAC addresses are burned into ROM chips on network interface cards. Each MAC address is unique, using a 48-bit number. There are over 280,000,000,000,000 available, worldwide. A user can modify his MAC address to appear to be a trusted host on a network to acquire access to the network. This is referred to as MAC spoofing.` },
    { question: "This is a form of malicious software that appears to become part of the operating system by modifying the core system files to hide itself.", answer: `rootkit

    Explanation:
    A rootkit attempts to modify the core system files to look like it is part of the actual operating system. If successful, anti-virus software may not detect the presence of a rootkit. It can then allow unauthorized access to the system. Special anti-rootkit software is available to remove rootkits.` },
    { question: "If a user is transmitting sensitive data that should be encrypted, but is being sent in the clear (unencrypted), what method could be implemented systemwide to detect this?", answer: `Data Loss Prevention (DLP)

    Explanation:
    DLP can be implemented in various ways: specific software on a server, a piece of network hardware, or a firewall that detects when data is being sent unencrypted. This can then be used to notify the administrator of the security breach.` },
    { question: "A feature of NTFS that allows users to encrypt individual files, rather than an entire volume, is referred to as ____.", answer: `Encrypted File System (EFS)

    Explanation:
    EFS encrypts files based on users’ log name and password, unlike BitLocker®, which encrypts the entire volume.` },
    { question: "The procedure that requires users to change a password periodically is referred to as ____.", answer: `password expiration

    Explanation:
    System administrators can force users to change passwords by setting passwords to expire on a certain date. Most administrators consider every 30 days as ideal for a password expiration period.` },
    { question: "Which type of security method is used to unlock a mobile device with your finger?", answer: `fingerprint lock

    Explanation:
    A fingerprint lock uses a built-in fingerprint reader on a mobile device. This allows you to use your own unique fingerprint to unlock the device. A fingerprint lock is a type of biometric lock` },
    { question: "Which type of application generates a random number to use, in combination with your username and password, to log in to a device?", answer: `authenticator application

    Explanation:
    Authenticator applications generate a random code or number every 30 seconds, or so. This code must be entered with your password to gain access. This application is also known as a token generator and can be a physical device or software.` },
    { question: "What type of certificate are you given when a third party has wiped off all the data on your hard drives?", answer: `certificate of destruction

    Explanation:
    Once you hand your data over to a third party for destruction, it is their responsibility now to permanently and securely erase all of the data on the drives. When this is complete, they will provide you with a certificate, which can be saved and used as an audit trail.` },
    { question: "What is it called when you magnetically remove all the data on a hard drive?", answer: `degaussing

    Explanation:
    Degaussing uses magnetic waves to remove the data on a drive. Doing this renders the drive permanently unusable.` },
    { question: "What can you do to prevent your wireless SSID from showing up on a list of available networks?", answer: `Disable SSID broadcast.

    Explanation:
    Disabling the SSID broadcast means your SOHO router will not send out its name as an option for connection. Instead, a user would have to know the name of the network to manually type in the SSID.` },
    { question: "An administrator would like to provide a device with a series of instructions to perform each time a user logs on to the device. What could the administrator use to accomplish this?", answer: `login script

    Explanation:
    A login script can be thought of as a series of instructions for a device to perform upon login. These login scripts can be used to map a user’s network drive, log computer access, and much more.` },
    { question: "An organization provides cell phones to all of its employees. The security team of this organization wants to ensure that the devices are monitored and managed by the organization to reduce the risks associated with cell phones. What type of policy could be put in place to mitigate some of the risk associated with cell phones?", answer: `MDM policy

    Explanation:
    Mobile Device Management (MDM) policies may be put in place to give organizations the ability to manage and maintain mobile devices that will have access to company resources. Common MDM policies include procedures such as allowing the phone be wiped if the device is stolen and providing access to the devices’ location tracking.` },
    { question: "This mode of encryption is used by WPA2 to secure wireless networks.", answer: `AES

    Explanation:
    AES stands for Advanced Encryption Standard. It is a secure encryption method that is still used today, including being used by WPA2 to secure wireless networks.` },
    { question: "This type of social engineering attack is a targeted phishing attack.", answer: `spear phishing

    Explanation:
    While most phishing attacks send out bulk spam email messages hoping to get a few people to bite, spear phishing attacks do research on their targets and send out targeted phishing email messages.` },
    { question: "What type of authentication method uses one login credential to provide access to multiple systems or applications?", answer: `SSO

    Explanation:
    A single sign-on (SSO) method is an authentication technique designed to reduce the need for multiple login credentials by using one verified authentication for access to multiple network resources or applications.` },
    { question: "This type of user is one step down from an administrator account and is considered the second most powerful account within the Windows® operating system.", answer: `power user

    Explanation:
    In the Windows® operating system, the administrator account has access to everything. One step down is the power user account, which is considered the second most powerful account type in Windows®.` },
    { question: "Within the Windows® operating system, most users will have this type of account.", answer: `standard user

    Explanation:
    The Windows® operating system has account types such as administrator, power user, guest user, and standard user. The standard user is the category into which most users will fall. Users that fall into the standard user category have varying permissions based on their roles and groups set by the administrator.` },
    { question: "An organization has a policy that states that users will only be given access to the resources they need to complete their jobs and nothing more. This is known as the principle of ____.", answer: `least privilege

    Explanation:
    Organizations should always use the principle of least privilege, which states that users are only given access to what they require to complete their work and nothing beyond that.` },
    { question: "Palmprint scans, fingerprint locks, and retina scanners are all examples of this.", answer: `biometric locks

    Explanation:
    Biometric locks refer to any locks that are designed to recognize the users’ body parts (such as palmprint, fingerprint, and retina) to determine that they are who they proclaim to be.` },
    { question: "If an organization wants to prevent dumpster divers from stealing information from disposed documents, what type of policy could that organization put in place?", answer: `shredding policy

    Explanation:
    Organizations should have a shredding policy in place so that all documents are shredded before they are thrown in the trash.` },

    
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
