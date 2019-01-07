const mainInputId = 'search-text';
const leftFieldId  = 'left-field';
const rightFieldId  = 'right-field';
const updateHotCutInputId = 'update-hot-cut-input';
const saveButtonId = 'save-button';

const leftCode = 37;
const upCode = 38;
const rightCode = 39;
const downCode = 40;

let equalHref = null;

$(document).ready(() => {
    let mainInput = $('#' + mainInputId);
    let leftField = $('#' + leftFieldId);
    let rightField = $('#' + rightFieldId);
    let updateHotCutInput = $('#' + updateHotCutInputId);
    let saveButton = $('#' + saveButtonId);

    let fields = {
        main: mainInput,
        right: rightField,
        left: null,
        top: null,
        bottom: null,
        updateField: updateHotCutInput
    };

    mainInput.on('keypress keyup change blur', fields, mainInputChanged);
    mainInput.keydown(handleArrows);

    saveButton.on('click', fields, saveHotCut);

    mainInput.focus();
});

function mainInputChanged(event) {
    let inputText = event.target.value;
    let rightField = event.data.right;

    let searchResult = searchByKeyPart(inputText);
    if(searchResult['equal'] !== undefined && searchResult['equal'].value !== undefined)
        equalHref = searchResult['equal'].value;
    else
        equalHref = null;

    let rightList = getRightList(searchResult);
    rightField.html(rightList);
    handleGoButton();
}

function handleArrows(event) {
    if(event.keyCode === rightCode){
        console.log('handleArrows', equalHref);
        if(equalHref !== null)
            goToHref(equalHref);
    }
}

function getRightList(searchResult) {

    let result = 'Equal:';
    if (searchResult['equal'] !== undefined)
        result += '<br><a href="' + searchResult['equal'].value + '" target="_blank">' + searchResult['equal'].key +
            ': ' + searchResult['equal'].value + '</a>' +
            '<button class="go-button" data-href="' + searchResult['equal'].value + '">go</button>';

    result += '<hr>Partial:';

    for (let key in searchResult['partial']){
        let item = searchResult['partial'][key];
        result += '<br><a href="' + item.value + '" target="_blank">' + item.key + ': ' + item.value + '</a>';
    }

    return result;
}

function getLeftList() {

}

function getTopList() {

}

function getBottomList() {

}

function goToHref(href) {
    document.location.href = href;
}

function handleGoButton() {
    $('.go-button').on('click', (event) => {
        document.location.href = event.target.dataset.href;
    });
}

function saveHotCut(event) {

    let key = event.data.main.val();
    let value = event.data.updateField.val();

    if(key.toString() !== '' && value.toString() !== '')
        updateHotCut(key, value);
}