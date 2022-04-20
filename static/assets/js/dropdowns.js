const SimpleList = {
    data() {
        return {
            selectedItems1: [],
            itemsList1: [
                { id: 1, title: 'Step 1' },
                { id: 2, title: 'Step 2' }
            ]
        }
    },
    watch: {
        selectedItems1: (val) => {
            console.log(`SELECTED ITEMS: ${val}`)
        }
    },
    template:`
        <div id="simpleList" class="dropdown_simple-list">
            <button class="btn btn-select dropdown-toggle" type="button"
                  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <span class="complex-list_filled" v-if="selectedItems1.length > 0">{{ selectedItems1.length }} selected</span>
            <span v-else class="complex-list_empty">Select Step</span>
            </button>
            <ul class="dropdown-menu close-outside"
                v-if="itemsList1.length > 0">
                <li class="dropdown-menu_item d-flex align-items-center px-3" v-for="item in itemsList1" :key="item.id">
                    <label
                        class="mb-0 w-100 d-flex align-items-center custom-checkbox">
                        <input
                            :value="item.title"
                            v-model="selectedItems1"
                            type="checkbox">
                        <span class="w-100 d-inline-block ml-3">{{ item.title }}</span>
                    </label>
                </li>
            </ul>
            <div class="dropdown-menu py-0" v-else>
                <span class="px-3 py-2 d-inline-block">There are no any steps.</span>
            </div>
        </div>
    `
}

const TreeList = {
    props: {
      allSelected: {
          default: true,
      }
    },
    data() {
        return {
            itemsListTree: [
                { id: 1, title: 'Group 1.1', showItems: true, type: 'group', items: [
                        { id: 2, title: 'Item 1.1' },
                        { id: 3, title: 'Group 1.2', showItems: true, type: 'group', items: [
                                { id: 4, title: 'Item 1.1.1' },
                            ]
                        },
                    ]
                },
                { id: 5, title: 'Group 2', showItems: true, type: 'group', items: [
                        { id: 6, title: 'Item 2.1' },
                        { id: 7, title: 'Item 2.2' },
                    ]
                },
                { id: 9, title: 'Item 3' },
            ],
            selectedItems: [],
        }
    },
    watch: {
        selectedItems: (val) => {
            console.log(`SELECTED TREE ITEMS: ${val}`)
        }
    },
    methods: {
        selectAllItems(values) {
            values.forEach(value => {
                if(value.hasOwnProperty('items')) {
                    this.selectAllItems(value.items)
                }
                this.selectedItems.push(value.id);
            })
        },
        selectRelatedItems(item) {
            const relatedItems = [];
            item.items.forEach(v => {
                if(v.hasOwnProperty('items')) {
                    v.items.forEach(v2 => {
                        relatedItems.push(v2.id);
                    });
                }
                relatedItems.push(v.id);
            });
            return relatedItems;
        },
        toggleItem(item, e, relatedId = null, type = 'item') {
            if(type === 'group' && !e.target.checked && e.target.checked !== undefined) {
                console.log(e)
            }
        }
    },
    template: `
            <div class="dropdown_tree-list">
                <button class="btn btn-select dropdown-toggle" type="button"
                      data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <span v-if="selectedItems1.length > 0">{{ selectedItems1.length }} selected</span>
                <span v-else class="complex-list_empty">Select Step</span>
                </button>
                <ul class="dropdown-menu close-outside"
                    v-if="itemsList1.length > 0">
                    <li class="dropdown-menu_item d-flex align-items-center px-3" v-for="item in itemsList1" :key="item.id">
                        <label
                            class="mb-0 w-100 d-flex align-items-center custom-checkbox">
                            <input
                                :value="item.title"
                                v-model="selectedItems1"
                                type="checkbox">
                            <span class="w-100 d-inline-block ml-3">{{ item.title }}</span>
                        </label>
                    </li>
                </ul>
                <div class="dropdown-menu py-0" v-else>
                    <span class="px-3 py-2 d-inline-block">There are no any steps.</span>
                <div class="dropdown-menu close-outside pt-3 pb-0">
                    <div v-for="item1lvl in itemsListTree" :key="item1lvl.id">
                        <p v-if="item1lvl.type === 'group'" class="d-flex align-items-center px-3 position-relative">
                             <i class="fa fa-sort-down position-absolute"
                                v-if="item1lvl.items"
                                @click="item1lvl.showItems = !item1lvl.showItems"
                                :style="[!item1lvl.showItems ? 'transform: rotate(270deg)' : '']"
                            ></i>
                            <label
                                @click="toggleItem(item1lvl, $event, null, item1lvl.type)"
                                class="mb-0 w-100 d-flex align-items-center custom-checkbox">
                                <input
                                    type="checkbox">
                                <span class="w-100 d-inline-block ml-3">{{ item1lvl.title }}</span>
                            </label>
                        </p>
                        <p v-else class="d-flex align-items-center px-3 position-relative">
                            <label
                                class="mb-0 w-100 d-flex align-items-center custom-checkbox">
                                <input
                                    @click="toggleItem(item1lvl, $event)"
                                    type="checkbox">
                                <span class="w-100 d-inline-block ml-3">{{ item1lvl.title }}</span>
                            </label>
                        </p>
                        <div v-if="item1lvl.items && item1lvl.showItems" class="ml-4">
                            <div v-for="item2lvl in item1lvl.items" :key="item2lvl.id">
                                <p v-if="item2lvl.type !== 'group'" class="d-flex align-items-center px-3 position-relative">
                                    <label
                                        class="mb-0 w-100 d-flex align-items-center custom-checkbox">
                                        <input
                                            @click="toggleItem(item2lvl, $event, item1lvl.id)"
                                            type="checkbox">
                                        <span class="w-100 d-inline-block ml-3">{{ item2lvl.title }}</span>
                                    </label>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`
}

