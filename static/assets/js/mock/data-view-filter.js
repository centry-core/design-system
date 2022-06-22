const tablesData = [
    {
        tableColumns: [
            {
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
                formatter: 'tableSeverityButtonFormatter',
                sortable: true,
                class: 'min-w-175 pl-1',
            }
        ],
        tableData: [
            {
                name: 'George',
                scan_type: 'Monkey',
                scanner: 'OWASP ZAP',
                description: 'Lorem ipsum dolor sit amet',
                severity: 'critical',
            },
            {
                name: 'Jeffrey',
                scan_type: 'Giraffe',
                scanner: 'OWASP ZAP',
                description: 'Lorem ipsum dolor sit amet',
                severity: 'medium',
            },
            {
                name: 'Alice',
                scan_type: 'Giraffe',
                scanner: 'Qualys',
                description: 'Lorem ipsum dolor sit amet',
                severity: 'low',
            },
            {
                name: 'Alice',
                scan_type: 'Tiger',
                scanner: 'Qualys',
                description: 'Lorem ipsum dolor sit amet',
                severity: 'low',
            }
        ],
    },
    {
        tableColumns: [
        {
            title: 'ID',
            field: 'id',
            checkbox: true
        }, {
            title: 'description',
            field: 'description',
            sortable: true,
            class: 'w-100',
        }, {
            title: 'severity',
            field: 'severity',
            formatter: 'tableSeverityButtonFormatter',
            sortable: true,
        }
    ],
        tableData: [
        {
            name: 'George',
            scan_type: 'Monkey',
            scanner: 'OWASP ZAP',
            description: 'Lorem ipsum dolor sit amet',
            severity: 'critical',
        },
        {
            name: 'Jeffrey',
            scan_type: 'Giraffe',
            scanner: 'OWASP ZAP',
            description: 'Lorem ipsum dolor sit amet',
            severity: 'medium',
        },
        {
            name: 'Alice',
            scan_type: 'Giraffe',
            scanner: 'Qualys',
            description: 'Lorem ipsum dolor sit amet',
            severity: 'low',
        },
        {
            name: 'Alice',
            scan_type: 'Tiger',
            scanner: 'Qualys',
            description: 'Lorem ipsum dolor sit amet',
            severity: 'low',
        }
    ],
    },
    {
        tableColumns: [
            {
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
            }
        ],
        tableData: [
            {name: 'George', scan_type: 'Monkey'},
            {name: 'Jeffrey', scan_type: 'Giraffe'},
            {name: 'Alice', scan_type: 'Giraffe'},
        ]
    }

]

const defaultPreset = {
    id: "0",
    title: 'Default Preset',
    tableId: 0,
    type: "default",
    colums: [
        {
            title: 'test name',
            field: 'name',
            formatter: 'checkboxFormatter',
        }, {
            title: 'scan type',
            field: 'scan_type',
            formatter: 'checkboxFormatter',
        }, {
            title: 'scanner',
            field: 'scanner',
            formatter: 'checkboxFormatter',
        }, {
            title: 'description',
            field: 'description',
            formatter: 'checkboxFormatter',
        }
    ],
    data: [
        {
            name: { title: 'Metric', checked: false },
            scan_type: { title: 'Metric', checked: false },
            scanner: { title: 'Metric', checked: false },
            description: { title: 'Metric', checked: false },
        },
        {
            name: { title: 'Metric', checked: false },
            scan_type: { title: 'Metric', checked: false },
            scanner: { title: 'Metric', checked: false },
            description: { title: 'Metric', checked: false },
        },
        {
            name: { title: 'Metric', checked: false },
            scan_type: { title: 'Metric', checked: false },
            scanner: { title: 'Metric', checked: false },
            description: { title: 'Metric', checked: false },
        },
        {
            name: { title: 'Metric', checked: false },
            scan_type: { title: 'Metric', checked: false },
            scanner: { title: 'Metric', checked: false },
            description: { title: 'Metric', checked: false },
        },
        {
            name: { title: 'Metric', checked: false },
            scan_type: { title: 'Metric', checked: false },
            scanner: { title: 'Metric', checked: false },
            description: { title: 'Metric', checked: false },
        },
    ]
}

