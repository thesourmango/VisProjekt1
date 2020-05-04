window.onload = reDraw;   // Rita grafen en gång on load
window.onresize = reDraw;  // Rita grafen när föstret ändrar storlek

 function reDraw() {
    d3.select('svg').remove('staplar');  // Ta bort tidigare grafer
     var dataTable = [30, 50, 70, 80, 40];  // Höjden på rektanglar i barcharten
     var height = window.innerHeight / 2; // Justera rutans höjd enligt fönsterstorlek
     var width = window.innerWidth * 0.8;
     var barWidth = 50, barMargin = 20; // Globala variabler som definierar storlekar
     
     // Skalningsfunktion för Y-axeln
     var yScale = d3.scaleLinear().domain([0,d3.max(dataTable)]).range([0,height]); 
     // Bandscale är praktisk då man behöver placera något bredvid varandra med en visst mellanrum
     var xScale = d3.scaleBand().domain(dataTable).range([0,width]).padding(0.2);

     // Skapa ett ritunderlag
     var canvas = d3.select("body")
         .append("svg")
         .attr("width", width)
         .attr("height", height)
         .style("background","lightgrey");

     // Här börjar tidsresan
     canvas.selectAll("staplar").data(dataTable) // Fyll virtuella staplar med data från arrayn
         // Gå in i varje virtuella stapel
         .enter() // for (i=0; i<data.length; i++)
             .append("rect")
             .attr("width", function(data) { return xScale.bandwidth(); })
             // bredden av rektangeln = värdet från datatabellen
             .attr("height", function(data) { return yScale(data) + barMargin; })
             // Första rektangeln x = 100*0, x2 = 100*1 ...
             .attr("x", function(data) { return xScale(data); })
             // Vi måste definiera y startpunkten enligt höjden av stapeln!
             .attr("y", function(data) { return height - yScale(data) + barMargin;});
 }