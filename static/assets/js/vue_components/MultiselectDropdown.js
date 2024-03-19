const MultiselectDropdown = {
    props: {
        list_items: {
            type: [Array, String],
            default: []
        },
        list_position: {
            type: String,
        },
        isAllChecked: {
            type: Boolean,
            default: false,
        },
        pre_selected_indexes: {
            type: [Array, String],
            default: [],
        },
        placeholder: {
            type: String,
            default: undefined
        },
        delimiter: {
            type: String,
            default: ','
        },
        container_class: {
            type: String,
            default: ''
        },
        has_error_class: {
            type: String,
            default: ''
        },
        button_class: {
            type: String,
            default: 'btn btn-select dropdown-toggle d-inline-flex align-items-center btn-border-none'
        },
        variant: {
            type: String,
            default: 'with_selected',
            validator(value) {
                // The value must match one of these strings
                return ['with_selected', 'slot'].includes(value)
            }
        },
        return_key: {
            type: [String, null],
            default: 'name',
        },
        disabled: {
            type: Boolean,
            default: false
        },
        hasSearch: {
            type: [String, Boolean],
            default: false
        },
        maxHeight: {
            type: String,
            default: null
        },
        modelValue: {
            type: Array
        }
    },
    emits: ['change', 'update:modelValue'],
    delimiters: ['[[', ']]'],
    data() {
        return {
            inputSearch: '',
            isAllSelected: false,
            selectedItems: [],
            refSearchId: 'refSearchCbx' + Math.round(Math.random() * 1000),
            url_prefix: window.url_prefix,
        }
    },
    mounted() {
        if (this.list_items.length > 0) {
            if (typeof this.pre_selected_indexes === 'string') {
                this.selectedItems = this.li.filter(
                    (el, idx) => this.pre_selected_indexes.split(this.delimiter).includes(idx)
                )
            } else {
                this.selectedItems = this.li.filter((el, idx) => this.pre_selected_indexes.includes(idx))
            }
        }
        if (this.isAllChecked) {
            this.selectedItems = this.list_items
            this.handlerSelectAll(true)
        }
    },
    computed: {
        selected_indexes() {
            return this.selectedItems.map(i => i.idx)
        },
        li() {
            if (this.list_items.length <= 0) return []

            let listed_items
            if (typeof this.list_items === 'string') {
                listed_items = this.list_items.split(this.delimiter)
            } else {
                listed_items = this.list_items
            }

            listed_items = listed_items.map((i, index) => {
                if (typeof i === 'object') {
                    return {
                        ...i,
                        name: i.name,
                        idx: index,
                    }
                }
                return {
                    name: i,
                    idx: index
                }
            })
            if (this.inputSearch) {
                listed_items = listed_items.filter(i => {
                    if (typeof i === 'object') {
                        return i.name.toLowerCase().includes(this.inputSearch.toLowerCase())
                    }
                    return i.toLowerCase().includes(this.inputSearch.toLowerCase())
                })
            }
            return listed_items
        },
        is_all_selected() {
            return (this.selectedItems.length < this.list_items.length) && this.selectedItems.length > 0
        },
        isAllHandleChecked() {
            return this.selectedItems.length === this.list_items.length
        }
    },
    methods: {
        handlerSelectAll(initCheckAll = false) {
            if (initCheckAll) {
                this.selectedItems = [...this.list_items.map((i, idx) => {
                    if (typeof i === 'object') {
                        return {
                            ...i,
                            name: i.name,
                            idx: idx,
                        }
                    }
                    return {
                        name: i,
                        idx: idx
                    }
                })]
                return;
            }
            if (this.selectedItems.length !== this.list_items.length) {
                this.selectedItems = [...this.list_items.map((i, idx) => {
                    if (typeof i === 'object') {
                        return {
                            ...i,
                            name: i.name,
                            idx: idx,
                        }
                    }
                    return {
                        name: i,
                        idx: idx
                    }
                })]
            } else {
                this.selectedItems = []
            }
        }
    },
    watch: {
        selectedItems(newValue) {
            this.$nextTick(() => {
                let return_value
                switch (this.return_key) {
                    case 'idx':
                        return_value = newValue.map(i => i.idx)
                        break
                    case null:
                        return_value = newValue
                        break
                    default:
                        return_value = newValue.map(i => i[this.return_key])
                        break
                }
                this.$emit('change', return_value)
                this.$emit('update:modelValue', return_value)
                if(this.$refs[this.refSearchId]) {
                    this.$refs[this.refSearchId].checked = this.selectedItems.length === this.list_items.length
                }

            })
        },
        modelValue(newValue) {
            newValue.forEach(i => {
                let item_id
                switch (this.return_key) {
                    case 'idx':
                        item_id = i
                        break
                    case null:
                        item_id = i.idx
                        break
                    default:
                        item_id = this.li.find(x => x[this.return_key] === i)?.idx
                        break
                }
                if (this.selectedItems.find(x => x.idx === item_id) === undefined) {
                    const item = this.li.find(x => x.idx === item_id)
                    this.selectedItems.push(item)
                }
            })
        }
    },
    template: `
    <div class="select-validation" :class="has_error_class">
        <div class="dropdown_simple-list dropdown bootstrap-select bootstrap-select__sm"
            :class="container_class"
        >
            <div class="d-flex">
                <slot name="label">
                </slot>
                <template v-if="variant === 'slot'">
                    <button class="btn" type="button"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                        :ref="dropdownButton"
                        :disabled="disabled"
                        :class="button_class"
                    >
                        <slot name="dropdown_button"></slot>
                    </button>
                </template>
                <button v-else class="btn w-100" type="button"
                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                    :ref="dropdownButton"
                    :disabled="disabled"
                    :class="button_class"
                >

                    <div class="d-flex justify-content-start pl-2 w-100">
                        <span class="complex-list_filled" v-if="isAllHandleChecked && selectedItems.length > 0">
                            All
                        </span>
                        <span class="complex-list_filled" v-else-if="selectedItems.length > 0">
                            [[ selectedItems.length ]] selected
                        </span>
                        <span v-else class="complex-list_empty">[[ placeholder ]]</span>
                    </div>
                </button>
                <ul class="dropdown-menu overflow-auto mt-1 dropdown-menu-right"
                    :class="list-position"
                    v-if="list_items.length > 0"
                    @click="$event.stopPropagation()"
                    :style="maxHeight ? {maxHeight: maxHeight} : {}"
                >
                    <li v-if="hasSearch" class="dropdown-menu_item pl-3 pr-3 pt-2 pb-2">
                        <div class="custom-input custom-input_search__sm position-relative">
                            <input
                                type="text"
                                placeholder="Search"
                                v-model="inputSearch">
                            <img :src="`${url_prefix}/design-system/static/assets/ico/search.svg`" class="icon-search position-absolute">
                        </div>
                    </li>
                     <li
                        class="dropdown-menu_item d-flex align-items-center">
                        <label
                            class="mb-0 w-100 d-flex align-items-center custom-checkbox"
                            :class="{ 'custom-checkbox__minus': is_all_selected }">
                            <input
                                @click="() => handlerSelectAll(false)"
                                :ref="refSearchId"
                                type="checkbox">
                            <span class="w-100 d-inline-block ml-3">All</span>
                        </label>
                    </li>
                    <li class="dropdown-menu_item p-0"
                        v-for="item in li"
                        :key="item.idx"
                    >
                        <label class="d-flex align-items-center custom-checkbox px-3 py-2">
                            <input
                                :value="item"
                                v-model="selectedItems"
                                type="checkbox"
                            >
                            <span v-if="item.html !== undefined" v-html="item.html"></span>
                            <span v-else class="w-100 d-inline-block ml-3" style="white-space: pre;">[[ item.name ]]</span>
                        </label>
                    </li>
                </ul>
                <ul class="dropdown-menu overflow-auto mt-1 w-auto" :class="list-position" v-else>
                    <li class="dropdown-menu_item p-0">
                        <label class="d-flex align-items-center custom-checkbox px-3 py-2">
                            <span class="w-100 d-inline-block" style="white-space: pre;">Nothing to select</span>
                        </label>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    `
}

register_component('MultiselectDropdown', MultiselectDropdown)
