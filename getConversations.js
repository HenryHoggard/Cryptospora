// Populate table from Diaspora Json 
// By Henry Hoggard


// defines the table variable and adds the top of the table headers
var table ="<table class=\"table\" data-provides=\"rowlink\"  >  <thead>  <tr><th></th> <th></th> <th>From</th>  <th>Subject</th>   <th>Date</th>  </tr>  </thead>  <tbody> ";
// grabs the json of the conversations
var username = [];
    $.getJSON("https://pod.cscf.me/conversations.json", function(json) {
    // loop for each message
    var progress = 0;
    var iter = 0;
    var length = 0;
    var i = 0;
        $.each(json, function(arrayID,message) {
            $.each(message, function() {
                // for every message, extract author of message,                               
                $.ajax({
                async: true,
                type: 'GET',
                url: 'https://pod.cscf.me/conversations/'+message.conversation.id,
                success: function(data) {
                    var matches = data.match(/" class='author from' >(.*)<\/a>/); // regex to extract it,
                    // if there are no matches, it must be a self message 
                    if (matches != null) {
                        username[i] = matches[1];
                    }
                    else {
                        username[i] = "Me";   
                    }
                       table += "<tr><td> <input type=\"checkbox\"></td>";
                // adds link to message (for james to create the page for)
                table += "<td><img src=\"https://wk3.org/assets/user/default.png\" height=\"24\" width=\"24\"></td>";
                table += "<td><a href=\"ViewDecrypt.html?messageid=" + message.conversation.id + "\">"+ username[i] + "</a></td>";
                table += "<td>" + message.conversation.subject + "</td>";
                table += "<td>" + message.conversation.updated_at + "</td></tr>";
                length = json.length;
                iter = (100/length);
                iter = Math.ceil(iter * 10) / 10;
                progress = (progress+iter);

                $("#status").html("Loading Progess " + progress + "%");
                $("#progress").css('width',progress+'%');
                i++;
                if (i == 9) {
                                          
                    
                }
                if (progress > 99.999) {
                       table += "</tbody></table>";
      // add table to div 'table1'
                       document.getElementById('table1').innerHTML = table;
                       $('#progressouter').remove();
                       $('#status').remove();
                       pageLoaded(length);

                }
                }
                }); 
              
                         });
        });
        // end of table
     //   table += "</tbody></table";
      // add table to div 'table1'
 //     document.getElementById('table1').innerHTML = table;


    });
/*
$.get('https://pod.cscf.me/conversations/', function(data) {
    $('.result').html(data);
    
    var linkRegex = /a class='conversation' href='\/conversations\/(.*)'/;
    var matches = linkRegex.exec(data);
    
});
*/

/* function pageLoaded() {
    console.log(Math.round(length/10);
    $('#pagination').bootpag({
        total: 2,
        page: 1,
        maxVisible: 1
     ).on('page', function(event, num){
    $("#content").html("Page " + num); // or some ajax content loading...
    });

}
*/
/*function deleteMessage(messageid) {
    token = getToken;
    $.ajax({
        type: "POST",
        url: "https://pod.cscf.me/conversations/"+messageid +"/visibility",
        data: { _method: "delete", authenticity_token: token }
        }).done(function( msg ) {
        console.log("deleted");
    });

}*/




function getToken() {
    $.ajax
    ({
    async: false,
    type: 'GET',
    url: 'https://pod.cscf.me/conversations',
    success: function(data) 
        {
             var matches = data.match(/<meta content="(.*)" name="csrf-token" \/>/); // regex to extract it,
             tok = matches[1];
             result = tok;
	}
    });	
	return result;
}
/*
$("#delete").click(function() {
deleteMessage(39);
});*/



