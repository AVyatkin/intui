
let bkg =  chrome.extension.getBackgroundPage();
bkg.console.log(document.getElementById('myButton'));

window.addEventListener('load', () => {
    let button = document.getElementById('myButton');
    let text = document.getElementById('myText');

    button.addEventListener('click', () => {

        bkg.console.log('Hello!');
        bkg.console.log(button);
        bkg.console.log(text);
    });
});
