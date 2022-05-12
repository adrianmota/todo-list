import Alert from './alert.js';

export default class Modal {
    constructor() {
        this.modal = document.getElementById('modal');
        this.modalContent = document.getElementById('modal-content');
        this.title = document.getElementById('modal-title');
        this.description = document.getElementById('modal-description');
        this.cancel = document.getElementById('modal-cancel');
        this.save = document.getElementById('modal-save');
        this.modalExit = document.getElementById('modal-exit');
        this.alert = new Alert('modal-alert');
        this.todo = null;
    }

    setValues(id, title, description) {
        this.todo = {id, title, description};
        this.title.value = this.todo.title;
        this.description.value = this.todo.description;
    }

    onClick(callback) {
        this.save.onclick = () => {
            if (!this.title.value || !this.description.value) {
                this.alert.show('Title and description are required');
                return;
            }
    
            this.alert.hide();
            callback(this.todo.id, this.title.value, this.description.value);
            this.hide();
        }
    }

    show() {
        this.modal.style.animationName = 'downmodal';
        this.modalContent.style.boxShadow = '0px 0px 0px 1200px rgba(0,0,0,0.5),0 6px 20px 0 rgba(0,0,0,0.19)';
        this.modal.style.display = 'block';
        this.modal.style.top = '0';
        this.cancel.onclick = () => this.hide();
        this.modalExit.onclick = () => this.hide();
        window.onclick = (event) => {
            if (event.target == modal) {
                this.hide();
            };
        };
        this.modalContent.onclick = () => this.modalContent.style.display = 'flex';
    }

    hide() {
        this.modal.style.animationName = 'upmodal';
        this.modal.style.top = '-710px';
        this.modalContent.style.animationName = 'reduce-shadow';
        this.modalContent.style.boxShadow = '0px 0px 0px 1200px rgba(0,0,0,0),0 6px 20px 0 rgba(0,0,0,0.19)';
    }
}