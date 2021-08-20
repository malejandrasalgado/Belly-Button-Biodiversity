 // Fetch the JSON data and console log it
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
  
  function buildCharts(sample) {    
    d3.json("samples.json").then((data) => {
    var samples = data.samples;
    var filterArray = samples.filter(sampleObject => sampleObject.id == sample);
    var result = filterArray[0];
    var sample_values = result.sample_values;
    var otu_ids = result.otu_ids;
    var otu_labels = result.otu_labels;   
    
// Build a Bubble Chart
    var trace1 = {
        x: otu_ids,
        y: sample_values,
        mode: 'markers',
        text: otu_labels,
        marker: {
            size: sample_values,
            color: otu_ids,
            colorscale: "Jet"
        }
        
    };
    var data = [trace1];
    var layout = {
        title: 'Bacteria Cultures per Sample',
        showlegend: false,
        hovermode: 'closest',
        xaxis: {title:"OTU ID " +sample},
        font: { color: "black", family: "'Arial, sans-serif;',size: 12," },
        margin: {t:30}
    };
    Plotly.newPlot('bubble', data, layout); 

})
;}

  
  init()
