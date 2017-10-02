var board = {
    name: 'Tablica Kanban',
    createColumn: function(column) {
        this.element.append(column.element);
        initSortable();
    },
    element: $('#board .column-container')
};

$('.create-column').click(function() {
        var columnName = prompt('Wpisz nazwę kolumny');
        $.ajax({
            url: baseUrl + '/column',
            method: 'POST',
            data: {
                name: columnName
            },
            success: function(response){
                var column = new Column(response.id, columnName);
                board.createColumn(column);
            }
        });
    });

function initSortable() {
    var cardList = $('.card-list');

    cardList.sortable({
        connectWith: '.card-list',
        placeholder: 'card-placeholder'
    }).disableSelection();

    cardList.on("sortstop", function(event, ui) {
        var $card = $(ui.item[0]);
        var $column = $($card.closest('.column'));

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
