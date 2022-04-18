const tableColumns = [{
    title: 'ID',
    field: 'id',
    checkbox: true
}, {
    title: 'test name',
    field: 'name',
    sortable: true,
}, {
    title: 'scan type',
    field: 'scan_type',
    sortable: true,
}, {
    title: 'scanner',
    field: 'scanner',
    sortable: true,
}, {
    title: 'description',
    field: 'description',
    sortable: true,
    class: 'w-100',
}, {
    title: 'severity',
    field: 'severity',
    formatter: 'severityFormatter',
    sortable: true,
}, {
    title: 'status',
    field: 'status',
    formatter: 'statusFormatter',
    sortable: true,
}]

const tableData = [
    { name: 'George', scan_type: 'Monkey', scanner: 'OWASP ZAP', description: 'Lorem ipsum dolor sit amet', severity: 'low', status: 'valid' },
    { name: 'Jeffrey', scan_type: 'Giraffe', scanner: 'OWASP ZAP', description: 'Lorem ipsum dolor sit amet', severity: 'medium', status: 'valid' },
    { name: 'Alice', scan_type: 'Giraffe', scanner: 'Qualys', description: 'Lorem ipsum dolor sit amet', severity: 'low', status: 'ignore' },
    { name: 'Alice', scan_type: 'Tiger', scanner: 'Qualys', description: 'Lorem ipsum dolor sit amet', severity: 'low', status: 'valid' },
    { name: 'Jeffrey', scan_type: 'Giraffe', scanner: 'OWASP ZAP', description: 'Lorem ipsum dolor sit amet', severity: 'medium', status: 'valid' },
    { name: 'George', scan_type: 'Monkey', scanner: 'OWASP ZAP', description: 'Lorem ipsum dolor sit amet', severity: 'low', status: 'valid' },
]

const tableColumnsNew = [{
    title: 'ID',
    field: 'id',
    checkbox: true
}, {
    title: 'test name',
    field: 'name',
    sortable: true,
}, {
    title: 'scan type',
    field: 'scan_type',
    sortable: true,
}]

const tableDataNew = [
    { name: 'George', scan_type: 'Monkey' },
    { name: 'Jeffrey', scan_type: 'Giraffe' },
    { name: 'Alice', scan_type: 'Giraffe' },
]

let filtersData = [
    {
        id: 1,
        title: 'First',
        options: [
            {
                id: 1,
                column: 'Description',
                operator: 'Relish',
                title: 'knowlege',
            },
            {
                id: 2,
                column: 'Ketchup',
                operator: 'Mustard',
                title: 'Lorem ipsum',
            }
        ]
    },
    {
        id: 2,
        title: 'User filter 2',
        options: [
            {
                id: 2,
                column: 'Description',
                operator: 'Ketchup',
                title: 'knowlege',
            }
        ]
    },
    {
        id: 3,
        title: 'Two',
        options: [
            {
                id: 3,
                column: '',
                operator: '',
                title: 'knowlege',
            }
        ]
    }
]

const fetch = new Promise(resolve => {
    setTimeout(() => {
        resolve(filtersData)
    }, 1000)
})

const fetchTable = new Promise(resolve => {
    resolve({
        data: tableDataNew,
        columns: tableColumnsNew,
    })
})

function deepClone(obj) {
    if (obj === null) return null;
    let clone = Object.assign({}, obj);
    Object.keys(clone).forEach(
        key =>
            (clone[key] =
                typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key])
    );
    if (Array.isArray(obj)) {
        clone.length = obj.length;
        return Array.from(clone);
    }
    return clone;
}

const requestSave = (currentFilter) => {
    return new Promise((resolve, reject) => {
        let indexFilter = null;
        filtersData.forEach((filter, index) => {
            if(filter.id === currentFilter.id) {
                indexFilter = index
            }
        })
        filtersData.splice(indexFilter, 1, currentFilter);
        resolve({
            data: currentFilter,
            message: 'Filter saved'
        })
    })
}

const requestSaveAs = (currentFilter, filterTitle) => {
    return new Promise((resolve, reject) => {
        const isNameExist = filtersData.some(filter => filter.title.toLowerCase() === filterTitle.toLowerCase().trim())
        if (isNameExist) {
            reject('Filter name already exist')
        } else {
            const createdFilter = {
                ...currentFilter,
                id: Math.round(Math.random() * 1000),
                title: filterTitle,
            }

            filtersData.push(createdFilter);
            resolve({
                data: createdFilter,
                message: 'Filter saved'
            })
        }
    })
}

const ChooseFilter = {
    props: ['filters', 'loadingFilters'],
    template:`
        <div class="dropdown dropleft dropdown_action mr-2">
            <button class="btn dropdown-toggle btn-secondary"
                    role="button"
                    id="dropdownMenuLink"
                    data-toggle="dropdown"
                    aria-expanded="false">
                <i v-if="loadingFilters" class="preview-loader"></i>
                <i v-else class="fas fa-filter"></i>
            </button>

            <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <li class="dropdown-item" @click="$emit('create-filter')">Create new</li>
                <li v-for="filter in filters" class="dropdown-item" @click="$emit('select-filter', filter)">
                    <i class='fa fa-trash mr-2'></i>
                    {{ filter.title }}
                </li>
            </ul>
        </div>
    `
}

