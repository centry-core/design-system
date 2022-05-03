const apiFetchFilters = new Promise(resolve => {
    setTimeout(() => {
        resolve(filtersData)
    }, 1000)
})

const apiFetchTable = new Promise(resolve => {
    resolve({
        data: tableDataUpdated,
        columns: tableColumnsUpdated,
    })
})

const apiSaveFilter = (currentFilter) => {
    return new Promise((resolve, reject) => {
        let indexFilter = null;
        filtersData.forEach((filter, index) => {
            if (filter.id === currentFilter.id) {
                indexFilter = index
            }
        })
        filtersData.splice(indexFilter, 1, currentFilter);
        resolve({
            data: currentFilter,
            message: 'Filter saved'
        })
    })
}

const apiSaveAsFilter = (currentFilter, filterTitle) => {
    return new Promise((resolve, reject) => {
        const isNameExist = filtersData.some(filter => filter.title.toLowerCase() === filterTitle.toLowerCase().trim())
        if (isNameExist) {
            reject('Filter name already exist')
        } else {
            const createdFilter = {
                ...currentFilter,
                id: Math.round(Math.random() * 1000),
                title: filterTitle,
            }

            filtersData.push(createdFilter);
            resolve({
                data: createdFilter,
                message: 'Filter saved'
            })
        }
    })
}

const apiDeleteFilter = (currentFilter) => {
    return new Promise((resolve, reject) => {
        let indexFilter = null;
        filtersData.forEach((filter, index) => {
            if (filter.id === currentFilter.id) {
                indexFilter = index
            }
        })
        filtersData.splice(indexFilter, 1);
        resolve({
            data: createdFilter,
            message: 'Filter saved'
        })
    })
}

const apiTabFilter = (activeTab) => {
    return new Promise((resolve, reject) => {
        const filteredData = activeTab === 'all' ? tableData : tableData.filter(row => row['status'] === activeTab)

        resolve({
            data: { data: filteredData, columns: tableColumns },
            message: 'Tables filtered'
        })
    })
}