// Populate Groups from Diaspora Json
// By Ryan McIntyre - Based on getConversations.js

	var Group = '';

	$.ajax({
		async: true,
        type: 'GET',
        url: 'https://pod.cscf.me/contacts/',
        success: function(data) {
                    var matches = data.match(/"window.current_user_attributes = (.*)\n<\/script>/); // regex to extract it,
                    var Group = matches[1];
		}
	});

     	document.getElementById('table1').innerHTML = Group;




