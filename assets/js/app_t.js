console.log("It entered to table data page :)");
var url = "https://university-ranking.herokuapp.com/api/v1.0/ranking/1/1526";

d3.json("universities.json").then((importedData) => {
  //console.log(importedData);
  var sampleData = importedData;
  console.log(sampleData);

  var table = new Tabulator("#example-table", {
   data:sampleData,           //load row data from array
   layout:"fitColumns",      //fit columns to width of table
   tooltips:true,            //show tool tips on cells
   history:true,             //allow undo and redo actions on the table
   pagination:"local",       //paginate the data
   paginationSize:10,         //allow 7 rows per page of data
   paginationSizeSelector:[20, 30, 40,50,100],
   movableColumns:true,      //allow column order to be changed
   columnHeaderVertAlign:"bottom",
   initialSort:[             //set the initial sort order of the data
       {column:"ranking", dir:"asc"},
   ],
   columns:[                 //define the table columns
       {title:"Continent", field:"continent", hozAlign:"left"},
       //{title:"Country", field:"location", hozAlign:"left"},
       {title:"University", field:"title", hozAlign:"left"},
       {title:"Ranking", field:"ranking", hozAlign:"center", width:100, editor:true},
       {title:"Teaching", field:"teaching_score", hozAlign:"center", editor:true},
       {title:"Research", field:"research_score",hozAlign:"center"},
       {title:"Citations", field:"citations_score", hozAlign:"center"},
       {title:"International", field:"intl_outlook_score",hozAlign:"center"},
       {title:"Industry Income", field:"industry_income_score",hozAlign:"center"},
       {title:"Overall Score", field:"overall_score", width:130, sorter:"number", hozAlign:"center"},
   ],
});

  //trigger download of data.csv file
  document.getElementById("download-csv").addEventListener("click", function(){
      table.download("csv", "data.csv");
  });

  //trigger download of data.json file
  document.getElementById("download-json").addEventListener("click", function(){
      table.download("json", "data.json");
  });


});

