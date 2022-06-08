function updateCell(el, row, field) {
    $(el.closest('table')).bootstrapTable('updateCell', {index: row, field: field, value: el.value})
}


function nameStyle(value, row, index) {
    return {css: {"max-width": "100px", "overflow": "hidden", "text-overflow": "ellipsis", "white-space": "nowrap"}}
}


wait_for('bootstrapTable', jQuery.fn).then(v => (
    function ($) {
        'use strict';
        $.fn.bootstrapTable.locales['en-US-custom'] = {
            formatRecordsPerPage: function (pageNumber) {
                return `<span style="position: relative; top: 3px">Show: </span>${pageNumber}`;
            },
            formatShowingRows: function (pageFrom, pageTo, totalRows) {
                return `${totalRows} items`;
            },
            formatDetailPagination: function (totalRows) {
                return `${totalRows} items`;
            },
        };

        $.extend($.fn.bootstrapTable.defaults, $.fn.bootstrapTable.locales['en-US-custom']);
    })(jQuery)
)


$(document).on('vue_init', () => {
    // script fot tables with vue.js when injected event (vue_init)

    $('.table').on('all.bs.table', () => {
        $('.selectpicker').selectpicker('render')
        initColoredSelect();
    })
    initColoredSelect();
    $('.selectpicker').selectpicker('render')
})


// script fot tables without vue.js
$('.table').on('all.bs.table', () => {
    $('.selectpicker').selectpicker('render');
})
