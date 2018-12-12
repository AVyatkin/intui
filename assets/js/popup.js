
let bkg =  chrome.extension.getBackgroundPage();
bkg.console.log(document.getElementById('myButton'));

window.addEventListener('load', () => {

    let button2 = document.querySelector('#button2');
    button2.addEventListener('click', () => {
        button2.innerHTML = 'Changed text';
        console.log('on popup button click');
    });

    console.log(this);

    console.log('popup on load');

});
