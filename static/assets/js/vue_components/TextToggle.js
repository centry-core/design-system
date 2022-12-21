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
        return_key: {
            type: [String, null],
            default: 'name',
        },
        radio_group_name: {
            type: String,
            default: undefined
        },
    },
    data() {
        return {
            selected_idx: null,
            return_value: undefined,
        }
    },
    mounted() {
        if (this.modelValue !== undefined) {
            this.selected_idx = this.find_by_value(this.modelValue)?.idx
        } else if (this.pre_selected_index !== null && this.pre_selected_index <= this.labels.length - 1) {
            this.selected_idx = this.pre_selected_index
        }
    },
    computed: {
        formatted_labels() {
            return this.labels.map((i, index) => {
                if (typeof i === 'object') {
                    // must have name and possible html
                    i.name === undefined && console.warn('TextToggle object label must include "name" key')
                    return {...i, idx: index}
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
        },
    },
    watch: {
        selected_idx(newValue) {
            this.return_value = this.get_return_value(newValue, this.return_key)
        },
        return_key(newValue) {
            this.return_value = this.get_return_value(this.selected_idx, newValue)
        },
        return_value(newValue) {
            this.$emit('update:modelValue', newValue)
        },
        modelValue(newValue) {
            if (this.return_value !== newValue) {
                this.selected_idx = this.find_by_value(newValue)?.idx
            }
        },
    },
    methods: {
        get_disabled(item) {
            const attrs = {}
            if (this.disabled_indexes.includes(item.idx)) {
                attrs.disabled = true
            }
            return attrs
        },
        find_by_value(value) {
            return this.formatted_labels.find(i => {
                if (this.return_key === null) {
                    return i.idx === value.idx
                }
                return i[this.return_key] === value
            })
        },
        get_return_value(index, key) {
            if (index === null) {
                return undefined
            } else {
                const selected_item = this.formatted_labels[index]
                return key === null ? selected_item : selected_item[key]
            }
        }
    },
    template: `
        <div class="btn-group btn-group-toggle" data-toggle="buttons">
            <label class="btn btn-toggle" 
                v-for="i in formatted_labels" :key="i.idx" 
                :class="{disabled: disabled_indexes.includes(i.idx), active: i.idx === selected_idx}"
            >
                <input type="radio" 
                    :name="radiogroup_name" 
                    v-model="selected_idx" 
                    :value="i.idx"
                    v-bind="get_disabled(i)"
                >
                <span v-if="i.html !== undefined" v-html="i.html"></span>
                <span v-else>[[ i.name ]]</span>
            </label>
        </div>
    `
}

register_component('TextToggle', TextToggle)