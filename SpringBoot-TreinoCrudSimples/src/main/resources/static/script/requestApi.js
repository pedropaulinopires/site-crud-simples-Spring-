//function save
document.getElementById("iname").addEventListener("input", function () {
  let name = $("#iname").val();
  if ((name == null) | (name.trim() == "")) {
    $("#iname").addClass("error");
    $("#iname").focus();
    $(".errorCamp").addClass("activeError");
    $("#successSave").removeClass("showAlert");
  } else {
    //submit
    $("#iname").removeClass("error");
    $(".errorCamp").removeClass("activeError");
  }
});

function submitSave() {
  let name = $("#iname").val();
  if ((name == null) | (name.trim() == "")) {
    $("#iname").addClass("error");
    $("#iname").focus();
    $(".errorCamp").addClass("activeError");
    $("#successSave").removeClass("showAlert");
  } else {
    //submit
    $("#iname").removeClass("error");
    $(".errorCamp").removeClass("activeError");
    //ajax save
    $.ajax({
      method: "POST",
      url: "http://localhost:8080/peoples",
      data: JSON.stringify({ name: name }),
      contentType: "application/json; charset=utf-8",
      success: function (response) {
        //show alert
        $("#successSave").addClass("showAlert");
        $("#successDelete").removeClass("showAlert");
        $("#successEdit").removeClass("showAlert");
        //hide alert
        setTimeout(function () {
          $("#successSave").removeClass("showAlert");
        }, 3000);
        $("#iname").val("");
      },
    }).fail(function (xhr, status, errprThrown) {
      alert("Error save person: " + xhr.responseText);
    });
  }
}

//function list all

function listAll() {
  //ajax request get list all
  $.ajax({
    method: "GET",
    url: "http://localhost:8080/peoples",
    contentType: "application/json; charset=utf-8",
    success: function (response) {
      //clean table
      $("#tableListAll > tbody > tr ").remove();

      if (response == 0) {
        $("#alertNull").addClass("showAlert");
        $("#tableListAll").hide();
      } else {
        for (var i = 0; i < response.length; i++) {
          $("#alertNull").removeClass("showAlert");
          $("#tableListAll").show();
          //add in table
          $("#tableListAll > tbody").append(
            "<tr><td>" +
              response[i].id +
              "</td><td >" +
              response[i].name +
              '</td><td ><button type="button" class="btn btn-primary"  data-bs-toggle="modal" data-bs-target="#editModal" onclick="editVar(\'' +
              response[i].id +
              "','" +
              response[i].name +
              '\')">Editar</button><button type="button" class="btn btn-danger"  onclick="deleteVar(\'' +
              response[i].id +
              '\')" data-bs-toggle="modal" data-bs-target="#deleteContatoModal" >Excluir</button></td></tr>'
          );
        }
      }
      //populate table
    },
  }).fail(function (xhr, status, errprThrown) {
    alert("Error list All: " + xhr.responseText);
  });
}

//var armazenation id user edit
let idPerson = null;
let namePerson = null;
function deleteVar(id) {
  idPerson = id;
}

function editVar(id, name) {
  idPerson = id;
  namePerson = name;
  $("#inameEdit").val(namePerson);

  document.getElementById("inameEdit").addEventListener("input", function () {
    let name = $("#inameEdit").val();
    if ((name == null) | (name.trim() == "")) {
      $("#inameEdit").addClass("error");
      $(".errorCampEdit").addClass("activeError");
      $("#successDelete").removeClass("showAlert");
      $("#successEdit").removeClass("showAlert");
      document.getElementById("btnEdit").disabled = true;
    } else {
      document.getElementById("btnEdit").disabled = false;
      $("#successEdit").removeClass("showAlert");
      $(".errorCampEdit").removeClass("activeError");
      $("#inameEdit").removeClass("error");
    }
  });
}
//delete person
function deletePerson() {
  $.ajax({
    method: "DELETE",
    url: "http://localhost:8080/peoples/" + idPerson,
    contentType: "application/json; charset=utf-8",
    success: function (response) {
      idEdit = null;
      $("#successDelete").addClass("showAlert");
      $("#successSave").removeClass("showAlert");
      $("#successEdit").removeClass("showAlert");
      setTimeout(function () {
        $("#successDelete").removeClass("showAlert");
      }, 3000);
    },
  }).fail(function (xhr, status, errprThrown) {
    alert("Error delete person: " + xhr.responseText);
  });
}

//edit person
function editPerson() {
  let name = $("#inameEdit").val();
  $.ajax({
    method: "PUT",
    url: "http://localhost:8080/peoples",
    data: JSON.stringify({ id: idPerson, name: name }),
    contentType: "application/json; charset=utf-8",
    success: function (response) {
      //show alert
      $("#successDelete").removeClass("showAlert");
      $("#successSave").removeClass("showAlert");
      $("#successEdit").addClass("showAlert");
      //hide alert
      setTimeout(function () {
        $("#successEdit").removeClass("showAlert");
      }, 3000);
      $("#iname").val("");
    },
  }).fail(function (xhr, status, errprThrown) {
    alert("Error edit person: " + xhr.responseText);
  });
}

function openSearch(){  
  $("#searchNull").removeClass("showAlert");
  $("#tableSearch").hide();
  $("#inamesearch").val("");
  $("#alertNameSearch").addClass("showAlert");
  $(".errorCampSearch").removeClass("activeError");
  document.getElementById("btnSearch").disabled = true;
  document.getElementById("inamesearch").addEventListener("input",function(){
    let name = $("#inamesearch").val();
      if(name == null | name.trim() ==""){
        //close input
        $(".errorCampSearch").addClass("activeError");
        document.getElementById("btnSearch").disabled = true;
      } else {
        //open input
        $(".errorCampSearch").removeClass("activeError");
        document.getElementById("btnSearch").disabled = false;
      } 
  }) 

}

function executeSearch(){
  //execute search
  //get name
  let  name = $("#inamesearch").val().toLowerCase();
  $.ajax({
    method: "GET",
    url: "http://localhost:8080/peoples/findbyname",
    data:"name="+name,
    contentType: "application/json; charset=utf-8",
    success: function (response) {

      if(response == 0){
         //not found
         $("#alertNameSearch").removeClass("showAlert");
         $("#tableSearch").hide();
         $("#searchNull").addClass("showAlert");
      } else {
        $("#searchNull").removeClass("showAlert")
        $("#alertNameSearch").removeClass("showAlert");
        $("#tableSearch").show();
        $("#tableSearch > tbody > tr").remove();
        for( var i = 0; i < response.length; i++){
          $("#tableSearch > tbody").append(
            "<tr><td>" +
              response[i].id +
              "</td><td >" +
              response[i].name +
              '</td><td ><button type="button" class="btn btn-primary"  data-bs-toggle="modal" data-bs-target="#editModal" onclick="editVar(\'' +
              response[i].id +
              "','" +
              response[i].name +
              '\')">Editar</button><button type="button" class="btn btn-danger"  onclick="deleteVar(\'' +
              response[i].id +
              '\')" data-bs-toggle="modal" data-bs-target="#deleteContatoModal" >Excluir</button></td></tr>'
          );  
        }
      }
      

    },
  }).fail(function (xhr, status, errprThrown) {
    alert("Error serach person: " + xhr.responseText);
  });

}
