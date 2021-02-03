var USER;
(function ($) {

    function serverMessage(params, handler){
        var http = new XMLHttpRequest();
        var url = 'scripts/crs4-login.php';
        http.open('POST', url, true);
        //Send the proper header information along with the request
        http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    
        http.onreadystatechange = function() {//Call a function when the state changes.
            if(http.readyState == 4 && http.status == 200) {
                //console.log(http.responseText);
                var message = JSON.parse(http.responseText);
                handler(message);
            }
        };
        http.send(params);
    }


    $(document).ready(function () {
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
            var username = document.getElementById("username").value;
            var password = document.getElementById("password").value;
            var params = 'cmd=login&username='+ username + "&password=" + password;
            serverMessage(params, function(message){
                if(message.status.code == 101) {
                    $("#login_page").hide();
                    $("#all_content").show();
                    getUserInfo();
                }
                else if(message.status.code == 102){
                    $("#login_page").show();
                    $("#all_content").hide();
                    $("#login_error").show();
                    $("#username").val("");
                    $("#password").val("");
                }
            });
        });

        $("#logout").on("click", function(){
            var params = 'cmd=logout';
            serverMessage(params, function(message){
                if(message.status.code == 101) {
                    $("#login_page").show();
                    $("#all_content").hide();
                    $.cookie("PHPSESSID", null, { path: '/' });
                }
            });


        });

    });

    function setUserInfo(info){
        $(".user_name").html(info.data.nome + " " + info.data.cognome);
        USER = info.data.nome + " " + info.data.cognome;
        setFunctions(info.permessi);
    
    }
    function getUserInfo(info){
        var params = 'cmd=getuserinfo';
        serverMessage(params, function(message){
            if(message.status.code == 101) {
                $("#login_page").hide();
                $("#all_content").show();
                setUserInfo(message);
            }
            else{
                $("#login_page").show();
                $("#all_content").hide();
                $.cookie("PHPSESSID", null, { path: '/' });
            }
        });
    }

    function setFunctions(permessi){
        console.log(permessi);
        permessi.map(function(item){
            $("#app"+item.id_applicazione).show();
        })
    }



}(jQuery));