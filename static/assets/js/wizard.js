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