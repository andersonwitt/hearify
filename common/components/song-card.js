export class SongCard extends HTMLElement {
    connectedCallback() {
        let image = ``;

        if (this.image) {
            image = `
            <div class="thumbnail" style="background-image: url(${
                this.image ?? ""
            });"></div>
            `;
        }

        this.innerHTML = `
        <div class="d-flex column-gap-2">
            <div id="thumbnail" style="position: static">
                ${image}
            </div>
            <section class="d-flex flex-column">
                <span class="fw-bold" id="song-name">${this?.song ?? ""}</span>
                <span class="text-white-50" id="artist-name">${
                    this?.artist ?? ""
                }</span>
            </section>
        </div>
        `;
    }

    attributeChangedCallback(name, _oldValue, newValue) {
        switch (name) {
            case "image": {
                const element = this.querySelector("#thumbnail");

                if (element?.innerContent) {
                    element.innerContent = `<div class="thumbnail" style="background-image="url(${newValue});"></div>`;
                }
                break;
            }
            case "song": {
                const element = this.querySelector("#song-name");

                if (element?.innerContent) {
                    element.innerContent = newValue;
                }
                break;
            }
            case "artist": {
                const element = this.querySelector("#artist-name");

                if (element?.innerContent) {
                    element.innerContent = newValue;
                }

                break;
            }
        }
    }

    static get observedAttributes() {
        return ["image", "song", "artist"];
    }

    get image() {
        return this.getAttribute("image");
    }

    set image(image) {
        this.setAttribute("image", image);
    }
    get song() {
        return this.getAttribute("song");
    }

    set song(song) {
        this.setAttribute("song", song);
    }
    get artist() {
        return this.getAttribute("artist");
    }

    set artist(artist) {
        this.setAttribute("artist", artist);
    }
}
