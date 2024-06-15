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
    { question: "This is a drive encryption utility designed to protect data on a PC by encrypting the entire hard drive.", answer: `BitLocker

    Explanation:
    BitLocker completely encrypts a hard drive protecting data from loss or theft.` },
    { question: "The ability of newer network interface cards to concurrently transmitting and receiving data is referred to as ____.", answer: `Full Duplex

    Explanation:
    Full Duplex allows a network interface card to transmit and receive data concurrently.` },
    { question: "What Windows utility that provides a command line interface would you use to troubleshoot a system that will not boot?", answer: `recovery console

    Explanation:
    Recovery console is accessed in one of three ways. Press F8 during system boot, with a system repair disk, or with the original distribution disk. Recovery console opens a command line prompt that allows you to repair many boot-up problems such as a corrupted MBR (Master Boot Record), or a corrupted boot sector.` },
    { question: "What Windows utility is used to delete temporary files from a hard drive to free up disk space?", answer: `Disk Cleanup

    Explanation:
    For Windows 7, Disk Cleanup is located in System tools.
    For Windows 8, from Start, type Disk Cleanup.
    In Windows 10, from Start, type Disk Cleanup.` },
    { question: "In Windows 10, where can you view and/or delete processes that are launched at startup?", answer: `Task manager > Startup tab

    Explanation:
    To disable startup programs on Windows 7, go to Start, type Run, enter Msconfig, and then select the Startup tab.
    
    To disable startup programs on Windows 8, press Ctrl + Alt + Del and then select Task Manager and the Startup tab.` },
    { question: "To disable FTP on a network, what port number would you block on the firewall?", answer: `Port 21

    Explanation:
    By blocking port 21 on a firewall, any FTP traffic would be denied.` },
    { question: "What protocol converts domain names into IP addresses?", answer: `DNS

    Explanation:
    The Domain Name Server converts domain names to IP addresses.` },
    { question: "What feature on a network allows for prioritizing certain traffic?", answer: `QoS (Quality of Service)

    Explanation:
    When enabled, QoS can be set to prioritize certain types of traffic. An example would be when voice or video traffic is being used on a network.` },
    { question: "What Windows utility allows you to delete, create, or resize disk partitions?", answer: `Disk Management

    Explanation:
    To enter Disk Management on Windows 7, from the Control Panel, select System and Security > Create and format hard disk partitions.
    
    On Windows 8, Disk Management is invoked by pressing the Windows.Logo key and typing diskmgmt.msc.
    
    In Windows 10, Disk Management is invoked by pressing the Windows.Logo key and typing diskmgmt.msc. (same as in Windows 8)` },
    { question: "What Apple feature allows the user to use small motions on a trackpad to complete simple tasks, such as turning a page?", answer: `Gestures

    Explanation:
    Apple Gestures can be configured through System Preferences under Trackpad and provides personalization for the type of movement needed to accomplish a task.` },
    { question: "Looking at this will tell you your network ID, broadcast address, and number of host addresses available.", answer: `Subnet Mask

    Explanation:
    IP addresses are made up of 32 binary bits, which determine both the network address as well as the host address. To indicate which bits are network bits and which bits are host bits, IP addressing parameters include a subnet mask.
    
    The subnet mask is also made up of 32 bits, each subnet mask bit corresponding to a single bit in the IP address. If the IP address bit is a network bit, the subnet mask bit is set to “1”. If the corresponding IP address bit is a host bit, the corresponding netmask bit is set to “0”.` },
    { question: "From the command line prompt, what command is used to list the contents of a directory?", answer: `dir

    Explanation:
    The dir command will list the contents of a directory. It also has numerous options that allow the output to be displayed in numerous different configurations.` },
    { question: "What is the command prompt called on the macOS?", answer: `Terminal

    Explanation:
    Apple products and the macOS use the term Terminal when referring to the command prompt window.` },
    { question: "Linux tracks system events in log files. These entries are important when doing system maintenance. If left unattended, these log files can take up a large amount of disk space. Where are these log files saved and how can they be safely removed?", answer: `/var/log

    Explanation:
    Every system event is logged and available for system tuning and troubleshooting. These are located in the ‘/var/log’ directory. Log files can be deleted and will be replaced by new files as new events occur. You need to monitor the size of these files and understand that some files may need to be saved to help you spot trends. Log files are saved as text files, making them easy to view.` },
    { question: "Occasionally, users may opt to run Windows and Linux on the same system. This can be accomplished by setting up a virtual machine on Windows loaded to run Linux. This has the advantage of allowing the user to simultaneously run both operating systems. Setting up a dual boot system is another option. What advantage does running a dual boot system have over running virtual machines?", answer: `Using a dual boot option allows 100% of the system resources to the operating system.

    Explanation:
    When setting up a dual boot system using Windows and Linux, you should always load Windows first then Linux. This allows Linux to manage the boot sequence. The Linux boot manager works better than Windows boot manager.` },
    { question: "What command used in Debian-based Linux operating systems will update the operating system?", answer: `apt-get update

    Explanation:
    The command requires administrative permission to run, so from the command line, enter sudo apt-get update.` },
    { question: "A newer version of Ubuntu has become available. What command will accomplish upgrading your system to the new version?", answer: `sudo apt-get upgrade

    Explanation:
    The command requires administrative permission to run, so from the command line, enter sudo apt-get upgrade. Before doing an upgrade, it’s a good idea to update the system first with the sudo apt-get update command. Be sure you understand the significance of the sudo command used in many Linux releases.` },
    { question: "What email retrieval protocol allows users to synchronize email from a variety of devices?", answer: `IMAP

    Explanation:
    Of the two common email retrieval protocols, POP3 and IMAP, IMAP allows users to sync email from a variety of different devices.` },
    { question: "What is the Linux command used to back up a specific partition?", answer: `dd

    Explanation:
    The exact syntax depends on the location of the source partition being backed up (/dev/sda2) and the location of the backup image (/home/backup.img). In addition, you need supervisory permission to run the command su dd if=/dev/sda2 of=/home/backup.img.` },
    { question: "One of the strengths of the Linux operating system is the ability to use the output of one command as the input to another command, referred to as “piping.” How would you connect the output of the ls command and pipe it into the grep command, and what would this accomplish", answer: `ls | grep filename; This would provide a more efficient search.

    Explanation:
    This will cause a search for only lines that contain the filename. The ls command could give a listing of so many files that they would scroll by the screen too fast to view. Using the |
     (pipe) symbol, you take the output from ls and use it as input to the grep command. The grep command has an argument filename which tells grep to search for and list only lines that contain the filename.` },
     { question: "You are a system administrator working on a Linux server and need to turn off the system to do unscheduled maintenance. You want to give users a warning that the system will be shutdown in 10 minutes to do unscheduled maintenance, and it will be down for 15 minutes. What command would you use to notify the users and shutdown the system?", answer: `shutdown +10
     This would give, “Notice the system will shut down in 10 minutes for unscheduled maintenance. It will be down for 15 minutes.”
     
     Explanation:
     Be sure you understand all the options available with the shutdown command.` },
     { question: "What feature of Android and IOS smartphones allows users to make and receive calls using a WiFi connection?", answer: `WiFi Calling

     Explanation:
     When enabled on an Android or IOS phone, users can make and receive calls using a WiFi connection.` },
     { question: "What Linux command will list all currently running processes and applications?", answer: `ps

     Explanation:
     The ps command (process status) lists all running process and applications. Be familiar with the options available with the command.` },
     { question: "Port number 23 is associated with what network service?", answer: `Telnet

     Explanation:
     Become familiar with the most commonly used port numbers.` },
     { question: "Which Mac OS command lists IP address and MAC address information for your network interface card (NIC)?", answer: `ifconfig

     Explanation:
     The command ifconfig is closely related to ipconfig that is in a Windows environment. To view wireless adapter IP information, use the alternate iwconfig command.` },
     { question: "What command is used to access the default text editor in a Linux environment?", answer: `vi

     Explanation:
     In a Linux environment, the vi command allows you to access the text editor, which allows you to edit the text file. This is similar to Notepad in a Windows environment.` },
     { question: "Which Mac OS utility allows you to switch between open applications?", answer: `Mission Control

     Explanation:
     You can access Mission Control by pressing the corresponding key on the keyboard, or by simultaneously pressing the Ctrl key and the Up arrow key.` },
     { question: "Which server role is responsible for assigning IP address and DNS information to clients?", answer: `DHCP server

     Explanation:
     A DHCP server automates assigning all clients IP addresses to access the network. It can also be used to distribute other important information, such as DNS server locations.` },
     { question: "This feature in Mac operating systems can be used to store passwords, private keys, certificates, and secure notes.", answer: `Keychain

     Explanation:
     The Keychain feature in Mac operating systems is a tool used for password management. Items that can be stored in Keychain include passwords, private keys, certificates, and secure notes.` },
     { question: "This Linux command allows users to move a specified file to a different location.", answer: `mv

     Explanation:
     The mv command in Linux is the move command. This command allows a user to move a specified file to another location. Move would be similar to a cut and paste in Windows.` },
     { question: "This is a built-in Linux command to terminate processes.", answer: `kill

     Explanation:
     In Linux, the built-in command to terminate a process is the kill command. The kill command can be used to terminate a process using the name or PID.` },
     { question: "This is the default file manager for Mac operating systems.", answer: `Finder

     Explanation:
     The Finder is the default file manager for Mac operating systems (similar to the FIle Explorer program in Windows). Finder allows users to search for files, open files, and delete files from one location.` },
     { question: "This Mac OS feature creates an index of all the items and files on the system so that users can look them up easily.", answer: `Spotlight

     Explanation:
     Spotlight is a search feature on Mac operating systems. It creates an index of all the items and files on your system so you can look up items quickly.` },
     { question: "This can be used on Windows devices to manually allow or deny specific applications and network ports.", answer: `Windows Firewall

     Explanation:
     Windows comes with configurable firewall rules to allow or block certain applications or network ports and control the security. The Windows firewall can be manually configured to allow or deny applications and network ports.` },
     { question: "This Windows feature allows the user to continue working on network files when there is no current network connection, and synchronize the changes once connected again.", answer: `Offline files

     Explanation:
     Offline files is a feature that allows the user to continue working on network files when there is no current network connection, and synchronize the changes once connected again. Offline files are configured in the Sync Center.` },
     { question: "A wired connection most commonly uses what type of cabling to connect to a network?", answer: `Ethernet

     Explanation:
     The most common wired connection is achieved via an ethernet cable with a RJ45 connector.` },
     { question: "Where would you go to change the background on a Windows OS?", answer: `Personalization

     Explanation:
     The Personalization tab under the Settings menu allows for the customization of settings, such as background, font, and color.` },
     { question: "What command would you use to configure devices connected to a Windows OS?", answer: `devmgmt.msc

     Explanation:
     Device management allows the user to view the status of connected devices as well as to configure properties and parameters.` },
     { question: "What are four impacts that should be considered before installing an application?", answer: `the impact on the device, network, operation, and business

     Explanation:
     Before an application is installed on a system, especially one vital to business operations, the tangential impacts of the installation must be considered to anticipate any negative consequences of the installation.` },
     { question: "Which cell phone OS is open source?", answer: `Android

     Explanation:
     The Android OS is free and open source while the iOS is proprietary to Apple.` },

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
