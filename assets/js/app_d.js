//Lets create the selection menu for the contienent

d3.json("universities.json").then((importedData) =>{
  var data = importedData;
  //console.log(data);
  var ContinentName = []
  //Lets create the menu
  data.forEach(element => {
      var prueba = element.continent
      if(ContinentName.includes(prueba) == false){
          ContinentName.push (element.continent);
      };
      
  });

  console.log(ContinentName);
  menuConst(ContinentName);
});

function menuConst(someArray){
  //Select dropdown menu
  var dropMenu = d3.select("#SelectCountry");
  //loop throug the array and generate the menu
  for(var i=0; i<someArray.length; i++){
      var temp = someArray[i];
      //append option to menu
      dropMenu.append("option")
            .text(temp)
            .property("value",temp);

  };
};

//Let's create the selection menu for the University

d3.json("universities.json").then((importedData) =>{
  var data = importedData;
  //Creata a menu for the University
  //Select the menu for University
  var dropMenu2 = d3.select("#University");
  data.forEach(university =>{
    //Extract the continent
    var temp = university.title;
    //Add the options to the menu;
    dropMenu2.append("option")
              .text(temp)
              .property("value",temp);
    });
    
});


//Lets create the default page
function init() {
  //Call data
  d3.json("universities.json").then((importedData) => {
      // console.log(importedData);
      var data = importedData;
      //console.log(importedData)
      
      //Create a  filter FOR CONTINENT
      var newArray = data.filter(function (el) {
        return el.continent == "Europe";
      });

      //Create a filter FOR UNIVERSITY
      var newArrayUni = data.filter(function (el) {
      return el.title == "University of Oxford";
    });
      //console.log(newArray);
      //Lets call the function to built a bar chart
      barChart(newArray);
      
      //Lets call the function to build the bar graph
      pieChart(newArrayUni);

  });
};
//end of init function

//Function to bar graph for a given continent
function barChart(continent){
  console.log("here goes the chart")
  //order by ranking
  continent.sort((a, b) => {
    return a.ranking - b.ranking;
  });
  
  //Take the first 10
  var result = continent.slice(0, 10);
  console.log(result);
  //console.log(continent);
  var universities = result.map(row => row.title);
  var score = result.map(row=>row.overall_score);
  var ranking = result.map(row=> row.ranking)
  
  //Trace1 for the Greek Data
   var data = {
     x: score,
     y: universities,
     text: ranking,
     name: "Continent",
     type: "bar",
     orientation:('h')
   };

  // Apply the group barmode to the layout
   var layout = {
    height: 400,
    width: 600,
     title: "Research Score of each University",
     barmode: "group"
   };

 // Render the plot to the div tag with id "plot"
 Plotly.newPlot("CountryG", data, layout);

};

function pieChart(universities){
  //console.log(universities);
  //Lets filter by university
   
  var university =universities[0];

  //Lets pick certain keys
  var labels = ['citations', 'industry income', 'international outlook', 'teaching','research' ];
  var indicators = []

  indicators.push(university["citations_score"]*(30/100));
  indicators.push(university['industry_income_score']*(2.5/100));
  indicators.push(university["intl_outlook_score"]*(7.5/100));
  indicators.push(university['teaching_score']*(30/100));
  indicators.push(university['research_score']*(30/100));

  //Doing the graph
  var data = [{
    values: indicators,
    labels: labels,
    type: "pie"
  }];

  var layout = {
    height: 400,
    width: 600,
    title: "2021 University scores in %",
  };

  Plotly.newPlot("pie", data, layout);
  
  

}


//Detect a change in the country control
//lets catch a change or selection
// On change to the DOM, call getData()
d3.selectAll("#SelectCountry").on("change", optionChanged);

// Function called by DOM changes
function optionChanged() {
  var dropdownMenu = d3.select("#SelectCountry");
  // Assign the value of the dropdown menu option to a variable
  var dataset = dropdownMenu.property("value");
  // Initialize an empty array for the country's data
  console.log("You choose");
  console.log(dataset);

  //Filter the data
    d3.json("universities.json").then((importedData) => {
    // console.log(importedData);
    var data = importedData;
    //console.log(importedData)
    
    //Create a  filter FOR CONTINENT
    var newArray = data.filter(function (el) {
      return el.continent == dataset;
    });
    //Lets call the function to build the bar graph
    barChart(newArray);
    });
};

//Detect a change in the university control
//lets catch a change or selection
// On change to the DOM, call getData()
d3.selectAll("#Country").on("change", optionChangedUniversity);

// Function called by DOM changes
function optionChangedUniversity() {
  var dropdownMenu = d3.select("#University");
  // Assign the value of the dropdown menu option to a variable
  var dataset = dropdownMenu.property("value");
  // Initialize an empty array for the country's data
  console.log("You choose");
  console.log(dataset);

  d3.json("universities.json").then((importedData) =>{
    var data = importedData
    var newArrayUni = data.filter(function (el) {
      return el.title == dataset;
    });

    //Lets call the function to build the bar graph
   pieChart(newArrayUni);

  });   
}


//Call init() function
init();

