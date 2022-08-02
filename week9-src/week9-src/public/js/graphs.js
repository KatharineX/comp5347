google.charts.load('current', {packages: ['corechart']});

var options = {'title':"Composition of Earth's atmosphere  ",
    'width':400,
    'height':300
};

var data 

function drawBar(){
	// complete

}

function drawPie(){
   	graphData = new google.visualization.DataTable();
	graphData.addColumn('string', 'Element');
	graphData.addColumn('number', 'Percentage');
	$.each(data, function(key, val) {
		graphData.addRow([key, val]);
	});
	var chart = new google.visualization.PieChart($("#myChart")[0]);
	chart.draw(graphData, options);
}

$(document).ready(function() {
    $.getJSON('/gchart/getData',null, function(rdata) {
    	data = rdata
    });

    $("#pie").click(function(event){
    	event.preventDefault();
    	drawPie()
   	});
});