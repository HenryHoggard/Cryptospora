// Populate Groups from Diaspora Json
// By Ryan McIntyre

	var Group = '';
	var theHTML;
	theHTML = "<ul class=\"nav nav-tabs nav-stacked\"><li class=\"active\">";
	var myRe = /class='aspect_selector' href='(.*)'/g;
	var matches;

	$.ajax({
		async: true,
        type: 'GET',
        url: 'https://pod.cscf.me/contacts/',
        success: function(data) {

			while ((matches = myRe.exec(data)) !== null)
			{
				console.log(matches);

			  var X = myRe.lastIndex;
			  console.log(data.indexOf("<",X));
			  var Temp = data.indexOf("<",X);
			  Group = data.substring(X+1,Temp);


			  theHTML += "<li>";
			  theHTML += "<a href=\"#\" id =\"" + matches[1] + "\">" + Group + "</a>";
			  theHTML += "</li>";

			  }

			  theHTML += "</ul>";
			document.getElementById('table2').innerHTML = theHTML;
		}

	});





