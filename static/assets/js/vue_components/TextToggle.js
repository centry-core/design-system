const TextToggle = {
    delimiters: ['[[', ']]'],
    emits: ['update:modelValue'],
    props: {
        labels: {
            type: Array,
            required: true
        },
        pre_selected_index: {
            type: [Number, String],
            default: null,
        },
        // force_html: {
        //     type: Boolean,
        // },
        disabled_indexes: {
            type: Array,
            default: []
        },
        return_ids: {
            type: Boolean,
            default: false
        },
        // container_class: {
        //     type: String,
        //     default: ''
        // },
        // button_class: {
        //     type: String,
        //     default: 'btn-select dropdown-toggle'
        // },
        // variant: {
        //     type: String,
        //     default: 'with_selected',
        //     validator(value) {
        //         // The value must match one of these strings
        //         return ['with_selected', 'slot'].includes(value)
        //     }
        // },
    },
    data() {
        return {
            selected_value: null
        }
    },
    mounted() {
        if (this.pre_selected_index !== null && this.pre_selected_index <= this.labels.length - 1) {
            this.selected_value = this.get_value(this.formatted_labels[this.pre_selected_index])
            // this.selected_value = this.return_ids ? this.formatted_labels[this.pre_selected_index].idx
            //     : this.formatted_labels[this.pre_selected_index].name
            // this.selected_value = this.formatted_labels[this.pre_selected_index]
        }
    },
    computed: {
        formatted_labels() {
            return this.labels.map((i, index) => {
                if (typeof i === 'object') {
                    const {name, html} = i
                    const result = {idx: index, name}
                    if (html !== undefined) {
                        result.html = html
                    }
                    return result
                }
                return {name: i, idx: index}
            })
        }
    },
    watch: {
        selected_value(newValue) {
            this.$emit('update:modelValue', newValue)
        }
    },
    methods: {
        get_disabled(item) {
            const attrs = {}
            if (this.disabled_indexes.includes(item.idx)) {
                attrs.disabled = true
            }
            return attrs
        },
        get_value(item) {
            return this.return_ids ? item.idx : item.name
        }
    },
    // :value="return_ids ? i.idx : i.name"
    template: `
        <div class="btn-group btn-group-toggle" data-toggle="buttons">
            <label class="btn btn-toggle" 
                v-for="i in formatted_labels" :key="i.idx" 
                :class="{disabled: disabled_indexes.includes(i.idx)}"
            >
                <input type="radio" name="text_toggle" 
                    v-model="selected_value" 
                    :value="get_value(i)"
                    v-bind="get_disabled(i)"
                >
                <span v-if="i.html" v-html="i.html"></span>
                <span v-else>[[ i.name ]]</span>
            </label>
        </div>
    `
}

register_component('TextToggle', TextToggle)