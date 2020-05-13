function createTabBar() {
    Vue.component('tab-link', {
        data: function () {
            return {
                clst: 'mui--color-white'
            }
        },
        props: {
            control: String,
            text: String
        },
        template: '<a :class="clst" data-mui-toggle="tab" :data-mui-controls="control">{{text}}</a>'
    });

    Vue.component('tab', {
        props: {
            active: Boolean,
            control: String,
            text: String
        },
        template: `
        <li :class="{'mui--is-active' : active}">
            <tab-link 
                :control="control" 
                :text="text"
            />
        </li>`
    });

    return Vue.component('tab-bar', {
        data: function() {
            return {
                clst: 'appbar mui-tabs__bar mui-tabs__bar--justified mui--bg-color-' + primeColor
            }
        },
        props: {
            tabs: Array
        },
        template: `
        <ul :class="clst">
            <tab 
                v-for="(tab, index) in tabs"
                :key="tab.id"
                :active="index === 0" 
                :control="tab.control" 
                :text="tab.text"
            />
        </ul>`
    });
}