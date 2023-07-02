export class TextField extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <label class="mdc-text-field mdc-text-field--outlined">
          <span class="mdc-notched-outline">
            <span class="mdc-notched-outline__leading"></span>
              <span class="mdc-notched-outline__notch">
                <span class="mdc-floating-label" id="h-label-id">${this.label}</span>
                </span>
              <span class="mdc-notched-outline__trailing"></span>
            </span>
          <input type="text" class="mdc-text-field__input" aria-labelledby="h-label-id">
        </label>`;

        mdc.textField.MDCTextField.attachTo(
            document.querySelector(".mdc-text-field")
        );
    }

    static get observedAttributes() {
        return ["label"];
    }

    attributeChangedCallback(name, _oldValue, newValue) {
        switch (name) {
            case "label":
                const element = this.querySelector("#h-label-id");
                if (element?.innerContent) {
                    element.innerContent = newValue;
                }
                break;
        }
    }

    get label() {
        return this.getAttribute("label");
    }

    set label(label) {
        this.setAttribute("label", label);
    }
}
