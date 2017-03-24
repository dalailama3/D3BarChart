
var data;
$.ajax({
  url: "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json",
  method: "get",
  dataType: 'json'
}).done(function (result) {
  data = result.data
  var margin = {top: 20, right: 10, bottom: 100, left:50},
      width = 700 - margin.right - margin.left,
      height = 500 - margin.top - margin.bottom;
  var svg = d3.select("body")
      .append("svg")
        .attr ({
          "width": width + margin.right + margin.left,
          "height": height + margin.top + margin.bottom
        })
      .append("g")
        .attr("transform","translate(" + margin.left + "," + margin.right + ")");


    var barWidth = Math.ceil(width / data.length);


    minDate = new Date(data[0][0]);
    console.log(minDate)

    maxDate = new Date(data[274][0]);

    var xScale = d3.time.scale()
      .domain([minDate, maxDate])
      .range([0, width]);

    var yScale = d3.scale.linear()
      .range([height, 0])
      .domain([0, d3.max(data, function(d) {
        return d[1];
      })]);


    // Specify the domains of the x and y scales

    var xAxis = d3.svg.axis()
      .scale(xScale)
      .orient("bottom")
      .ticks(d3.time.years, 5);

    var yAxis = d3.svg.axis()
      .scale(yScale)
      .orient("left")
      .ticks(10, "");



    var monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
    ];

  var currency = d3.format("$,.2f");

  var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    var date = new Date(d[0])
    var year = date.getFullYear();
    var month = date.getMonth()
    var monthName = monthNames[month]
    return "<span>" + currency(d[1]) + "&nbsp;Billion </span><br><span>" + monthNames[month] + ' ' + year + "</span>"
  })


    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

    svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.8em")
      .style("text-anchor", "end")
      .text("Gross Domestic Product, USA (billions)");

    svg.call(tip)

    svg.selectAll("rect")
      .data(data)
      .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) {
        return xScale(new Date(d[0]));
      })
      .attr("y", function(d) {
        return yScale(d[1]);
      })
      .attr("height", function(d) {
        return height - yScale(d[1]);
      })
      .attr("width", barWidth)
      .on("mouseover", tip.show)
      .on("mouseout", tip.hide)

  });
