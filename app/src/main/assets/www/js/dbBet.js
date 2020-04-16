//  Declare SQL Query for SQLite
 
var createStatement = "CREATE TABLE IF NOT EXISTS Wetten (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, description TEXT, profriendid INTEGER, confriendid INTEGER, commitment TEXT, prosignature TEXT, consignature TEXT, status TEXT, created TEXT)";
var selectAllBets = "SELECT w.*, p.name AS pro_name, c.name AS con_name, p.avatar AS pro_avatar, c.avatar AS con_avatar FROM Wetten w JOIN Freunde p ON w.profriendid = p.id JOIN Freunde c ON w.confriendid = c.id ORDER BY id DESC";
var selectAllFriends = "SELECT * FROM Freunde ORDER BY id DESC";
var selectOneBet = "SELECT w.*, p.name AS pro_name, c.name AS con_name, p.avatar AS pro_avatar, c.avatar AS con_avatar FROM Wetten w JOIN Freunde p ON w.profriendid = p.id JOIN Freunde c ON w.confriendid = c.id WHERE w.id=?";
var insertStatement = "INSERT INTO Wetten (title,description,profriendid,confriendid,commitment,prosignature,consignature,status,created) VALUES (?,?,?,?,?,?,?,?,?)";
var updateStatement = "UPDATE Wetten SET title = ?, description = ? WHERE id=?";
var deleteStatement = "DELETE FROM Wetten WHERE id=?";
var dropStatement = "DROP TABLE Wetten";
 
var db = openDatabase("LauraApp", "1.0", "LauraApp", 200000);  // Open SQLite Database

var datasetBet; 
var datasetBetlist;
var datasetFriendlist;
 
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
    showFriends();
 
}
 
function insertRecord() // Get value from Input and insert record . Function Call when Save/Submit Button Click..
 
