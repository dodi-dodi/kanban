class Board {
    constructor() {
        this.element = $('#board .column-container')
    }

    addColumn(column) {
        this.element.append(column.element);
        this.initSortable();
    }

    initSortable() {
        let cardList = $('.card-list');

        cardList.sortable({
            connectWith: '.card-list',
            placeholder: 'card-placeholder'
        }).disableSelection();

        cardList.on("sortstop", function (event, ui) {
            let $card = $(ui.item[0]);
            let $column = $($card.closest('.column'));
            let api = new Api('/card/' + $card.data('id'));

            api.update({
                bootcamp_kanban_column_id: $column.data('id'),
                name: $card.find('.card-description')[0].innerText
            });
        });
    }
}