const ComplexList = {
    data() {
        return {
            inputSearch: '',
            itemsList: [...Array(5).keys()].map((item, index) => (
                { id: Math.round(Math.random() * 1000), title: `Step ${index + 1}`}
            )),
            refSearchId: 'refSearchCbx'+Math.round(Math.random() * 1000),
            selectedItems: [],
            closeOnItem: true,
        }
    },
    computed: {
        foundItems() {
            return this.inputSearch ?
                this.itemsList.filter(item => item.title.toUpperCase().includes(this.inputSearch.toUpperCase())) :
                this.itemsList
        },
        isAllSelected() {
            return (this.selectedItems.length < this.itemsList.length) && this.selectedItems.length > 0
        }
    },
    watch: {
        selectedItems: function (val) {
            this.$refs[this.refSearchId].checked = this.selectedItems.length === this.itemsList.length ? true : false;
        }
    },
    methods: {
        handlerSelectAll() {
            if (this.selectedItems.length !== this.itemsList.length) {
                this.selectedItems = [...this.itemsList];
            } else {
                this.selectedItems.splice(0);
            }
        }
    },
    template: `
        <div id="complexList" class="complex-list">
            <button class="btn btn-select dropdown-toggle" type="button"
                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <span v-if="selectedItems.length > 0" class="complex-list_filled">{{ selectedItems.length }} selected</span>
                <span v-else class="complex-list_empty">Select Step</span>
            </button>
            <div class="dropdown-menu"
                :class="{'close-outside': closeOnItem}">
                <div v-if="itemsList.length > 4" class="px-3 pb-2 search-group">
                    <div class="custom-input custom-input_search__sm position-relative">
                        <input
                            type="text"
                            placeholder="Search"
                            v-model="inputSearch">
                        <img src="assets/ico/search.svg" class="icon-search position-absolute">
                    </div>
                </div>
                <ul class="my-0">
                    <li
                       class="dropdown-item dropdown-menu_item d-flex align-items-center">
                       <label
                            class="mb-0 w-100 d-flex align-items-center custom-checkbox"
                            :class="{ 'custom-checkbox__minus': isAllSelected }">
                            <input
                                :ref="refSearchId"
                                @click="handlerSelectAll"
                                type="checkbox">
                            <span class="w-100 d-inline-block ml-3">All</span>
                       </label>
                    </li>
                    <li
                        class="dropdown-item dropdown-menu_item d-flex align-items-center"
                        v-for="item in foundItems" :key="item.id">
                         <label
                            class="mb-0 w-100 d-flex align-items-center custom-checkbox">
                            <input
                                :value="item"
                                v-model="selectedItems"
                                type="checkbox">
                            <span class="w-100 d-inline-block ml-3">{{ item.title }}</span>
                        </label>
                    </li>
                </ul>
                <div class="p-3">
                    <button class="btn btn-basic mr-2" type="submit">Primary</button>
                    <button type="button" class="btn btn-secondary">Secondary</button>
                </div>
            </div>
        </div>`
};

