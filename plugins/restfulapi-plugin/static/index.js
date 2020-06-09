
var CustomTabModel = Backbone.Collection.extend({
    url: 'widgets/widgets.json'
})

class CustomLayout extends allure.components.AppLayout {

    initialize() {
        this.model = new CustomTabModel();
    }

    loadData() {
        return this.model.fetch();
    }

    getContentView() {
        return new MyView({items: this.model.models});
    }
}

const template = function (data) {
    
	html = '<div id="container" style="width:50%; min-width:400px; height:460px; border:1px solid #E5E5E5; margin:15px"></div>';
	
	html += '<script type="text/javascript">';
	html += 'var dom = document.getElementById("container");';
	html += 'var responseCodeChart = echarts.init(dom);';
	html += 'var app = {};';
	html += 'option = null;';
	html += 'option = {';
	html += '    title: {';
    html += '        text: "RESPONSE CODE",';
    html += '        left: "left",';
    html += '        padding: [15, 15, 15, 15],';
    html += '        textStyle: {';
	html += '            color: "#1F0000",';
	html += '            fontStyle: "normal",';
	html += '            fontWeight: "lighter",';
	html += '            fontFamily: "Helvetica,Arial,sans-serif",';
	html += '            fontSize: 18';
	html += '        }';
    html += '    },';
	html += '    color: ["#3398DB"],';
	html += '    tooltip: {';
	html += '        trigger: "axis",';
	html += '        axisPointer: {';
	html += '            type: "shadow"';
	html += '        }';
	html += '    },';
	html += '    grid: {';
	html += '        left: "3%",';
	html += '        right: "4%",';
	html += '        bottom: "3%",';
	html += '        containLabel: true';
	html += '    },';
	html += '    xAxis: [';
	html += '        {';
	html += '            type: "category",';
	html += '            data: ' + JSON.stringify(data.items[0].attributes.category) + ',';
	html += '            axisTick: {';
	html += '                alignWithLabel: true';
	html += '            }';
	html += '        }';
	html += '    ],';
	html += '    yAxis: [';
	html += '        {';
	html += '            type: "value",';
	html += '            minInterval: 1';
	html += '        }';
	html += '    ],';
	html += '    series: [';
	html += '        {';
	html += '            type: "bar",';
	html += '            barWidth: "60%",';
	html += '            data: ' + JSON.stringify(data.items[0].attributes.data) + '';
	html += '        }';
	html += '    ]';
	html += '};';
	html += 'if (option && typeof option === "object") {';
	html += '    responseCodeChart.setOption(option, true);';
	html += '}';
	html += 'window.onresize = function(){';
    html += '    responseCodeChart.resize();';
    html += '};';
	html += '</script>';
	
    return html;
}

var MyView = Backbone.Marionette.View.extend({
	
    template: template,

    render: function () {
        this.$el.html(this.template(this.options));
        return this;
    }
})

allure.api.addTab('mytab', {
    title: 'HttpCode', icon: 'fa fa-trophy',
    route: 'mytab',
    onEnter: (function () {
        return new CustomLayout()
    })
});
