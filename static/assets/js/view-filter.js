const ChoosePreset = {
    props: ['items', 'loadingPresets', 'selectedPreset'],
    methods: {
        deleteItem(item) {
            this.$emit('open-confirm', item)
        },
        selectDefault() {
            this.$emit('select-default')
        },
        selectPreset(item) {
            this.$emit('select-preset', item)
        },
    },
    template: `
        <div class="complex-list">
            <button class="btn btn-select btn-select__sm dropdown-toggle br-left d-flex align-items-center"
                type="button"   
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false">
                <p class="d-flex mb-0">
                    <i v-if="loadingPresets" class="preview-loader"></i>
                    <span v-if="!loadingPresets" class="complex-list_filled">{{ selectedPreset.title }}</span>
                </p>
            </button>
            <div class="dropdown-menu dropdown-menu-right">
                <ul class="my-0">
                    <li
                        class="dropdown-item dropdown-menu_item d-flex align-items-center">
                        <label
                            @click="selectDefault"
                            class="mb-0 w-100 d-flex align-items-center">
                            <span class="d-inline-block">Default preset</span>
                            <img v-if="!selectedPreset.id" src="./assets/ico/check.svg" class="mx-2">
                        </label>
                    </li>
                    <li
                        class="dropdown-item dropdown-menu_item d-flex align-items-center justify-content-between"
                        @click="selectPreset(item)"
                        v-for="item in items" :key="item.id">
                        <label
                            class="mb-0 w-100 d-flex align-items-center justify-content-between">
                            <span class="d-inline-block">{{ item.title }}</span>
                            <img v-if="item.id === selectedPreset.id" src="./assets/ico/check.svg" class="ml-3">
                        </label>
                        <div class="pl-2">
                            <button
                                class="btn btn-default btn-xs btn-table btn-icon__xs" @click.stop="deleteItem(item)">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </li>
                </ul>   
            </div>
        </div>
    `
};

const EditPreset = {
    props: ['selectedPreset', 'loadingSave'],
    data() {
        return {
            editablePreset: {},
        }
    },
    mounted() {
        $(this.$refs.presetToggle).on('show.bs.dropdown', this.initTable);

        $(this.$refs.presetToggle).on('hidden.bs.dropdown', function() {
            $('#presetTable').bootstrapTable('destroy')
        });
    },
    watch: {
        selectedPreset: {
            handler: function () {
                this.editablePreset = deepClone(this.selectedPreset);
            },
            deep: true
        }
    },
    methods: {
        initTable() {
            $('#presetTable').bootstrapTable({
                columns: this.editablePreset.colums,
                data: this.editablePreset.data,
                theadClasses: 'thead-light'
            })
        },
        saveAs() {
            this.$emit('open-modal');
            const updatedData = $('#presetTable').bootstrapTable('getData');
            this.editablePreset = { ...this.editablePreset, data: updatedData }
            this.$emit('create-new-preset', this.editablePreset)
        },
        save() {
            const updatedData = $('#presetTable').bootstrapTable('getData');
            this.editablePreset = { ...this.editablePreset, data: updatedData }
            this.$emit('save', this.editablePreset)
        },
        resetPreset() {
            this.editablePreset = deepClone(this.selectedPreset);
            $('#presetTable').bootstrapTable('destroy');
            this.initTable()
        },
    },
    template: ` 
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
                        <h3 class="font-h3 mr-4">{{ editablePreset.title }}</h3>
                        <div class="d-flex justify-content-start">
                            <button class="btn btn-basic mr-2 d-flex align-items-center"
                                type="button"
                                @click="apply">Apply
                                <i v-if="loadingApply" class="preview-loader__white ml-2"></i>
                            </button>
                            <button 
                                v-if="editablePreset.id"
                                :class="{'btn-secondary': loadingSave}"
                                @click="save"
                                class="btn btn-secondary d-flex align-items-center mr-2"
                                >Save <i v-if="loadingSave" class="preview-loader ml-2"></i>
                            </button>
                            <button class="btn btn-secondary mr-2" @click="saveAs">Save as...</button>
                            <button
                                type="button"
                                class="btn btn-secondary"
                                @click="resetPreset">Reset</button>
                        </div>
                    </div>
                    <table
                        id="presetTable"
                        data-show-header="false"
                        class="table table-border mt-4">
                    </table>
                </div>
            </div>
        </div>
    `
}

const ConfirmModal = {
    props: ['loadingDelete', 'deletedPreset'],
    template: `
    <div class="modal-component">
        <div class="modal-card">
            <p class="font-bold font-h3 mb-4">Delete preset?</p>
            <p class="font-h4 mb-4">Are you sure to delete {{ deletedPreset.title }} preset?</p>
            <div class="d-flex justify-content-end mt-4">
                <button type="button" class="btn btn-secondary mr-2" @click="$emit('close-confirm')">Cencel</button>
                <button
                    class="btn btn-basic mr-2 d-flex align-items-center"
                    @click="$emit('delete-preset')"
                >Delete<i v-if="loadingDelete" class="preview-loader__white ml-2"></i></button>
            </div>
        </div>
    </div>
`
}

