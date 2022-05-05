// function lgFormatter(value, row, index) {
//     if (value === "perfmeter") {
//         return '<img src="assets/ico/jmeter.png" width="20">'
//     } else if (value === "perfgun") {
//         return '<img src="assets/ico/gatling.png" width="20">'
//     } else {
//         return value
//     }
// }

function updateCell(el, row, field) {
    $(el.closest('table')).bootstrapTable('updateCell', {index: row, field: field, value: el.value})
}

const compareValues = (value1, value2) => value1.toLowerCase() === value2.toLowerCase()

const severityOptions = [
    {name: 'critical', className: 'colored-select-red'},
    {name: 'high', className: 'colored-select-orange'},
    {name: 'medium', className: 'colored-select-yellow'},
    {name: 'low', className: 'colored-select-green'},
    {name: 'info', className: 'colored-select-blue'},
]

const statusOptions = [
    {name: 'valid', className: 'colored-select-red'},
    {name: 'false positive', className: 'colored-select-blue'},
    {name: 'ignored', className: 'colored-select-darkblue'},
    {name: 'not defined', className: 'colored-select-notdefined'},
]

function tableSeverityButtonFormatter(value, row, index) {
    return tableColoredSelectFormatter(value, row, index, severityOptions, 'severity')
}

function tableStatusButtonFormatter(value, row, index) {
    return tableColoredSelectFormatter(value, row, index, statusOptions, 'status')
}

const tableColoredSelectFormatter = (value, row, index, optionsList, fieldName) => {
    const options = optionsList.map(item => `
        <option 
            class="${item.className}" 
            ${compareValues(item.name, value) ? 'selected' : ''}
        >
            ${item.name.toUpperCase()}
        </option>
    `);
    const unexpectedValue = optionsList.find(item => compareValues(item.name, value))
    unexpectedValue === undefined && options.push(`<option selected>${value}</option>`)

    return `
        <select 
            class="selectpicker btn-colored-select mr-2 btn-colored-table" 
            data-style="btn-colored" 
            onchange="updateCell(this, '${index}', '${fieldName}')"
        >
            ${options.join('')}
        </select>
    `
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
    $('.params-table').on('all.bs.table', () => {
        $('.selectpicker').selectpicker('render')
    })
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

