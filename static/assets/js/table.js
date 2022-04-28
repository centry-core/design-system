function lgFormatter(value, row, index) {
    if (value === "perfmeter") {
        return '<img src="assets/ico/jmeter.png" width="20">'
    } else if (value === "perfgun") {
        return '<img src="assets/ico/gatling.png" width="20">'
    } else {
        return value
    }
}

function inputFormatter(value, row, index, field) {
    return `<div class="custom-input">
        <input
            type="text"
            placeholder="Text"
            onchange="updateCell(this, '${index}', '${field}')" value="${value}">
    </div>`
}

function updateCell(el, row, field, title = '') {

    $(el.closest('table')).bootstrapTable('updateCell', {index: row, field: field, value: { checked: el.checked, title: title }})
}

function checkboxFormatter (value, row, index, field) {
    const isChacked = value.checked ? 'checked' : ''
    return `
        <label
            class="mb-0 w-100 d-flex align-items-center custom-checkbox">
            <input
                value="${value.checked}"
                onchange="updateCell(this, '${index}', '${field}', '${value.title}')" 
                ${isChacked}
                type="checkbox">
            <span class="w-100 d-inline-block ml-3">${value.title}</span>
        </label>
    `
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
    {name: 'ignored',  className: 'colored-select-darkblue'},
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

function dataTypeFormatter(value, row, index, field) {
    const options = ['String', 'Number', 'List'].map(item =>
        `<option 
            value=${item} 
            ${item.toLowerCase() === value.toLowerCase() ? 'selected' : ''}
        >
            ${item}
        </option>
        `
    )
    return `
        <select class="selectpicker mr-2" data-style="btn-gray" onchange="updateCell(this, '${index}', '${field}')">
            ${options.join('')}
        </select>
    `
}

const addEmptyParamsRow = source => {
    $(source).closest('.section').find('.params-table').bootstrapTable(
        'append',
        {"name": "", "default": "", "type": "string", "description": "", "action": ""}
    )
}


function parametersDeleteFormatter(value, row, index) {
    return `
    <div class="d-flex justify-content-end">
        <button type="button" class="btn btn-16 btn-action" onclick="deleteParams(${index}, this)"><i class="fas fa-trash-alt"></i></button>
    </div>
    `
}

function actionFormatter(value, row, index) {
    return `
    <div class="d-flex justify-content-end table-action">
        <button type="button" class="btn btn-24 btn-action"><i class="fas fa-play"></i></button>
        <button type="button" class="btn btn-24 btn-action"><i class="fas fa-cog"></i></button>
        <button type="button" class="btn btn-24 btn-action"><i class="fas fa-share-alt"></i></button>
        <button type="button" class="btn btn-24 btn-action"><i class="fas fa-trash-alt"></i></button>
    </div>
    `
}

$('.params-table').on('all.bs.table', () => $('.selectpicker').selectpicker('render'))

function nameStyle(value, row, index) {
    return {css: {"max-width": "100px", "overflow": "hidden", "text-overflow": "ellipsis", "white-space": "nowrap"}}
}

const deleteParams = (index, source) => {
    $(source).closest('.params-table').bootstrapTable('remove', {
        field: '$index',
        values: [index]
    })
}

window.wait_for = async (prop_name, root = window, poll_length = 1000) => {
    while (!root.hasOwnProperty(prop_name))
        await new Promise(resolve => setTimeout(resolve, poll_length))
    return root[prop_name]
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
// script fot tables with vue.js when injected event (vue_init)
$(document).on('vue_init', () => {
    $('.table').on('all.bs.table', () => {
        $('.selectpicker').selectpicker('render');
        initColoredSelect();
    })
    initColoredSelect();
})
// script fot tables without vue.js
$('.table').on('all.bs.table', () => {
    $('.selectpicker').selectpicker('render');
})