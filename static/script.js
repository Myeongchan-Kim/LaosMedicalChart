
var pListAjax = {
  reload : function(callback){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/show/patient", true);
    xhr.addEventListener("load", function(){
      callback(JSON.parse(xhr.responseText));
    });
    xhr.send();
  },
  makeNewPatientChart: function(callback, pid){
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/add/chart/"+pid, true);
    xhr.addEventListener("load", function(){
      callback(JSON.parse(xhr.responseText));
    });
    xhr.send();
  }
}

var makePatientList = function (json){
  var patientList = document.querySelector("ul.patient_list");
  patientList.innerHTML = "";
  for( patientObj in json){
    var patientLi = makePatient(json[patientObj]);
    patientList.appendChild(patientLi);
  }
}

var makePatient = function (pObj){
  //<li><a class="mdl-navigation__link" href="">환자1</a></li>
  //console.log(pObj);
  var li = document.createElement("LI");
  var a = document.createElement("A");
  a.classList.add("mdl-navigation__link");
  a.classList.add("smallAList");
  a.href = "/modify/"+mode+"/"+pObj.pid;

  var aInnerString = pObj["pname"] + " " + pObj["birth"] + " " + pObj["sex"];
  a.innerHTML = aInnerString;

  li.appendChild(a);
  return li;
}

var clickCallback = function(e){
  if(e.target.id == "patientList_reloadButton"){
    pListAjax.reload(makePatientList);
  }

  if(e.target.id === "new_chart_button"){
    var pid = e.target.dataset.pid;
    console.log(pListAjax.makeNewPatientChart(makePatientChart, pid));
  }
}

var makePatientChart = function(json){
  // <li>
  //   <div class="mdl-card mdl-shadow--3dp patient_chart">
  //     <div class="chart_title">
  //       <h4>Medical Assessment
  //       <button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">
  //         <i class="material-icons">v</i>
  //       </button>
  //       </h4>
  //     </div>
  //     <textarea name="medical_assessment" class="mdl-textfield__input mdl-shadow--2dp assessment"></textarea>
  //     <h4>Prescription</h4>
  //     <textarea name="prescription" class="mdl-textfield__input mdl-shadow--2dp prescription"></textarea>
  //   </div>
  // </li>
  var i = document.createElement("I");
  i.classList.add("material-icons");
  i.id == "cid"+json.cid;
  var expandButton = document.createElement("BUTTON");
  expandButton.classList.add("mdl-button");
  expandButton.classList.add("mdl-button--icon");
  expandButton.classList.add("mdl-js-button");
  expandButton.classList.add("mdl-js-ripple-effect");
  expandButton.appendChild(i);

  var title = createElement("H4");
  title.innerHTML = "Medical Assessment";
  title.appendChild(expandButton);

  var chart_title_div = createElement("DIV");
  chart_title_div.classList.add("chart_title");
  chart_title_div.appendChild(title);

  var medical_textArea = createElement("TEXTAREA");
  medical_textArea.name = "medical_assessment";
  medical_textArea.classList.add("mdl-textfield__input");
  medical_textArea.classList.add("mdl-shadow--2dp");
  medical_textArea.classList.add("assessment");

  var prescription_title = createElement("H4");
  var prescription_textArea = createElement("TEXTAREA");
  prescription_textArea.name = "medical_assessment";
  prescription_textArea.classList.add("mdl-textfield__input");
  prescription_textArea.classList.add("mdl-shadow--2dp");
  prescription_textArea.classList.add("prescription");

  var patient_chart_div = createElement("DIV");
  patient_chart_div.classList.add("mdl-card");
  patient_chart_div.classList.add("patient_chart");
  patient_chart_div.classList.add("mdl-shadow--3dp");
  patient_chart_div.appendChild(chart_title_div);
  patient_chart_div.appendChild(medical_textArea);
  patient_chart_div.appendChild(prescription_title);
  patient_chart_div.appendChild(prescription_textArea);

  var li = document.createElement("LI");
  li.appendChild(patient_chart_div);

  return li;
}

document.addEventListener("click", clickCallback);
document.addEventListener("DOMContentLoaded", function(e){
  pListAjax.reload(makePatientList);
});
