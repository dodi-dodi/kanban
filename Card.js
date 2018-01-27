class Card {
    constructor(id, name) {
        this.id = id;
        this.name = name || 'Nie podano nazwy';
        this.element = this.create();
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
        $.ajax({
            url: baseUrl + '/card/' + this.id,
            method: 'DELETE',
            success: () => this.element.remove(),
        });
    }
}
