$(document).ready(function() {
    class divFieldset extends HTMLElement {
        constructor() {
            // Always call super first in constructor
            super();
        }
    }
    class divFigure extends HTMLElement {
        constructor() {
            // Always call super first in constructor
            super();
        }
    }

    class divContent extends HTMLElement {
        constructor() {
            // Always call super first in constructor
            super();
        }
    }

    customElements.define('div-fieldset', divFieldset)
    customElements.define('div-figure', divFigure)
    customElements.define('div-content', divContent)

    noUiSlider.create($("#vuh-time-picker")[0], {
        range: {
            'min': 0,
            'max': 3000
        },

        // Handles start at ...
        start: [500, 2500],

        // ... must be at least 300 apart
        margin: 300,

        // ... but no more than 600
        limit: 3000,

        // Display colored bars between handles
        connect: true,

        // Move handle on tap, bars are draggable
        behaviour: 'tap-drag',
        format: wNumb({
            decimals: 0
        }),

        // Show a scale with the slider
        pips: {
            mode: 'steps',
            stepped: true,
            density: 2
        }
    })

    noUiSlider.create($("#vuh-slider")[0], {
        start: 500,
        range: {
            'min': 500,
            'max': 60000
        },
        step: 500,
        format: wNumb({
            decimals: 0
        }),
        connect: 'lower',
        pips: {
            mode: 'values',
            values: [500, 5000, 20000, 40000, 60000],
            density: 3
        }
    })
    $("#vuh-slider")[0].noUiSlider.on('update', function (values, handle, unencoded, isTap, positions) {
        var vuh = parseInt(values[handle])
        var cost = vuh === 500 ? "FREE" : `${vuh * 0.1} $`
        $("#vuh").text(vuh);
        $("#cost").text(cost);
    })
})