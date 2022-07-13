const InputStepper = {
    props: ['defaultValue', 'instance_name'],
    data() {
        return {
            counter: this.defaultValue
        }
    },
    methods: {
        changeCounter(e) {
            const value = +e.target.innerText;
            if (isNaN(value / 1)) return;
            this.counter = value;
            this.$emit('setValue', value)
        }
    },
    template: `
        <div class="input-stepper">
            <button
                @click="counter--"
                :disabled="counter <= 0"
            ><i class="icon__16x16 icon-minus__16"></i>
            </button>
            <span role="textbox" contenteditable @input="changeCounter">{{ counter }}</span>
            <button
                @click="counter++"
            ><i class="icon__16x16 icon-plus__16"></i></button>
        </div>
    `
}

register_component('input-stepper', InputStepper);