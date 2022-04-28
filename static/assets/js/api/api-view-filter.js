const apiFetchPresets = new Promise(resolve => {
    setTimeout(() => {
        resolve(presetsData)
    }, 500)
})

const apiFetchTable = (tableId) => {
    return new Promise(resolve => {
        resolve(tablesData[tableId])
    })
}

const apiSavePreset = (savedPerset) => {
    return new Promise((resolve, reject) => {
        let indexPreset = null;
        presetsData.forEach((preset, index) => {
            if (preset.id === savedPerset.id) {
                indexPreset = index
            }
        })
        presetsData.splice(indexPreset, 1, savedPerset);
        resolve({
            data: savedPerset,
            message: 'Preset saved'
        })
    })
}

const apiSaveAsPreset = (savedPerset, presetTitle) => {
    return new Promise((resolve, reject) => {
        const isNameExist = presetsData.some(preset => preset.title.toLowerCase() === presetTitle.toLowerCase().trim())
        if (isNameExist) {
            reject('Preset name already exist')
        } else {
            const createdPreset = {
                ...savedPerset,
                id: Math.round(Math.random() * 1000),
                title: presetTitle,
            }

            presetsData.push(createdPreset);
            resolve({
                data: createdPreset,
                message: 'Preset saved'
            })
        }
    })
}

const apiDeletePreset = (deletedPreset) => {
    return new Promise((resolve, reject) => {
        let indexPreset = null;
        presetsData.forEach((preset, index) => {
            if (preset.id === deletedPreset.id) {
                indexPreset = index
            }
        })
        presetsData.splice(indexPreset, 1);
        resolve({
            message: 'Preset delete'
        })
    })
}