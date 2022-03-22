const coloredClassNameRegexp = new RegExp(/colored-select-(\w+)/, 'i');
const palette = {
    red: {"border-color": "#F2B4B4", "color": "#F32626", "background-color": "#FFF0F0"},
    orange: {"border-color": "#FBCFA6", "color": "#E97912", "background-color": "#FFEDDD"},
    yellow: {"border-color": "#EFE482", "color": "#DBC714", "background-color": "#FFFBE7"},
    green: {"border-color": "#94E5B0", "color": "#18B64D", "background-color": "#E7FFE7"},
    blue: {"border-color": "#96C0FF", "color": "#2F7DF1", "background-color": "#E0F2FE"},
    darkblue: {"border-color": "#CACDDC", "color": "#32325D", "background-color": "#E0E8F3"},
    default: {"border-color": "inherit", "color": "inherit", "background-color": "inherit"},
}

const paintSelect = el => {
    const className = $(el.children[el.selectedIndex]).attr('class');
    const color = className ? className.match(coloredClassNameRegexp)[1] : 'default';
    const style = palette[color] || palette['default'];
    $(el.nextSibling).css(style);
}

const initColoredSelect = () => {
    $(".btn-colored-select").on("changed.bs.select", function (e, clickedIndex, newValue, oldValue) {
        paintSelect(e.target)
    });

    $(".btn-colored-select").on("rendered.bs.select", function (e, clickedIndex, newValue, oldValue) {
        paintSelect(e.target)
    });
}

initColoredSelect();