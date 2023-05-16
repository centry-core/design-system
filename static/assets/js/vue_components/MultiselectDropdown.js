const MultiselectDropdown = {
    props: {
        list_items: {
            type: [Array, String],
            default: []
        },
        pre_selected_indexes: {
            type: [Array, String],
            default: []
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
            default: 'btn btn-select dropdown-toggle d-inline-flex align-items-center'
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
    },
    computed: {
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
        }
    },
    methods: {
        handlerSelectAll() {
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
                this.selectedItems.splice(0);
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
                this.$refs[this.refSearchId].checked = this.selectedItems.length === this.list_items.length
            })
        }
    },
    template: `
    <div class="select-validation" :class="has_error_class">
        <div class="dropdown_simple-list bootstrap-select bootstrap-select__b bootstrap-select__sm"
            :class="container_class"
        >
            <button class="btn" type="button"
                  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                  :disabled="disabled"
                  :class="button_class"
            >
                <div v-if="variant === 'slot'">
                    <slot name="dropdown_button"></slot>
                </div>
                <div v-else>
                    <span class="complex-list_filled" v-if="selectedItems.length > 0">
                        [[ selectedItems.length ]] selected
                    </span>
                    <span v-else class="complex-list_empty">[[ placeholder ]]</span>
                </div>
            </button>
            <ul class="dropdown-menu overflow-auto"
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
                        <img src="/design-system/static/assets/ico/search.svg" class="icon-search position-absolute">
                    </div>
                    </li>
                 <li
                        class="dropdown-menu_item d-flex align-items-center">
                        <label
                            class="mb-0 w-100 d-flex align-items-center custom-checkbox"
                            :class="{ 'custom-checkbox__minus': is_all_selected }">
                            <input
                                @click="handlerSelectAll"
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
                        <span v-else class="w-100 d-inline-block ml-3">[[ item.name ]]</span>
                    </label>
                </li>
            </ul>
            <div class="dropdown-menu py-0" v-else>
                <span class="px-3 py-2 d-inline-block">Nothing to select</span>
            </div>
        </div>
    </div>
    `
}

register_component('MultiselectDropdown', MultiselectDropdown
)