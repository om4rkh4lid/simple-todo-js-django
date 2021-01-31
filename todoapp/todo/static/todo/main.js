const root = document.getElementById('list');
const form = document.getElementById('createItemForm');

form.addEventListener("submit", (event) => {
    event.preventDefault();
    // form = event.target
    formData = new FormData(form)
    handleFormSubmit(formData)
    form.reset()
    activeItem = null
})



getTodoItems()