const modalSaveFilter = {
    props: ['loading'],
    data() {
        return {
            filterTitle: '',
        }
    },
    computed: {
        hasError() {
            return this.isShortName();
        }
    },
    methods: {
        isShortName() {
            return this.filterTitle.length < 3;
        },
        saveNewFilter() {
            if(!this.hasError) this.$emit('save-new-filter', this.filterTitle)
        }
    },
    template:`
        <div class="modal-component">
            <div class="modal-card">
                <p class="font-bold font-h3 mb-4">Create filter</p>
                <div class="custom-input" :class="{'invalid-input': hasError}">
                    <input
                        type="text"
                        v-model="filterTitle"
                        placeholder="Text">
                    <span class="input_error-msg">Filter name less then 3 letters</span>
                    <div class="d-flex justify-content-end mt-4">
                        <button type="button" class="btn btn-secondary mr-2" @click="$emit('open-modal')">Cencel</button>
                        <button
                            :disabled="hasError"
                            class="btn btn-basic mr-2 d-flex align-items-center"
                            type="submit"
                            @click="saveNewFilter"
                        >Save <i v-if="loading" class="preview-loader__white ml-2"></i></button>
                    </div>
                </div>
            </div>
        </div>
    `
}

const ReportFilter = {
    props: [
        'selectedFilter',
        'loadingSave',
        'loadingApply'
    ],
    data() {
        return {
            editableFilter: {},
            isInvalidFilter: false,
        }
    },
    mounted() {
        this.editableFilter = deepClone(this.selectedFilter);
        this.renderSelect();
    },
    watch: {
        editableFilter: {
            handler: function() {
                this.$nextTick(() => {
                    const arr = []
                    $('.table-filter > tbody > tr').each(function (index, element) {
                        $(element).find('td > div').each(function (index, cell) {
                            arr.push(cell.getAttribute('data-valid'));
                        })
                    })
                    this.isInvalidFilter = arr.every(elem => elem !== 'true')
                });
            },
            deep: true
        }
    },
    computed: {
        computedTitle() {
            return this.editableFilter.title || 'New Filter'
        }
    },
    methods: {
        renderSelect() {
            this.$nextTick(() => {
                $('.selectpicker').selectpicker('render');
            });
        },
        addOption() {
            this.editableFilter.options.push({
                id: Math.round(Math.random() * 1000),
                column: '',
                operator: '',
                title: '',
            })
            this.renderSelect();
        },
        removeOption(optionId) {
            this.editableFilter.options = this.editableFilter.options.filter(elem => elem.id !== optionId);
        },
        removeFilter() {
            this.$emit('remove-filter');
        },
        resetFilter() {
            this.editableFilter = deepClone(this.selectedFilter);
            this.renderSelect();
        },
        saveAs() {
            this.$emit('open-modal');
            this.$emit('update-curent-filter', this.editableFilter)
        },
        save() {
            this.$emit('save', this.editableFilter)
        },
        hasError(value) {
            return value.length > 0;
        },
        apply() {
            this.$emit('apply', this.editableFilter)
        }
    },
    template:`
        <div class="report-filter">
            <div class="d-flex justify-content-between mt-4 mb-2 pr-4">
                <p class="font-h5 font-bold">{{ computedTitle }}</p>
                <a class="notification-close" @click="removeFilter"></a>
            </div>
            <table class="w-100 table-filter mb-3" id="table-filter">
                <thead>
                    <tr class="font-h6">
                        <th>Column</th>
                        <th>Operator</th>
                        <th>Data</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="option in editableFilter.options" :key="option.id">
                        <td class="pr-2 pb-2 cell-input">
                            <div class="select-validation" :class="{'invalid-select': !hasError(option.column)}"
                                :data-valid="!hasError(option.column)">
                                <select class="selectpicker bootstrap-select__b"
                                    v-model="option.column"
                                    data-style="btn">
                                    <option>Mustard</option>
                                    <option>Ketchup</option>
                                    <option>Relish</option>
                                    <option>Description</option>
                                </select>
                                <span class="select_error-msg">Column is required!</span>
                            </div>
                        </td>
                        <td class="pr-2 pb-2 cell-input">
                            <div class="select-validation" :class="{'invalid-select': !hasError(option.operator)}"
                                :data-valid="!hasError(option.operator)">
                                <select class="selectpicker bootstrap-select__b"
                                    v-model="option.operator"
                                    data-style="btn">
                                    <option>Mustard</option>
                                    <option>Ketchup</option>
                                    <option>Relish</option>
                                    <option>Description</option>
                                </select>
                                <span class="select_error-msg">Operator is required!</span>
                            </div>
                        </td>
                        <td class="w-100 pb-2 cell-input">
                            <div class="custom-input" :class="{'invalid-input': !hasError(option.title)}"
                                :data-valid="!hasError(option.title)">
                                <input
                                    type="text"
                                    v-model="option.title"
                                    placeholder="Some data">
                                <span class="input_error-msg">Data is required!</span>
                            </div>
                        </td>
                        <td class="cell-icon">
                            <div class="d-flex justify-content-end table-action align-items-center pl-2 pr-4 pt-2">
                                <button 
                                    v-if="editableFilter.options.length > 1"
                                    type="button" class="btn btn-24 btn-action"
                                    @click="removeOption(option.id)"><i class="fas fa-minus"></i>
                                 </button>
                                <button type="button" class="btn btn-24 btn-action" @click="addOption"><i class="fas fa-plus"></i></button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="d-flex justify-content-start">
                <button class="btn btn-basic mr-2 d-flex align-items-center"
                    type="button"
                    @click="apply"
                    :disabled="!isInvalidFilter">Apply
                        <i v-if="loadingApply" class="preview-loader__white ml-2"></i>
                    </button>
                <button v-if="this.editableFilter.id"
                    type="button"
                    class="btn btn-secondary mr-2"
                    @click="resetFilter">Reset</button>
                <button v-if="this.editableFilter.id" 
                    :class="{'btn-secondary': loadingSave}"
                    :disabled="!isInvalidFilter"
                    @click="save"
                    class="btn btn-default d-flex align-items-center"
                    >Save <i v-if="loadingSave" class="preview-loader ml-2"></i>
                </button>
                <button class="btn btn-default" @click="saveAs" :disabled="!isInvalidFilter">Save as...</button>
            </div>
        </div>
    `
}

