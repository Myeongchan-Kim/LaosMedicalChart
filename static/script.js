
var pListAjax = {
  reload : function(callback){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/show/patient", true);
    xhr.addEventListener("load", function(){
      callback(JSON.parse(xhr.responseText));
    });
    xhr.send();
  },
  makeNewPatientChart: function(pid, callback){
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/add/chart/"+pid, true);
    xhr.addEventListener("load", function(){
      //console.log(xhr.responseText);
      callback(JSON.parse(xhr.responseText));
    });
    xhr.send();
  },
  savePatientChart: function( pid, cid, callback){
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/modify/chart/"+pid +"/"+cid, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.addEventListener("load", function(){
      callback(JSON.parse(xhr.responseText));
    });
    var medical_ass = document.querySelector("textarea.assessment").value;
    var prescription = document.querySelector("textarea.prescription").value;
    var lab_content = document.querySelector("textarea.lab").value;
    var data = "medical="+medical_ass +"&prescription="+prescription+"&lab="+lab_content;
    console.log(data);
    xhr.send(data);
  },
  deletePatientChart: function(pid, cid, callback){

  },
  loadAllChart:function (pid, callback){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/show/chart/"+pid, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.addEventListener("load", function(){
      callback(JSON.parse(xhr.responseText));
    });
    xhr.send();
  },
}

var makePatientList = function (json){
  var patientList = document.querySelector("ul.patient_list");
  patientList.innerHTML = "";
  //console.log(json);
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
    return;
  }

  if(e.target.parentNode.id == "new_chart_button"){
    var pid = document.querySelector("div.patient_info").dataset.pid;
    console.log(e.target);
    pListAjax.makeNewPatientChart(pid, makePatientChart);
    return;
  }

  if(checkExpandButton(e.target)){
    return;
  }

  if(checkSaveButton(e.target)){
    return;
  }

  if(checkDeleteButton(e.target)){
    return;
  }
}

var checkDeleteButton = function(target){
  if(target.id =="chart_delete_button" ){
    var pid = document.querySelector("div.patient_info").dataset.pid;
    while(target !== document){
      if(target.tagName == "LI"){
        break;
      }
      target = target.parentNode;
    }
    var cid = target.dataset.cid;
    var medical_ass = document.querySelector("textarea.assessment").value;
    var prescription = document.querySelector("textarea.prescription").value;
    var lab_content = document.querySelector("textarea.lab").value;
    if(medical__ass + prescription + lab_content){
      alert("내용이 있는 자료는 삭제 할 수 없습니다. ");
      return true;
    }
    pListAjax.deletePatientChart(pid, cid, notiDelete);
    return true;
  }
  return false;
}

var checkSaveButton = function(target){
  if(target.id =="chart_save_button" ){
    var pid = document.querySelector("div.patient_info").dataset.pid;
    while(target !== document){
      if(target.tagName == "LI"){
        break;
      }
      target = target.parentNode;
    }
    var cid = target.dataset.cid;
    pListAjax.savePatientChart(pid, cid, notiSave);
    return true;
  }
  return false;
};

var notiDelete = function(){};

var notiSave = function(json){
  if(json['affectedRows'] == 1){
    alert("저장되었습니다. ");
  }
}

var checkExpandButton = function(target){
  while(target !== document){
    if(target.tagName == "BUTTON"){
      break;
    }
    target = target.parentNode;
  }
  if(target.id !== "expandButton"){
    return false;
  }
  while(target !== document){
    if(target.classList.contains("patient_chart")){
      target.classList.toggle("shrinked");
      break;
    }
    target = target.parentNode;
  }
}

