var ArrayContact = [];
var i = 0;


$.getJSON("https://pod.cscf.me/contacts.json", function(json) {
	$.each(json, function(arrayID,Contact) {

		ArrayContact[i] = {};
		ArrayContact[i]["ContactName"] = Contact.name;
		ArrayContact[i]["ContactAddress"] = Contact.handle;
		i += 1;

        });
});

var Groups = JSON.parse(localStorage.StoredArrayGroups); //How To Retrieve Groups

console.log("Here");


for (var i = 1; i < Groups.length; i++) {
	$.getJSON("https://pod.cscf.me" + Groups[i]["GroupURL"], function(json) {
		$.each(json, function(arrayID,Contact) {
			for (var j = 0; j < ArrayContact.length; j++){
				if(Contacts.handle == ArrayContact[j]["ContactAddress"]){
					ArrayContact[j][(Groups[i]["GroupName"])] = "True";
					console.log(ArrayContact[j]["ContactName"] + "is true on" + ArrayContact[j][(Groups[i]["GroupName"])]);
					break;
				}
			}
		});
	});
}

localStorage['StoredArrayContacts']=JSON.stringify(ArrayContact);