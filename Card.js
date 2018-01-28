class Card {
    constructor(id, name = 'Nie podano nazwy') {
        this.id = id;
        this.name = name;
        this.element = this.create();
        this.api = new Api('/card/' + this.id);
    }

    create() {
        let card = $('<li class="card" data-id="' + this.id + '"></li>');
        let cardDelete = $('<button class="btn-delete">x</button>');
        let cardDescription = $('<p class="card-description"></p>');

        // NODE EVENTS LISTENERS
        cardDelete.click(() => this.remove());

        // NEW CARD ELEMENT CREATION
        card.append(cardDelete);
        cardDescription.text(this.name);
        card.append(cardDescription);
        return card;
    }

    remove() {
        this.api.remove(() => this.element.remove());
    }
}
