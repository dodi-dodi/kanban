var baseUrl = 'https://kodilla.com/pl/bootcamp-api';

$.ajaxSetup({
    headers: {
        'X-Client-Id': '1935',
        'X-Auth-Token': '66408993e1b309378d6d525cf413a2ed'
    }
});

$.get(baseUrl + '/board').done(function(res) {
    setupColumns(res.columns);
});

function setupColumns(columns) {
    columns.forEach(function (column) {
        var col = new Column(column.id, column.name);
        board.createColumn(col);
        setupCards(col, column.cards);
    });
}

function setupCards(col, cards) {
    cards.forEach(function (card) {
        card = new Card(card.id, card.name, card.bootcamp_kanban_column_id);
        col.createCard(card);
    })
}
