const rangeSliders = document.querySelectorAll('input[type="range"]');

const getBackgroundSize = (input) => {
    const min = +input.min || 0;
    const max = +input.max || 100;
    const value = +input.value;
    const size = (value - min) / (max - min) * 100;
    return size;
}

const setBackgroundSize = (input) => {
    const rangeInput = document.querySelector(`.${input.id} > input`);
    console.log(rangeInput.value = input.value)
    input.style.setProperty("--background-range-size", `${getBackgroundSize(input)}%`);
}
const setDefaultBackground = (inputs) => {
    inputs.forEach(input => {
        setBackgroundSize(input)
    });

}
setDefaultBackground(rangeSliders);

rangeSliders.forEach(input => {
    input.addEventListener('input', () => setBackgroundSize(input));
})

