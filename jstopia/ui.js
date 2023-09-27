export default class UI {
    /**
     * Module for handling UI
     * @param {string} id - The id of the element to attach to
     */
    constructor(id) {
        this.root = document.querySelector(`#${id}`);
        this.elements = {};
    }

    addElement(name, element, parent) {
        this.elements[name] = element;
        if (parent) {
            parent.appendChild(element);
        } else {
            this.root.appendChild(element);
        }
    }

    removeElement(element) {
        this.elements = this.elements.filter((e) => e !== element);
        element.remove();
    }

    init() {
        const output = document.createElement('div');
        output.style = `
            border: 1px solid black;
            width: 256px;
            height: 240px;
            box-sizing: border-box;
            overflow: scroll;
        `;
        this.addElement('debug', output);

        const romDataOutput = document.createElement('div');
        romDataOutput.style = `
            border: 1px solid black;
            overflow: scroll;
            width: 90%;
            height: 400px
            `;

        this.addElement('romData', romDataOutput);
    }
}
