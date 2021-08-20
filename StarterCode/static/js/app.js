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


// define varialbes to build charts 

  function buildCharts(sample) {    
    d3.json("samples.json").then((data) => {
    var samples = data.samples;
    var filterArray = samples.filter(sampleObject => sampleObject.id == sample);
    var result = filterArray[0];
    var sampleValues = result.sample_values.slice(0, 10); // getting the first 10 samples 
    var otuIds = result.otu_ids.slice(0, 10); //getting only top 10 otuIds
    var otuLabels = result.otu_labels;   

    
    
// Build a Bubble Chart
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
