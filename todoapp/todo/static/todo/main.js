var root = document.getElementById('main');



function getTodoItems() {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json'
    xhr.open("GET", "todoitems/", true);
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest') // required for is_ajax() to work
    xhr.onload = function () {
        if (xhr.readyState === 4) {
            // console.log(xhr.status)
            switch (xhr.status) {
                case 200:
                    showTodoItems(xhr.response)
                    break;
                case 300:
                    root.innerHTML = xhr.response.error
                    break;
                default:
                    break;
            }
        }

    }
    xhr.send();
}

function showTodoItems(response) {
    // console.log(response)
    var allItemsHTML = "";
    for (item of response) {
        currentItem = "<div class='card'><div class='card-body' >" + item.fields.title + "</div ></div >"
        allItemsHTML += currentItem
    }
    root.innerHTML = allItemsHTML
}

getTodoItems()