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
    updateMetadata(firstbutton);
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
        margin: {t:40},
        height: 400,
        width: 800
    };
    Plotly.newPlot('bubble', data1, layout1); 
    });
    }

 // 4. Display the sample metadata, i.e., an individual's demographic information.
 function updateMetadata(sample) {
    d3.json("samples.json").then((data) => {
        var metadata = data.metadata;
        var filterArray = metadata.filter(sampleObject => sampleObject.id == sample);
        var result = filterArray[0];
        var panelText = d3.select("#sample-metadata");
        panelText.html("");
        Object.entries(result).forEach(([key, value]) => {
            panelText.append("p").text(`${key.toUpperCase()}: ${value}`)
        })
    // 5. Adapt the Gauge Chart from https://plot.ly/javascript/gauge-charts/ to plot the weekly washing frequency of the individual.FFAF33 FFCD80 FFB52E

        var data = [
            {
              domain: { x: [0, 1], y: [0, 1] },
              value: result.wfreq,
              title: 'Belly Button Washing Frequency<br> Scrubs per Week',
              titlefont: {family: '"Arial, Helvetica, sans-serif'},
              type: "indicator",
              mode: "number+gauge",
              gauge: { axis: {color:"FF4C33", range: [null, 9], },
                   steps: [
                    {range: [0, 1], color: "ffd799"}, 
                    {range: [1, 2], color: "ffd390"},
                    {range: [2, 3], color: "ffd290"},
                    {range: [3, 4], color: "ffcf88"},
                    {range: [4, 5], color: "ffcb80"},
                    {range: [5, 6], color: "ffc778"},
                    {range: [6, 7], color: "ffc370"},
                    {range: [7, 8], color: "ffbf68"},
                    {range: [8, 9], color: "ffb857"}
                  ]}
              
            }
          ];
        
          var layout = {
            width: 500,
            height: 400,
            font: { color: "black", family: "Arial, sans-serif" }
           };
        
          
          Plotly.newPlot("gauge", data, layout);
          });
        }

function optionChanged(newSample) {
    // Fetch new data each time a new sample is selected
    buildCharts(newSample);
    updateMetadata(newSample);
  };



  
  init();
