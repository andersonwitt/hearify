import { Card } from "./common/components/h-card.js";
import { Textfield } from "./common/components/h-textfield.js";
import { OutlinedTextfield } from "./common/components/h-outlined-textfield.js";
import { HButton } from "./common/components/h-button.js";
import { SongCard } from "./common/components/song-card.js";
import { Avatar } from "./common/components/h-avatar.js";


customElements.define("h-card", Card);
customElements.define("h-textfield", Textfield);
customElements.define("h-button", HButton);
customElements.define("song-card", SongCard);
customElements.define("outlined-textfield", OutlinedTextfield);
customElements.define("h-avatar", Avatar);
