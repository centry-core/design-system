const TableCard = {
    delimiters: ['[[', ']]'],
    props: {
        showCustomCount: {
            default: false,
        },
        instance_name: {},
        header: {},
        borders: {},
        container_classes: {},
        table_attributes: {},
        adaptiveHeight: {}
    },
    mounted() {
        console.debug('TableCard mounted', {refs: this.$refs, props: this.$props});
        if (this.showCustomCount) {
            $(this.$refs.table).on('load-success.bs.table', () => {
                const items = $('#'+this.table_attributes.id).bootstrapTable('getData');
                this.itemsCount = items.length;
            });
        }
    },
    data() {
        return {
            table_data: [],
            itemsCount: 0,
        }
    },
    computed: {
        container_class() {
            let classes = this.borders ? 'card card-table' : 'card card-table-sm'
            if (!!this.container_classes) classes = `${classes} ${this.container_classes}`
            return classes

        },
        el() {
            return $(this.$refs.table)
        }
    },
    methods: {
        table_action(method, ...options) {
            console.debug('TableCard running action', method, options)
            this.table_data = this.el.bootstrapTable(method, ...options)
            return this.table_data
        }
    },
    template: `
    <div :class="container_class">
        <div class="card-header">
            <div class="row">
                <div class="col-4">
                    <p class="font-h4 font-bold">[[ header ]]</p>
                </div>
                <div class="col-8">
                    <slot name="actions"
                        :master="this"
                    ></slot>
                </div>
            </div>
        </div>
        <div class="card-body card-table" 
            :class="!!adaptiveHeight ? '' : 'fixed-h-table'">
            <table class="table"
                :class="!!borders ? 'table-border' : 'table-borderless'"
                data-toggle="table"
                data-unique-id="id"
                data-virtual-scroll="true"
                data-pagination="true"
                data-side-pagination="server"
                data-pagination-parts='["pageInfoShort", "pageList"]'
                
                data-pagination-pre-text="<img src='/design-system/static/assets/ico/arrow_left.svg'>"
                data-pagination-next-text="<img src='/design-system/static/assets/ico/arrow_right.svg'>"
                
                ref="table"
                
                v-bind="table_attributes"
            >
                <thead class="thead-light">
                    <tr>
                        <slot name="table_headers"
                            :master="this"
                        ></slot>
                    </tr>
                </thead>
            </table>
        </div>
        <div style="padding: 24px 20px" v-if="showCustomCount">
            <span class="font-h5 text-gray-600">[[ itemsCount ]] items</span>
        </div>
    </div>
    `
}

register_component('TableCard', TableCard)