const ComplexListFilter = {
    props: {
        minWidth: {
            default: 'auto'
        },
        fixWidth: {
            default: false,
        },
        showSelected: {
            default: true,
        }
    },
    data() {
        return {
            inputSearch: '',
            itemsList: [...Array(5).keys()].map((item, index) => (
                { id: Math.round(Math.random() * 1000), title: `Step ${index + 1}`}
            )),
            refSearchId: 'refSearchCbx'+Math.round(Math.random() * 1000),
            selectedItems: [],
            closeOnItem: true,
        }
    },
    computed: {
        foundItems() {
            return this.inputSearch ?
                this.itemsList.filter(item => item.title.toUpperCase().includes(this.inputSearch.toUpperCase())) :
                this.itemsList
        },
        isAllSelected() {
            return (this.selectedItems.length < this.itemsList.length) && this.selectedItems.length > 0
        }
    },
    watch: {
        selectedItems: function (val) {
            this.$refs[this.refSearchId].checked = this.selectedItems.length === this.itemsList.length ? true : false;

        }
    },
    methods: {
        handlerSelectAll() {
            if (this.selectedItems.length !== this.itemsList.length) {
                this.selectedItems = [...this.itemsList];
            } else {
                this.selectedItems.splice(0);
            }
        }
    },
    template: `
        <div id="complexList" class="complex-list complex-list__filter">
            <button class="btn btn-select dropdown-toggle position-relative text-left d-flex align-items-center"
                :style="{minWidth: minWidth}"
                type="button"   
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false">
                <slot name="label"></slot>
                <p v-if="showSelected" class="d-flex mb-0"
                    :class="{'w-100': fixWidth}">
                    <span v-if="selectedItems.length === itemsList.length" class="complex-list_filled">All</span>
                    <span v-else-if="selectedItems.length > 0" class="complex-list_filled">{{ selectedItems.length }} selected</span>
                    <span v-else class="complex-list_empty">Select Step</span>  
                </p>
            </button>
            <div class="dropdown-menu"
                :class="{'close-outside': closeOnItem}">
                <div v-if="itemsList.length > 4" class="px-3 pb-2 search-group">
                    <div class="custom-input custom-input_search__sm position-relative">
                        <input
                            type="text"
                            placeholder="Search"
                            v-model="inputSearch">
                        <img src="assets/ico/search.svg" class="icon-search position-absolute">
                    </div>
                </div>
                <ul class="my-0">
                    <li
                        class="dropdown-item dropdown-menu_item d-flex align-items-center">
                        <label
                            class="mb-0 w-100 d-flex align-items-center custom-checkbox"
                            :class="{ 'custom-checkbox__minus': isAllSelected }">
                            <input
                                @click="handlerSelectAll"
                                :ref="refSearchId"
                                type="checkbox">
                            <span class="w-100 d-inline-block ml-3">All</span>
                        </label>
                    </li>
                    <li
                        class="dropdown-item dropdown-menu_item d-flex align-items-center"
                        v-for="item in foundItems" :key="item.id">
                        <label
                            class="mb-0 w-100 d-flex align-items-center custom-checkbox">
                            <input
                                :value="item"
                                v-model="selectedItems"
                                type="checkbox">
                            <span class="w-100 d-inline-block ml-3">{{ item.title }}</span>
                        </label>
                    </li>
                </ul>
                <div class="p-3">
                    <button class="btn btn-basic mr-2" type="submit">Primary</button>
                    <button type="button" class="btn btn-secondary">Secondary</button>
                </div>
            </div>
        </div>`
};

