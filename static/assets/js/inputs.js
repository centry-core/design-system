const InputStepper = Vue.createApp({
    data() {
        return {
            counter: 9
        }
    },
    methods: {
        changeCounter(e) {
            const value = +e.target.innerText;
            if (isNaN(value / 1)) return;
            this.counter = value;
        }
    }
});

InputStepper.mount('#inputStepper');