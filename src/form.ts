export class Form {
    private form: HTMLElement;

    constructor() {
        this.form = document.createElement("div");
    }

    makeForm() {
        this.form.innerHTML = 
            '<form>'+
                '<fieldset>'+
                    'X: <input type="text" id="xFormInput" value="1" oninput="selectedCoordsByForm()">'+
                    'Y: <input type="text" id="yFormInput" value="1" oninput="selectedCoordsByForm()">'+
                    '<input id="botonDisparo" type="button" value="Shoot!" onclick="shoot()">'+
                '</fieldset>'+
            '</form>';
    }

    
}