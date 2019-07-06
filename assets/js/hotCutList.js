/* Hot-cut list */

const hotCutListLocalKey = 'intui_hot_list';

/* Add or update item */
function updateHotCut(key, value) {
    if (!!key && !!value) {
        let list = getHotCutList();
        list[key] = value;
        updateHotCutList(list);
    }
}

// Get hole list
function getHotCutList() {
    return  Object.assign({}, JSON.parse(localStorage.getItem(hotCutListLocalKey)));
}

// Update hole list
function updateHotCutList(data) {
    localStorage.setItem(hotCutListLocalKey, JSON.stringify(data));
}

// Remove one key value
function removeHotCut(key) {
    let list = getHotCutList();
    delete list[key];
    updateHotCutList(list);
}

function searchByKeyPart(keyPart) {
    let result = {};
    let list = getHotCutList();
    if (!!keyPart) {
        result['partial'] = [];
        for (let key in list) {
            let pos = key.indexOf(keyPart);
            if (key === keyPart){
                result['equal'] = {key:key, value:list[key]};
            }
            else if(pos !== -1){
                result['partial'].push({key:key, value:list[key]});
            }
        }
    }

    return result;
}