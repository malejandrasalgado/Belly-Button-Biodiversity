// Fetch the JSON data and console log it
function init() {
    d3.json("samples.json").then((jsonData) => {
        console.log(jsonData);
    }
    )
}
init()





