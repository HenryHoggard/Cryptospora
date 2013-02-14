// Populate table from Diaspora Json
// By Ryan McIntyre - Based on getConversations.js

	var content = "";

    $.getJSON("https://pod.cscf.me/contacts.json", function(json) {
        $.each(json, function(arrayID,Contact) {

				content +="<div class=\"accordion-group\"><div class=\"accordion-heading\"><a class=\"accordion-toggle\" data-toggle=\"collapse\" data-parent=\"#accordion2\" href=\"#" + arrayID + "\">";
                content += Contact.name + "<a class=\"btn pull-right\">Message</a></a></div>";
				content += "<div id=" + "\"" + arrayID + "\"" + " class=\"accordion-body collapse\"><div class=\"accordion-inner\">";
				content += "<form><fieldset>Groups:<div class=\"alert alert-success\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\">&times;</button>Work</div><div class=\"alert alert-success\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\">&times;</button>Uni</div>Add to Group: <input type=\"text\" class=\"span9\">Edit:<input type=\"text\" placeholder=\"Joe\" class=\"span5.5\"> <input type=\"text\" placeholder=\"Bloggs\" class=\"span5.5\"> <input type=\"text\" placeholder=\"JoeBloggs13@Git.com\" class=\"span12\"></fieldset></form><a class=\"btn btn-danger\">Delete Contact</a>";



				content += "</div></div></div>";

        });
     	document.getElementById('table1').innerHTML = content;
    });



