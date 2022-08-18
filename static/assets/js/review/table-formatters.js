// var ParamsTable = {
//     dataTypeFormatter(value, row, index, field) {
//         const is_disabled = row._type_class?.toLowerCase().includes('disabled')
//         let options = is_disabled ? [value] : ['String', 'Number', 'List']
//
//         options = options.reduce((accum, item, ) =>
//                 `${accum}<option
//                 value='${item}'
//                 ${item.toLowerCase() === value.toLowerCase() ? 'selected' : ''}
//             >
//                 ${item}
//             </option>
//             `,
//             ''
//         )
//         return `
//             <select
//                 class="selectpicker bootstrap-select__b mr-2 ${row._type_class}"
//                 data-style="btn"
//                 ${is_disabled && 'disabled'}
//                 onchange="this.updateCell(this, '${index}', '${field}')"
//                 >
//                     ${options}
//             </select>
//         `
//     },
//     addEmptyParamsRow: source => {
//         $(source).closest('.section').find('.params-table').bootstrapTable(
//             'append',
//             {"name": "", "default": "", "type": "string", "description": "", "action": ""}
//         )
//     },
//
//     parametersDeleteFormatter(value, row, index) {
//         return `
// <!--        <div class="d-flex justify-content-end">-->
//             <button type="button" class="btn btn-24 btn-action" onclick="ParamsTable.deleteParams(${index}, this)">
//                 <i class="fas fa-trash-alt"></i>
//             </button>
// <!--        </div>-->
//         `
//     },
//     inputFormatter(value, row, index, field) {
//         return `
//             <div class="custom-input max-w-175">
//                 <input type="text"
//                     onchange="updateCell(this, ${index}, '${field}')" value="${value}">
//                 <div class="invalid-tooltip invalid-tooltip-custom"></div>
//             </div>
//         `
//     },
//     deleteParams: (index, source) => {
//         $(source).closest('.params-table').bootstrapTable('remove', {
//             field: '$index',
//             values: [index]
//         })
//     },
//     lgFormatter(value, row, index) {
//         if (row.job_type === "perfmeter") {
//             return '<img src="/design-system/static/assets/ico/jmeter.png" width="20">'
//         } else if (row.job_type === "perfgun") {
//             return '<img src="/design-system/static/assets/ico/gatling.png" width="20">'
//         } else {
//             return value
//         }
//     },
//     actionFormatter(value, row, index) {
//         return `
//     <div class="d-flex justify-content-end">
//         <button type="button" class="btn btn-24 btn-action" onclick="runTestModal('${row.id}')" data-toggle="tooltip" data-placement="top" title="Run Test"><i class="fas fa-play"></i></button>
//         <button type="button" class="btn btn-24 btn-action" onclick="editTest('${row.id}')"><i class="fas fa-cog"></i></button>
//         <button type="button" class="btn btn-24 btn-action"><i class="fas fa-share-alt"></i></button>
//         <button type="button" class="btn btn-24 btn-action" onclick="deleteTests('${row.id}')"><i class="fas fa-trash-alt"></i></button>
//     </div>
//     `
//     },
//     actionDeleteRow(value, row, index) {
//         return `
//         <div class="d-flex justify-content-end">
//             <button type="button" class="btn btn-24 btn-action" onclick="deleteRow('${row.id}', '${index}')"><i class="fas fa-trash-alt"></i></button>
//         </div>
//     `
//     },
//     checkboxFormatter (value, row, index, field) {
//         const isChecked = value.checked ? 'checked' : ''
//         return `
//         <label
//             class="mb-0 w-100 d-flex align-items-center custom-checkbox">
//             <input
//                 value="${value.checked}"
//                 onchange="this.updateCell(this, '${index}', '${field}', '${value.title}')"
//                 ${isChecked}
//                 type="checkbox">
//             <span class="w-100 d-inline-block ml-3">${value.title}</span>
//         </label>
//     `
//     },
//
//     nameStyle(value, row, index) {
//         return {css: {"max-width": "100px", "overflow": "hidden", "text-overflow": "ellipsis", "white-space": "nowrap"}}
//     },
//     parametersDeleteFormatter(value, row, index) {
//         return `
//             <button type="button" class="btn btn-24 btn-action" onclick="this.deleteParams(${index}, this)">
//                 <i class="fas fa-trash-alt"></i>
//             </button>
//             `
//     },
//     tableSeverityButtonFormatter(value, row, index) {
//         return tableColoredSelectFormatter(value, row, index, severityOptions, 'severity')
//     },
//     tableStatusButtonFormatter(value, row, index) {
//         return tableColoredSelectFormatter(value, row, index, statusOptions, 'status')
//     },
//     tableColoredSelectFormatter (value, row, index, optionsList, fieldName) {
//         const options = optionsList.map(item => `
//             <option
//                 class="${item.className}"
//                 ${compareValues(item.name, value) ? 'selected' : ''}
//             >
//                 ${item.name.toUpperCase()}
//             </option>
//         `);
//         const unexpectedValue = optionsList.find(item => compareValues(item.name, value))
//         unexpectedValue === undefined && options.push(`<option selected>${value}</option>`)
//
//         return `
//             <select
//                 class="selectpicker btn-colored-select mr-2 btn-colored-table"
//                 data-style="btn-colored"
//                 onchange="this.updateCell(this, '${index}', '${fieldName}')"
//             >
//                 ${options.join('')}
//             </select>
//         `
//     },
//
//     nameStyle(value, row, index) {
//         return {css: {"max-width": "100px", "overflow": "hidden", "text-overflow": "ellipsis", "white-space": "nowrap"}}
//     },
//     detailFormatter(index, row) {
//         var html = []
//         html.push('<div style="padding-left: 30px"><p><b>Method:</b> ' + row['Method'] + '</p>')
//         html.push('<p><b>Request Params:</b> ' + row['Request params'] + '</p>')
//         html.push('<p><b>Headers:</b> ' + row['Headers'] + '</p>')
//         html.push('<p><b>Response body:</b></p></div>')
//         return html.join('')
//     },
//     stepperFormatter(value, row, index, field) {
//         return `
//             <div id="inputStepper" class="input-stepper">
//                 <button onclick="decreaseValue(this, '${value}', '${index}', '${field}')"
//                 ><i class="icon__16x16 icon-minus__16"></i></button>
//                 <span role="textbox" contenteditable onfocusout="changeCounter(this, event, '${index}', '${field}', '${value}')">${value}</span>
//                 <button onclick="increaseValue(this, '${value}', '${index}', '${field}')"
//                 ><i class="icon__16x16 icon-plus__16"></i>
//                 </button>
//             </div>
//         `
//     }
// }
// function increaseValue(el, newValue, row, field) {
//     const counter = +newValue + 1
//     $(el.closest('table')).bootstrapTable('updateCell', { index: row, field: field, value: counter })
// }
//
// function decreaseValue(el, newValue, row, field) {
//     const counter = +newValue - 1
//     $(el.closest('table')).bootstrapTable('updateCell', { index: row, field: field, value: counter })
// }

