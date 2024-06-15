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
    { question: "Occasionally, users may opt to run Windows® and Linux® on the same system.This can be accomplished by setting up a virtual machine on Windows® loaded to run Linux®. This has the advantage of allowing the user to simultaneously run both operating systems. Setting up a dual boot system is another option. What advantage does running a dual boot system have over running virtual machines?", answer: `Using a dual boot option allows 100% of the system resources to the operating system.

    Explanation:
    When setting up a dual boot system using Windows® and Linux®, you should always load Windows® first then Linux®. This allows Linux® to manage the boot sequence. The Linux® boot manager works better than Windows® boot manager.` },
    { question: "What is the feature found in cloud computing that allows users to automatically request additional storage space?", answer: `rapid elasticity

    Explanation:
    Rapid elasticity is the term for a service that allows users to automatically request additional storage space in the cloud` },
    { question: "What is the feature found in cloud computing where the provider measures the service for billing, planning, and managing resources?", answer: `measured service

    Explanation:
    Be aware of the five principles of cloud services as defined by the National Institute of Standards and Technologies: Public/Private/Hybrid Access, Rapid Elasticity, On Demand, Resource Pooling, and Measured Service.` },
    { question: "Which cloud technology model allows you to use software hosted in the cloud without hosting any of the software on-premise?", answer: `Software-as-a-Service (SaaS)

    Explanation:
    SaaS is a popular model that allows software to be hosted in some central location, off-premise. All you need is an Internet connection to access the software, as needed.` },
    { question: "Which cloud model allows organizations to move their entire infrastructure to the cloud?", answer: `IaaS

    Explanation:
    IaaS (Infrastructure-as-a-Service) is a cloud model that allows organizations to move their entire infrastructure to the cloud. Infrastructure includes items such as routers, switches, firewalls, and servers.` },
    { question: "Which cloud model would allow a developer to build, create, and manage their applications without having to worry about the infrastructure?", answer: `PaaS

    Explanation:
    PaaS (Platform-as-a-Service) companies provide platforms for software developers to build, create, and maintain their applications. The PaaS provider handles everything on the back-end including setup and maintenance of servers and networking equipment.` },
    { question: "What makes it possible for users to access their cloud-hosted files on multiple devices (laptop, tablet, desktop) and pick up right where they left off on the previous device?", answer: `synchronization apps

    Explanation:
    Many cloud file storage services use synchronization apps that allow users to access the same version of files on multiple devices.` },
    { question: "What term is used to describe the process of configuring a virtual machine on a local desktop?", answer: `client-side virtualization

    Explanation:
    Client-side virtualization is the process of configuring a virtual machine on a local desktop.` },
    { question: "What is required for full virtualization because it handles all interactions during virtualization, making it possible for multiple guest operating systems to run at one time?", answer: `hypervisor

    Explanation:
    Hypervisors handle all interactions during virtualization and make it possible to run multiple guest operating systems at one time. Hypervisors are needed for full virtualization.` },
    { question: "To get a virtual machine to communicate directly through the network to which the physical machine is connected, which networking mode would you use?", answer: `bridged mode

    Explanation:
    In bridged mode, the VM is able to communicate directly through the network to which the physical machine is connected.` },
    { question: "When cost is not a concern, but security is the number one priority, which type of cloud implementation should be used?", answer: `private cloud

    Explanation:
    A private cloud is a cloud implementation that is owned solely by one organization. Private clouds are the most expensive to implement, but also the most secure.` },
    { question: "A cloud-based application that is available to anyone over the open Internet is known as which type of cloud implementation?", answer: `public cloud

    Explanation:
    Public cloud refers to anything that is delivered across the open Internet. When someone uses the term the cloud, they are often referring to the public cloud.` },
    { question: "What is used to replicate or mimic the behavior of another device, such as playing a Nintendo® game on a computer?", answer: `emulator

    Explanation:
    An emulator is used to replicate or mimic the behavior of another device (such as a computer mimicking a Super Nintendo® device).` },
    { question: "Which type of virtual networking would you use if you wanted to ensure that a virtual machine only had access to other specified virtual machines and not the rest of the network or the Internet?", answer: `internal networking

    Explanation:
    The internal networking function allows a VM to communicate with other VMs that you specify, but not access the Internet or any other computers on your network.` },
    { question: "An engineer would like to configure his virtual machine to make outbound connections only. Which networking mode should this engineer use for the virtual machine?", answer: `NAT mode

    Explanation:
    The NAT mode option in a virtual machine allows the virtual machine to make outbound connections only.` },
    { question: "What cloud concept is measured in terms of nines?", answer: `availability

    Explanation:
    Cloud characteristics include high availability, which is measured in nines, or the amount of uptime the provider offers. “Five nines” means 99.999%.` },
    { question: "Where can a VDI be hosted?", answer: `in the cloud or on premise

    Explanation:
    A VDI or virtual desktop infrastructure can be run either locally on premise or remotely through the cloud.` },
    { question: "What is a temporary, isolated virtual environment that can be used for testing or quarantining?", answer: `sandbox

    Explanation:
    A sandbox is a safe environment that can be set up on a virtual machine. The sandbox isolates the environment from the host machine and does not have access to or save data to the host, protecting the host.` },
    { question: "What is it called when an operating system is run virtually on another operating system?", answer: `cross-platform virtualization

    Explanation:
    Cross-platform virtualization occurs when a separate operating system is run virtually on a different operating system, such as running a Linux OS on a Windows machine.` },
    { question: "What is the division of the resources of a provider among the clients of the provider?", answer: `resource pooling

    Explanation:
    Resource pooling or shared resources allows for multiple clients of a provider to share resources with multiple virtual machines. It can occur either internally or externally.` },
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
