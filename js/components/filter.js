export default class Filter {
    constructor() {
        this.input = document.getElementById('search-input');
        this.btn = document.getElementById('search');
    }

    onClick(callback) {
        this.btn.onclick = (event) => {
            event.preventDefault();
            callback(this.input.value);
        }
    }
}