// function updateCell(el, row, field) {
//     $(el.closest('table')).bootstrapTable('updateCell', { index: row, field: field, value: el.value })
// }

function changeCounter(el, e, row, field, oldValue) {
    const value = +e.target.innerText;
    if (isNaN(value / 1)) {
        $(el.closest('table')).bootstrapTable('updateCell', { index: row, field: field, value: oldValue })
    };
    $(el.closest('table')).bootstrapTable('updateCell', { index: row, field: field, value: value })
}

function deleteRow(rowId, index) {
    $('#tests-list-dynamic').bootstrapTable('remove', {
        field: 'id',
        values: [+rowId]
    })
}

// $(function() {
//     $('#create-location').click(function () {
//         var randomId = 100 + ~~(Math.random() * 100)
//         $('#tests-list-dynamic').bootstrapTable('insertRow', {
//             index: 0,
//             row: {
//                 "id": randomId,
//                 "engine_type": "String",
//                 "runners_type": 0,
//                 "cpu_type": "",
//                 "memory_size": ""
//             }
//         })
//     })
// })

// $(document).on('vue_init', () => {
//     $('.params-table').on('all.bs.table', () => {
//         $('.selectpicker').selectpicker('render')
//     })
// })

// $('.table').on('all.bs.table', () => {
//     $('.selectpicker').selectpicker('render');
// })