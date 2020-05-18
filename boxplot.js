function drawBoxplot() {
     // Läs in extern JSON data (d3.v5!)
     d3.json("boxplot.json").then( function(jsonData) {

        // Definiera variabler
        var width = 600, height = 300, margin = 30;
        var chartWidth = width - (margin*2);
        var chartHeight = height - (margin*2);
    
        // Ladda in datan
        var temps = [];
        for (i=0; i<jsonData.temperatures.length; i++) {
            temps.push(jsonData.temperatures[i].temp);
        }
        console.log(temps);

        


     });
};