const RemovableFilter = {
    props: {
        minWidth: {
            default: 'auto'
        },
        fixWidth: {
            default: false,
        }
    },
    data() {
        return {
            inputSearch: '',
            itemsList: [...Array(5).keys()].map((item, index) => (
                { id: Math.round(Math.random() * 1000), title: `Step ${index + 1}`}
            )),
            refSearchId: 'refSearchCbx'+Math.round(Math.random() * 1000),
            selectedItems: [],
            closeOnItem: true,
        }
    },
    computed: {
        foundItems() {
            return this.inputSearch ?
                this.itemsList.filter(item => item.title.toUpperCase().includes(this.inputSearch.toUpperCase())) :
                this.itemsList
        },
        isAllSelected() {
            return (this.selectedItems.length < this.itemsList.length) && this.selectedItems.length > 0
        }
    },
    watch: {
        selectedItems: function (val) {
            if (this.selectedItems.length !== this.itemsList.length) {
                this.$refs[this.refSearchId].checked = false;
            }
        }
    },
    methods: {
        handlerSelectAll() {
            if (this.selectedItems.length !== this.itemsList.length) {
                this.selectedItems = [...this.itemsList];
            } else {
                this.selectedItems.splice(0);
            }
        },
        removeList() {
            alert('filter dalated');
        }
    },
    template: `
        <div id="complexList" class="complex-list complex-list__removable">
            <button class="btn btn-select dropdown-toggle position-relative text-left d-flex align-items-center"
                :style="{ minWidth: minWidth }"
                type="button"   
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false">
                <span class="font-weight-500 mr-2">LABEL:</span>
                <p class="d-flex mb-0"
                    :class="{'w-100': fixWidth}">
                    <span v-if="selectedItems.length === itemsList.length" class="complex-list_filled">All</span>
                    <span v-else-if="selectedItems.length > 0" class="complex-list_filled">{{ selectedItems.length }} selected</span>
                    <span v-else class="complex-list_empty">Select Step</span>
                    <span class="icon-times font-weight-bold d-flex align-items-center pl-2"
                        @click.stop="removeList">
                        <i class="fa fa-times"></i>
                    </span>
                </p>
            </button>
            <div class="dropdown-menu"
                :class="{'close-outside': closeOnItem}">
                <div v-if="itemsList.length > 4" class="px-3 pb-2 search-group">
                    <div class="custom-input custom-input_search__sm position-relative">
                        <input
                            type="text"
                            placeholder="Search"
                            v-model="inputSearch">
                        <img src="assets/ico/search.svg" class="icon-search position-absolute">
                    </div>
                </div>
                <ul class="my-0">
                    <li
                        class="dropdown-item dropdown-menu_item d-flex align-items-center">
                        <label
                            class="mb-0 w-100 d-flex align-items-center custom-checkbox"
                            :class="{ 'custom-checkbox__minus': isAllSelected }">
                            <input
                                @click="handlerSelectAll"
                                :ref="refSearchId"
                                type="checkbox">
                            <span class="w-100 d-inline-block ml-3">All</span>
                        </label>
                    </li>
                    <li
                        class="dropdown-item dropdown-menu_item d-flex align-items-center"
                        v-for="item in foundItems" :key="item.id">
                        <label
                            class="mb-0 w-100 d-flex align-items-center custom-checkbox">
                            <input
                                :value="item"
                                v-model="selectedItems"
                                type="checkbox">
                            <span class="w-100 d-inline-block ml-3">{{ item.title }}</span>
                        </label>
                    </li>
                </ul>
                <div class="p-3">
                    <button class="btn btn-basic mr-2" type="submit">Primary</button>
                    <button type="button" class="btn btn-secondary">Secondary</button>
                </div>
            </div>
        </div>`
};

const dropdownsApp = Vue.createApp({
    components: {
        'simple-list': SimpleList,
        'complex-list': ComplexList,
        'complex-list-filter': ComplexListFilter,
        'removable-filter': RemovableFilter,
    }
});

dropdownsApp.mount('#dropdowns');

let data = [{
    "id": "1",
    "text": "node-1",
    "children": [
        {
            "id": "1-2",
            "text": "node-1-2",
        },
        {
            "id": "1-1",
            "text": "node-1-1",
            "children": [
                {
                    "id": "1-1-1",
                    "text": "node-1-1-1"
                },
                {
                    "id": "1-1-2",
                    "text": "node-1-1-2"
                }
            ],
        }],
},
    {
        "id": "2",
        "text": "node-2",
    }
]
let tree = new Tree('.tree', {
    data,
    loaded: function () {
        this.values = ['1', '2'];
        // console.log(this.selectedNodes)
        // console.log(this.values)
    },
})

$(".dropdown-menu.close-outside").on("click", function (event) {
    event.stopPropagation();
});