/* Hot-cut list */

const hotCutListLocalKey = 'hotCutList';

/* Add or update item */
function updateHotCut(key, value) {
    let list = getHotCutList();
    list[key] = value;
    updateHotCutList(list);
}

function getHotCutList() {
    return  Object.assign({}, JSON.parse(localStorage.getItem(hotCutListLocalKey)));
}

function updateHotCutList(data) {
    localStorage.setItem(hotCutListLocalKey, JSON.stringify(data));
}

function removeHotCut(key) {
    let list = getHotCutList();
    delete list[key];
    updateHotCutList(list);
}

function searchByKeyPart(keyPart) {
    let result = {};
    let list = getHotCutList();
    for (let key in list) {
        let pos = key.indexOf(keyPart);

        if (key === keyPart)
            result['equal'] = {key:key, value:list[key]};

        else if(pos !== -1)
            result['partial'] = {key:key, value:list[key]};
    }

    return result;
}