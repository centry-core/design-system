const get_hash = str => str.split('').reduce((a, b) => (((a << 5) - a) + b.charCodeAt(0)) | 0, 0)
const TextToggle = {
    delimiters: ['[[', ']]'],
    emits: ['update:modelValue'],
    props: {
        modelValue: {
            type: [String, Number]
        },
        labels: {
            type: Array,
            required: true
        },
        pre_selected_index: {
            type: [Number, String],
            default: null,
        },
        disabled_indexes: {
            type: Array,
            default: []
        },
        return_ids: {
            type: Boolean,
            default: false
        },
        radio_group_name: {
            type: String,
            default: undefined
        },
    },
    data() {
        return {
            selected_value: null,
            return_value: null
        }
    },
    mounted() {
        if (this.modelValue !== undefined) {
            this.selected_value = this.find_by_value(this.modelValue)
        } else if (this.pre_selected_index !== null && this.pre_selected_index <= this.labels.length - 1) {
            this.selected_value = this.formatted_labels[this.pre_selected_index]
            // this.selected_value = this.find_by_value(this.pre_selected_index)
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
        },
        radiogroup_name() {
            if (this.radio_group_name) {
                return this.radio_group_name
            } else if (this.instance_name) {
                return `options_${this.instance_name}`
            } else {
                return get_hash(this.formatted_labels.reduce((a ,b) => `${a.name}${b.name}`))
            }
        }
    },
    watch: {
        return_value(newValue) {
            this.$emit('update:modelValue', newValue)
        },
        selected_value(newValue) {
            this.return_value = this.get_value(newValue)
        },
        modelValue(newValue) {
            this.selected_value = this.find_by_value(newValue)
        },
        return_ids(newValue) {
            this.return_value = this.get_value(this.selected_value)
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
            if (item !== null) return this.return_ids ? item.idx : item.name
            return item
        },
        find_by_value(value) {
            return this.formatted_labels.find(i => {
                if (this.return_ids) {
                    return i.idx == value
                } else {
                    return i.name === value
                }
            })
        }
    },
    template: `
        <div class="btn-group btn-group-toggle" data-toggle="buttons">
            <label class="btn btn-toggle" 
                v-for="i in formatted_labels" :key="i.idx" 
                :class="{disabled: disabled_indexes.includes(i.idx)}"
            >
                <input type="radio" 
                    :name="radiogroup_name" 
                    v-model="selected_value" 
                    :value="i"
                    v-bind="get_disabled(i)"
                >
                <span v-if="i.html" v-html="i.html"></span>
                <span v-else>[[ i.name ]]</span>
            </label>
        </div>
    `
}

register_component('TextToggle', TextToggle)