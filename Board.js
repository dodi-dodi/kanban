const board = {
    name: 'Tablica Kanban',
    element: $('#board .column-container'),

    createColumn: column => {
        this.element.append(column.element);
        initSortable();
    },
};

$('.create-column').click(function() {
        let columnName = prompt('Wpisz nazwę kolumny');
        $.ajax({
            url: baseUrl + '/column',
            method: 'POST',
            data: {
                name: columnName
            },
            success: res => board.createColumn(new Column(res.id, columnName))
        });
    });

function initSortable() {
    let cardList = $('.card-list');

    cardList.sortable({
        connectWith: '.card-list',
        placeholder: 'card-placeholder'
    }).disableSelection();

    cardList.on("sortstop", function(event, ui) {
        let $card = $(ui.item[0]);
        let $column = $($card.closest('.column'));

        $.ajax({
            url: baseUrl + '/card/' + $card.data('id'),
            method: 'PUT',
            data: {
                bootcamp_kanban_column_id: $column.data('id'),
                name: $card.find('.card-description')[0].innerText
            }
        });
    } );
}
