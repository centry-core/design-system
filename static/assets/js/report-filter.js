const ChooseFilter = {
    data() {
        return {
            filters: [
                {
                    id: 1,
                    title: 'User filter 1',
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
                }
            ],
            selectedFilter: {}
        }
    },
    methods: {
        selectFilter(filter) {
            this.selectedFilter = Object.assign({}, filter);
            this.$emit('setFilter', filter)
        },
        createFilter() {
            this.selectedFilter = {
                id: Math.round(Math.random() * 1000),
                title: '',
                options: [
                    {
                        id: Math.round(Math.random() * 1000),
                        column: '',
                        operator: '',
                        title: '',
                    }
                ]
            },
            this.$emit('setFilter', this.selectedFilter)
        }
    },
    template:`
        <div class="dropdown dropleft dropdown_action mr-2">
            <button class="btn dropdown-toggle btn-secondary"
                    role="button"
                    id="dropdownMenuLink"
                    data-toggle="dropdown"
                    aria-expanded="false">
                <i class="fas fa-filter"></i>
            </button>

            <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <li class="dropdown-item" @click="createFilter">Create new</li>
                <li v-for="filter in filters" class="dropdown-item" @click="selectFilter(filter)">
                    <i class='fa fa-trash mr-2'></i>
                    {{ filter.title }}
                </li>
            </ul>
        </div>
    `
}

const modalSaveFilter = {
    data() {
        return {
            filterName: '',
            loading: false,
        }
    },
    computed: {
        hasError() {
            return this.filterName.length < 3
        }
    },
    methods: {
        saveFilter() {
            this.loading = true;
            setTimeout(() => {
                this.loading = false;
                this.$emit('save-filter-as');
                showNotify('SUCCESS', 'Filter saved');
            }, 1000)
        }
    },
    template:`
        <div class="modal-component">
            <div class="modal-card">
                <p class="font-bold font-h3 mb-4">Create filter</p>
                <div class="custom-input" :class="{'invalid-input': hasError}">
                    <input
                        type="text"
                        v-model="filterName"
                        placeholder="Text">
                    <span class="input_error-msg">Сlarifying error message</span>
                    <div class="d-flex justify-content-end mt-4">
                        <button type="button" class="btn btn-secondary mr-2" @click="$emit('save-filter-as')">Reset</button>
                        <button
                            :disabled="hasError"
                            class="btn btn-basic mr-2 d-flex align-items-center"
                            :class="{'btn-secondary': loading}"
                            type="submit"
                            @click="saveFilter"
                        >Save <i v-if="loading" class="preview-loader"></i></button>
                    </div>
                </div>
            </div>
        </div>
    `
}

const ReportFilter = {
    props: ['filter'],
    data() {
        return {
            editableFilter: {},
        }
    },
    mounted() {
        this.editableFilter = Object.assign({}, this.filter);
        this.renderSelect();
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
            this.editableFilter.options = this.editableFilter.options.filter(elem => elem.id !== optionId)
        },
        removeFilter() {
            this.$emit('remove-filter')
        }
    },
    template:`
        <div class="report-filter">
            <div class="d-flex justify-content-between mt-4 mb-2 pr-4">
                <p class="font-h5 font-bold">New Filter</p>
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
                <tr v-for="option in editableFilter.options">
                    <td class="pr-2 pb-2">
                        <select class="selectpicker bootstrap-select__b" data-style="btn" v-model="option.column">
                            <option>Mustard</option>
                            <option>Ketchup</option>
                            <option>Relish</option>
                            <option>Description</option>
                        </select>
                    </td>
                    <td class="pr-2 pb-2">
                        <select class="selectpicker bootstrap-select__b" data-style="btn" :value="option.operator">
                            <option>Mustard</option>
                            <option>Ketchup</option>
                            <option>Relish</option>
                        </select>
                    </td>
                    <td class="w-100 pb-2">
                        <div class="custom-input">
                            <input
                                type="text"
                                :value="option.title"
                                placeholder="Some data">
                        </div>
                    </td>
                    <td>
                        <div class="d-flex justify-content-end table-action align-items-center pl-2 pr-4">
                            <button 
                                v-if="editableFilter.options.length > 1"
                                type="button" class="btn btn-24 btn-action"
                                @click="removeOption(option.id)"><i class="fas fa-minus"></i>
                             </button>
                            <button type="button" class="btn btn-24 btn-action" @click="addOption"><i class="fas fa-plus"></i></button>
                        </div>
                    </td>
                </tr>
            </table>
            <div class="mb-4">
                <button class="btn btn-basic mr-2" type="submit">Apply</button>
                <button type="button" class="btn btn-secondary mr-2">Reset</button>
                <button class="btn btn-default mr-2">Save</button>
                <button class="btn btn-default" @click="$emit('save-filter-as')">Save as...</button>
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
            currentFilter: null,
            showModal: false,
        }
    },
    methods: {
        setFilter(filter) {
            this.currentFilter = filter;
        },
        saveFilterAs() {
            this.showModal = !this.showModal;
        }
    }
});

vueApp.mount('#vueApp');