const modalSavePreset = {
    props: ['loading'],
    data() {
        return {
            presetTitle: '',
        }
    },
    computed: {
        hasError() {
            return this.isShortName();
        }
    },
    methods: {
        isShortName() {
            return this.presetTitle.length < 3;
        },
        saveNewPreset() {
            if (!this.hasError) this.$emit('save-new-preset', this.presetTitle)
        }
    },
    template: `
        <div class="modal-component">
            <div class="modal-card">
                <p class="font-bold font-h3 mb-4">Create preset</p>
                <div class="custom-input" :class="{'invalid-input': hasError}">
                    <input
                        type="text"
                        v-model="presetTitle"
                        placeholder="Text">
                    <span class="input_error-msg">Preset name less then 3 letters</span>
                    <div class="d-flex justify-content-end mt-4">
                        <button type="button" class="btn btn-secondary mr-2" @click="$emit('open-modal')">Cencel</button>
                        <button
                            :disabled="hasError"
                            class="btn btn-basic mr-2 d-flex align-items-center"
                            type="submit"
                            @click="saveNewPreset"
                        >Save <i v-if="loading" class="preview-loader__white ml-2"></i></button>
                    </div>
                </div>
            </div>
        </div>
    `
}

const vueApp = Vue.createApp({
    components: {
        'choose-preset': ChoosePreset,
        'confirm-modal': ConfirmModal,
        'edit-preset': EditPreset,
        'modal-save-preset': modalSavePreset,
    },
    data() {
        return {
            showModal: false,
            filtersName: [],
            loadingSave: false,
            loadingSaveAs: false,
            loadingApply: false,
            presets: null,
            loadingPresets: false,
            loadingDelete: false,
            loadingTable: false,
            updatedFilter: null,
            tableColumns: null,
            tableData: null,
            showConfirm: false,
            prepearDeletedPreset: null,
            prepearedNewPreset: null,
            selectedPreset: defaultPreset,
            defaultPreset,
        }
    },
    mounted() {
        this.selectedPreset = deepClone(this.defaultPreset)
        this.fetchPresets();
        this.fetchTableData(this.selectedPreset);
        const event = new Event('vue_init');
        document.dispatchEvent(event);
    },
    methods: {
        fetchPresets() {
            this.loadingPresets = true;
            apiFetchPresets.then(res => {
                console.log('fetched')
                this.presets = res;
            }).finally(() => {
                this.loadingPresets = false;
                this.renderSelect()
            })
        },
        fetchTableData({ tableId }) {
            this.loadingTable = true;
            $('#table').bootstrapTable('destroy');
            setTimeout(() => {
                apiFetchTable(tableId).then(res => {
                    this.tableData = res.tableData
                    this.initTable(res);
                }).finally(() => {
                    this.loadingTable = false
                })
            }, 700)
        },
        renderSelect() {
            this.$nextTick(() => {
                $('.selectpicker').selectpicker('render');
            });
        },
        initTable({ tableColumns}) {
            const tableOptions = {
                columns: tableColumns,
                data: this.tableData,
                theadClasses: 'thead-light'
            }
            $('#table').bootstrapTable(tableOptions);
        },
        selectPreset(preset) {
            this.selectedPreset = preset;
            this.fetchTableData(this.selectedPreset)
        },
        selectDefault() {
            this.selectedPreset = deepClone(this.defaultPreset);
            this.fetchTableData(this.selectedPreset);
        },
        openConfirm(preset) {
            this.showConfirm = !this.showConfirm;
            this.prepearDeletedPreset = preset;
        },
        deletePreset() {
            this.loadingDelete = true;
            setTimeout(() => {
                apiDeletePreset(this.prepearDeletedPreset).then((response) => {
                    showNotify('SUCCESS', response.message);
                    this.fetchPresets();
                    if (this.prepearDeletedPreset.id === this.selectedPreset.id) {
                        this.selectedPreset = deepClone(this.defaultPreset)
                    }
                }).finally(() => {
                    this.loadingDelete = false;
                    this.showConfirm = !this.showConfirm;
                })
            }, 500);
        },
        savePreset(preset) {
            this.loadingSave = true;
            setTimeout(() => {
                apiSavePreset(preset).then(response => {
                    showNotify('SUCCESS', response.message);
                    this.fetchPresets();
                    this.selectPreset(response.data);
                }).catch(error => {
                    showNotify('ERROR', error);
                }).finally(() => {
                    this.loadingSave = false;
                })
            }, 500)
        },
        openModal() {
            this.showModal = !this.showModal;
        },
        prepearNewPreset(prepearedPreset) {
            this.prepearedNewPreset = prepearedPreset;
        },
        saveNewPreset(presetName) {
            this.loadingSaveAs = true;
            setTimeout(() => {
                apiSaveAsPreset(this.prepearedNewPreset, presetName).then(response => {
                    this.fetchPresets();
                    this.selectPreset(response.data);
                    showNotify('SUCCESS', response.message);
                    this.openModal();
                }).catch(error => {
                    showNotify('ERROR', error);
                }).finally(() => {
                    this.loadingSaveAs = false;
                })
            }, 500)
        },
    }
});

const viewFilter = vueApp.mount('#vueApp');

$(".dropdown-menu.close-outside").on("click", function (event) {
    event.stopPropagation();
});