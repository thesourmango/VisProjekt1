function drawChart() {
    // d3 V5 erbjuder .then metoden
    d3.csv("lineData.csv").then(function(data) {
        console.log(data);
        document.write(JSON.stringify(data));

        // Ladda in datan
        var temps = [], months = [];
        for (i=0; i<data.length; i++) {
            months.push(data[i].Month);
            temps.push(data[i].Temp);
        }

        console.log(months);
        console.log(temps);

    });

    // Skapa ritunderlag
    
};