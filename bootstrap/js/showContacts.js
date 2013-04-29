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
				if(index != "ContactName" && index != "ContactAddress" && index !="ContactID"){
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




$("#Add").click( function()
          {
            //alert('This Works');
            console.log("The Add Button has been clicked");

            var $form = $(this);
            var anMethod = "POST";
            var aspect = getAspectID();
            var person = getUserID();
            var utf = "%E2%9C%93";
			var token = getToken();
			var Ref = 'https://pod.cscf.me/contacts';


            var dataAddToAspect = new FormData();
            dataAddToAspect.append('utf8', utf);
            dataAddToAspect.append('Referer', Ref);
            dataAddToAspect.append('aspect_id', aspect);
            dataAddToAspect.append('person_id', person);
            dataAddToAspect.append('_method', anMethod);

            var request = $.ajax({
				url: 'https://pod.cscf.me/aspect_memberships.json',
				type: "post",
				beforeSend: function (xhr) {
				     xhr.setRequestHeader('X-CSRF-Token', token);
				},

				data: dataAddToAspect,

				processData: false,
				contentType: false,
				async: false,

			});
	window.location.reload();
});


$("#Delete").click( function()
          {
            //alert('This Works');
            console.log("The Delete Button has been clicked");

            var $form = $(this);
            var anMethod = "DELETE";
            var aspect = getAspectID();
            var person = getUserID();
            var utf = "%E2%9C%93";
			var token = getToken();
			var Ref = 'https://pod.cscf.me/contacts';


            var dataRemoveFromAspect = new FormData();
            dataRemoveFromAspect.append('utf8', utf);
            dataRemoveFromAspect.append('Referer', Ref);
            dataRemoveFromAspect.append('aspect_id', aspect);
            dataRemoveFromAspect.append('person_id', person);
            dataRemoveFromAspect.append('_method', anMethod);

            var request = $.ajax({
				url: 'https://pod.cscf.me/aspect_memberships/42.json',
				type: "post",
				beforeSend: function (xhr) {
				     xhr.setRequestHeader('X-CSRF-Token', token);
				},

				data: dataRemoveFromAspect,

				processData: false,
				contentType: false,
				async: false,

			});
	window.location.reload();
});




$("#Create").click( function()
          {
            //alert('This Works');
            console.log("The Create Button has been clicked");

            var $form = $(this);
            var commit = "Create";
            var aspect = document.getElementById('AspectName').value;
            var utf = "%E2%9C%93";
			var token = getToken();
			var Ref = 'https://pod.cscf.me/contacts';


            var dataCreateAspect = new FormData();
            dataCreateAspect.append('utf8', utf);
            dataCreateAspect.append('authenticity_token', token);
            dataCreateAspect.append('aspect[name]', aspect);
            dataCreateAspect.append('aspect[contacts_visible]', 0);
            dataCreateAspect.append('commit', commit);

            var request = $.ajax({
				url: 'https://pod.cscf.me/aspects',
				type: "post",

				data: dataCreateAspect,

				processData: false,
				contentType: false,
				async: false,

			});
	window.location.reload();
});



$("#Destory").click( function()
          {
            //alert('This Works');
            console.log("The Destory Button has been clicked");

            var $form = $(this);
            var AMethod = "delete";
            var aspect = getAspectID();
            var utf = "%E2%9C%93";
			var token = getToken();
			var Ref = 'https://pod.cscf.me/aspects/'+aspect;


            var dataDestoryAspect = new FormData();

            dataDestoryAspect.append('utf8', utf);
            dataDestoryAspect.append('_method', AMethod);
            dataDestoryAspect.append('authenticity_token', token);


            var request = $.ajax({
				url: Ref,
				type: "post",

				data: dataDestoryAspect,

				processData: false,
				contentType: false,
				async: false,

			});
	window.location.reload();
});











function getUserID()
{
	var UEmail = document.getElementById('UserEmail').value;

	console.log("I am Trying to Convert the Email ID of : " + UEmail);

	for (var i = 0; i < ArrayOfContacts.length; i++) {
		console.log("Looks for both: " + ArrayOfContacts[i]["ContactAddress"] + ArrayOfContacts[i]["ContactName"]);
		if(ArrayOfContacts[i]["ContactAddress"] == UEmail || ArrayOfContacts[i]["ContactName"] == UEmail)
		{
			var UserID = ArrayOfContacts[i]["ContactID"];
			console.log("Found :" + UserID);
			return(UserID);
		}
	}
	//alert('The Contact was not found - no Change will take place');
}

function getAspectID()
{
	var Aspect = document.getElementById('AspectName').value;
	var ArrayOfAspects = JSON.parse(localStorage.StoredArrayGroups);

	console.log("I am Trying to Convert the Aspect ID of: " + Aspect);

	for (var i = 1; i < ArrayOfAspects.length; i++) {
		console.log("Looks for: " + ArrayOfAspects[i]["GroupName"]);
		if(ArrayOfAspects[i]["GroupName"] == Aspect)
		{
			var AspectID = ArrayOfAspects[i]["GroupURL"];
			console.log("Found :" + AspectID)
			var Temp = AspectID.indexOf("=");
			AspectID = AspectID.substring(Temp+1, AspectID.length);
			return(AspectID);
		}
	}
	 //alert('The Aspect was not found - no Change will take place');
}

function getToken()
{
	$.ajax({
		async: false,
		type: 'GET',
		url: 'https://pod.cscf.me/conversations',
		success: function(data) {
			var matches = data.match(/<meta content="(.*)" name="csrf-token" \/>/); // regex to extract it,
			tok = matches[1];
			result = tok;
		}
	});
return result;
}

