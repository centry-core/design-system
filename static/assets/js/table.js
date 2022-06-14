function updateCell(el, row, field) {
    $(el.closest('table')).bootstrapTable('updateCell', {index: row, field: field, value: el.value})
}

function checkboxFormatter (value, row, index, field) {
    const isChecked = value.checked ? 'checked' : ''
    return `
        <label
            class="mb-0 w-100 d-flex align-items-center custom-checkbox">
            <input
                value="${value.checked}"
                onchange="updateCell(this, '${index}', '${field}', '${value.title}')" 
                ${isChecked}
                type="checkbox">
            <span class="w-100 d-inline-block ml-3">${value.title}</span>
        </label>
    `
}

function nameStyle(value, row, index) {
    return {css: {"max-width": "100px", "overflow": "hidden", "text-overflow": "ellipsis", "white-space": "nowrap"}}
}



function detailFormatter(index, row) {
    var html = []
    html.push('<div style="padding-left: 30px"><p><b>Method:</b> ' + row['Method'] + '</p>')
    html.push('<p><b>Request Params:</b> ' + row['Request params'] + '</p>')
    html.push('<p><b>Headers:</b> ' + row['Headers'] + '</p>')
    html.push('<p><b>Response body:</b></p></div>')
    return html.join('')
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
