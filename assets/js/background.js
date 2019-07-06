let bkg =  chrome.extension.getBackgroundPage();
console.log('Start background.js');

chrome.commands.onCommand.addListener(function (command) {
    console.log('command: ' + command);
    if (command === "open") {
        console.log('open search windows');
        let width = 600;
        chrome.windows.create({
            url:'html/popup.html',
            type:"popup",
            width: width,
            height: 300,
            left: Math.round(Math.max(window.screen.availWidth - width, 0) / 2)
        });
    }
});