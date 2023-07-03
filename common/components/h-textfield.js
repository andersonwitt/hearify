export class Textfield extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <div class="w-100">
                <label for="${this.id ?? ""}" class="form-label">${
            this.label ?? ""
        }</label>
                <input type="${this.type ?? ""}" class="form-control" id="${
            this.id ?? ""
        }" placeholder="${this.placeholder ?? ""}">
            </div>
            `;
    }

    static get observedAttributes() {
        return ["label"];
    }

    attributeChangedCallback(name, _oldValue, newValue) {
        switch (name) {
            case "label":
                {
                    const element = this.querySelector("form-label");

                    if (element?.innerContent) {
                        element.innerContent = newValue;
                    }
                }
                break;
            case "placeholder": {
                const element = this.querySelector("form-control");

                if (element?.placeholder) {
                    element.placeholder = newValue;
                }
            }
            case "type": {
                const element = this.querySelector("form-control");

                if (element?.type) {
                    element.type = newValue;
                }
            }
        }
    }

    get label() {
        return this.getAttribute("label");
    }

    set label(label) {
        this.setAttribute("label", label);
    }

    get type() {
        return this.getAttribute("type");
    }

    set type(type) {
        this.setAttribute("type", type);
    }

    get placeholder() {
        return this.getAttribute("placeholder");
    }

    set placeholder(placeholder) {
        this.setAttribute("placeholder", placeholder);
    }
}
