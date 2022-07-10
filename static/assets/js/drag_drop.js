let dropArea, previewArea;

$(document).ready(function() {
    dropArea = document.getElementById('dragDropArea');
    previewArea = document.getElementById('previewArea');

    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, preventDefaults, false)
    })

    ['dragenter', 'dragover'].forEach(eventName => {
        dropArea.addEventListener(eventName, highlight, false)
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, unhighlight, false)
    })

    function highlight(e) {
        dropArea.classList.add('highlight')
    }
    function unhighlight(e) {
        dropArea.classList.remove('highlight')
    }
    dropArea.addEventListener('drop', handleDrop, false)
    function handleDrop(e) {
        let dt = e.dataTransfer
        let files = dt.files
        handleFiles(files)
    }
})

function preventDefaults (e) {
    e.preventDefault()
    e.stopPropagation()
}

function handleFiles(files) {
    ([...files]).forEach(uploadFile)
}
function uploadFile(file) {
    const item = document.createElement('div');
    item.classList.add('preview-area_item', 'preview-area_loader');
    const fileName = document.createElement('span');
    fileName.innerText = file.name;
    item.append(fileName);
    previewArea.append(item);
    setTimeout(() => {
        item.classList.remove('preview-area_loader');
        item.classList.add('preview-area_close');
    }, 1000);
}