// Populate table from Diaspora Json 
// By Henry Hoggard


// defines the table variable and adds the top of the table headers
var table ="<table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" class=\"table table-striped table-bordered\" id=\"inbox\" data-provides=\"rowlink\"  >  <thead>  <tr><th></th> <th></th> <th>From</th>  <th>Subject</th>   <th>Date</th>  </tr>  </thead>  <tbody> ";
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
                    var date = prettyDate(message.conversation.updated_at);
                    table += "<td>" +date + "</td></tr>";
                    length = json.length;
                    iter = (100/length);
                    progress = (progress+iter);
                    var num = Math.round(progress).toFixed();
                    console.log(progress);
                    $("#progress").css('width',num+'%');
                    $("#progress").text(num + "%");
                    i++;
    
                    if (progress > 99.999) {
                        table += "</tbody></table>";
      // add table to div 'table1'
                        document.getElementById('table1').innerHTML = table;
                        $('#progressouter').remove();
                        $('#status').remove();
                /*Table initialisation */
                        $(document).ready(function() {
	                    var oTable = $('#inbox').dataTable( {
		                "sDom": "<'row'<'span6'l><'span6'f>r>t<'row'<'span6'i><'span6'p>>",
		                "sPaginationType": "bootstrap",
		                "oLanguage": {
		                    "sLengthMenu": "_MENU_ records per page"
		                }
                            });
                            oTable.fnSort( [ [4,'asc'] ] );      
                        });

                       $.extend( $.fn.dataTableExt.oStdClasses, {
                           "sWrapper": "dataTables_wrapper form-inline"
                       });
                    }
                }
            }); 
              
        });
    });
});

function getToken() {
    $.ajax({
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



