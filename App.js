class App {
    constructor() {
        this.board = new Board();
        this.columnApi = new Api('/column/');
        this.boardApi = new Api('/board/');
    }
    create() {
        $('.create-column').click(() => {
            let columnName = prompt('Wpisz nazwę kolumny');
            this.columnApi.create({
                name: columnName
            }, res => this.board.addColumn(new Column(res.id, columnName)));
        });

        this.boardApi.fetch(res => this.setupColumns(res.columns));
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
