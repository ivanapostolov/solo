function createAppbar() {
    //Down it is the menu icon itself with constant value
    Vue.component('icon-menu', {
        data: function () {
            return {
                clst: 'material-icons appbar-icon'
            }
        },
        template: '<i :class="clst">menu</i>'
    });

    //Down it is the menu button containing the menu icon
    Vue.component('button-menu', {
        data: function () {
            return {
                clst: 'mui-btn mui-btn--flat',
            }
        },
        methods: {
            slideMenu: function () {
                $("#menuSlide").toggleClass("left center");
            }
        },
        template: '<button :class="clst" v-on:click="slideMenu()"><icon-menu></icon-menu></button>',
    });

    //Down it is only the title text
    Vue.component('appbar-title', {
        data: function () {
            return {
                clst: 'appbar-title',
            }
        },
        props: ['title'],
        template: '<div :class="clst">{{title}}</div>'
    });

    //Down it is the container of the button and the title
    Vue.component('appbar-container', {
        data: function () {
            return {
                clst: 'appbar-container',
            }
        },
        props: ['title'],
        template: '<div :class="clst"><button-menu></button-menu><appbar-title :title="title"></appbar-title></div>'
    });

    //Down it is the appbar wrapping the appbar-container
    return Vue.component('appbar', {
        data: function () {
            return {
                clst: 'appbar mui-appbar mui--appbar-line-height mui--bg-color-' + primeColor,
            }
        },
        props: ['title'],
        template: '<div :class="clst"><appbar-container :title="title"></appbar-container></div>'
    });
}