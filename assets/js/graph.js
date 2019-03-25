queue()
    .defer(d3.csv, "data/MemberData.csv")
    .await(makeGraphs);

function makeGraphs(error, memData) {
    var ndx = crossfilter(memData);
    
    show_discipline_selector(ndx);
    show_gender_split(ndx);
    show_club_split(ndx);
    show_mem_type_split(ndx);
    // show_mem_fee_split(ndx);  
    
    
    dc.renderAll();
}    

// menu selector
function show_discipline_selector(ndx) {
    dim = ndx.dimension(dc.pluck('year'));
    group = dim.group();
    
    dc.selectMenu("#year-selector")
    .dimension(dim)
    .group(group);
}

// chart showing membership by gender
function show_gender_split(ndx) {
    var dim = ndx.dimension(dc.pluck('gender'));
    var group = dim.group();
    
    dc.barChart("#gender-split")
        .width(300)
        .height(300)
        .margins({top: 10, right: 30, bottom:20, left:40})
        .dimension(dim)
        .group(group)
        .transitionDuration(500)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .xAxisLabel("Gender")
        .yAxis().ticks(10);
    
}
    

// chart showing club membership per year
function show_club_split(ndx) {
    var dim = ndx.dimension(dc.pluck('club'));
    var group = dim.group();
    
    dc.barChart("#club-by-year")
        .width(1500)
        .height(300)
        .margins({top: 10, right: 30, bottom:20, left:40})
        .dimension(dim)
        .group(group)
        .transitionDuration(500)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .xAxisLabel("Club")
        .yAxis().ticks(20);
    
}
    
// chart showing total membership by memberhip type
function show_mem_type_split(ndx) {
    var dim = ndx.dimension(dc.pluck('mem_type'));
    var group = dim.group();
    
    dc.barChart("#mem-by-type")
        .width(500)
        .height(300)
        .margins({top: 10, right: 30, bottom:20, left:40})
        .dimension(dim)
        .group(group)
        .transitionDuration(500)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .xAxisLabel("Membership Type")
        .yAxis().ticks(20);
    
}
// chart showing total income by membership type
// function show_mem_fee_split(ndx) {
//     var dim = ndx.dimension(dc.pluck('mem_fee'));
//     var group = dim.group();
    
// function getSum(total, num) {
//   return total + num;
// }
