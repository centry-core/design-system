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
    return `<input type="text" class="form-control form-control-alternative" onchange="updateCell(this, ${index}, '${field}')" value="${value}">`
}

function updateCell(el, row, field) {
    $(el.closest('table')).bootstrapTable('updateCell', {index: row, field: field, value: el.value})
}

function dataTypeFormatter(value, row, index, field) {
    var content = `<select class="selectpicker mr-2 datatype-selectpicker" data-style="btn-gray">`;
    var types = ['String', 'Number', 'List'];
    types.forEach(function(item){
        if (value == item) {
            content += `<option selected>${item}</option>`
        } else {
            content += `<option>${item}</option>`
        }
    })
    content += "</select>"
    return content
}

function addEmptyParamsRow(id) {
    $(`#${id}`).bootstrapTable('append', {"name": "", "default": "", "type": "", "description": "", "action": ""})
}


function parametersDeleteFormatter(value, row, index) {
    return `
    <div class="d-flex justify-content-end">
        <button type="button" class="btn btn-16 btn-action" onclick="deleteParams(${index})"><i class="fas fa-trash-alt"></i></button>
    </div>
    `
}

function actionFormatter(value, row, index) {
    return `
    <div class="d-flex justify-content-end">
        <button type="button" class="btn btn-16 btn-action"><i class="fas fa-play"></i></button>
        <button type="button" class="btn btn-16 btn-action"><i class="fas fa-cog"></i></button>
        <button type="button" class="btn btn-16 btn-action"><i class="fas fa-share-alt"></i></button>
        <button type="button" class="btn btn-16 btn-action"><i class="fas fa-trash-alt"></i></button>
    </div>
    `
}

$('.params-table').on('all.bs.table', function (ev) {
    $(ev.target).find('.selectpicker').each(function(index) {
        $(this).selectpicker('render')
        if ($('.params-table').bootstrapTable('getData').length != 0 && $('.params-table').bootstrapTable('getData')[parseInt($(this).closest('tr').attr('data-index'))].type != ""){
            $(this).selectpicker('val', $('.params-table').bootstrapTable('getData')[parseInt($(this).closest('tr').attr('data-index'))].type)
        }
    })
    $(".datatype-selectpicker").on('changed.bs.select', function (e, clickedIndex, isSelected, previousValue) {
        if ($('.params-table').bootstrapTable('getData').length != 0 && $('.params-table').bootstrapTable('getData')[parseInt($(this).closest('tr').attr('data-index'))].type != this.value) {
            updateCell(this, parseInt($(this).closest('tr').attr('data-index')), 'type')
        }
    })
})

function nameStyle(value, row, index) {
    return {css: {"max-width": "100px", "overflow": "hidden", "text-overflow": "ellipsis", "white-space": "nowrap"}}
}