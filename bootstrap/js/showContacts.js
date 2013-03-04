// Populate list of Users from Diaspora Json
// By Ryan McIntyre



	$.ajaxSetup({
		async: false
	});
	var store = "";

var ArrayOfContacts = JSON.parse(localStorage.StoredArrayContacts);
for (var i = 0; i < ArrayOfContacts.length; i++) {
	store +="<div class=\"accordion-group\"><div class=\"accordion-heading\"><a class=\"accordion-toggle\" data-toggle=\"collapse\" data-parent=\"#accordion2\" href=\"#" + i + "\">";
		store += ArrayOfContacts[i]["ContactName"] + "</a></div>";
		store += "<div id=" + "\"" + i + "\"" + " class=\"accordion-body collapse\"><div class=\"accordion-inner\">";
		store += "<form><fieldset><a class=\"btn pull-right\" id=\"" + ArrayOfContacts[i]["ContactAddress"] + "\">Message</a><br />Groups:";
			for(var index in ArrayOfContacts[i]) {
				if(index != "ContactName" && index != "ContactAddress"){
			  	store += "<div class=\"alert alert-success\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\">&times;</button>";
			  	store += index;
			  	store += "</div>"
		  		}
			}
		store += "Add to Group: <input type=\"text\" class=\"span9\"></fieldset></form><a class=\"btn btn-danger\">Delete Contact</a>";
	store += "</div></div></div>";

/*
	for(var index in ArrayOfContacts[i]) {
		if(index != "ContactName" && index != "ContactAddress"){
	  	console.log( index + " : " + ArrayOfContacts[i][index] + "<br />");
  		}
	}
*/

}
document.getElementById('table1').innerHTML = store;

// <script src="getContactsV2.js"></script>