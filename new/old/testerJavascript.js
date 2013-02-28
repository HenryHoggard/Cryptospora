// Populate table from Diaspora Json 
// By Henry Hoggard


// defines the table variable and adds the top of the table headers
var table ="<table class=\"table\" data-provides=\"rowlink\"  >  <thead>  <tr><th></th>  <th>From</th>  <th>Subject</th>   <th>Date</th>  </tr>  </thead>  <tbody> ";
// grabs the json of the conversations
var username = '';



    $.getJSON("https://pod.cscf.me/conversations.json", function(json) {
    // loop for each message
    var progress = 0;
    var iter = 0;
    var length = 0;
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
                        username = matches[1];
                    }
                    else {
                        username = "Me";   
                    }
                       table += "<tr><td> <input type=\"checkbox\"></td>";
                // adds link to message (for james to create the page for)
                table += "<td><a href=\"#" + message.conversation.id + "\">"+ username + "</a></td>";
                // add subject and date
                table += "<td>" + message.conversation.subject + "</td>";
                table += "<td>" + message.conversation.updated_at + "</td></tr>";
             
                 length = json.length;
                iter = (100/length);
                iter = Math.ceil(iter * 10) / 10;
                console.log(iter);
                progress = (progress+iter);
                console.log(progress);
                
                $("#progress").css('width',progress+'%');
                if (progress > 99.999) {
                       table += "</tbody></table";
      // add table to div 'table1'
                       document.getElementById('table1').innerHTML = table;

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