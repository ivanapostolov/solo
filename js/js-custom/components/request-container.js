function createRequestContainer() {
    Vue.component('row', {
        data: function () {
            return {
                clstText: 'mui--color-' + secondColor,
                clstValue: 'mui--text-right'
            }
        },
        props: {
            text: String,
            value: String
        },
        template: `
        <tr>
            <td :class="clstText">{{text}}</td>
            <td :class="clstValue" v-html="value"></td>
        </tr>`
    });

    Vue.component('parameters-panel', {
        data: function () {
            return {
                clstContainer: 'panel-layout mui-panel',
                clstHeader: 'mui--text-headline mui--text-center mui--color-' + primeColor,
            }
        },
        props: {
            values: Array
        },
        template: `
        <div :class="clstContainer">
            <div :class="clstHeader">
                Parameters
            </div>
            <table class="mui-table mui-table--bordered">
                <tbody>
                    <row text="Latitude" :value="values[0]"/>
                    <row text="Longitude" :value="values[1]"/>              
                    <row text="Area" :value="values[2]"/>               
                    <row text="Efficiency(%)" :value="values[3]"/>               
                    <row text="Losses coefficient" :value="values[4]"/>
                </tbody>
            </table>
        </div>`
    });

    Vue.component('chart-annual', {
        data: function () {
            return {
                clst: 'panel-chart',
                id: this._uid,
            }
        },
        mounted: function () {
            let resizeObserver = new ResizeObserver(() => {
                drawChartAnnual(this.values, this.id, this.legend);
            });

            resizeObserver.observe(document.getElementById(this.id));
        },
        props: {
            legend: String,
            values: Array,
        },
        template: '<div :class="clst" :id="id"/>'
    });

    Vue.component('chart-wrapper', {
        data: function () {
            return {
                clst: 'mui--text-headline mui--text-center mui--color-' + primeColor,
            }
        },
        props: {
            heading: String,
            note: String,
            legend: String,
            values: Array,
        },
        template: `
        <div>
            <div :class="clst" v-html="heading"/>
            <div>{{note}}</div>
            <chart-annual 
                :values="values" 
                :legend="legend" 
            />
        </div>`
    });

    Vue.component('optimal-angle-chart', {
        data: function () {
            return {
                clst: 'panel-layout mui-panel',
            }
        },
        props: {
            values: Array,
            average: Number,
            orientation: String
        },
        template: `
        <div :class="clst">
            <chart-wrapper heading="Optimal angle" note="*optimal angle according to month blah blah blah blah blah" :values="values" legend="Degree"/>
    
            <table class="mui-table mui-table--bordered">
                <tbody>
                    <row text="Orientation of PV panels" :value="orientation === 'S' ? 'South' : 'North'"/>
                    <row text="Annual optimal angle" :value="average + '&deg;'"/>
                </tbody>
            </table>
        </div>`
    });

    Vue.component('pvi-yield-chart', {
        data: function () {
            return {
                clst: 'panel-layout mui-panel',
            }
        },
        props: {
            heading: String,
            note: String,
            values: Array,
            average: Number
        },
        template: `
        <div :class="clst">
            <chart-wrapper :heading="heading" :note="note" :values="values" legend="Power"/>
    
            <table class="mui-table mui-table--bordered">
                <tbody>
                    <row text="Annual average dayly yield" :value="average + ' kw/h'"/>
                </tbody>
            </table>
        </div>`
    });

    Vue.component('save-container', {
        data: function () {
            return {
                clstContainer: 'panel-layout mui-panel mui--bg-color-' + primeColor,
                clstHeading: 'mui--text-center mui--text-headline mui--color-' + secondColor,
                clstNote: 'mui--color-' + secondColor,
                clstBtn: 'mui-btn mui-btn--flat mui--color-white mui--bg-color-' + secondColor
            }
        },
        props: {
            params: Array
        },
        methods: {
            saveParameters: function () {
                if ($('#name').val() !== '') {
                    let jsonData = localStorage.getItem(storageName);

                    jsonData = jsonData ? JSON.parse(jsonData) : [];

                    this.params.push($('#name').val());

                    jsonData.push(this.params);

                    localStorage.setItem(storageName, JSON.stringify(jsonData));
                }
            }
        },
        template: `
        <div :class="clstContainer">
            <div :class="clstHeading">Save</div>
            <div :class="clstNote">
                Enter name and save this request to have easier acces and to use some of the extra features.
            </div>
            <div class="mui-textfield">
                <input
                    class="name-input mui--color-yellow-700"
                    id="name"
                    step="any" 
                    type="text" 
                    inputmode="numeric"
                >
            </div>
            <div class="mui-container-fluid mui--text-right">
                <button :class="clstBtn" @click="saveParameters">Save</button>
            </div>
        </div>`
    });

    Vue.component('error-panel', {
        data: function () {
            return {
                clstContainer: 'panel-layout mui-panel',
                clstHeading: 'mui--text-headline mui--color-pink-A200',
                clstNote: 'panel-note',
                clstBtn: 'mui-btn mui-btn--flat mui--bg-color-pink-A200 mui--color-white mui--pull-right'
            }
        },
        props: {
            heading: String,
            note: String
        },
        template: `
        <div :class="clstContainer">
            <div :class="clstHeading">{{heading}}</div>
            <div :class="clstNote">{{note}}</div>
            <button :class="clstBtn">retry</button>
        </div>`
    });

    return Vue.component('request-container', {
        data: function () {
            return {
                responseObject: null,
                errorObject: null,
                yieldData: [
                    { index: 2, heading: 'Optimal output', note: '*optimum output achieved by optimal angle per one day according to month' },
                    { index: 3, heading: 'Horizontal output', note: '*optimum output achieved by optimal angle per one day according to month' },
                    { index: 4, heading: Math.abs(Math.trunc(this.params[0])) - 15 + '&deg Slope output', note: '*optimum output achieved by optimal angle per one day according to month' },
                    { index: 5, heading: Math.abs(Math.trunc(this.params[0])) + '&deg Slope output', note: '*optimum output achieved by optimal angle per one day according to month' },
                    { index: 6, heading: Math.abs(Math.trunc(this.params[0])) * 1 + 15 + '&deg Slope output', note: '*optimum output achieved by optimal angle per one day according to month' },
                    { index: 7, heading: 'Vertical output', note: '*optimum output achieved by optimal angle per one day according to month' }
                ]
            }
        },
        created: function () {
            console.time("sendNASARequest");
            sendNASARequest(this.params).then((res) => {
                this.responseObject = res;
                console.timeEnd("sendNASARequest");
            }, (err) => {
                this.errorObject = err;
            });
        },
        props: {
            params: Array,
            save: Boolean
        },
        template: `
        <div v-if="responseObject" class="request-container">
            <parameters-panel 
                :values="params"
            />
            <optimal-angle-chart 
                :orientation="responseObject[0]"
                :values="responseObject[1]"
                :average="responseObject[1][12]"
            />
            <pvi-yield-chart
                v-for="data in yieldData"
                :key="data.id"
                :heading="data.heading"
                :note="data.note"
                :values="responseObject[data.index]"
                :average="responseObject[data.index][12]"
            />
            <save-container
                v-if="save"
                :params="params"
            />
        </div>
        <div v-else-if="errorObject">
            <error-panel 
                :heading="errorObject.heading" 
                :note="errorObject.note"
            />
        </div>
        <div v-else class="loader-container">
            <div class="loader"/>
        </div>`
    });

    function drawChartAnnual(values, containerId, legend) {
        const AXIS_COLOR = '#263238', SERIES_COLOR = '#FBC02D';

        if (values.length >= 12 && document.getElementById(containerId)) {
            google.load("visualization", "1", { packages: ["corechart"] });
            google.setOnLoadCallback(() => {
                let data = google.visualization.arrayToDataTable([
                    ['Month', legend, { role: 'annotation' }],
                    ['Jan', values[0], values[0]],
                    ['Feb', values[1], values[1]],
                    ['Mar', values[2], values[2]],
                    ['Apr', values[3], values[3]],
                    ['May', values[4], values[4]],
                    ['June', values[5], values[5]],
                    ['July', values[6], values[6]],
                    ['Aug', values[7], values[7]],
                    ['Sept', values[8], values[8]],
                    ['Oct', values[9], values[9]],
                    ['Nov', values[10], values[10]],
                    ['Dec', values[11], values[11]]
                ]);

                let options = {
                    enableInteractivity: false,
                    legend: { position: 'top' },
                    width: '100%',
                    annotations: { alwaysOutside: true },
                    chartArea: { width: '80%', height: '80%' },
                    hAxis: { textPosition: 'out', textStyle: { color: AXIS_COLOR } },
                    vAxis: { textPosition: 'out', textStyle: { color: AXIS_COLOR } },
                    series: { 0: { color: SERIES_COLOR } }
                };

                let chart = new google.visualization.BarChart(document.getElementById(containerId));
                chart.draw(data, options);
            });
        }
    }

    function sendNASARequest(params) {
        let lat = params[0], lng = params[1], area = params[2], efficiency = params[3], losses = params[4];

        const url = "https://power.larc.nasa.gov/cgi-bin/v1/DataAccess.py?&request=execute&identifier=SinglePoint&parameters=SI_EF_TILTED_SURFACE&userCommunity=SSE&tempAverage=CLIMATOLOGY&outputList=JSON&lat=" + lat + "&lon=" + lng + "&user=DAV";

        lat = Math.abs(Math.trunc(lat));

        return new Promise((resolve, reject) => {
            let responseObject = [];

            $.ajax({
                url: url,
                type: 'GET',
                headers: {"Access-Control-Allow-Origin": "*"},
                crossDomain: true,
                dataType: 'jsonp',
                async: true,
                success: (res) => {
                    console.log(res);
                    try {
                        let response = res.features[0].properties.parameter;

                        /*responseObject[0] = response.SI_EF_TILTED_ANG_ORT[1];
                        responseObject[1] = Object.values(response.SI_EF_OPTIMAL_ANG).map(val => Math.abs(val));
                        responseObject[2] = Object.values(response.SI_EF_OPTIMAL);
                        responseObject[3] = Object.values(response.SI_EF_TILTED_SURFACE_0);
                        responseObject[4] = Object.values(response['SI_EF_TILTED_SURFACE_' + (lat - 15)]);
                        responseObject[5] = Object.values(response['SI_EF_TILTED_SURFACE_' + lat]);
                        responseObject[6] = Object.values(response['SI_EF_TILTED_SURFACE_' + (lat * 1 + 15)]);
                        responseObject[7] = Object.values(response.SI_EF_TILTED_SURFACE_90);

                        Array.prototype.splice.apply(responseObject, [2, 6].concat(responseObject.slice(2).map(arr => arr.map(val =>
                            Math.round(val * area * efficiency * losses) / 100
                        ))));*/

                        responseObject[0] = Object.values(response.SI_EF_OPTIMAL);
                        responseObject[1] = Object.values(response.SI_EF_TILTED_SURFACE_0);
                        responseObject[2] = Object.values(response['SI_EF_TILTED_SURFACE_' + (lat - 15)]);
                        responseObject[3] = Object.values(response['SI_EF_TILTED_SURFACE_' + lat]);
                        responseObject[4] = Object.values(response['SI_EF_TILTED_SURFACE_' + (lat * 1 + 15)]);
                        responseObject[5] = Object.values(response.SI_EF_TILTED_SURFACE_90);

                        responseObject = responseObject.map(arr => arr.map(val => Math.round(val * area * efficiency * losses) / 100));

                        responseObject.unshift(response.SI_EF_TILTED_ANG_ORT[1], Object.values(response.SI_EF_OPTIMAL_ANG).map(val => Math.abs(val)));

                        resolve(responseObject);
                    } catch {
                        reject({ heading: "incomplete server response", note: "Possible explanations: there is no solar irradiance information for this location to be provided or server is unable to access data at this time." });
                    }
                },
                error: () => {
                    reject({ heading: "server error", note: "Unexpected problem occurred on the server-side right after sending the request. Please check back soon." });
                }
            });
        });
    }
}