{
 
        var titletemp = $('input:text[id=bet-title]').val();
        var descriptiontemp = document.getElementById('bet-description').value;
        var profriendtemp = Number(document.getElementById('bet-profriend').value);
        var confriendtemp = Number(document.getElementById('bet-confriend').value);
        var commitmenttemp = document.getElementById('bet-commitment').value;
        var statustemp = "Offen";

		var $sigdivpro = $("#signaturePro");
		var signatureprotemp = $sigdivpro.jSignature("getData", "svgbase64");

        var $sigdivcon = $("#signatureCon");
		var signaturecontemp = $sigdivcon.jSignature("getData", "svgbase64");

        var d = new Date();
        var month = d.getMonth()+1;
        var day = d.getDate();
        var hours = d.getHours()
        var minutes = d.getMinutes()
        var createdtemp = ((''+day).length<2 ? '0' : '') + day + '.' + ((''+month).length<3 ? '0' : '') + month + '.' + d.getFullYear() + ' - ' + ((''+hours).length<2 ? '0' : '') + hours + ":" + ((''+minutes).length<2 ? '0' : '') + minutes;

        db.transaction(function (tx) { tx.executeSql(insertStatement, [titletemp, descriptiontemp, profriendtemp, confriendtemp, commitmenttemp, signatureprotemp, signaturecontemp, statustemp, createdtemp], loadAndReset(), onError); });
             
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
 
function loadBetRecord(id) // Function for display records which are retrived from database.
 
{

    $("#topNavBar").html('<header class="mdc-top-app-bar mdc-top-app-bar--fixed"><div class="mdc-top-app-bar__row"><section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start"><a href="ListBet.html"><button class="material-icons mdc-top-app-bar__navigation-icon mdc-icon-button" aria-label="Open navigation menu">keyboard_arrow_left</button></a><span class="mdc-top-app-bar__title">Details</span></section><section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-end" role="toolbar"><button class="material-icons mdc-top-app-bar__action-item mdc-icon-button" aria-label="Share" id="saveImage">share</button></section></div></header>');
 
    db.transaction(function (tx) {
 
        tx.executeSql(selectOneBet, [id], function (tx, result) {
 
            datasetBet = result.rows;
 
               var i = 0;

               item = datasetBet.item(i);

               var Bet = '<h4 class="ui header">' + item['title'] + '</h4><div class="ui label">Status: ' + item['status'] + '</div><br><br><a class="ui basic image label"><img src="' + item['pro_avatar'] + '">' + item['pro_name'] + '</a> vs. <a class="ui basic image label"><img src="' + item['con_avatar'] + '">' + item['con_name'] + '</i></a><div class="ui divider"></div><h4 class="ui header">Behauptung</h4>' + item['description'] + '<br><br><a class="ui green label"><i class="check icon"></i>Wahr </a><a class="ui basic image label"><img src="' + item['pro_avatar'] + '">' + item['pro_name'] + '</a><br><br><a class="ui red label"><i class="times icon"></i>Falsch </a><a class="ui basic image label"><img src="' + item['con_avatar'] + '">' + item['con_name'] + '</i></a><div class="ui divider"></div><h4 class="ui header">Wetteinsatz</h4>' + item['commitment'] + '<br><div class="ui divider"></div><h4 class="ui header">Unterschrift ' + item['pro_name'] + '</h4><img src="data:' + item['prosignature'] + '"/><div class="ui divider"></div><h4 class="ui header">Unterschrift ' + item['con_name'] + '</h4><img src="data:' + item['consignature'] + '"/>';

               $("#showBets").html('</i></a><div class="ui top right attached label">' + item['created'] + '</div>')

               $("#showBets").append(Bet);
 
               $("#footerScript").html('<script>$("#saveImage").click(function(e) {html2canvas(document.querySelector("#mainsegement")).then(canvas => {saveImage(canvas.toDataURL(), \'chart.png\');});});function saveImage(uri, filename) {var link = document.createElement(\'a\');  if (typeof link.download === \'string\') {link.href = uri;link.download = filename;document.body.appendChild(link);link.click();document.body.removeChild(link);} else {window.open(uri);}}</script>');

            });
 
        });

}
 
function resetForm() // Function for reset form input values.
 
{
 
    $("#username").val("");
 
    $("#useremail").val("");
 
    $("#id").val("");
 
}
 
function loadAndReset() //Function for Load and Reset...
 
{
 
    resetForm();
 
    showRecords();

    showFriends();
 
    window.open('ListBet.html','_self');

}

function cancel() //Function for Cancel
 
{
 
    window.open('ListBet.html','_self');

}
 
function onError(tx, error) // Function for Hendeling Error...
 
{
 
    alert(error.message);
 
}
 
function showRecords() // Function For Retrive data from Database Display records as list
 
{
 
    $("#topNavBar").html('<header class="mdc-top-app-bar mdc-top-app-bar--fixed"><div class="mdc-top-app-bar__row"><section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start"><a href="NewBet.html"><button class="material-icons mdc-top-app-bar__navigation-icon mdc-icon-button" aria-label="Open navigation menu">add</button></a><span class="mdc-top-app-bar__title">Wetten</span></section><section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-end" role="toolbar"></section></div></header>');
    $("#showBets").html('');
 
    db.transaction(function (tx) {
 
        tx.executeSql(selectAllBets, [], function (tx, result) {
 
            datasetBetlist = result.rows;
 
            for (var i = 0, item = null; i < datasetBetlist.length; i++) {
 
                item = datasetBetlist.item(i);
 
                var Betlist= '<div class="ui centered card"> <div class="content"> <a class="ui blue right corner label"></a> <div class="header">' + item['title'] + '</div> <div class="description">' + item['description'] + '</br></br></div><div class="center aligned content"> <a class="ui basic image label"><img src="' + item['pro_avatar'] + '">' + item['pro_name'] + '</a> vs. <a class="ui basic image label"><img src="' + item['con_avatar'] + '">' + item['con_name'] + '</i></a> </div> </div> <div class="extra content"> <span class="right floated"> <b>Status: </b>' + item['status'] + '</span><span>' +  item['created'] + '</span></div><a href="#" onclick="loadBetRecord(' + item['id'] + ');"><div class="ui bottom attached button"><i class="eye icon"></i> Details anzeigen</div></a></div>';

                $("#showBets").append(Betlist);
 
            }
 
        });
 
    });
 
}

function showFriends() // Function For Retrive data from Database Display records as list
 
{
 
    $("#showFriendsPro").html('')
 
    db.transaction(function (tx) {
 
        tx.executeSql(selectAllFriends, [], function (tx, result) {
 
            datasetFriendlist = result.rows;
 
            for (var i = 0, item = null; i < datasetFriendlist.length; i++) {
 
                item = datasetFriendlist.item(i);
 
                var Friendlist = '<div class="item" data-value="' + item['id']  + '"><img src="' + item['avatar'] + '" class="ui mini rounded image">' + item['name'] + '</div>';

                $("#showFriendsPro").append(Friendlist);
 
            }
 
        });
 
    });

    
    $("#showFriendsCon").html('')
 
    db.transaction(function (tx) {
 
        tx.executeSql(selectAllFriends, [], function (tx, result) {
 
            datasetFriendlist = result.rows;
 
            for (var i = 0, item = null; i < datasetFriendlist.length; i++) {
 
                item = datasetFriendlist.item(i);
 
                var Friendlist = '<div class="item" data-value="' + item['id']  + '"><img src="' + item['avatar'] + '" class="ui mini rounded image">' + item['name'] + '</div>';

                $("#showFriendsCon").append(Friendlist);
 
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


// '<tr>' + '<td>' + item['id'] + '</td>' + '<td>' + item['title'] + '</td>' + '<td>' + item['description'] + '</td>' + '<td>' + item['created'] + '</td>' + '<td>' + '<a href="#" onclick="loadRecord(' + i + ');">�ndern</a>' + ' || ' + '<a href="#" onclick="deleteRecord(' + item['id'] + ');">L�schen</a></td></tr>';