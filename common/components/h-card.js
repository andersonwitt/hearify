export class Card extends HTMLElement {
    connectedCallback() {
        const innerContent = this.innerHTML;

        if (innerContent) {
            this.innerHTML = `
            <div class="card" style="width: 18rem;">
                <div class="card-body">
                    ${innerContent}
                </div>
            </div>
            `;
        }
    }
}