var makePatientChart = function(json){

  // <li>
  //   <div class="mdl-card mdl-shadow--3dp patient_chart">
  // <div class="lab_div">
  //   <h4>Lab</h4>
  //   <textarea name="lab" class="mdl-textfield__input mdl-shadow--2dp lab"></textarea>
  // </div>
  //     <div class="chart_title">
  //       <h4>Medical Assessment
  //       <button id="expandButton" class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">
  //         <i id="cid%d" class="material-icons">v</i>
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
  i.innerHTML = "v";

  var expandButton = document.createElement("BUTTON");
  expandButton.classList.add("mdl-button");
  expandButton.classList.add("mdl-button--icon");
  expandButton.classList.add("mdl-js-button");
  expandButton.classList.add("mdl-js-ripple-effect");
  expandButton.id = "expandButton";
  expandButton.appendChild(i);

  var timestamp = document.createElement("SPAN");
  timestamp.innerHTML = json.createTime;

  var title = document.createElement("H4");
  title.innerHTML = "Medical Assessment ";
  title.appendChild(timestamp);
  title.appendChild(expandButton);

  var chart_title_div = document.createElement("DIV");
  chart_title_div.classList.add("chart_title");
  chart_title_div.appendChild(title);

  var medical_textArea = document.createElement("TEXTAREA");
  medical_textArea.name = "medical_assessment";
  medical_textArea.classList.add("mdl-textfield__input");
  medical_textArea.classList.add("mdl-shadow--2dp");
  medical_textArea.classList.add("assessment");
  if(json.medical_chart){
    medical_textArea.value = json.medical_chart;
  }else{
    medical_textArea.value = "*CC \n\n*P/I \n\n*P/EX \n\n*P/H \n\n*Imp\n"
  }

  var prescription_title = document.createElement("H4");
  prescription_title.innerHTML = "prescription";
  var prescription_textArea = document.createElement("TEXTAREA");
  prescription_textArea.name = "medical_assessment";
  prescription_textArea.classList.add("mdl-textfield__input");
  prescription_textArea.classList.add("mdl-shadow--2dp");
  prescription_textArea.classList.add("prescription");
  console.log(json.prescription);
  if(json.prescription){
    prescription_textArea.value = json.prescription;
  }
  // <div class="save_button_div">
  //   <button class="mdl-button mdl-button--raised" id="chart_save_button">
  //     저장
  //   </button>
  // </div>
  var save_button_div = document.createElement("DIV");
  save_button_div.classList.add("save_button_div");
  var save_button = document.createElement("button");
  save_button.classList.add("mdl-button");
  save_button.classList.add("mdl-button--raised");
  save_button.id = "chart_save_button";
  save_button.innerHTML = "저장";
  save_button_div.appendChild(save_button);

  var delete_button_div =document.createElement("DIV");
  delete_button_div.classList.add("delete_button_div");
  var delete_button = document.createElement("button");
  delete_button.classList.add("mdl-button");
  delete_button.classList.add("mdl-button--raised");
  delete_button.id = "chart_delete_button";
  delete_button.innerHTML = "삭제";
  delete_button_div.appendChild(delete_button);
  // <div class="lab_div">
  //   <h4>Lab</h4>
  //   <textarea name="lab" class="mdl-textfield__input mdl-shadow--2dp lab"></textarea>
  // </div>
  var lab_div = document.createElement("DIV");
  lab_div.classList.add("lab_div");
  var lab_head = document.createElement("H4");
  lab_head.innerHTML = "Lab";
  var lab_textarea = document.createElement("TEXTAREA");
  lab_textarea.classList.add("mdl-textfield__input");
  lab_textarea.classList.add("mdl-shadow--2dp");
  lab_textarea.classList.add("lab");
  if(json.lab){
    lab_textarea.value = json.lab;
  }
  lab_div.appendChild(lab_head);
  lab_div.appendChild(lab_textarea);

  var patient_chart_div = document.createElement("DIV");
  patient_chart_div.classList.add("mdl-card");
  patient_chart_div.classList.add("patient_chart");
  patient_chart_div.classList.add("mdl-shadow--3dp");
  patient_chart_div.classList.add("shrinked");
  patient_chart_div.appendChild(save_button_div);
  patient_chart_div.appendChild(delete_button_div);
  patient_chart_div.appendChild(lab_div);
  patient_chart_div.appendChild(chart_title_div);
  patient_chart_div.appendChild(medical_textArea);
  patient_chart_div.appendChild(prescription_title);
  patient_chart_div.appendChild(prescription_textArea);

  var li = document.createElement("LI");
  li.dataset.cid = json.cid;
  li.appendChild(patient_chart_div);
  //console.log(li);

  var ul = document.querySelector("ul.chart_list");
  ul.insertBefore(li, ul.firstChild);
}

var loadAllChart = function(){
  var ul = document.querySelector("ul.chart_list");
  if(!ul) return;
  var pid = document.querySelector("div.patient_info").dataset.pid;
  pListAjax.loadAllChart(pid, makeAllchart);
};

var makeAllchart = function(json){
  for(key in json){
    //console.log(json[key]);
    makePatientChart(json[key]);
  }
};

document.addEventListener("click", clickCallback);
document.addEventListener("DOMContentLoaded", function(e){
  pListAjax.reload(makePatientList);
  loadAllChart();
});
