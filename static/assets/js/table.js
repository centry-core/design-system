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
    return `
        <input type="text" class="form-control form-control-alternative" onchange="updateCell(this, ${index}, '${field}')" value="${value}">
        <div class="invalid-tooltip invalid-tooltip-custom"></div>
    `
}

function updateCell(el, row, field) {
    $(el.closest('table')).bootstrapTable('updateCell', {index: row, field: field, value: el.value})
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
    <div class="d-flex justify-content-end">
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
