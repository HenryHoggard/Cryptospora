// Populate table from Diaspora Json 
// By Henry Hoggard


// defines the table variable and adds the top of the table headers
var table ="<table class=\"table\" data-provides=\"rowlink\"  >  <thead>  <tr><th></th>  <th>From</th>  <th>Subject</th>   <th>Date</th>  </tr>  </thead>  <tbody> ";
// grabs the json of the conversations
$.getJSON("https://pod.cscf.me/conversations.json", function(json) {
// loop for each message
    $.each(json, function(arrayID,message) {
        $.each(message, function() {
            // add checkbox column 
            table += "<tr><td> <input type=\"checkbox\"></td>";
            // adds link to message (for james to create the page for)
            table += "<td><a href=\"#" + message.conversation.id + "\">Username</a></td>";
            // add subject and date
            table += "<td>" + message.conversation.subject + "</td>";
            table += "<td>" + message.conversation.updated_at + "</td></tr>";
        });
    });
    // end of table
    table += "</tbody></table";
  // add table to div 'table1'
  document.getElementById('table1').innerHTML = table;


});


