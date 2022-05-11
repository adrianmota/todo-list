document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('add');
    const table = document.getElementById('table');
    const title = document.getElementById('title');
    const description = document.getElementById('description');
    const alert = document.getElementById('alert');
    let id = 1;

    function removeTodo(id) {
        document.getElementById(id).remove();
    }
    
    function addTodo() {
        if (title.value === '' || description.value === '') {
            alert.innerText = 'Title and description are required';
            alert.classList.add('alert');
            return;
        }

        alert.classList.remove('alert');
        alert.innerText = '';

        const row = table.insertRow();
        row.setAttribute('id', id++);
        row.innerHTML = `
            <td>${title.value}</td>
            <td>${description.value}</td>
            <td class="text-right">
                <button id="edit-btn" type="button" class="btn-secondary">Edit</button>
            </td>
        `;

        removeBtn = document.createElement('button');
        removeBtn.classList.add('btn-danger');
        removeBtn.innerText = 'Delete';
        row.children[2].appendChild(removeBtn);
        //removeBtn.onclick = (e) => console.log(e.target.parentElement.parentElement.id);
        //removeBtn.onclick = () => removeTodo(row.getAttribute('id'));
    };

    btn.onclick = addTodo;
});