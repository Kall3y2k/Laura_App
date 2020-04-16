//  Declare SQL Query for SQLite
 
var createStatement = "CREATE TABLE IF NOT EXISTS Freunde (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, avatar TEXT, mobile TEXT)";
var selectAllStatement = "SELECT * FROM Freunde ORDER BY id DESC";
var insertStatement = "INSERT INTO Freunde (name, avatar, mobile) VALUES (?,?,?)";
var updateStatement = "UPDATE Freunde SET title = ?, description = ? WHERE id=?";
var deleteStatement = "DELETE FROM Freunde WHERE id=?";
var dropStatement = "DROP TABLE Freunde";
 
var db = openDatabase("LauraApp", "1.0", "LauraApp", 200000);  // Open SQLite Database
 
var dataset;
 
var DataType;
 
function initDatabase()  // Function Call When Page is ready.

{
 
    try {
 
        if (!window.openDatabase)  // Check browser is supported SQLite or not.
 
        {
 
            alert('Databases are not supported in this browser.');
 
        }
 
        else {
 
            createTable();  // If supported then call Function for create table in SQLite
            
        }
 
    }
 
    catch (e) {
 
        if (e == 2) {
 
            // Version number mismatch. 
 
            console.log("Invalid database version.");
 
        } else {
 
            console.log("Unknown error " + e + ".");
 
        }
 
        return;
 
    }
 
}
 
function createTable()  // Function for Create Table in SQLite.
 
{
 
    db.transaction(function (tx) { tx.executeSql(createStatement, [], showRecords, onError); });
 
}
 
function insertRecord() // Get value from Input and insert record . Function Call when Save/Submit Button Click..
 
{ 
 
         var friendnametemp = document.getElementById('friend-name').value;
         var friendavatartemp = document.getElementById('friend-avatar').value;
         var friendmobiletemp = document.getElementById('friend-mobile').value;

         db.transaction(function (tx) { tx.executeSql(insertStatement, [friendnametemp, friendavatartemp, friendmobiletemp], loadAndReset, onError); });
 
        //tx.executeSql(SQL Query Statement,[ Parameters ] , Sucess Result Handler Function, Error Result Handler Function );
}
 
function deleteRecord(id) // Get id of record . Function Call when Delete Button Click..
 
{
 
    var iddelete = id.toString();
 
    db.transaction(function (tx) { tx.executeSql(deleteStatement, [id], showRecords, onError); alert("Delete Sucessfully"); });
 
    resetForm();
 
}
 
function updateRecord() // Get id of record . Function Call when Delete Button Click..
 
{
 
    var usernameupdate = $('input:text[id=username]').val().toString();
 
    var useremailupdate = $('input:text[id=useremail]').val().toString();
 
    var useridupdate = $("#id").val();
 
    db.transaction(function (tx) { tx.executeSql(updateStatement, [usernameupdate, useremailupdate, Number(useridupdate)], loadAndReset, onError); });
 
}
 
function dropTable() // Function Call when Drop Button Click.. Talbe will be dropped from database.
 
{
 
    db.transaction(function (tx) { tx.executeSql(dropStatement, [], showRecords, onError); });
 
    resetForm();
 
    initDatabase();
 
}
 
function loadRecord(i) // Function for display records which are retrived from database.
 
{
 
    var item = dataset.item(i);
 
    $("#title").val((item['title']).toString());
 
    $("#description").val((item['description']).toString());
 
    $("#id").val((item['id']).toString());

}
 
function resetForm() // Function for reset form input values.
 
{
 
    $('.restore.example .ui.dropdown')
      .dropdown('restore defaults')
    ;
 
}
 
function loadAndReset() //Function for Load and Reset...
 
{
 
    resetForm();
 
    showRecords()

    window.open('ListFriend.html','_self');
 
}

function cancel() //Function for Cancel
 
{
 
    window.open('ListFriend.html','_self');

}
 
function onError(tx, error) // Function for Hendeling Error...
 
{
 
    alert(error.message);
 
}
 
function showRecords() // Function For Retrive data from Database Display records as list
 
{
 
    $("#topNavBar").html('<div class="ui grey top attached inverted menu"><a class="item" href="NewFriend.html"><i class="bars icon"></i></a><a class="item">Freunde</a><a class="right item"><i class="cloud download icon"></i></a></div>');
    $("#results").html('')
 
    db.transaction(function (tx) {
 
        tx.executeSql(selectAllStatement, [], function (tx, result) {
 
            dataset = result.rows;
 
            for (var i = 0, item = null; i < dataset.length; i++) {
 
                item = dataset.item(i);
 
                var linkeditdelete = '<li class="mdc-list-item"><img class="mdc-list-item__graphic" src="' + item['avatar'] + '"><span class="mdc-list-item__text"><span class="mdc-list-item__primary-text">' + item['name'] + '</span><span class="mdc-list-item__secondary-text">' + item['mobile'] + '</span></span><button class="mdc-list-item__meta mdc-icon-button material-icons" onclick="deleteRecord(' + item['id'] + ');">more_vert</button></li><li role="separator" class="mdc-list-divider"></li>';

                $("#results").append(linkeditdelete);
 
            }
 
        });
 
    });
 
}

$(document).ready(function () // Call function when page is ready for load..
 
{
;
 
    $("body").fadeIn(2000); // Fede In Effect when Page Load..
 
    initDatabase();
 
    $("#submitButton").click(insertRecord);  // Register Event Listener when button click.

    $("#cancelButton").click(cancel);
 
    $("#btnUpdate").click(updateRecord);
 
    $("#btnReset").click(resetForm);
 
    $("#btnDrop").click(dropTable);
 
});


