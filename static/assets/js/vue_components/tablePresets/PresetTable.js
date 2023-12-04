const PresetTable = {
    props: {
        query_params: {},
        summary_url: '',
        filter_name: '',
        block_name: '',
        selected_loop: '',
    },
    components: {
        modalSavePreset,
        SummaryTableFilter: PresetTableFilter,
    },
    data() {
        return {
            loadingTable: true,
            selectedPreset: {
                name: 'default'
            },
            allFields: allFields,
            defaultPreset: defaultPreset,
            defaultPresetsTableData: defaultPresetsTableData,
            tableSummaryColumns: tableSummaryColumns,
            allPresets: [],
            customPresetsTableData: [],
            requestNames: [],
            showModal: false,
            loadingSaveAs: false,
            loadingDelete: false,
            loadingUpdate: false,
            selectedType: 'all',
            selectedPages: [],
        }
    },
    watch: {
        selected_loop(newValue, oldValue) {
            this.filterTableByLoop(this.selectedType, newValue, this.selectedPages);
        },
        selectedPages(newValue, oldValue) {
            if (this.selected_loop) {
                this.filterTableByLoop(this.selectedType, this.selected_loop, newValue);
            } else {
                this.filterTable(newValue)
            }
        }
    },
    mounted () {
        if (this.selected_loop) {
            const vm = this;
            $('.custom-tabs a[data-toggle="pill"]').on('shown.bs.tab', function (event) {
                const tabType = $(event.target).text().toLowerCase();
                const singleType = tabType === 'all' ? tabType : tabType.substring(0, tabType.length - 1);
                vm.selectedType = singleType;
                vm.filterTableByLoop(vm.selectedType, vm.selected_loop, vm.selectedPages);
            })
        }
        ApiFetchPreset().then((data) => {
            this.allPresets = [ this.defaultPreset, ...data ];
            this.initPromptsTable();
            this.customPresetsTableData = _.cloneDeep(this.defaultPresetsTableData);
            $(".dropdown-menu.close-outside").on("click", function (event) {
                event.stopPropagation();
            });
        });
    },
    methods: {
        selectPreset(selectedPreset) {
            this.selectedPreset = selectedPreset;
            this.allFields.forEach(field => {
                if (this.selectedPreset.fields.includes(field)) {
                    $('#tableSummary').bootstrapTable('showColumn', field);
                } else {
                    $('#tableSummary').bootstrapTable('hideColumn', field);
                }
            })
            this.fillPresetTable();
        },
        fillPresetTable() {
            if (this.selectedPreset.name === 'default') {
                this.customPresetsTableData = _.cloneDeep(this.defaultPresetsTableData)
                return
            }
            this.customPresetsTableData = _.cloneDeep(this.defaultPresetsTableData.map(value => {
                if (this.selectedPreset.fields.includes(value.field)) {
                    return {
                        ...value,
                        checked: true,
                    }
                } else {
                    return {
                        ...value,
                        checked: false,
                    }
                }
            }))
        },
        initPromptsTable() {
            this.fetchSummaryData().then(data => {
                this.requestNames = data.map(row => row[this.filter_name]);
                this.selectedPages = [ ...this.requestNames ];
                this.loadingTable = false;
                const tableOptions = {
                    theadClasses: 'thead-light',
                    columns: tableSummaryColumns
                }
                $('#tableSummary').bootstrapTable(tableOptions);
                $('#tableSummary').bootstrapTable('append', data);
                this.$nextTick(() => {
                    this.defaultPresetsTableData.forEach(column => {
                        if (!column.checked) {
                            $('#tableSummary').bootstrapTable('hideColumn', column.field);
                        }
                    });
                })
            })
        },
        async fetchSummaryData() {
            let url = this.summary_url
            if (Object.keys(this.query_params).length > 0) {
                url = this.summary_url + "?" + new URLSearchParams(this.query_params);
            }
            const res = await fetch(url, {
                method: 'GET',
            })
            return res.json();
        },
        savePresetAs(presetName) {
            const newPreset = {
                "name": presetName,
                "fields": this.customPresetsTableData.filter(field => field.checked).map(f => f.field)
            }
            this.loadingSaveAs = true;
            ApiAddPreset(newPreset).then(() => {
                this.selectPreset(newPreset);
            }).then(() => {
                ApiFetchPreset().then((data) => {
                    this.allPresets = [ this.defaultPreset, ...data ];
                })
            }).finally(() => {
                this.showModal = false;
                this.loadingSaveAs = false;
            })
        },
        updatePreset(presetName) {
            const newPreset = {
                "name": presetName,
                "fields": this.customPresetsTableData.filter(field => field.checked).map(f => f.field)
            }
            this.loadingUpdate = true;
            ApiUpdatePreset(newPreset).then(() => {
                this.selectPreset(newPreset);
            }).then(() => {
                this.ApiFetchPreset().then((data) => {
                    this.allPresets = [ this.defaultPreset, ...data ];
                    this.fillPresetTable();
                })
            }).finally(() => {
                this.loadingUpdate = false;
            })
        },
        deletePreset(presetName) {
            this.loadingDelete = true;
            ApiDeletePreset(presetName).then(() => {
                this.loadingDelete = false;
                this.allPresets = this.allPresets.filter(preset => preset.name !== presetName);
                if (this.selectedPreset.name === presetName) {
                    this.selectPreset(this.defaultPreset);
                }
            })
        },
        filterTable(pages) {
            $('#tableSummary').bootstrapTable('filterBy', {
                pages: pages
            }, {
                'filterAlgorithm': (row, filters) => {
                    if (filters.pages.length > 0) {
                        return filters.pages.includes(row[this.filter_name]);
                    }
                }
            })
        },
        filterTableByLoop(type, loop, pages) {
            $('#tableSummary').bootstrapTable('filterBy', {
                type: type,
                loop: loop,
                pages: pages,
            }, {
                'filterAlgorithm': (row, filters) => {
                    if (filters.pages.length === 0 ) {
                        return false
                    }
                    if (filters.type === 'all' && filters.loop === 'all' && filters.pages.length === this.requestNames.length) return true;

                    if (filters.loop === 'all' && filters.type === 'all') {
                        const pages = filters ? filters.pages : [];
                        return pages.includes(row[this.filter_name]);
                    }

                    if (filters.loop === 'all' && filters.pages.length === this.requestNames.length) {
                        const type = filters ? filters.type : '';
                        return row.type.includes(type);
                    }

                    if (filters.type === 'all' && filters.pages.length === this.requestNames.length) {
                        const loop = filters ? filters.loop : '';
                        return row.loop.includes(loop);
                    }

                    if (filters.loop === 'all') {
                        const type = filters ? filters.type : '';
                        const pages = filters ? filters.pages : [];
                        return row.type.includes(type) && pages.includes(row[this.filter_name]);
                    }
                    if (filters.type === 'all') {
                        const loop = filters ? filters.loop : '';
                        const pages = filters ? filters.pages : [];
                        return row.loop.includes(loop) && pages.includes(row[this.filter_name]);
                    }
                    if (filters.pages.length === this.requestNames.length) {
                        const type = filters ? filters.type : '';
                        const loop = filters ? filters.loop : '';
                        return row.type.includes(type) && row.loop.includes(loop);
                    }
                    const type = filters ? filters.type : '';
                    const loop = filters ? filters.loop : '';
                    const pages = filters ? filters.pages : [];
                    return row.type.includes(type) && row.loop.includes(loop) && pages.includes(row[this.filter_name]);
                }
            })
        },
        selectPage(pages) {
            this.selectedPages = [ ...pages];
        }
    },
    template: `
        <div class="card card-table mt-3 pb-4 mx-3">
            <div class="card-body card-table">
                <div class="d-flex justify-content-between my-4">
                    <p v-if="block_name" class="font-h4 font-bold">{{ block_name }}</p>
                    <slot v-else name="table-pills"></slot>
                    <div class="d-flex">
                        <div class="complex-list">
                            <button class="btn btn-select btn-select__sm dropdown-toggle br-left d-flex align-items-center"
                                type="button"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false">
                                <p class="d-flex mb-0">
                                    <span class="complex-list_filled">{{ selectedPreset.name }}</span>
                                </p>
                            </button>
                            <div class="dropdown-menu dropdown-menu-right">
                                <ul class="my-0">
                                    <li
                                        class="dropdown-item dropdown-menu_item d-flex align-items-center justify-content-between"
                                        @click="selectPreset(preset)"
                                        v-for="preset in allPresets" :key="preset.name">
                                        <label
                                            class="mb-0 w-100 d-flex align-items-center justify-content-between">
                                            <span class="d-inline-block">{{ preset.name }}</span>
                                            <img v-if="preset.name === selectedPreset.name" src="/design-system/static/assets/ico/check.svg" class="ml-3">
                                        </label>
                                        <div class="pl-2">
                                            <button
                                                v-if="preset.name !== 'default'"
                                                class="btn btn-default btn-xs btn-table btn-icon__xs" @click.stop="deletePreset(preset.name)">
                                                <i v-if="!loadingDelete" class="fas fa-trash"></i>
                                                <i v-else class="preview-loader"></i>
                                            </button>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="dropdown_action" ref="presetToggle">
                            <button class="btn btn-secondary_item__right btn-secondary btn-icon"
                                    type="button"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                    id="dropdownTablePreset">
                                <i class="fa fa-cog"></i>
                            </button>
                            <div class="dropdown-menu dropdown-menu-right close-outside" style="width: 700px">
                                <div class="p-4">
                                    <div class="d-flex justify-content-between">
                                        <h3 class="font-h3 mr-4">{{ selectedPreset.name }}</h3>
                                        <div class="d-flex justify-content-start">
                                            <button
                                                v-if="selectedPreset.name !== 'default'"
                                                class="btn btn-basic d-flex align-items-center mr-2" @click.stop="updatePreset(selectedPreset.name)"
                                                >Save<i v-if="loadingUpdate" class="preview-loader__white ml-2"></i>
                                            </button>
                                            <button class="btn btn-secondary mr-2" @click="showModal = true">Save as...</button>
                                            <button
                                                type="button"
                                                class="btn btn-secondary"
                                                @click.stop="fillPresetTable">Reset</button>
                                        </div>
                                    </div>
                                    <div class="d-grid grid-column-4 gap-3 mt-4">
                                        <label class="mb-0 w-100 d-flex align-items-center custom-checkbox" v-for="field in customPresetsTableData" :key="field.title">
                                            <input class="mx-2" type="checkbox" v-model="field.checked" :value="field.field">
                                            <span class="w-100 d-inline-block">{{ field.title }}</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div v-show="loadingTable">
                        <div class="d-flex align-items-center justify-content-center" style="height: 270px">
                        <i class="preview-loader"></i>
                        </div>
                    </div>
                    <div v-show="!loadingTable">
                        <div class="d-flex align-items-center mb-2">
                            <p class="font-h5 mr-2">Filter by name:</p>
                            <SummaryTableFilter
                                v-if="!loadingTable"
                                @select-items="selectPage"
                                :is-all-checked="true"
                                :items-list="requestNames">
                            </SummaryTableFilter>
                        </div>
                        <table
                            id="tableSummary"
                            class="table table-border"
                            data-toggle="table"
                            data-unique-id="id"
                            data-page-list="[5, 10, 15]"
                            data-pagination="true"
                            data-side-pagination="client"
                            data-pagination-pre-text="<img src='/design-system/static/assets/ico/arrow_left.svg'>"
                            data-pagination-next-text="<img src='/design-system/static/assets/ico/arrow_right.svg'>"
                            data-page-size=5>
                            <thead class="thead-light">
                                <slot name="table-header"></slot>
                            </thead>
                        </table>
                    </div>
                    <modal-save-preset
                        v-if="showModal"
                        @close-modal="showModal = false"
                        @save-new-preset="savePresetAs"
                        :allPresets="allPresets"
                        :loading="loadingSaveAs"
                    ></modal-save-preset>
                </div>
            </div>
        </div>
    `
}
register_component('PresetTable', PresetTable);