const presetsData = [
    {
        id: "0",
        title: 'Default Preset',
        tableId: 0,
        type: "default",
        colums: [
            {
                title: 'test name',
                field: 'name',
                formatter: 'checkboxFormatter',
            }, {
                title: 'scan type',
                field: 'scan_type',
                formatter: 'checkboxFormatter',
            }, {
                title: 'scanner',
                field: 'scanner',
                formatter: 'checkboxFormatter',
            }, {
                title: 'description',
                field: 'description',
                formatter: 'checkboxFormatter',
            }
        ],
        data: [
            {
                name: { title: 'Metric', checked: true },
                scan_type: { title: 'Metric', checked: false },
                scanner: { title: 'Metric', checked: true },
                description: { title: 'Metric', checked: false },
            },
            {
                name: { title: 'Metric', checked: false },
                scan_type: { title: 'Metric', checked: true },
                scanner: { title: 'Metric', checked: false },
                description: { title: 'Metric', checked: true },
            },
            {
                name: { title: 'Metric', checked: true },
                scan_type: { title: 'Metric', checked: false },
                scanner: { title: 'Metric', checked: true },
                description: { title: 'Metric', checked: false },
            },
            {
                name: { title: 'Metric', checked: false },
                scan_type: { title: 'Metric', checked: true },
                scanner: { title: 'Metric', checked: false },
                description: { title: 'Metric', checked: true },
            },
            {
                name: { title: 'Metric', checked: true },
                scan_type: { title: 'Metric', checked: false },
                scanner: { title: 'Metric', checked: true },
                description: { title: 'Metric', checked: false },
            },
        ]
    },
    {
        id: "1",
        title: 'First Preset',
        tableId: "1",
        type: 'custom',
        colums: [
            {
                title: 'test name',
                field: 'name',
                formatter: 'checkboxFormatter',
            }, {
                title: 'scan type',
                field: 'scan_type',
                formatter: 'checkboxFormatter',
            }, {
                title: 'scanner',
                field: 'scanner',
                formatter: 'checkboxFormatter',
            }, {
                title: 'description',
                field: 'description',
                formatter: 'checkboxFormatter',
            }
        ],
        data: [
            {
                name: { title: 'Metric', checked: false },
                scan_type: { title: 'Metric', checked: true },
                scanner: { title: 'Metric', checked: true },
                description: { title: 'Metric', checked: true },
            },
            {
                name: { title: 'Metric', checked: false },
                scan_type: { title: 'Metric', checked: true },
                scanner: { title: 'Metric', checked: false },
                description: { title: 'Metric', checked: true },
            },
            {
                name: { title: 'Metric', checked: false },
                scan_type: { title: 'Metric', checked: false },
                scanner: { title: 'Metric', checked: false },
                description: { title: 'Metric', checked: false },
            },
            {
                name: { title: 'Metric', checked: true },
                scan_type: { title: 'Metric', checked: false },
                scanner: { title: 'Metric', checked: false },
                description: { title: 'Metric', checked: false },
            },
            {
                name: { title: 'Metric', checked: true },
                scan_type: { title: 'Metric', checked: false },
                scanner: { title: 'Metric', checked: false },
                description: { title: 'Metric', checked: false },
            },
        ]
    },
    {
        id: "2",
        title: 'Second Preset',
        tableId: "2",
        type: 'custom',
        colums: [
            {
                title: 'test name',
                field: 'name',
                formatter: 'checkboxFormatter',
            }, {
                title: 'scan type',
                field: 'scan_type',
                formatter: 'checkboxFormatter',
            }, {
                title: 'scanner',
                field: 'scanner',
                formatter: 'checkboxFormatter',
            }, {
                title: 'description',
                field: 'description',
                formatter: 'checkboxFormatter',
            }
        ],
        data: [
            {
                name: { title: 'Metric', checked: false },
                scan_type: { title: 'Metric', checked: false },
                scanner: { title: 'Metric', checked: false },
                description: { title: 'Metric', checked: false },
            },
            {
                name: { title: 'Metric', checked: true },
                scan_type: { title: 'Metric', checked: true },
                scanner: { title: 'Metric', checked: true },
                description: { title: 'Metric', checked: true },
            },
            {
                name: { title: 'Metric', checked: false },
                scan_type: { title: 'Metric', checked: false },
                scanner: { title: 'Metric', checked: false },
                description: { title: 'Metric', checked: false },
            },
        ]
    },
]
