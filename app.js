/* ========================================= CPSC473 HW 4---Sha Lu ====================================*/
/* ========================================= update star  =============================================*/
var update = function(dbActor, starred) {

    var strUrl = "http://localhost:3000/actors/" + dbActor.id;
    alert(strUrl);
    $.ajax({
        type: 'PUT',
        url: strUrl,
        data: {
            "name": dbActor.name,
            "starred": starred
        },
        success: function(status) {
            //alert("Status: " + status);       
        },
        async: false
    });
};//end update

/* ============================ main get data from DB, add new name  =================================*/
var main = function() {
    "use strict";

    var url = "http://localhost:3000/actors";
    $.get(url, function(actorList) {
        var $div,
            $span,
            $spanName,
            $i,
            $a;

        actorList.forEach(function(dbActor) {
            $div = $("<div>").addClass("mdl-list__item");

            $span = $("<span>").addClass("mdl-list__item-primary-content");
            $div.append($span)

            $i = $("<i>").addClass("material-icons mdl-list__item-avatar").text("person");
            $span.append($i);

            $spanName = $("<span>");
            ($spanName).text(dbActor.name).insertAfter($span);
            // $span.append("<span>").text(dbActor.name);
            $a = $("<a>").addClass("mdl-list__item-secondary-action").attr("href", "#");
            if (dbActor.starred) {
                var $obj = $a.append("<i>").addClass("material-icons");
                $obj.text("star");
                $obj.on("click", function() {
                    update(dbActor, false);
                });
            } else {
                var $obj = $a.append("<i>").addClass("material-icons");
                $obj.text("star_border");
                $obj.on("click", function() {
                    update(dbActor, true);
                });
            }
            $div.append($a);

            $("main .demo-list-action").append($div);
        });
    }); // end get

    /* ========================================= click button event ========================================*/
    $(".nameInput button").on("click", function(event) {
        var strUrl = "http://localhost:3000/actors";
        var dbLength;
        var $newName = $("input").val();
        var isStarred = false;

        jQuery.ajax({
            type: 'GET',
            url: strUrl,
            success: function(data) {
                dbLength = data.length;
                //alert("dbLength="+dbLength);  
            },
            async: false
        });
        var newActor = {
            "id": dbLength + 1,
            "name": $newName,
            "starred": isStarred
        };

        $.ajax({
            type: 'POST',
            url: strUrl,
            data: newActor,
            success: function(data, status) {
                //alert("Data: " + data + "\nStatus: " + status);       
            },
            dataType: 'json',
            async: false
        });
    }); // end button click

}; //end main
$(document).ready(main);