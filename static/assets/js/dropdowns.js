const SimpleList = {
    props: {
        showCheckBox: {
            default: true
        },
        closeOnItem: {
            default: true
        },
        itemsList1: {
            default: []
        }
    },
    data() {
        return {
            selectedItems1: [],
        }
    },
    methods: {
        isShowIcon(selectedItem) {
            return this.selectedItems1.some(item => item.id === selectedItem.id) && !this.showCheckBox;
        }
    },
    watch: {
        selectedItems1: (val) => {
            console.log(`SELECTED ITEMS: ${val}`)
        }
    },
    template:`
            <div id="simpleList" class="dropdown_simple-list">
                <button class="btn btn-secondary dropdown-toggle" type="button"
                      data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Select Step
                </button>
                <ul class="dropdown-menu"
                    :class="{'close-outside': closeOnItem}"
                    v-if="itemsList1.length > 0">
                    <li class="dropdown-menu_item d-flex align-items-center px-3" v-for="item in itemsList1" :key="item.id">
                        <input
                            class="mr-2 custom-checkbox"
                            type="checkbox"
                            :id="item.id"
                            :value="item"
                            v-model="selectedItems1">
                        <label
                            class="mb-0 w-100 d-flex align-items-center"
                            :for="item.id">
                            <i class="fa fa-2x mr-2" :class="[item.icon]" v-if="!showCheckBox && item.icon"></i>
                            <span class="w-100 d-inline-block ml-3">{{ item.title }}</span>
                            <i class="fa fa-check" v-if="isShowIcon(item)"></i>
                        </label>
                    </li>
                </ul>
                <div class="dropdown-menu py-0" v-else>
                    <span class="px-3 py-2 d-inline-block">There are no any steps.</span>
                </div>
            </div>`
}

const TreeList = {
    data() {
        return {
            itemsListTree: [
                { id: 1, title: 'Items Group 1', showItems: true, items: [
                        { id: 2, title: 'Items Group 1.1' },
                        { id: 3, title: 'Items Group 1.2', showItems: true, items: [
                                { id: 4, title: 'Items Group 1.1.1' },
                            ]
                        },
                    ]
                },
                { id: 5, title: 'Items Group 2', showItems: true, items: [
                        { id: 6, title: 'Items Group 2.1' },
                        { id: 7, title: 'Items Group 2.2' },
                    ]
                },
                { id: 9, title: 'Items Group 3' },
            ],
            selectedItems: [],
        }
    },
    watch: {
        selectedItems: (val) => {
            console.log(`SELECTED TREE ITEMS: ${val}`)
        }
    },
    template: `
            <div class="dropdown_tree-list">
                <button class="btn btn-secondary dropdown-toggle" type="button"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Select Step
                </button>
                <div class="dropdown-menu close-outside pt-3 pb-0">
                    <div v-for="item1lvl in itemsListTree" :key="item1lvl.id">
                        <p class="d-flex align-items-center px-3 position-relative">
                             <i class="fa fa-sort-down position-absolute"
                                v-if="item1lvl.items"
                                @click="item1lvl.showItems = !item1lvl.showItems"
                                :style="[!item1lvl.showItems ? 'transform: rotate(270deg)' : '']"
                            ></i>
                            <input
                                class="mr-2 custom-checkbox"
                                type="checkbox"
                                :id="item1lvl.title+'-'+item1lvl.id"
                                :value="item1lvl.id"
                                v-model="selectedItems">
                            <label
                                class="w-full d-inline-block mb-0"
                                :class="{'arrow_label' : item1lvl.items}"
                                :for="item1lvl.title+'-'+item1lvl.id">
                                <span style="margin-left: 36px">{{ item1lvl.title }}</span>
                            </label>
                        </p>
                        <div v-if="item1lvl.items && item1lvl.showItems" class="ml-4">
                            <div v-for="item2lvl in item1lvl.items" :key="item2lvl.id">
                                <p class="d-flex align-items-center px-3 position-relative">
                                    <i class="fa fa-sort-down position-absolute"
                                        v-if="item2lvl.items"
                                        @click="item2lvl.showItems = !item2lvl.showItems"
                                        :style="[!item2lvl.showItems ? 'transform: rotate(270deg)' : '']"
                                    ></i>
                                    <input
                                        class="mr-2 custom-checkbox"
                                        type="checkbox"
                                        :id="item2lvl.title+'-'+item2lvl.id"
                                        :value="item2lvl.id"
                                        v-model="selectedItems">
                                    <label 
                                        class="w-full d-inline-block mb-0"
                                        :class="{'arrow_label' : item2lvl.items}"
                                        :for="item2lvl.title+'-'+item2lvl.id">
                                        <span style="margin-left: 36px">{{ item2lvl.title }}</span>
                                    </label>
                                </p>
                                <div v-if="item2lvl.items && item2lvl.showItems" class="ml-4">
                                    <div v-for="item3lvl in item2lvl.items" :key="item3lvl.id">
                                        <p class="d-flex align-items-center px-3">
                                            <input
                                                class="mr-2 custom-checkbox"
                                                :class="{'arrow_label' : item3lvl.items}"
                                                type="checkbox"
                                                :id="item3lvl.title+'-'+item3lvl.id"
                                                :value="item3lvl.id"
                                                v-model="selectedItems">
                                            <label
                                                class="w-full d-inline-block mb-0"
                                                :for="item3lvl.title+'-'+item3lvl.id">
                                                <span style="margin-left: 36px">{{ item3lvl.title }}</span>
                                            </label>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
}

const ComplexList = {
    data() {
        return {
            inputSearch: '',
            itemsList: [
                { id: 11, title: 'Step 1' },
                { id: 12, title: 'Step 2' },
                { id: 13, title: 'Step 3' },
                { id: 14, title: 'Step 4' },
                { id: 15, title: 'Step 5' },
            ],
            selectedItems: [],
            closeOnItem: true,
        }
    },
    computed: {
        foundItems() {
            return this.itemsList.filter(item => item.title.includes(this.inputSearch))
        }
    },
    template: `
        <div id="complexList" class="complex-list">
            <button class="btn btn-secondary dropdown-toggle" type="button"
                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Select Step
            </button>
            <div class="dropdown-menu"
                :class="{'close-outside': closeOnItem}">
                <div class="px-3 pt-2">
                    <div class="custom-input custom-input__search position-relative">
                        <input
                            type="text"
                            placeholder="Search"
                            v-model="inputSearch">
                        <img src="assets/ico/search.svg" class="icon-search position-absolute">
                    </div>
                </div>
                <ul v-if="foundItems.length > 0" class="my-0">
                    <li
                        class="dropdown-item dropdown-menu_item d-flex align-items-center"
                        v-for="item in foundItems" :key="item.id">
                        <input
                            class="mr-2 custom-checkbox"
                            type="checkbox"
                            :id="item.id"
                            :value="item"
                            v-model="selectedItems">
                        <label
                            class="mb-0 w-100 d-flex align-items-center"
                            :for="item.id">
                            <span class="w-100 d-inline-block ml-3">{{ item.title }}</span>
                        </label>
                    </li>
                </ul>
                <div class="p-3">
                    <button class="btn btn-basic" type="submit">Primary</button>
                    <button type="button" class="btn btn-secondary">Secondary</button>
                </div>
            </div>
        </div>`
};

const dropdownsApp = Vue.createApp({
    components: {
        'simple-list': SimpleList,
        'tree-list': TreeList,
        'complex-list': ComplexList,
    }
});

dropdownsApp.mount('#dropdowns');

$(".dropdown-menu.close-outside").on("click", function (event) {
    event.stopPropagation();
});