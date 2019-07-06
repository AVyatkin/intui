/* Popup js */

const mainInputId = 'search-text';
const leftFieldId  = 'left-field';
const rightFieldId  = 'right-field';
const updateHotCutInputId = 'update-hot-cut-input';
const saveButtonId = 'save-button';
const searchInfoId = 'search-info';
const showAllItemsId = 'show-all-items';

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

    let fields = {
        main: mainInput,
        right: rightField,
        left: null,
        top: null,
        bottom: null,
        url: updateHotCutInput,
    };

    mainInput.on('keypress keyup change blur', fields, mainInputChanged);
    mainInput.keydown(handleArrows);
    $('#' + saveButtonId).click(fields, saveHotCut);
    mainInput.focus();
    updateShowList();
    $('#' + showAllItemsId).click(showAllItems);
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
        if(equalHref !== null){
            goToHref(equalHref);
            window.close();
        }
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
    window.open(href);
}

function handleGoButton() {
    $('.go-button').on('click', (event) => {
        document.location.href = event.target.dataset.href;
    });
}

function saveHotCut(event) {

    let key = event.data.main.val();
    let value = event.data.url.val();

    if(key.toString() !== '' && value.toString() !== ''){
        updateHotCut(key, value);
        clearInputFields(event.data.main, event.data.url);
        showInfo('[' + key + '->' + value + '] Saved')
    }

    updateShowList();
}

function updateShowList() {
    let leftField = $('#' + leftFieldId);
    let list = getHotCutList();
    leftField.html(list);
    for (let key in list) {
        leftField.append('<div>'+key+' : '+list[key]+'</div>');
    }
}

function showInfo(text) {
    $('#' + searchInfoId).html(text);
}

function showAllItems() {
    let items = getHotCutList();
    let strings = [];
    for (let key in items) {
        strings.push(key + ' => ' + items[key]);
    }
    showInfo(strings.join('<br>'));
}

function clearInputFields(key, value) {
    key.val('');
    value.val('');
}