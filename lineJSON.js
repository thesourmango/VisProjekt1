function drawChart() {
    
    var width = 500, height = 300; // Globala variabler

    // Fetch data from JSON
    d3.json("lineData.json").get( function(error,dataArray) {
        // En array med våra x och y kordinater för cassiopeia
        console.log(dataArray);
    
        // Skapa vårt ritunderlag
        var canvas = d3.select('body').append('svg').attr('width',width).attr('height',height);

        // d3.line() är en Generator som genererar en sträng för d="M x y ..."
        var path = d3.line()
            .x( function(data) { return data.x * 6 } )
            .y( function(data) { return data.y * 6 } );
        // DEBUG: console.log(path(dataArray));
        
        // Rita en linje (obs path inte svg line)
        canvas.append('path')
            .attr('fill','none')
            .attr('stroke','blue')
            .attr('d', path(dataArray)); // <path d="M 100 350 l 150 -300" stroke="blue" fill="none" />
        
        var dotsGroup = canvas.append('g');

        // Lägg till punkter (cirklar) till datapunkterna
        dotsGroup.selectAll('dots').data(dataArray)
            .enter()    
                .append('circle')
                .attr('cx', function(data) { return data.x * 6  } )
                .attr('cy', function(data) { return data.y * 6  } )
                .attr('r','2')

    });

    }