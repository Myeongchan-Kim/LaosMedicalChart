
function get_where_string(){
    var start_date = document.getElementById("start_date");
    var end_date= document.getElementById("end_date");
    var season = document.getElementById("season");
    var path = window.location.pathname.split("/where:")[0]

    var whereString = "TRUE";
    if (start_date.value){
        whereString += " AND"
        whereString += " gameday >= '"+start_date.value+"'";
    }

    if (end_date.value){
        whereString += " AND"
        whereString += " gameday <= '"+end_date.value+"'";
    }

    if (season.value){
        whereString += " AND"
        whereString += " season = "+season.value;
    };

    var target_url = path + "/where:" + whereString;
    //alert(target_url);
    location.href=target_url;
}

$(document).ready(function(){
  console.log("ready");
  $("#myTable").tablesorter();
  $("#myTable1").tablesorter();
  $("#myTable2").tablesorter();
  $("#submit_button").click(function(){
    var reqList = $(".required");
    for(var i=0; i < reqList.length; i++)
    {
      $(reqList[i]).val($(reqList[i]).val().trim());
    }
  });
});
