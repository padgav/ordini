<?php

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
class Crs4  {


    function __construct( $flabel , $db, $editor){
        $db->sql( 'set names utf8' );
        session_start();
        $post = "";
        $app = Editor::inst( $db, 'T_Applicazioni', 'id' )->fields(
           // Field::inst( 'T_Applicazioni.applicazione' ),
            Field::inst( 'T_Applicazioni.id' ),
          )
            ->where( 'applicazione', $flabel)
            ->process($post)->data();
            
        $f = $app["data"][0]["T_Applicazioni"]["id"];
        $this->functionality( $f );
        $this->_tablename = $editor->table()[0];
        $this->db( $db );
        $this->editor($editor);
        $this->_init();
        $this->checkViewPermission();
        $this->checkEditPermission();
    }

    private function _init(){
        
        if (!isset($_SESSION['userid'])) {
            echo json_encode( array( 
                "error" => "Utente non autorizzato",
                "data" => array()
            ) );
            exit(0);
        }
        else{
            
            $post ="";
            $result = Editor::inst( $this->_db, 'T_Permessi', 'id' )->fields(
                Field::inst( 'T_Permessi.id_applicazione' ),
                Field::inst( 'T_Permessi.permesso' )
              )
                ->where( 'id_persona', $_SESSION['userid'])
                ->where( 'id_applicazione', $this->_functionality)
                ->process($post)->data();
                
                
                //* Permessi di ruolo */
                $result2 = Editor::inst( $this->_db, 'V_Permesso_Funzione_Persona', 'id_persona' )->fields(
                    Field::inst( 'V_Permesso_Funzione_Persona.id_applicazione' ),
                    Field::inst( 'V_Permesso_Funzione_Persona.permesso' )
                  )
                ->where( 'V_Permesso_Funzione_Persona.id_persona', $_SESSION['userid'])
                ->where( 'V_Permesso_Funzione_Persona.id_applicazione', $this->_functionality)
                ->process($post)->data();
                
                if(empty($result2["data"])  && empty($result["data"]) ){
                    echo json_encode( array( 
                        "error" => "Utente non autorizzato",
                        "data" => array()
                    ) );
                    exit(0);
                }
                
                $permessi_singoli = array();
                if(!empty($result["data"]))   
                    $permessi_singoli = explode(",", $result["data"][0]["T_Permessi"]["permesso"]);
                $permessi_ruolo = array();
                if(!empty($result2["data"]))
                    
                        $permessi_ruolo = explode(",", $result2["data"][0]["V_Permesso_Funzione_Persona"]["permesso"]);
                        
                $this->_permessi = array_merge($permessi_singoli , $permessi_ruolo);
                
                
        }
        return $this;
    
    }


    private function checkViewPermission() {
        if(in_array("VA", $this->_permessi) ) return;
        if(in_array("VO", $this->_permessi) ) {
                $this->_editor->where("owner", $_SESSION['userid'], "=");
        }
        else{
            echo json_encode( array( 
                "error" => "Utente non autorizzato",
                "data" => array()
            ) );
            exit(0);
        }
        // if(in_array("VR", $this->_permessi) || in_array("ER", $this->_permessi)) {
        // 	$editor->where("id_richiedente", $_SESSION['userid'], "=");
        // }
    }

    private function checkEditPermission() {

        /* Set owner as userid */
        $this->_editor->on( 'preCreate', function ( $editor, $values ) {
                $editor
                ->field( $this->_tablename.'.owner' )
                ->setValue($_SESSION['userid'] );
        });
    

        /*  */ 
        $this->_editor->on( 'preCreate', function ( $editor, $values ) {
            if(in_array("EA", $this->_permessi)) return;
            if(in_array("EO", $this->_permessi)) return;
            else{
                // echo json_encode( array( 
                //     "error" => "Utente non autorizzato per creare nuove righe",
                //     "data" => array()
                // ) );
                return false;
            }   
        });


            $this->_editor->on( 'preEdit', function ( $editor, $id, $values ) {
            if(in_array("EA", $this->_permessi)) return;
            if(in_array("EO", $this->_permessi)) {
                $result = $this->_db->select($this->_tablename, ['owner'] , function($q) use ( $id )
                {
                    $q->where('id', $id, '=');
                })->fetch();
                if($result['owner'] != $_SESSION['userid']){
                    echo json_encode( array( 
                        "error" => "Utente non autorizzato per editare questa riga",
                        "data" => [],
                        "recordsTotal"=> null,
                        "recordsFiltered"=> null,
                        "draw:" => "1"
                    ) );
                    exit(0);
                }
            }
            else{
                echo json_encode( array( 
                    "error" => "Utente non autorizzato per editare questa riga",
                    "data" => array()
                ) );
                exit(0);
            }
        });

        /* Log */
        $this->_editor->on( 'postCreate', function ( $editor, $id, $values, $row ) {
            $this->_db->insert( 'T_Condivisioni', array(
                'id_persona'   => $_SESSION['userid'],
                'id_applicazione' => $this->_functionality,
                'permesso' => "O",
                'id_risorsa' =>$id
            ) );
        });

    }

   

    private $_functionality= null;
    private $_editor = null;
    private $_db = null;
    private $_permessi;


    public function db($db){
        $this->_db = $db;
    }

    public function editor($editor){
        $this->_editor = $editor;
    }
    public function functionality($f){
        $this->_functionality = $f;
    }


}