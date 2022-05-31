const initTooltips = () => {
    $('[data-toggle="tooltip"]').tooltip()
    $('[data-toggle="infotip"]').tooltip({
        template: `
            <div class="tooltip tooltip__info" role="tooltip">
                <span class="tooltip-close"></span>
                <div class="tooltip-inner"></div>
            </div>
        `
    })
}

$(initTooltips)

$(document).on('vue_init', () => {
    initTooltips()
})