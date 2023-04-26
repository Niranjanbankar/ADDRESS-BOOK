$(document).ready(function () {

    $(".mainform").hide();
    var elements = []
    let contacts = JSON.parse(localStorage.getItem("elements"));
    if (localStorage.getItem("elements") && contacts.length != 0) {
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
    } else {
        $(".personalInformation .Contents").text("No contacts.");
    }

    // elements.style.color='red';

    $("#add").click(function () {
        $(".showInformation").hide();
        $(".mainform").show();
        $(".viewInformation").hide();
        $(".btn").show();
        $(".update").hide();

    });

    $(".cancel").click(function () {
        $(".mainform").hide();
        $(".viewInformation").show();
        $(".showInformation").show();
    });

    function voidform() {

        $("#name").val("");
        $("#email").val("");
        $("#mob").val("");
        $("#tel").val("");
        $("#website").val("");
        $("#address").val("");
    }

    $(".mainform .btn").click(function (e) {

        if (infoValidate()) {
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
            alert("Information added successfuly");

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
            
            

            voidform();
            $(".mainform").hide();
            location.reload();
        }
    });
    $(".showInformation").hide();
    $("body").on("click", ".ContentsInformation ul  ", function () {
        $(this).addClass('active').siblings().removeClass('active');

    });

    $("body").on("click", ".ContentsInformation ul li ", function () {
        // $(".Contents ul li").addClass("active");
        mainIndex = $(this).parent().index();

        $(".mainform").hide();
        $(".showInformation").show();
        $(".viewInformation").show();
        $(".update").show();
        // $(".editOperation").show();

        let index = $(this).parent().index();
        let personInfo = elements[index];
        let str1 = ` <ul class="viewInformation" >
        <li><h2>${personInfo.name}</h2></li>
        <li>Email: ${personInfo.email}</li>
        <li>Mobile: +91 ${personInfo.mobile}</li>
        <li>Landline: ${personInfo.landline}</li>
        <li>Website: ${personInfo.website}</li>
        <li>Address: ${personInfo.address}</li>
        </ul>`;
        $(".viewInformation").html(str1);
        // location.reload();

    });


    function updateContactList() {
        $(".personalInformation .Contents div").empty();
        for (var i = 0; i < elements.length; i++) {
            var contactHtml =
                "<ul><li><h2>" +
                elements[i].name +
                "</h2></li><li>" +
                elements[i].email +
                "</li><li>" +
                elements[i].mobile +
                "</li></ul>";
            $(".personalInformation .Contents div").append(contactHtml);

            // alert("Information is updated");

            location.reload();
        }
    }
    function infoValidate() {
        var name = $("#name").val().trim();
        var email = $("#email").val().trim();
        var mobile = $("#mob").val().trim();
        var landline = $("#tel").val().trim();
        var website = $("#website").val().trim();
        var address = $("#address").val().trim();

        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        var phoneRegex = /^[0-9]{10}$/;
        var nameRegex = /^[a-zA-Z0-9 ]+$/;


        if(!name && !mobile){
            alert("Name and mobile are required fields ");
            return false;
        }
        if (!name) {
            alert("Name is Required");
            return false;
        } else if (!name.match(nameRegex)) {
            alert("Name can contain letters and digits");
            return false;
        }
        if (!mobile) {
            alert("Mobile number is required");
            return false;
        }

        if (!phoneRegex.test(mobile)) {
            alert("Invalid mobile number. It should be a 10-digit number");
            return false;
        }
        if (!email) {
            alert("Email is required");
            return true;
        }

        if (!emailRegex.test(email)) {
            alert("Invalid email address");
            return false;
        }

        return true;
        
       
        

        
        

       
        

        // return true;

       
    }
    // for deleting the Information

    function forDelete() {
        if (confirm("Are you sure you want to delete?")) {
            if (mainIndex >= 0 && mainIndex < elements.length) {

                elements.splice(mainIndex, 1);

                localStorage.setItem("elements", JSON.stringify(elements));

                mainIndex = -1;

                voidform();

                $(".mainform").hide();
                $(".viewInformation").hide();
                $(".showInformation").hide();
                location.reload();


            }
        }
    }

    $("#delete ").click(function () {

        forDelete();
    });
    $("#deleteimg-icon").click(function () {
        forDelete();
    });

    // For editing information function
    function forEdit() {
        if (mainIndex >= 0 && mainIndex < elements.length) {
            var personInfo = elements[mainIndex];


            $("#name").val(personInfo.name);
            $("#email").val(personInfo.email);
            $("#mob").val(personInfo.mobile);
            $("#tel").val(personInfo.landline);
            $("#website").val(personInfo.website);
            $("#address").val(personInfo.address);

            $(".mainform .update").click(function (e) {
                e.preventDefault();

                if (infoValidate()) {


                    // Update the selected personInfo with the new information
                    elements[mainIndex].name = $("#name").val();
                    elements[mainIndex].email = $("#email").val();
                    elements[mainIndex].mobile = $("#mob").val();
                    elements[mainIndex].landline = $("#tel").val();
                    elements[mainIndex].website = $("#website").val();
                    elements[mainIndex].address = $("#address").val();


                    localStorage.setItem("elements", JSON.stringify(elements));
                    updateContactList();



                    voidform();

                    // Reset the mainIndex variable
                    mainIndex = -1;

                    location.reload();

                }


            });

            $(".viewInformation").hide();
            $(".showInformation").hide();
            $(".mainform").show();
            $(".btn").hide();
        }

    }

    $("#edit1").click(function () {
        forEdit();
        $(".update").show();

    });

    $("#editimg-icon").click(function () {
        forEdit();
    })
});

