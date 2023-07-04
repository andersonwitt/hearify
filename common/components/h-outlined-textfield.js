export class OutlinedTextfield extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <style>
            @import url(../../root.css);

            input {
                all: unset;
            }

            .outlined-textfield {
                background-color: var(--bg-color);
                border-radius: 5px;
            }

            button {
                all:unset;
            }
        </style>

        <div class="py-1 px-2 outlined-textfield d-flex column-gap-2">
            <button type="button">
                <i class="bi bi-search"></i>
            </button>
            <input id="outlined-text" type="text" />
            </input>
        </div>  
        `;
    }
}
