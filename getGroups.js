// Populate Groups from Diaspora Json
// By Ryan McIntyre - Based on getConversations.js

	var Group = '';
	var table ="<table class=\"table\" data-provides=\"rowlink\" > <thead> <tr><th>IWroteThis</th></tr> </thead> <tbody> ";
	var myRe = /class='aspect_selector' href='(.*)'/g;
	var matches;

	$.ajax({
		async: true,
        type: 'GET',
        url: 'https://pod.cscf.me/contacts/',
        success: function(data) {

			while ((matches = myRe.exec(data)) !== null)
			{

			  var X = myRe.lastIndex;
			  console.log(data.indexOf("<",X));
			  var Temp = data.indexOf("<",X);
			  Group = data.substring(X+1,Temp);


			  table += "<tr>";
			  table += "<td>" + Group + "</td>";
			  table += "</tr>";
			  }



		    		table += "</tbody></table>";

					document.getElementById('table2').innerHTML = table;
		}

	});





