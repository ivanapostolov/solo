function createPatch() {
    const PATCH_IMAGE_PATH = 'images/patches/';

    Vue.component('patch-img', {
        data: function () {
            return {
                clstContainer: 'mui-container img-container',
                clst: 'patch-img',
                src: PATCH_IMAGE_PATH + this.image,
            }
        },
        props: ['image'],
        template: `
        <div :class="clstContainer" :style="'background-image: url(' + src + ')'">
           <img :class="clst" style="display: none" :src="src"/>
        </div>`
    });

    Vue.component('patch-title', {
        data: function () {
            return {
                clst: 'patch-title',
            }
        },
        props: ['title'],
        template: '<div :class="clst">{{title}}</div>'
    });

    Vue.component('patch-content', {
        data: function () {
            return {
                clst: 'patch-content',
            }
        },
        props: ['content'],
        template: '<div :class="clst">{{content}}</div>'
    });

    return Vue.component('patch', {
        data: function () {
            return {
                clst: 'patch',
            }
        },
        props: ['image', 'title', 'content'],
        template: '<div :class="clst"><patch-img :image="image"></patch-img><patch-title :title="title"></patch-title> <patch-content :content="content"></patch-content> </div>'
    });
}