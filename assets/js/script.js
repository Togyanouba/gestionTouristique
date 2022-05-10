var video = document.getElementById("background-video");

var btn = document.getElementById("btnVideo");

function playAndPause () {

if (video.paused) {

video.play();

btn.innerHTML = "Pause II";

} else {

video.pause();

btn.innerHTML = "Play ▶";

}

}

var titre=document.getElementById("titre");
 console.log(titre);
 console.log(titre.style);
 titre.style.color="yellow";
// titre.style.backgroundColor=prompt("Veuillez entrer une coleur d'arrière plan de votre choix, en anglais");
 console.log(titre.style);

var selectedRow = null;

function onFormSubmit(){
    console.log(formData);
    if(validate1() && validate2() && validate3()){
        var formData = readFormData();
        console.log(formData);
        if(selectedRow == null){
            insertNewRecord(formData);
        }else{
            updateRecord(formData);
        }
        
        resetForm();
    }
}

function readFormData(){

    var formData = {};
    formData["nom"] = document.getElementById("nom").value;
    formData["code"] = document.getElementById("code").value;
    formData["prenom"] = document.getElementById("prenom").value;
    formData["email"] = document.getElementById("email").value;
    formData["password"] = document.getElementById("password").value;

    return formData;
}

function insertNewRecord(data){
    var table = document.getElementById("emplist").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);

    cell2 = newRow.insertCell(0);
    cell2.innerHTML = data.code;

    cell1 = newRow.insertCell(1);
    cell1.innerHTML = data.nom;

    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.prenom;

    cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.email;

    cell4 = newRow.insertCell(4);
    cell4.innerHTML = data.password;


    cell4 = newRow.insertCell(5);
    cell4.innerHTML = `<a onClick="onEdit(this)">Edit</a>
                        <a  onClick="onDelete(this)">Delete</a>`;
}

function resetForm(){
    document.getElementById('code').value = '';
    document.getElementById('nom').value = '';
    document.getElementById('prenom').value = '';
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';
    selectedRow = null;
}

function onEdit(td){
    selectedRow = td.parentElement.parentElement;
    document.getElementById('code').value = selectedRow.cells[0].innerHTML;
    document.getElementById('nom').value = selectedRow.cells[1].innerHTML;
    document.getElementById('prenom').value = selectedRow.cells[2].innerHTML;
    document.getElementById('email').value = selectedRow.cells[3].innerHTML;
    document.getElementById('password').value = selectedRow.cells[4].innerHTML;
}

function updateRecord(formData){

    selectedRow.cells[0].innerHTML = formData.code;
    selectedRow.cells[1].innerHTML = formData.nom;
    selectedRow.cells[2].innerHTML = formData.prenom;
    selectedRow.cells[3].innerHTML = formData.email;
    selectedRow.cells[4].innerHTML = formData.password;

}

function onDelete(td){
    if(confirm('Voulez-vous vraiment supprimer?')){
        row = td.parentElement.parentElement;
        document.getElementById("emplist").deleteRow(row.rowIndex);
        resetForm();
    }
    
}

function validate1(){
    isValid = true;
    if(document.getElementById('nom').value == "" ){
        isValid = false;
        document.getElementById('nomValidationError').classList.remove("hide");
    }else{
        isValid = true;
        if(!document.getElementById('nomValidationError').classList.remove("hide")){
            document.getElementById('nomValidationError').classList.add("hide");
        }
    }
    if(document.getElementById('prenom').value == "" ){
        isValid = false;
        document.getElementById('prenomValidationError').classList.remove("hide");
    }else{
        isValid = true;
        if(!document.getElementById('prenomValidationError').classList.remove("hide")){
            document.getElementById('prenomValidationError').classList.add("hide");
        }
    }
    if(document.getElementById('password').value == "" ){
        isValid = false;
        document.getElementById('passwordValidationError').classList.remove("hide");
    }else{
        isValid = true;
        if(!document.getElementById('passwordValidationError').classList.remove("hide")){
            document.getElementById('passwordValidationError').classList.add("hide");
        }
    }

    return isValid;
}
function validate2(){
    isValid = true;
    if(document.getElementById('prenom').value == "" ){
        isValid = false;
        document.getElementById('prenomValidationError').classList.remove("hide");
    }else{
        isValid = true;
        if(!document.getElementById('prenomValidationError').classList.remove("hide")){
            document.getElementById('prenomValidationError').classList.add("hide");
        }
    }

    return isValid;
}
function validate3(){
    isValid = true;
    if(document.getElementById('password').value == "" ){
        isValid = false;
        document.getElementById('passwordValidationError').classList.remove("hide");
    }else{
        isValid = true;
        if(!document.getElementById('passwordValidationError').classList.remove("hide")){
            document.getElementById('passwordValidationError').classList.add("hide");
        }
    }

    return isValid;
}
