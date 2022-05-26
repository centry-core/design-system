const TableCard = {
    delimiters: ['[[', ']]'],
    props: ['instance_name', 'header', 'borders', 'container_classes', 'table_attributes'],
    mounted() {
        console.log('TableCard props', this.$props)
        console.log('TableCard refs', this.$refs)
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
        table_action(option, ...rest) {
            console.log('RUNNING TABLE_ACTION', option, rest)
            this.table_data = $(this.$refs.table).bootstrapTable(option, ...rest)
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
                    <slot name="actions"></slot>
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
                        <slot name="table_headers"></slot>
                    </tr>
                </thead>
            </table>
        </div>
    </div>
    `
}

// q = `
// <div class="card card-table-sm">
//     <div class="card-body">
//         <table
//                 class="table table-borderless"
//                 id="tests-list"
//                 data-toggle="table"
//
//
//                 data-page-size=5 data-pagination="true"
//      >
//             <thead class="thead-light">
//                 <tr>
//                     <th data-visible="false" data-field="id">index</th>
//                     <th scope="col" data-sortable="true" data-cell-style="nameStyle" data-field="name">Name</th>
//                     <th scope="col" data-sortable="true" data-cell-style="nameStyle" data-field="test_uid">UUID
//                     </th>
//                     <th scope="col" data-sortable="true" data-cell-style="nameStyle" data-field="entrypoint">
//                         Entrypoint</th>
//                     <th scope="col" data-align="center" data-sortable="true" data-formatter=lgFormatter
//                         data-field="job_type">Tool</th>
//                     <th scope="col" data-align="right" data-cell-style="cellStyle"
//                         data-formatter=actionFormatter>Actions</th>
//                 </tr>
//             </thead>
//             <tbody>
//             </tbody>
//         </table>
//     </div>
// </div>
// `

// header='Reporters'
// actions_area=`<div class="d-flex justify-content-end">
//                         <button type="button" class="btn btn-32 btn-secondary"><i class="fas fa-sync"></i></button>
//                         <button type="button" class="btn btn-32 btn-secondary"><i class="fas fa-filter"></i></button>
//                         <button type="button" class="btn btn-32 btn-secondary"><i class="fas fa-tag"></i></button>
//                         <button type="button" class="btn btn-32 btn-secondary"><i class="fas fa-trash-alt"></i></button>
//                     </div>`
// table_url='/api/v1/security/results/{{ tools.session_project.get() }}'
// table_page_size=1
// table_headers=`<th scope="col" data-checkbox="true"></th>
//                     <th data-visible="false" data-field="id">index</th>
//                     <th scope="col" data-sortable="true" data-field="test_name"
//                         data-formatter="tableFormatters.reports_test_name_button">
//                         Name
//                     </th>
//                     <th scope="col" data-sortable="true" data-field="start_date">Start</th>
//                     <th scope="col" data-sortable="true" data-field="duration">Duration</th>
//                     <th scope="col" data-sortable="true" data-field="findings">Findings</th>
//                     <th scope="col" data-sortable="true" data-field="false_positive">False Positive</th>
//                     <th scope="col" data-sortable="true" data-field="excluded">Excl</th>
//                     <th scope="col" data-sortable="true" data-field="info">Info</th>
//                     <th scope="col" data-sortable="true" data-field="tags" data-formatter="reportsTagFormatter">
//                         Tag
//                     </th>
//                     <th scope="col" data-field="test_status.status"
//                         data-formatter="tableFormatters.reports_status_formatter">
//                         Status
//                     </th>`

register_component('TableCard', TableCard)