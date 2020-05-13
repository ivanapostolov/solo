function createFormContainer() {
    Vue.component('input-field', {
        data: function () {
            return {
                value: ''
            }
        },
        methods: {
            validateInput: function () {
                return validateTargetInput(this.identifier) || this.value === '';
            }
        },
        props: {
            label: String,
            identifier: String
        },
        template: `
        <div class="mui-textfield">
            <input 
                v-model="value"
                :id="identifier"  
                :class="{'invalid-input' : !validateInput()}" 
                step="any" 
                type="text" 
                inputmode="numeric"
            >
            <label :class="{'invalid-input-label' : !validateInput()}">{{label}}</label>
        </div>`
    });

    Vue.component('map-button', {
        data: function () {
            return {
                clstContainer: 'mui-container-fluid mui--text-right',
                clstBtn: 'mui-btn mui-btn--flat mui--bg-color-blue-grey-50'
            }
        },
        methods: {
            activateMap: function () {
                mui.tabs.activate('formMapPane');
            }
        },
        template: `
        <div :class="clstContainer">
            <button type='button' :class="clstBtn" @click="activateMap">
                <i class="material-icons">map</i>
            </button>
        </div>`
    });

    Vue.component('submit-button', {
        data: function () {
            return {
                clst: 'mui-btn mui-btn--flat mui--color-white mui--bg-color-' + secondColor
            }
        },
        template: '<button type="submit" :class="clst">Submit</button>'
    });

    return Vue.component('form-container', {
        data: function () {
            return {
                clst: 'panel-layout mui-panel mui-form mui--bg-color-white',
            }
        },
        methods: {
            handleSubmit: function () {
                if (Object.values(document.getElementsByTagName("input")).every((input) => validateTargetInput($(input).attr('id')))) {
                    let parameters = [];

                    $("input").each(function (index, element) {
                        parameters.push($(element).val());
                    });

                    this.$emit('request', parameters);
                }
            }
        },
        template: `
        <form :class="clst" @submit="handleSubmit" @submit.prevent>
            <legend class="mui--text-center">Parameters</legend>
    
            <input-field 
                identifier="lat" 
                label="Latitude (-90, 90)"
            />
    
            <input-field 
                identifier="lng" 
                label="Longitude (-180, 180)"
            />
    
            <map-button/>
    
            <input-field 
                identifier="area" 
                label="Total area"
            />
    
            <input-field 
                identifier="efficiency" 
                label="Efficiency (%)"
            />
    
            <input-field 
                identifier="losses" 
                label="Coefficient for losses (0.5, 0.9)"
            />
           
            <submit-button/>
        </form>`
    });

    function validateTargetInput(id) {
        const regex = RegExp('^(([-][0-9]+[.][0-9]+)|([-][0-9]+)|([0-9]+[.][0-9]+)|([0-9]+))$');

        let val = $("#" + id).val();

        if (val !== '' && val !== undefined) {
            if (regex.test(val)) {
                switch (id) {
                    case "lat":
                        return val > -90 && val < 90;
                    case "lng":
                        return val > -180 && val < 180;
                    case "area":
                        return val > 0;
                    case "efficiency":
                        return val > 0 && val < 100;
                    case "losses":
                        return val > 0.5 && val < 0.9;
                    default:
                        return false;
                }
            }
        }

        return false;
    }
}