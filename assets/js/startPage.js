let mainInputId = 'search-text';
let rightFieldId  = 'right-field';

$(document).ready(() => {
    let mainInput = $('#' + mainInputId);
    let rightField = $('#' + rightFieldId);

    let fields = {
        right: rightField,
        left: null,
        top: null,
        bottom: null
    };

    mainInput.on('keypress keyup change blur', fields, mainInputChanged);
});

function mainInputChanged(event) {
    let inputText = event.target.value;
    let rightField = event.data.right;

    rightField.html(getRightList(inputText));
}

function getRightList(inputText) {

    let searchResult = searchByKeyPart(inputText);
    let result = JSON.stringify(searchResult);

    return result;
}

function getLeftList() {

}

function getTopList() {

}

function getBottomList() {

}