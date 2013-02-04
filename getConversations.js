var table ="<table class=\"table\"   >  <thead>  <tr>  <th>From</th>  <th>Subject</th>   <th>Date</th>  </tr>  </thead>  <tbody> ";
$.getJSON("https://pod.cscf.me/conversations.json", function(json) {
    $.each(json, function(arrayID,message) {
        $.each(message, function() {
            table += "<tr><td><a href=\"#" + message.conversation.id + "\">test</a></td>";
            table += "<td>" + message.conversation.subject + "</td>";
            table += "<td>" + message.conversation.updated_at + "</td></tr>";
        });
    });
    table += "</tbody></table";

  document.getElementById('table1').innerHTML = table;


});