const vueApp = Vue.createApp({
    components: {
        'report-filter': ReportFilter,
        'choose-filter': ChooseFilter,
        'modal-save-filter': modalSaveFilter,
    },
    data() {
        return {
            showModal: false,
            filtersName: [],
            loadingSave: false,
            loadingSaveAs: false,
            loadingApply: false,
            filters: null,
            selectedFilter: null,
            loadingFilters: false,
            updatedFilter: null,
        }
    },
    mounted() {
        this.fetchFilters();
        this.initTable();
    },
    methods: {
        initTable() {
            const tableOptions = {
                columns: tableColumns,
                data: tableData,
                theadClasses: 'thead-light'
            }
            $('#table').bootstrapTable(tableOptions)
        },
        fetchFilters() {
            this.loadingFilters = true;
            fetch.then(res => {
                this.filters = res;
            }).finally(() => {
                this.loadingFilters = false;
            })
        },
        updateTable(filterSetting) {
            this.loadingApply = true;
            $('#table').bootstrapTable('destroy');
            setTimeout(() => {
                console.log('SETTING FOR SERVER:', filterSetting.options)
                fetchTable.then(response => {
                    const { columns, data } = response;
                    const tableOptions = {
                        columns,
                        data,
                        theadClasses: 'thead-light'
                    }
                    $('#table').bootstrapTable(tableOptions);
                    $('.selectpicker').selectpicker('render');
                }).finally(() => {
                    this.loadingApply = false;
                })
            }, 500)
        },
        createFilter() {
            this.selectedFilter = {
                id: null,
                title: '',
                options: [
                    {
                        id: Math.round(Math.random() * 1000),
                        column: '',
                        operator: '',
                        title: '',
                    }
                ]
            }
        },
        selectFilter(filter) {
            this.selectedFilter = filter;
        },
        setFilters(filters) {
            this.filtersName = filters.map(filter => filter.title);
        },
        openModal() {
            this.showModal = !this.showModal;
        },
        saveFilterAs(createdFilter) {
            this.filters.push(createdFilter);
            this.openModal();
        },
        saveFilter(currentFilter) {
            this.loadingSave = true;
            setTimeout(() => {
                requestSave(currentFilter).then(response => {
                    this.selectFilter(response.data);
                    showNotify('SUCCESS', response.message);
                    this.fetchFilters();
                }).catch(error => {
                    showNotify('ERROR', error);
                }).finally(() => {
                    this.loadingSave = false;
                })
            }, 500)
        },
        saveNewFilter(filterName) {
            this.loadingSaveAs = true;
            setTimeout(() => {
                requestSaveAs(this.updatedFilter, filterName).then(response => {
                    this.selectFilter(response.data);
                    showNotify('SUCCESS', response.message);
                    this.openModal();
                    this.fetchFilters();
                }).catch(error => {
                    showNotify('ERROR', error);
                }).finally(() => {
                    this.loadingSaveAs = false;
                })
            }, 500)
        },
        updateCurentFilter(updatedFilter) {
            this.updatedFilter = deepClone(updatedFilter);
        }
    }
});

vueApp.mount('#vueApp');
