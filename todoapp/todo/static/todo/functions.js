var activeItem = null


function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
const csrftoken = getCookie('csrftoken');


function showTodoItems(response) {
    for (item of response) {
        addNewItem(root, item)
    }
    setEventListeners(root)
}



var setEventListeners = function (root) {
    var titleItems = document.getElementsByClassName('todotitle')
    for (let element of titleItems) {
        element.addEventListener('click', function () {
            element.classList.toggle('done')
            let rootItem = element.parentElement
            changeItemStatus(rootItem.dataset.id)
        })
    }
    var editBtns = document.getElementsByClassName('btn-warning')
    for (let element of editBtns) {
        element.addEventListener('click', function () {
            // console.log(element.parentElement.parentElement.dataset.id)
            let rootItem = element.parentElement.parentElement
            activeItem = rootItem.dataset.id
            // console.log(rootItem.children[0].innerHTML)
            form.title.value = rootItem.children[0].innerHTML
        })
    }
    var delBtns = document.getElementsByClassName('btn-danger')
    for (let element of delBtns) {
        element.addEventListener('click', function () {
            let rootItem = element.parentElement.parentElement
            deleteItem(rootItem.dataset.id)
            rootItem.remove()
        })
    }
}

function addNewItem(root, item) {
    strike = item.fields.is_done ? "done" : ""
    console.log(strike)
    currentItem = `<div class="mb-1 container todoitem row" data-id=${item.pk}>
            <div class= "col-10 todotitle ${strike}" >${item.fields.title}</div >
            <div class= "col-1" >
                <button type="button" class="btn btn-warning">Edit</button>
            </div >
            <div class= " col-1" >
                <button type="button" class="btn btn-danger">-</button>
            </div >
        </div >`
    root.innerHTML += currentItem
}

function showResultAlert(response, status) {
    var alert = document.getElementById('resultAlert');
    var type = "d-block alert ";
    console.log(response)
    if (status >= 200 && status < 300) {
        type += 'alert-success'
    } else if (status === 500) {
        response.result = 'internal server error';
    } else {
        type += 'alert-danger'
    }
    alert.className = type

    alert.innerHTML = response.result;

    setTimeout(() => {
        alert.classList.remove('d-block');
        alert.classList.add('d-none');
    }, 2000);
}

var getTodoItems = function () {

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json'
    xhr.open("GET", "todoitems/", true);
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest') // required for is_ajax() to work
    xhr.onload = function () {
        if (xhr.readyState === 4) {
            // console.log(xhr.status)
            switch (xhr.status) {
                case 200:
                    root.innerHTML = ""
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

function handleFormSubmit(form) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json'
    let url;
    if (activeItem != null) {
        url = `update/${activeItem}`
    } else {
        url = `create/`
    }
    xhr.open("POST", url, true);
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest') // required for is_ajax() to work
    xhr.onload = function () {
        if (xhr.readyState === 4) {
            root.innerHTML = ""
            getTodoItems()
            showResultAlert(xhr.response, xhr.status)
        }
    }
    xhr.send(form);
}


function deleteItem(item) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json'
    xhr.open("POST", `delete/${item}`, true);
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest') // required for is_ajax() to work
    xhr.setRequestHeader('X-CSRFToken', `${csrftoken}`)
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log("item " + item + " deleted successfully!")
        }
    }
    xhr.send();
}


function changeItemStatus(item) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json'
    xhr.open("POST", `updateStatus/${item}`, true);
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest') // required for is_ajax() to work]
    xhr.setRequestHeader('X-CSRFToken', `${csrftoken}`)
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log("item " + item + " status updated successfully!")
            console.log(xhr.response)
        }
    }
    xhr.send();
} 