// Builds a Contact Database + their Groups
// By Ryan McIntyre


var ArrayContact = [];
var i = 0;
var myRex = /class='info'>\n(.*)\n<\/div>/g;


$.ajaxSetup({
	async: false
	});
$.getJSON("https://pod.cscf.me/contacts.json", function(json) {
	$.each(json, function(arrayID,Person) {
		ArrayContact[i] = {};
		ArrayContact[i]["ContactName"] = Person.name;
		ArrayContact[i]["ContactAddress"] = Person.handle;
		ArrayContact[i]["ContactID"] = Person.id;
		console.log("Here 1: " + ArrayContact[i]["ContactName"]);
		i += 1;

        });
         console.log("HERE 2");
         console.log(ArrayContact[1]["ContactName"]);
         localStorage['StoredArrayContacts']=JSON.stringify(ArrayContact);
});

var ArrayOfGroups = JSON.parse(localStorage.StoredArrayGroups); //How To Retrieve Groups
console.log("Here 3: The Group is: " + ArrayOfGroups[1]["GroupName"]);


//The following code:
// For Each Group [excluding the 'all' group]
// Get the Contacts on that Group's page [URL]
	// For Each Person in our array
		// If ArrayContact.Pod == FoundContact.Pod [handle]
			// Set *Groupname* == True ..


for (var i = 1; i < ArrayOfGroups.length; i++) {
	console.log("Here 4: Looks for: " + ArrayOfGroups[i]["GroupURL"]);
		 $.ajax({
		        async: false,
		        type: 'GET',
		        url: 'https://pod.cscf.me'+ArrayOfGroups[i]["GroupURL"],
                success: function(data) {
	console.log("Here 5: Found the URL : " + ArrayOfGroups[i]["GroupURL"]);
			while ((matches = myRex.exec(data)) !== null)
			{
				console.log("Here 6: On this Page I have Found: " + matches[1]);
			for (var j = 0; j < ArrayContact.length; j++){
				console.log("Here 7: Comparing On Page: " + matches[1] + " With Database: " + ArrayContact[j]["ContactAddress"]);
				if(matches[1] == ArrayContact[j]["ContactAddress"]){
					console.log("Here 8: ");
					var Test = ArrayOfGroups[i]["GroupName"];
					ArrayContact[j][ArrayOfGroups[i]["GroupName"]] = "True";
					console.log(ArrayContact[j]["ContactName"] + "= true in: " + ArrayOfGroups[i]["GroupName"]);
					break;
				}
			}
		}
		}
	});
}

localStorage['StoredArrayContacts']=JSON.stringify(ArrayContact);

