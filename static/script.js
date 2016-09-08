
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

  if(checkPhExButton(e.target)){
    return;
  }

  if(checkPhexClose(e.target)){
    return;
  }
}

var checkPhexClose = function(target){
  if(target.id == "phEx_dialog_close"){
    var dialog = document.querySelector('dialog');
    dialog.close();
    return true;
  }
  return false;
}

var checkPhExButton = function(target){
  if(target.id == "pEx_button"){
    var dialog = document.querySelector('dialog');
    if (! dialog.showModal) {
      dialogPolyfill.registerDialog(dialog);
    }
    dialog.showModal();
    return true;
  }
  else
    return false;
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
    console.log();
    if(medical_ass + prescription + lab_content){
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
    console.log("pid:"+ pid);
    console.log("cid"+ cid);
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
  var innertext =
`
    <div class='mdl-card mdl-shadow--3dp patient_chart shrinked'>
    <div class='save_button_div'>
      <button id='chart_save_button' class='mdl-button mdl-button--raised'>저장</button>
    </div>
    <div class='delete_button_div'>
      <button id='chart_delete_button' class='mdl-button mdl-button--raised'>삭제</button>
    </div>
    <div class='pEx_div'>
      <button id='pEx_button' class='mdl-button mdl-button--raised'>P/Ex</button>
    </div>
    <div class='lab_div'>
      <h4>Lab</h4>
      <textarea name='lab' class='mdl-textfield__input mdl-shadow--2dp lab'>
      `+ (json.lab ? json.lab : "") +`</textarea>
    </div>
    <div class='chart_title'>
      <h4>Medical Assessment<span>`+ json.createTime+`</span>
      <button id='expandButton' class='mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect'>
        <i id='cid` + json.cid + `' class='material-icons'>v</i>
      </button>
      </h4>
    </div>
    <textarea name='medical_assessment' class='mdl-textfield__input mdl-shadow--2dp assessment'>
    `+ (json.medical_chart ? json.medical_chart : "") +`</textarea>
      <h4>Prescription</h4>
    <textarea name='prescription' class='mdl-textfield__input mdl-shadow--2dp prescription'>
    `+ (json.prescription ? json.prescription : "") +`</textarea>
    </div>
    <dialog class="mdl-dialog phEx_dialog">
      <button type="button" id="phEx_dialog_close" class="mdl-button">닫기</button>
    </dialog>
`
  var li = document.createElement("LI");
  li.dataset.cid = json.cid;
  li.innerHTML = innertext;
  //li.appendChild(patient_chart_div);
  //console.log(li);

  var ul = document.querySelector("ul.chart_list");
  ul.insertBefore(li, ul.firstChild);

  var svg = d3.select("dialog").insert("svg",":first-child");
  var g = svg.append("g");

  var img = g.append("svg:image")
      .attr("xlink:href", "/static/body_image.jpg")
      .attr("width", 600)
      .attr("height", 400);
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
