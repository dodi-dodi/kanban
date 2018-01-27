const baseUrl = 'https://kodilla.com/pl/bootcamp-api';
$.ajaxSetup({
    headers: {
        'X-Client-Id': '1935',
        'X-Auth-Token': '66408993e1b309378d6d525cf413a2ed'
    }
});

class App {
    constructor() {
        this.board = new Board();
    }
    create() {
        $('.create-column').click(() => {
            let columnName = prompt('Wpisz nazwę kolumny');
            $.ajax({
                url: baseUrl + '/column',
                method: 'POST',
                data: {
                    name: columnName
                },
                success: res => this.board.addColumn(new Column(res.id, columnName))
            });
        });

        $.get(baseUrl + '/board').done(res => this.setupColumns(res.columns));
    }

    setupColumns(columns) {
        columns.forEach(column => {
            let col = new Column(column.id, column.name);
            this.board.addColumn(col);
            this.setupCards(col, column.cards);
        });
    }

    setupCards(col, cards) {
        cards.forEach(card => {
            card = new Card(card.id, card.name, card.bootcamp_kanban_column_id);
            col.addCard(card);
        })
    }
}

const app = new App();
app.create();
