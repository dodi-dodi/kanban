class Column {
    constructor(id, name = 'Nie podano nazwy') {
        this.id = id;
        this.name = name;
        this.element = this.create();
        this.cardApi = new Api('/card/');
        this.columnApi = new Api('/column/' + this.id);
    }

    create() {
        // NEW NODES CREATION
        let column = $('<div class="column" data-id="' + this.id + '"></div>');
        let columnTitle = $('<h2 class="column-title">' + this.name + '</h2>');
        let columnCardList = $('<ul class="card-list"></ul>');
        let columnDelete = $('<button class="btn-delete btn-delete-border">x</button>');
        let columnAddCard = $('<button class="column-add-card">Dodaj kartę</button>');

        // NODE EVENTS LISTENERS
        columnDelete.click(() => this.remove());
        columnAddCard.click(event => {
            let cardName = prompt("Wpisz nazwę karty");
            event.preventDefault();

            this.cardApi.create({
                name: cardName,
                bootcamp_kanban_column_id: this.id
            }, res => this.addCard(new Card(res.id, cardName)));
        });
        // NEW COLUMN ELEMENT CREATION
        column.append(columnTitle)
            .append(columnDelete)
            .append(columnAddCard)
            .append(columnCardList);
        return column;
    }

    remove() {
        this.columnApi.remove(() => this.element.remove());
    }

    addCard(card) {
        this.element.children('ul').append(card.element);
    }
}
