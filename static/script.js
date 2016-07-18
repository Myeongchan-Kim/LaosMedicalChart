
var pListAjax = {
  reload : function(callback){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/show/patient", true);
    xhr.addEventListener("load", function(){
      callback(JSON.parse(xhr.responseText));
    });
    xhr.send();
  },
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
  console.log(pObj);

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

var togglePatientList = function(e){
  if(e.target.id == "patientList_reloadButton"){
    pListAjax.reload(makePatientList);
  }
}

document.addEventListener("click", togglePatientList);
document.addEventListener("DOMContentLoaded", function(e){
  pListAjax.reload(makePatientList);
});
