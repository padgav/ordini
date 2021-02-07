var USER;
(function ($) {

    $( document ).ready(function() {
        var cookieValue = $.cookie("PHPSESSID");
        if (cookieValue != undefined) {
            getUserInfo();
        }
        else{
            $("#login_page").show();
            $("#all_content").hide();
        }
        $("#username").on("keypress", function(){
            $("#login_error").hide();

        });
        $("#password").on("keypress", function(){
            $("#login_error").hide();

        });
        $("#login_btn").on("click", function () {
            // var username = document.getElementById("username").value;
            // var password = document.getElementById("password").value;
            data = {
                cmd: 'login',
                username: $("#username").val(),
                password: $("#password").val()
            }
            $.ajax({
                    url: 'scripts/crs4-login.php',
                    type: 'POST',
                    dataType: 'JSON',
                    data: data,
                    success: function(response){
                        if(response.status.code == 101) {
                            $("#login_page").hide();
                            $("#all_content").show();
                            getUserInfo();
                        }
                        else if(response.status.code == 102){
                            $("#login_page").show();
                            $("#all_content").hide();
                            $("#login_error").show();
                            $("#username").val("");
                            $("#password").val("");
                        }
                    }
                })
        });

        $("#logout").on("click", function(){
            $.ajax({
                url: 'scripts/crs4-login.php',
                type: 'POST',
                dataType: 'JSON',
                data: {
                    cmd: 'logout'
                },
                success: function(response){
                    console.log(response)
                    if(response.status.code == 101) {
                        $("#login_page").show();
                        $("#all_content").hide();
                        $.cookie("PHPSESSID", null, { path: '/' });
                    }
                    else{
                        
                    }
                }
            })
        });
    });
    

    function setUserInfo(info){
        $(".user_name").html(info.data.nome + " " + info.data.cognome);
        USER = info.data.nome + " " + info.data.cognome;
        setFunctions(info.permessi);
    }
    
    function getUserInfo(){
        $.ajax({
            url: 'scripts/crs4-login.php',
            type: 'POST',
            dataType: 'JSON',
            data: {
                cmd: 'getuserinfo'
            },
            success: function(response){
                if(response.status.code == 101) {
                $("#login_page").hide();
                $("#all_content").show();
                setUserInfo(response);
                }
                else{
                    $("#login_page").show();
                    $("#all_content").hide();
                    $.cookie("PHPSESSID", null, { path: '/' });
                }
            }
        })
    }

    function setFunctions(permessi){
        console.log(permessi);
        permessi.map(function(item){
            $("#app"+item.id_applicazione).show();
        })
    }



}(jQuery));