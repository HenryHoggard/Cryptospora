// Populate table from Diaspora Json
// By Ryan McIntyre - Based on getConversations.js


	var table ="<table class=\"table\" data-provides=\"rowlink\" > <thead> <tr><th>Name</th> </tr> </thead> <tbody> ";
    $.getJSON("https://pod.cscf.me/contacts.json", function(json) {
        $.each(json, function(arrayID,Contact) {
            $.each(Contact, function() {
                // for every message, extract author of message,



                table += "<td>" + Contact.name + "</td></tr>";

 	           // length = json.length;
               // iter = (100/length);
               // iter = Math.ceil(iter * 10) / 10;
               // console.log(iter);
               // progress = (progress+iter);
               // console.log(progress);

               // $("#progress").css('width',progress+'%');
               // if (progress > 99.999) {
                       table += "</tbody></table>";
      // add table to div 'table1'
                       document.getElementById('table1').innerHTML = table;

               // }


                         });
        });
        // end of table
     // table += "</tbody></table";
      // add table to div 'table1'
 // document.getElementById('table1').innerHTML = table;


    });
/*
$.get('https://pod.cscf.me/conversations/', function(data) {
$('.result').html(data);
var linkRegex = /a class='conversation' href='\/conversations\/(.*)'/;
var matches = linkRegex.exec(data);
});
*/