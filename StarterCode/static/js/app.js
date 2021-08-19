// Fetch the JSON data and console log it
function init() {
    d3.json("samples.json").then((jsonData) => {
        console.log(jsonData);

        // Select the input value from the data (Names)
        let dataNames = jsonData.names;
        var testSubjectID = d3.select("#selDataset");

        dataNames.forEach(function (name) {
            testSubjectID.append("option").text(name).property("value", name);
        });
        // select the first name 
        let selectedName = "940";

        datarequested(selectedName);
    });
}

function datarequested(selectedName) {
    d3.json("samples.json").then((jsonData) => {
        console.log("1.selectedName");


        let nameSubject = jsonData.samples.filter((val) => val.id == selectedName);
        console.log(nameSubject);

    }
    )
}
init()




