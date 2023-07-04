export class Avatar extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <style>
            .avatar {
                border-radius: 50%;
                width: 50px;
                height: 50px;
                background-size: cover;
                background-position: center;
            }
        </style>
        <div id="avatar">
            <div 
            class="avatar"
            style="background-image: url(https://res.cloudinary.com/dvsngzeti/image/upload/f_auto,q_auto/v1/hearify/images/wyxqchczvldtiumuvmhy);"
            ></div>
        </div>
        `;
    }

    attributeChangedCallback(name, _oldValue, newValue) {
        switch (name) {
            case "image": {
                const element = this.querySelector("#avatar");

                if (element?.innerContent) {
                    element.innerContent = `
                            <div 
                            class="avatar"
                            style="background-image: url(${newValue});"
                            ></div>
                        `;
                }
                break;
            }
        }
    }

    static get observedAttributes() {
        return ["image"];
    }

    get image() {
        return this.getAttribute("image");
    }

    set image(image) {
        return this.setAttribute("image", image);
    }
}
