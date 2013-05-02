// Builds a Group Database - stores in Local Storage and Displays to screen
// By Ryan McIntyre

	var progress = 0;

	var Group = '';
	var theHTML = '';
	theHTML = "<ul class=\"nav nav-tabs nav-stacked\"><li class=\"active\"><li>&nbspAspects</li>";
	var myRe = /class='aspect_selector' href='(.*)'/g;
	var matches;

	var ArrayGroup = [];
	var i = 1;

	ArrayGroup[0] = {};
	ArrayGroup[0]["GroupName"] = "All Contacts";
	ArrayGroup[0]["GroupURL"] = "/contacts";
	console.log(ArrayGroup[0]["GroupName"]);

	theHTML += "<li>";
	theHTML += "<a href=\"#\" id =\"" + ArrayGroup[0]["GroupURL"] + "\">" + ArrayGroup[0]["GroupName"] + "</a>";
	theHTML += "</li>";


//This gets the GroupURL, GroupName and stores it in the crome local storage

	$.ajax({
		async: false,
        type: 'GET',
        url: 'https://pod.cscf.me/contacts/',
        success: function(data) {

			while ((matches = myRe.exec(data)) !== null)
			{
				console.log(matches);

			  var X = myRe.lastIndex;
			  console.log(data.indexOf("<",X));
			  var Temp = data.indexOf("<",X);
			  Group = data.substring(X+2,Temp-1);

			  console.log(Group);


			  theHTML += "<li>";
			  theHTML += "<a href=\"#\" id =\"" + Group + "\">" + Group + "</a>";
			  theHTML += "</li>";

			  ArrayGroup[i] = {};
			  ArrayGroup[i]["GroupName"] = Group
			  ArrayGroup[i]["GroupURL"] = matches[1];
			  console.log(ArrayGroup[i]["GroupName"]);
			  i += 1;
			  }

			  console.log(ArrayGroup[1]["GroupName"]);
			  localStorage['StoredArrayGroups']=JSON.stringify(ArrayGroup); //Store Groups in LocalStorage

			  theHTML += "</ul>";


			document.getElementById('table2').innerHTML = theHTML;
		}

	});





