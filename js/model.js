export default class Model {
    constructor() {
        this.view = null;
        this.todos = JSON.parse(localStorage.getItem('todos'));
        if (!this.todos || this.todos.length < 1) {
            this.todos = [
                {
                    id: 0,
                    title: 'Learn To Code',
                    description: 'Code a todo-list'
                }
            ]
            this.currentId = 1;
        } else {
            this.currentId = this.todos[this.todos.length - 1].id + 1;
        }
    }

    setView(view) {
        this.view = view;
    }

    saveData() {
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }

    findTodo(id) {
        return this.todos.findIndex((todo) => todo.id == id);
    }

    getTodos() {
        return this.todos.map((todo) => ({...todo}));
    }

    addTodo(title, description) {
        const todo = {
            id: this.currentId++,
            title,
            description
        }

        this.todos.push(todo);
        this.saveData();
        
        return {...todo};
    }

    editTodo(id, title, description) {
        const index = this.findTodo(id);
        const todo = this.todos[index];
        todo.title = title;
        todo.description = description;
        this.saveData();
    }

    removeTodo(id) {
        const index = this.findTodo(id);
        this.todos.splice(index, 1);
        this.saveData();
    }
}