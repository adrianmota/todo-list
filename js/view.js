import AddTodo from './components/addtodo.js';
import Modal from './components/modal.js';
import Filter from './components/filter.js';

export default class View {
    constructor() {
        this.model = null;
        this.table = document.getElementById('table');
        this.addTodoObj = new AddTodo();
        this.modal = new Modal();
        this.filters = new Filter();

        this.addTodoObj.onClick((title, description) => this.addTodo(title, description));
        this.modal.onClick((id, title, description) => this.editTodo(id, title, description));
        this.filters.onClick((pattern) => this.filter(pattern));
    }

    setModel(model) {
        this.model = model;
    }

    render() {
        const todos = this.model.getTodos();
        todos.forEach((todo) => this.createRow(todo));
    }

    filter(pattern) {
        const [, ...rows] = table.getElementsByTagName('tr');
        for (const row of rows) {
            const [ title, description ] = [row.children[0].innerText, row.children[1].innerText];
            let shouldHide = false;

            if (pattern) {
                shouldHide = !title.includes(pattern) && !description.includes(pattern);
            } else {
                row.classList.remove('d-none');
            }

            if (shouldHide) {
                row.classList.add('d-none');
            } else {
                row.classList.remove('d-none');
            }
        }
    }

    addTodo(title, description) {
        const todo = this.model.addTodo(title, description);
        this.createRow(todo);
    }

    removeTodo(id) {
        this.model.removeTodo(id);
        document.getElementById(id).remove();
    }

    editTodo(id, title, description) {
        this.model.editTodo(id, title, description);
        const row = document.getElementById(id);
        row.children[0].innerText = title;
        row.children[1].innerText = description;
    }

    createRow(todo) {
        const row = this.table.insertRow();
        row.setAttribute('id', todo.id);
        row.innerHTML = `
            <td>${todo.title}</td>
            <td>${todo.description}</td>
            <td class="text-right"></td>
        `;

        const editBtn = document.createElement('button');
        editBtn.classList.add('btn-secondary');
        editBtn.innerText = 'Edit';
        row.children[2].appendChild(editBtn);
        editBtn.onclick = () =>{
            this.modal.setValues(todo.id, row.children[0].innerText, row.children[1].innerText); 
            this.modal.show();
        };

        const removeBtn = document.createElement('button');
        removeBtn.classList.add('btn-danger');
        removeBtn.innerText = 'Delete';
        row.children[2].appendChild(removeBtn);
        removeBtn.onclick = () => this.removeTodo(row.getAttribute('id'));
    }
}