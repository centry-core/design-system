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
            default: ','
        },
    },
    emits: ['change'],
    delimiters: ['[[', ']]'],
    data() {
        return {
            li: [],
            selected_indexes: [],
        }
    },
    mounted() {
        if (typeof this.list_items === 'string') {
            this.li = this.list_items.split(this.delimiter)
        } else {
            this.li = this.list_items
        }
        if (typeof this.pre_selected_indexes === 'string') {
            this.selected_indexes = this.pre_selected_indexes.split(this.delimiter)
        } else {
            this.selected_indexes = this.pre_selected_indexes
        }
    },
    computed: {
        selected_items() {
            return this.selected_indexes.map(i => this.li[i])
        }
    },
    watch: {
        selected_indexes(newValue) {
            this.$nextTick(() => this.$emit('change', this.selected_items))
        }
    },
    template:`
        <div class="dropdown_simple-list" 
            :class="container_class"
        >
            <button class="btn btn-select dropdown-toggle" type="button"
                  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
            >
                <span class="complex-list_filled" v-if="selected_indexes.length > 0">
                    [[ selected_indexes.length ]] selected
                </span>
                <span v-else class="complex-list_empty">[[ placeholder ]]</span>
            </button>
            <ul class="dropdown-menu close-outside"
                v-if="li.length > 0"
            >
                <li class="dropdown-menu_item d-flex align-items-center px-3" 
                    v-for="(item, index) in li" 
                    :key="index"
                >
                    <label class="mb-0 w-100 d-flex align-items-center custom-checkbox">
                        <input
                            :value="index"
                            v-model="selected_indexes"
                            type="checkbox"
                        >
                        <span class="w-100 d-inline-block ml-3">[[ item ]]</span>
                    </label>
                </li>
            </ul>
            <div class="dropdown-menu py-0" v-else>
                <span class="px-3 py-2 d-inline-block">Nothing to select</span>
            </div>
        </div>
    `
}

register_component('MultiselectDropdown', MultiselectDropdown)