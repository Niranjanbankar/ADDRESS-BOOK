$(document).ready(function() {

    $(".mainform").hide();
    var elements = [];

    if (localStorage.getItem("elements")) {
        elements = JSON.parse(localStorage.getItem("elements"));
        for (var i = 0; i < elements.length; i++) {
            var storeInfo =
                "<ul><li><h2>" +
                elements[i].name +
                "</h2></li><li>" +
                elements[i].email +
                "</li><li>" +
                elements[i].mobile +
                "</li></ul>";
            $(".personalInformation .Contents div").append(storeInfo);
        }
    }
    $("#add").click(function () {
        $(".showInformation").hide();
        $(".mainform").show();
        $(".viewInformation").hide();
    });
    $(".mainform .btn").click(function (e) {
       

        var name = $("#name").val();
        var email = $("#email").val();
        var mobile = $("#mob").val();
        var landline = $("#tel").val();
        var website = $("#website").val();
        var address = $("#address").val();

        var personInfo = {
            name: name,
            email: email,
            mobile: mobile,
            landline: landline,
            website: website,
            address: address,
        };
        elements.push(personInfo);
        localStorage.setItem("elements", JSON.stringify(elements));
        var storeInfo =
            "<ul><li><h2>" +
            name +
            "</h2></li><li>" +
            email +
            "</li><li>" +
            mobile +
            "</li></ul>";
        $(".personalInformation .Contents div").append(storeInfo);
        $(".mainform").hide();
        $("#name").val("");
        $("#email").val("");
        $("#mob").val("");
        $("#tel").val("");
        $("#website").val("");
        $("#address").val("");
       
    });
    $(".showInformation").hide();
    $("body").on("click", ".ContentsInformation ul li", function () {
        mainIndex=$(this).parent().index();
       
        $(".mainform").hide();
        $(".showInformation").show();
       
        let index = $(this).parent().index();
        let personInfo = elements[index];
        let str1 = ` <ul class="viewInformation" >
        <li><h2>${personInfo.name}</h2></li>
        <li>Email:${personInfo.email}</li>
        <li>Mobile:${personInfo.mobile}</li>
        <li>Landline:${personInfo.landline}</li>
        <li>Website:${personInfo.website}</li>
        <li>Address:${personInfo.address}</li>
        </ul>`;
        $(".viewInformation").html(str1);
    });          
    $("#delete").click(function () {
        if (mainIndex >= 0 && mainIndex < elements.length) {
           
            elements.splice(mainIndex, 1);
           
            localStorage.setItem("elements", JSON.stringify(elements));

            mainIndex = -1;
         
            $(".mainform").hide();
            $("#name").val("");
            $("#email").val("");
            $("#mob").val("");
            $("#tel").val("");
            $("#website").val("");
            $("#address").val("");
            $(".viewInformation").hide();
            $(".showInformation").hide();
            
            location.reload();
        }

    });

    $("#edit").click(function () {
        if (mainIndex >= 0 && mainIndex < elements.length) {
            var personInfo = elements[mainIndex];

            $("#name").val(personInfo.name);
            $("#email").val(personInfo.email);
            $("#mob").val(personInfo.mobile);
            $("#tel").val(personInfo.landline);
            $("#website").val(personInfo.website);
            $("#address").val(personInfo.address);

            $(".mainform .btn").click(function (e) {


                // Update the selected personInfo with the new information
                elements[mainIndex].name = $("#name").val();
                elements[mainIndex].email = $("#email").val();
                elements[mainIndex].mobile = $("#mob").val();
                elements[mainIndex].landline = $("#tel").val();
                elements[mainIndex].website = $("#website").val();
                elements[mainIndex].address = $("#address").val();

                
                localStorage.setItem("elements", JSON.stringify(elements));
        
                $(".mainform").hide();
                
                $("#name").val("");
                $("#email").val("");
                $("#mob").val("");
                $("#tel").val("");
                $("#website").val("");
                $("#address").val("");

                // Reset the mainIndex variable
                mainIndex = -1;
            });

            $(".viewInformation").hide();
            $(".showInformation").hide();
            $(".mainform").show();
        }
    });


});

