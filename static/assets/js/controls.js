const rangeInputs = document.querySelectorAll('input[type="range"]');

const getBackgroundSize = (input) => {
    const min = +input.min || 0;
    const max = +input.max || 100;
    const value = +input.value;
    const size = (value - min) / (max - min) * 100;
    console.log(size, 'SIZE')
    return size;
}

const setBackgroundSize = (input) => {
    input.style.setProperty("--background-range-size", `${getBackgroundSize(input)}%`);
}
const setDefaultBackground = (inputs) => {
    inputs.forEach(input => setBackgroundSize(input))
}
setDefaultBackground(rangeInputs);

rangeInputs.forEach(input => {
    input.addEventListener('input', () => setBackgroundSize(input));
})

