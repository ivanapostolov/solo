function createButtonOption() {
    //Down it represents the individual icon of every single menu option
    Vue.component('icon', {
        data: function () {
            return {
                clst: 'material-icons'
            }
        },
        props: ['icon'],
        template: '<i :class="clst">{{icon}}</i>'
    });

    //Down it is the menu option button containing it's icon
    return Vue.component('button-option', {
        data: function () {
            return {
                clst: 'menu-option mui-btn mui-btn--flat mui--color-' + primeColor,
            }
        },
        props: ['icon', 'text', 'reference'],
        methods: {
            slideMenu: () => {
                $("#menuSlide").toggleClass("left center");
            }
        },
        template: `<button :class="clst" @click="slideMenu(); $emit('select', reference)"><icon :icon="icon"></icon>{{text}}</button>`,
    });
}