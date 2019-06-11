
var name = "Sergio";
var todoList = [];
var serverURL = 'http://restclass.azurewebsites.net';

function init(){
    
    var lbl = document.getElementById("lblTodo");
    lbl.innerText = "Get it done!";

    

    var btn = document.getElementById("btnSave");
  

   btn.onclick = saveTodo;
};

function init2(){

    var lbl = $("#lblTodo");
    lbl.innerText = "jQuery rules??";

    $("#btnSave").click(saveTodo);

    getDataFromServer();

};


function saveTodo(){
    var txt = $("#txtTodo");
    var todoText = txt.val();
    console.log(todoText);

    if(todoText.length < 1) {
        txt.addClass('error');

        alert("You entry was blank please try again!");
        console.log("Nothing was stored.");

    } else{
    
    txt.removeClass('error');
    todoList.push(todoText);
    txt.val('');
    

    sendToServer(todoText);

    };
    
};

function sendToServer(text){
    
    var todoItem = {
        text: text,
        user: "Paul",
        status: 0
    };

    $.ajax({
        url: serverURL + "/API/points",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(todoItem),

        success: function(res){
            console.log("server says: ", res);
            todoList.push(res);
            displayTodo(res.text, res.id);
        },
        error: function(error){
            console.error("*Error:", error);
        }
    });
    
}



function getDataFromServer(){

$.ajax({
    url: serverURL + "/API/points",
    type: "GET",
    success: function(res){
      console.log("Server Response", res);  

      for (var i=0; i < res.length; i++){
        var item = res[i];

        if (item.user == "Paul"){
            todoList.push(item);
            displayTodo(item.text, item.id);
            }
        }
    },

    error: function(error){
        console.log("Error!",error);
    }
});
}

function displayTodo(simpleText, id) {

var ul = $("#todoList");

var li = "<li id='"+ id +"' class='list-group-item'>"  + simpleText + "<button class='btn-danger btn-sm btn-info pull-right btn-done' onclick=markDone("+ id +");> Done! </button></li>"

ul.append(li);

};

function displayDone(simpleText, id) {

    var ul = $("#doneList");
    
    var li = "<li class='list-group-item done-item'>"  + simpleText +  "</li>"
    
    ul.append(li);
    
    };



function markDone(id){
    console.log("done:", id);
    var theItem;
    for(var i=0; i < todoList.length; i++){
        if(todoList[i].id == id){
            theItem = todoList[i];
            break;
        }
    }

    theItem.status = 1;

    displayDone(theItem.text, theItem.id);

    $.ajax({
        url:serverURL + "/API/points",
        type:"PUT",
        data: JSON.stringify(theItem),
        contentType: "application/json",
        success: function(res){
            console.log("Server says: ", res);

        },
        error: function(error){
            console.error("*Error", error);
        }
    });
}

window.onload = init2;
