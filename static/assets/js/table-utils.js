const valuesSelectsTable = {
    tableColors: ['RED', 'YELLOW', 'BLUE'],
}

var table_formatters = {
    selectFormatter(value, row, index, field) {
        const options = valuesSelectsTable[this.values].map((item, index) =>
            `<option
                value=${item}
                ${item.toLowerCase() === value.toLowerCase() && 'selected'}
            >
                ${item}
            </option>`)

        return `
            <select
                class="selectpicker bootstrap-select__b"
                onchange="updateCell(this, '${index}', '${field}')"
            >
                ${options.join('')}
            </select>
        `
    },
    inputDefaultFormatter(value, row, index, field) {
        return `
            <div class="custom-input">
                <input type="text"
                    onchange="ParamsTable.updateCell(this, ${index}, '${field}')" value="${value}">
                <div class="invalid-tooltip invalid-tooltip-custom"></div>
            </div>
        `
    },
    reportsStatusFormatter(value, row, index) {
        switch (value.status.toLowerCase()) {
            case 'error':
                return `<div data-toggle="tooltip" data-placement="top" title="${value.description}" style="color: var(--red)"><i class="fas fa-exclamation-circle error"></i> ${value.status}</div>`
            case 'failed':
                return `<div data-toggle="tooltip" data-placement="top" title="${value.description}" style="color: var(--red)"><i class="fas fa-exclamation-circle error"></i> ${value.status}</div>`
            case 'success':
                return `<div data-toggle="tooltip" data-placement="top" title="${value.description}" style="color: var(--green)"><i class="fas fa-exclamation-circle error"></i> ${value.status}</div>`
            case 'canceled':
                return `<div data-toggle="tooltip" data-placement="top" title="${value.description}" style="color: var(--gray)"><i class="fas fa-times-circle"></i> ${value.status}</div>`
            case 'finished':
                return `<div data-toggle="tooltip" data-placement="top" title="${value.description}" style="color: var(--info)"><i class="fas fa-check-circle"></i> ${value.status}</div>`
            case 'in progress':
                return `<div data-toggle="tooltip" data-placement="top" title="${value.description}" style="color: var(--basic)"><i class="fas fa-spinner fa-spin fa-secondary"></i> ${value.status}</div>`
            case 'post processing':
                return `<div data-toggle="tooltip" data-placement="top" title="${value.description}" style="color: var(--basic)"><i class="fas fa-spinner fa-spin fa-secondary"></i> ${value.status}</div>`
            case 'pending...':
                return `<div data-toggle="tooltip" data-placement="top" title="${value.description}" style="color: var(--basic)"><i class="fas fa-spinner fa-spin fa-secondary"></i> ${value.status}</div>`
            case 'preparing...':
                return `<div data-toggle="tooltip" data-placement="top" title="${value.description}" style="color: var(--basic)"><i class="fas fa-spinner fa-spin fa-secondary"></i> ${value.status}</div>`
            default:
                return value.status.toLowerCase()
        }
    },
    createLinkToTest(value, row, index) {
        return `<a class="test form-control-label font-h5" href="./results?result_id=${row.id}" role="button">${row.name}</a>`
    },
    actions(value, row, index) {
        return `
            <div class="d-flex justify-content-end">
                <button type="button" class="btn btn-default btn-xs btn-table btn-icon__xs test_run mr-2"
                        data-toggle="tooltip" data-placement="top" title="Run Test">
                    <i class="icon__18x18 icon-run"></i>
                </button>
                <div class="dropdown_multilevel">
                    <button class="btn btn-default btn-xs btn-table btn-icon__xs" type="button"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i class="icon__18x18 icon-menu-dots"></i>
                    </button>
                    <ul class="dropdown-menu">
                        <li class="dropdown-menu_item dropdown-item d-flex align-items-center">
                            <span class="w-100 font-h5 d-flex align-items-center"><i class="icon__18x18 icon-integrate mr-1"></i>Integrate with</span>
                            <i class="icon__16x16 icon-sort"></i>
                            <ul class="submenu dropdown-menu">
                                <li class="dropdown-menu_item dropdown-item d-flex align-items-center int_docker">
                                    <span class="w-100 font-h5">Docker command</span>
                                </li>
                            </ul>
                        </li>
                        <li class="dropdown-menu_item dropdown-item d-flex align-items-center test_edit">
                            <i class="icon__18x18 icon-settings mr-2"></i><span class="w-100 font-h5">Settings</span>
                        </li>
                        <li class="dropdown-menu_item dropdown-item d-flex align-items-center test_delete">
                            <i class="icon__18x18 icon-delete mr-2"></i><span class="w-100 font-h5">Delete</span>
                        </li>
                    </ul>
                </div>
            </div>
        `
    },
    action(value, row, index) {
        return `
            <div class="d-flex justify-content-end">
                <button type="button" class="btn btn-default btn-xs btn-table btn-icon__xs test_run mr-2"
                        data-toggle="tooltip" data-placement="top" title="Run Test">
                    <i class="icon__18x18 icon-run"></i>
                </button>
            </div>
        `
    },
    name_style(value, row, index) {
        return {
            css: {
                "max-width": "140px",
                "overflow": "hidden",
                "text-overflow": "ellipsis",
                "white-space": "nowrap"
            }
        }
    },
    cell_style(value, row, index) {
        return {
            css: {
                "min-width": "165px"
            }
        }
    },
    action_events: {
        "click .test_run": function (e, value, row, index) {
            console.log('test_run', row)
        },

        "click .test_edit": function (e, value, row, index) {
            console.log('test_edit', row)
        },

        "click .test_delete": function (e, value, row, index) {
            console.log('test_delete', row)

        },

        "click .int_docker": async function (e, value, row, index) {
            // const resp = await fetch(window.url_prefix + `/api/v1/backend_performance/test/${row.project_id}/${row.id}/?output=docker`)
            // if (resp.ok) {
            //     const {cmd} = await resp.json()
            //     vueVm.docker_command.cmd = cmd
            //     vueVm.docker_command.is_open = true
            // } else {
            //     showNotify('ERROR', 'Error getting docker command')
            // }
        }
    }
}
