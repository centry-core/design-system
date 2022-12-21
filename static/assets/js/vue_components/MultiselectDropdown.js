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
    },
    emits: ['change', 'update:modelValue'],
    delimiters: ['[[', ']]'],
    data() {
        return {
            selected_indexes: [],
        }
    },
    mounted() {
        if (this.list_items.length > 0) {
            if (typeof this.pre_selected_indexes === 'string') {
                this.selected_indexes = this.pre_selected_indexes.split(this.delimiter)
            } else {
                this.selected_indexes = this.pre_selected_indexes
            }
        }
    },
    computed: {
        li() {
            if (this.list_items.length > 0) {
                let listed_items
                if (typeof this.list_items === 'string') {
                    listed_items = this.list_items.split(this.delimiter)
                } else {
                    listed_items = this.list_items
                }
                return listed_items.map((i, index) => {
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
            }
            return []
        },
    },
    watch: {
        selected_indexes(newValue) {
            this.$nextTick(() => {
                let return_value
                switch (this.return_key) {
                    case 'idx':
                        return_value = newValue
                        break
                    case null:
                        return_value = newValue.map(i => this.li[i])
                        break
                    default:
                        return_value = newValue.map(i => this.li[i][this.return_key])
                        break
                }
                this.$emit('change', return_value)
                this.$emit('update:modelValue', return_value)
            })
        }
    },
    template: `
        <div class="dropdown_simple-list" 
            :class="container_class"
        >
            <button class="btn" type="button"
                  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                  :class="button_class"
            >
                <div v-if="variant === 'slot'">
                    <slot name="dropdown_button"></slot>
                </div>
                <div v-else>
                    <span class="complex-list_filled" v-if="selected_indexes.length > 0">
                        [[ selected_indexes.length ]] selected
                    </span>
                    <span v-else class="complex-list_empty">[[ placeholder ]]</span>
                </div>
            </button>
            <ul class="dropdown-menu"
                v-if="li.length > 0"
                @click="$event.stopPropagation()"
            >
                <li class="dropdown-menu_item p-0" 
                    v-for="i in li" 
                    :key="i.idx"
                >
                    <label class="d-flex align-items-center custom-checkbox px-3 py-2">
                        <input
                            :value="i.idx"
                            v-model="selected_indexes"
                            type="checkbox"
                        >
                        <span v-if="i.html !== undefined" v-html="i.html"></span>
                        <span v-else class="w-100 d-inline-block ml-3">[[ i.name ]]</span>
                    </label>
                </li>
            </ul>
            <div class="dropdown-menu py-0" v-else>
                <span class="px-3 py-2 d-inline-block">Nothing to select</span>
            </div>
        </div>
    `
}

register_component('MultiselectDropdown', MultiselectDropdown
)