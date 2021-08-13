function paintSelect(el) {
    var className = $(el.children[el.selectedIndex]).attr('class')
    var buttonStyle = el.nextSibling;
    switch (className) {
        case 'critical':
            $(buttonStyle).css({ "border-color": "#FFF0F0", "color": "#F32626", "background-color": "#FFF0F0" });
            break;
        case 'high':
            $(buttonStyle).css({ "border-color": "#FFEDDD", "color": "#E97912", "background-color": "#FFEDDD" });
            break;
        case 'medium':
            $(buttonStyle).css({ "border-color": "#FFFBE7", "color": "#DBC714", "background-color": "#FFFBE7" });
            break;
        case 'low':
            $(buttonStyle).css({ "border-color": "#E7FFE7", "color": "#18B64D", "background-color": "#E7FFE7" });
            break;
        case 'info':
            $(buttonStyle).css({ "border-color": "#E0F2FE", "color": "#2F7DF1", "background-color": "#E0F2FE" });
            break;
    }
}

$(".btn-colored-select").on("changed.bs.select", function (e, clickedIndex, newValue, oldValue) {
    paintSelect(e.target)
});

$(".btn-colored-select").on("rendered.bs.select", function (e, clickedIndex, newValue, oldValue) {
    paintSelect(e.target)
});
