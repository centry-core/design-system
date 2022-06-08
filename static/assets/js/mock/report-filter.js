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
            loadingDelete: false,
            updatedFilter: null,
            tableData,
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
                data: this.tableData,
                theadClasses: 'thead-light'
            }
            $('#table').bootstrapTable(tableOptions)
        },
        fetchFilters() {
            this.loadingFilters = true;
            apiFetchFilters.then(res => {
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
                apiFetchTable.then(response => {
                    const {columns, data} = response;
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
                apiSaveFilter(currentFilter).then(response => {
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
                apiSaveAsFilter(this.updatedFilter, filterName).then(response => {
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
        },
        deleteFilter(filter) {
            this.loadingDelete= true;
            setTimeout(() => {
                apiDeleteFilter(filter).then((response) => {
                    showNotify('SUCCESS', response.message);
                    this.fetchFilters();
                }).finally(() => {
                    this.loadingDelete = false;
                })
            }, 500);
        }
    }
});

const reportFilter = vueApp.mount('#vueApp');
$(() => {
    const event = new Event('vue_init');
    document.dispatchEvent(event);
})