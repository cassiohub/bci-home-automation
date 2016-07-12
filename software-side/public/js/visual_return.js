var limit = 60 * 1,
    duration = 1000,
    now = new Date(Date.now() - duration)

var width = 600,
    height = 160

var groups = {
    attention: {
        value: 0,
        color: 'orange',
        data: d3.range(limit).map(function() {
            return 0
        })
    },
    meditation: {
        value: 0,
        color: 'blue',
        data: d3.range(limit).map(function() {
            return 0
        })
    }

}

var x = d3.time.scale()
    .domain([now - (limit - 2), now - duration])
    .range([0, width])

var y = d3.scale.linear()
    .domain([0, 100])
    .range([height, 0])

var line = d3.svg.line()
    .interpolate('basis')
    .x(function(d, i) {
        return x(now - (limit - 1 - i) * duration)
    })
    .y(function(d) {
        return y(d)
    })

var svg = d3.select('.graph').append('svg')
    .attr('class', 'chart')
    .attr('width', width)
    .attr('height', height)

var axis = svg.append('g')
    .attr('class', 'x axis')
    .attr('transform', 'translate(0,155)')
    .call(x.axis = d3.svg.axis().scale(x).orient('bottom'))

var yAxis = d3.svg.axis()
    .scale(y)
    .ticks(4)
    .orient("right");

svg.append("g")
    .attr("class", "y axis")
    .attr("transform", "translate(0,5)")
    .call(yAxis);


var paths = svg.append('g')

for (var name in groups) {
    var group = groups[name]
    group.path = paths.append('path')
        .data([group.data])
        .attr('class', name + ' group')
        .style('stroke', group.color)
}

function tick(attention, meditation) {
    now = new Date()

    var attentionGroup = groups.attention;
    var meditationGroup = groups.meditation;

    console.log(attention);
    console.log(meditation);

    attentionGroup.data.push(attention);
    attentionGroup.path.attr('d', line);
    meditationGroup.data.push(meditation);
    meditationGroup.path.attr('d', line);

    // Add new values
    // for (var name in groups) {
    //     var group = groups[name]
    //     //group.data.push(group.value) // Real values arrive at irregular intervals
    //     group.data.push(20 + Math.random() * 100)
    //     group.path.attr('d', line)
    // }

    // Shift domain
    x.domain([now - (limit - 2) * duration, now - duration])

    console.log("AXIS: "  + axis);
    // Slide x-axis left
    axis.transition()
        .duration(duration)
        .ease('linear')
        .call(x.axis)

    // Slide paths left
    paths.attr('transform', null)
        .transition()
        .duration(duration)
        .ease('linear')
        .attr('transform', 'translate(' + x(now - (limit - 1) * duration) + ')')
        //.each('end', tick) // call tick and update chart

    // Remove oldest data point from each group
    attentionGroup.data.shift();
    meditationGroup.data.shift();

    // for (var name in groups) {
    //     var group = groups[name]
    //     group.data.shift()
    // }
}
