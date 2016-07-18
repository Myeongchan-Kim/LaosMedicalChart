
var togglePatientList = function(e){
  if(e.target.id == "button_loadPatientList")
  {
    var patient_list = document.getElementsByClassName("patient_list")[0];
    patient_list.classList.toggle("width100");
  }
}

document.addEventListener("click", togglePatientList);
