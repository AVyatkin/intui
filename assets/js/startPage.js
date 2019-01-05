let mainInputId = 'search-text';
let rightFieldId  = 'right-field';

$(document).ready(() => {
    let mainInput = $('#' + mainInputId);
    let rightField = $('#' + rightFieldId);

    mainInput.on('keypress keyup change blur', rightField, mainInputChanged);
});

function mainInputChanged(event) {
    event.data.html(event.target.value);
}