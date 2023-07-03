const InputStepper = {
    props: ['defaultValue', 'instance_name', 'uniq_id', 'modelValue', 'disabled', 'min_value'],
    emits: ['change', 'update:modelValue'],
    data() {
        return {
            counter: this.defaultValue || this.modelValue
        }
    },
    computed: {
        input_min_value() {
            return this.min_value === undefined ? 0 : this.min_value
        }
    },
    watch: {
        counter(newValue) {
            this.$emit('change', newValue)
            this.$emit('update:modelValue', newValue)
        },
        defaultValue(newValue) {
            this.counter = newValue
        },
        modelValue(newValue) {
            this.counter = newValue
        }
    },
    methods: {
        changeCounter(e) {
            const value = +e.target.innerText;
            if (isNaN(value / 1)) return;
            this.counter = value;
        }
    },
    template: `
        <div class="input-stepper" :class="{'disabled': disabled}">
            <button
                @click="counter--"
                :disabled="disabled || counter <= input_min_value"
            ><i class="icon__16x16 icon-minus__16"></i>
            </button>
            <span role="textbox" :contenteditable="!disabled" :id="uniq_id" @input="changeCounter">{{ counter }}</span>
            <button
                @click="counter++"
                :disabled="disabled"
            ><i class="icon__16x16 icon-plus__16"></i></button>
        </div>
    `
}

register_component('input-stepper', InputStepper);