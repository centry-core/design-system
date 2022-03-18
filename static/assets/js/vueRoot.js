const app = Vue.createApp({
    components: {
        'simple-list': SimpleList,
        'tree-list': TreeList,
        'complex-list': ComplexList,
        'complex-list-filter': ComplexListFilter,
    }
});
app.mount('#app');