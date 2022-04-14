const popup = Notification({
    duration: 3000,
});

const showNotify = (type) => {
    switch (type) {
        case 'ERROR':
            popup.error({
                title: 'Message error',
            });
            break;
        case 'WARNING':
            popup.warning({
                title: 'Message warning',
            });
            break;
        case 'INFO':
            popup.info({
                title: 'Message info',
            });
            break;
        case 'SUCCESS':
            popup.success({
                title: 'Message success',
            });
            break;
        default:
            popup.basic({
                title: 'Message basic',
                iconUrl: "assets/ico/success_purple_icon.svg"
            });
            break;
    }
}