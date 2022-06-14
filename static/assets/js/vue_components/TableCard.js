const TableCard = {
    delimiters: ['[[', ']]'],
    props: ['instance_name', 'header', 'borders', 'container_classes', 'table_attributes'],
    mounted() {
        console.debug('TableCard mounted', {refs: this.$refs, props: this.$props})
    },
    data() {
        return {
            table_data: []
        }
    },
    computed: {
    //     $table() {
    //         return $(this.$refs.table)
    //     },
        container_class() {
            let classes = this.borders ? 'card card-table' : 'card card-table-sm'
            if (!!this.container_classes) classes = `${classes} ${this.container_classes}`
            return classes

        }
    },
    methods: {
        table_action(method, ...options) {
            console.debug('TableCard running action', method, options)
            this.table_data = $(this.$refs.table).bootstrapTable(method, ...options)
            return this.table_data
        }
    },
    template: `
    <div :class="container_class">
        <div class="card-header">
            <div class="row">
                <div class="col-4">
                    <h3>[[ header ]]</h3>
                </div>
                <div class="col-8">
                    <slot name="actions"
                        :master="this"
                    ></slot>
                </div>
            </div>
        </div>

        <div class="card-body card-table">
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
    </div>
    `
}

register_component('TableCard', TableCard)