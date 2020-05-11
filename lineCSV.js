function drawChart() {
    // d3 V5 erbjuder .then metoden
    d3.csv("lineData.csv").then(function(data) {
        //console.log(data); //document.write(JSON.stringify(data));
        // Ladda in datan
        var temps = [], months = [], dataFix = [];
        for (i=0; i<data.length; i++) {
            months.push(data[i].Month);
            temps.push( parseFloat(data[i].Temp) );
            dataFix.push( { month:months[i], temp:temps[i] } );
        }
        console.log(dataFix);
        console.log(months);
        console.log(temps);

        // Skapa ritunderlag
        var width = 400, height = 200;
        var canvas = d3.select('body').append('svg').attr('width', width).attr('height',height);

        // Skapa ordinal scale baserat på månaderna
        var xScale = d3.scaleBand()
            .domain(months)
            .range([0,width]);

        // Temperaturen -20 kan inte användas som Y axel, -20 är ju utanför canvas!
        // Vi behöver en skala, för temperatur passar en lineär skala
        var yScale = d3.scaleLinear()
            .domain([d3.min(temps), d3.max(temps)]) // Vilka värden ska konverteras till pixelvärden
            .range([height,0]); // Pixelvärden ska läggas mellan vilka värden?

        // Generera d strängen för path
        var dString = d3.line()
            .x(function(d) { return xScale(d.month) })
            .y(function(d) { return yScale(d.temp) });
            //console.log(dString(data)); // debug, kolla på d attributet
        
        // Rita linjen
        canvas.append('path')
            .attr('fill','none')
            .attr('stroke','blue')
            .attr('d', dString(dataFix));
    });  
};