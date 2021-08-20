 //1. Use the D3 library to read in samples.json.
function init(){
    var selector = d3.select("#selDataset");

    d3.json("samples.json").then((data) =>{
      jsData = data;
        var subjectID = data.names;
        subjectID.forEach((ID) => {
            selector
            .append('option')
            .text(ID)
            .property('value', ID);
        });
    const firstbutton = subjectID[0];
    buildCharts(firstbutton);
       });
}


// define varialbes to build charts 

  function buildCharts(sample) {    
    d3.json("samples.json").then((data) => {
    var samples = data.samples;
    var filterArray = samples.filter(sampleObject => sampleObject.id == sample);
    var result = filterArray[0];
    var sampleValues = result.sample_values
    var otuIds = result.otu_ids
    var otuLabels = result.otu_labels;   
        // console.log(otuLabels)

//2. Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.

    var trace = {
        x: sampleValues.slice(0,10).reverse(),
        y: otuIds.slice(0,10).map(otuID => `OTU ${otuID}`).reverse(),
        // name: 'SF Zoo',
        orientation: 'h',
        text: otuLabels.slice(0,10).reverse(),
        marker: {
        color: 'rgba(55,128,191,0.6)',
        width: 1
        },
        type: 'bar'
        
    };
        
    // create data variable
    var data = [trace];

    var layout = {
        title: 'Top Ten OTUs for Individual ' +sample,
        font: { color: "black", family: "'Arial, sans-serif;',size: 12," },
        // margin: {t:10}
    };
    Plotly.newPlot('bar', data, layout);
    
// 3. Create a bubble chart that displays each sample.

    var trace1 = {
        x: otuIds,
        y: sampleValues,
        mode: 'markers',
        text: otuLabels,
        marker: {
            size: sampleValues,
            color: otuIds,
            colorscale: "Jet"
        }
        
    };
    var data1 = [trace1];
    var layout1 = {
        title: 'Bacteria Cultures per Sample',
        showlegend: false,
        hovermode: 'closest',
        xaxis: {title:"OTU ID " +sample},
        font: { color: "black", family: "'Arial, sans-serif;',size: 12," },
        margin: {t:40}
    };
    Plotly.newPlot('bubble', data1, layout1); 

})
;}

  
  init()
