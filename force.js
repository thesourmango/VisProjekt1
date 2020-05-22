function drawForce() {
    d3.json("nodes.json", function (jsonData) {

        var width = 500, height = 400;

        var canvas = d3.select("body").append("svg").attr("width",width).attr("height",height);

        // Skapa länkar (lines) - streck mellan noderna
        var link = canvas.append("g").selectAll("links").data(jsonData.links).enter()
            .append("line")
            .attr("stroke","black");

        // Skapa noder (cirklar) med vännernas namn, data join json data till dem
        var node = canvas.append("g").selectAll("nodes").data(jsonData.nodes).enter()
            .append("ellipse").attr("cx", 100).attr("cy", 100)
            .attr("rx", 40).attr("ry", 20)
            .attr("stroke", "#603414").attr("fill", "lightgray")
            .on("mouseover", overHandler).on("mouseout", outHandler);

        // Skapa text labels
        var label = canvas.append("g").selectAll("labels").data(jsonData.nodes).enter()
            .append("text").attr("text-anchor", "middle")
            .attr("x",100).attr("y",100)
            .text( function(data) { return data.name } );

        // Definiera en kraft (gravity)
        var simulation = d3.forceSimulation()
            // Länkarna behöver en ny typ av kraft (enligt önskad längd)
            .force("link", d3.forceLink().distance(60).id( function (data) { return data.id } ))
            // Manybody simulerar gravity (pull together) eller electrostatic charge (repulsion)
            .force("charge", d3.forceManyBody().strength(-200) )
            // Centreringskraften skuffar alla noder mot mitten
            .force("center", d3.forceCenter(width/2,height/2) );
        
        // Vi måste starta vår simulation och köra den on("tick")
        simulation.nodes(jsonData.nodes).on("tick", tickHandler);
        // Simulera även länkarnas krafter
        simulation.force("link").links(jsonData.links);

        function tickHandler() {
            // Vad ska göras varje tick? x och y för ellipserna ska ändra (i och med kraften)
            node
                .attr("cx", function(data) { return data.x })
                .attr("cy", function(data) { return data.y })
            label
                .attr("x", function(data) { return data.x })
                .attr("y", function(data) { return data.y + 5 })
            link
                .attr("x1", function(data) { return data.source.x })
                .attr("x2", function(data) { return data.target.x })
                .attr("y1", function(data) { return data.source.y })
                .attr("y2", function(data) { return data.target.y });
        }

        function overHandler(ev) {
            d3.select(this).append("title").text(ev.name);
        };
        function outHandler(ev) {
            d3.select(this).selectAll("title").remove();
        };

    });
};