export class HButton extends HTMLElement {
    connectedCallback() {
        const innerContent = this.innerHTML;

        if (innerContent) {
            this.innerHTML = `
            <button type="${this.type}" class="btn btn-danger w-100">
                ${innerContent}
            </button>
            `;
        }
    }
}
