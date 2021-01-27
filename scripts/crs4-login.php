<?php

include( "lib/DataTables.php" );

// Alias Editor classes so they are easy to use
use
	DataTables\Editor,
	DataTables\Editor\Field,
	DataTables\Editor\Format,
	DataTables\Editor\Mjoin,
	DataTables\Editor\Options,
	DataTables\Editor\Upload,
	DataTables\Editor\Validate,
	DataTables\Editor\ValidateOptions;

error_reporting(E_ERROR | E_PARSE);
$_VARS = array_merge($_POST,$_GET);
$cmd = $_VARS["cmd"];
$out =[];
session_start();


if($cmd == "login"){
    $user = $_VARS["username"];
    $password = $_VARS["password"];
    
    $url = 'https://giustificativi.crs4.it/LDAP/';
    $data = array('username' => $user, 'password' => $password);
    
    // use key 'http' even if you send the request to https://...
    $options = array(
        'http' => array(
            'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
            'method'  => 'POST',
            'content' => http_build_query($data)
        ),  
        "ssl"=>array(
            "verify_peer"=>false,
            "verify_peer_name"=>false,
        )
    );
    $context  = stream_context_create($options);
    $result = file_get_contents($url, false, $context);
    $resultjson = json_decode($result, true);

    if ($resultjson["status"] == false) { 
    
      /* Handle error */ 
      $out["status"]["code"] = 102;
      $out["status"]["message"] = "Login Error";
      echo json_encode($out);
      exit(0);
  
  }
  else{
    
        $_SESSION["userid"] = $resultjson["USER_UUID"];
        $_SESSION["nome"] = $resultjson["NOME"];
        $_SESSION["cognome"] = $resultjson["COGNOME"];
        $out["status"]["code"] = 101;
        $out["status"]["message"] = "Login Successful";
        $out["data"] = array("userid" => $resultjson["USER_UUID"], "nome" => $resultjson["NOME"],  "cognome" => $resultjson["COGNOME"]    ) ;
        echo json_encode($out);
        exit(0);
  } 
}
else if($cmd == "getuserinfo"){

  //TBD permessi gruppo

  // $post ="";
  // $result = Editor::inst( $db, 'T_Permessi', 'id' )->fields(
  //     Field::inst( 'T_Permessi.id_applicazione' ),
  //     Field::inst( 'T_Permessi.permesso' )
  //   )
  //     ->where( 'id_persona', $_SESSION['userid'])
  //     ->process($post)->data();
      
  // //     //* Permessi di ruolo */
  //     $result2 = Editor::inst( $this->_db, 'V_Permesso_Funzione_Persona', 'id_persona' )->fields(
  //         Field::inst( 'V_Permesso_Funzione_Persona.id_applicazione' ),
  //         Field::inst( 'V_Permesso_Funzione_Persona.permesso' )
  //       )
  //     ->where( 'V_Permesso_Funzione_Persona.id_persona', $_SESSION['userid'])
  //     ->process($post)->data();
      
  //     if(empty($result2["data"])  && empty($result["data"]) ){
  //         echo json_encode( array( 
  //             "error" => "Utente non autorizzato",
  //             "data" => array()
  //         ) );
  //         exit(0);
  //     }
      
  //     $permessi_singoli = array();
  //     if(!empty($result["data"]))   
  //         $permessi_singoli = explode(",", $result["data"][0]["T_Permessi"]["permesso"]);
  //     $permessi_ruolo = array();
  //     if(!empty($result2["data"]))
          
  //             $permessi_ruolo = explode(",", $result2["data"][0]["V_Permesso_Funzione_Persona"]["permesso"]);
              
  //     $this->_permessi = array_merge($permessi_singoli , $permessi_ruolo);

////////////

  $out["status"]["code"] = 101;
  $out["status"]["message"] = "Login Successful";
  $out["data"] = array("userid" => $_SESSION["userid"], "nome" => $_SESSION["nome"],  "cognome" => $_SESSION["cognome"]);
  
  $result1 = Editor::inst( $db, 'T_Permessi', 'id' )->fields(
    Field::inst( 'T_Permessi.id_applicazione' ),
    Field::inst( 'T_Permessi.permesso' )
  )  ->where( 'id_persona ',  $_SESSION["userid"])->process($_POST)->data();
  
  $result2 = Editor::inst( $db, 'V_Permesso_Funzione_Persona', 'id_persona' )->fields(
    Field::inst( 'V_Permesso_Funzione_Persona.id_applicazione' ),
    Field::inst( 'V_Permesso_Funzione_Persona.permesso' )
  ) ->where( 'V_Permesso_Funzione_Persona.id_persona', $_SESSION['userid'])
  ->process($post)->data();

  // $permessi_singoli = array();
  //     if(!empty($result["data"]))   
  //         $permessi_singoli = explode(",", $result["data"][0]["T_Permessi"]["permesso"]);
  //     $permessi_ruolo = array();
  //     if(!empty($result2["data"]))
          
  //             $permessi_ruolo = explode(",", $result2["data"][0]["V_Permesso_Funzione_Persona"]["permesso"]);
              
  //     $permessi = array_merge($permessi_singoli , $permessi_ruolo);
  
  $permessi = Array(); 
  foreach ($result1["data"] as $p) {
    array_push($permessi, $p["T_Permessi"]);
}
foreach ($result2["data"] as $p) {
  array_push($permessi, $p["V_Permesso_Funzione_Persona"]);
}
 
  $out["permessi"] = $permessi;
  echo json_encode($out);
  exit(0);

}

else if($cmd == "logout"){
  $out["status"]["code"] = 101;
  $out["status"]["message"] = "Logout Successful";
  $_SESSION = array();
  session_destroy();
  echo json_encode($out);
  exit(0);

}

?>
