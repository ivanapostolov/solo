const primeColor = 'blue-grey-900';
const secondColor = 'yellow-700';

const storageName = "SoloLocalStorage"

$(document).ready(() => {
    new Vue({
        el: '#root',
        data: {
            params: null,
        },
        methods: {
            menuClick: function (reference) {
                this.params = null;
                $("#newPage, #homePage, #monitoringPage").hide();
                $("#" + reference).show();
            },
            handleRequest: function (parameters) {
                this.params = parameters;
            }
        },
        components: {
            'button-option': createButtonOption(),
            'appbar': createAppbar(),
            'patch': createPatch(),
            'tab-bar': createTabBar(),
            'form-container': createFormContainer(),
            'map-container': createMapContainer(),
            'request-container': createRequestContainer(),
        }
    });
});