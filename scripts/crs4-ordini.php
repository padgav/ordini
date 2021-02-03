<?php

/*
 * Editor server script for DB table ordini
 * Created by http://editor.datatables.net/generator
 */

// DataTables PHP library and database connection
include( "lib/DataTables.php" );
include( "Crs4.php" );

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


    openlog("myScriptLog", LOG_PID | LOG_PERROR, LOG_LOCAL0);
    

// Build our Editor instance and process the data coming from _POST
$editor = Editor::inst( $db, 'T_Ordini', 'T_Ordini.ID_Ordine' );
$crs4 = new Crs4("Fornitori", $db, $editor);
$editor->fields(
        Field::inst( 'T_Ordini.Id_Ordine' ),



        Field::inst( 'T_Ordini.id_richiesta' )
        ->options( Options::inst()
                ->table( 'T_Richieste' )
                ->value( 'ID' )
                ->label( array('ID', 'oggetto'))
                ->where(function ($q) {                             
                    $q->where('T_Richieste.id_stato_richiesta', "Approvata", '=');
                  })
                
            )
            ->validator( Validate::dbValues() ),
        Field::inst( 'T_Ordini.N_Ordine' ),
        
        Field::inst( 'T_Ordini.id_richiedente' )
            ->options( Options::inst()
             ->table( 'V_People_all' )
             ->value( 'ID' )
             ->label( array('Nome', 'Cognome')  )
        )
            ->validator( Validate::dbValues() ),
            Field::inst( 'V_People_all.cognome' ),
            Field::inst( 'V_People_all.nome' ),



        Field::inst( 'T_Ordini.id_cdc' )
            ->options( Options::inst()
                ->table( 'T_Progetti' )
                ->value( 'ID' )
                ->label( 'acronimo' )
            )
            ->validator( Validate::dbValues() ),
            Field::inst( 'T_Progetti.acronimo' ),

        Field::inst( 'T_Ordini.Anno_Ordine' ),
		Field::inst( 'T_Ordini.Data_Ordine' ),
        Field::inst( 'T_Ordini.Oggetto' ),


        Field::inst( 'T_Ordini.ID_Fornitore' )
          ->options( Options::inst()
                ->table( 'T_Fornitori' )
                ->value( 'ID_Fornitore' )
                ->label( 'Fornitore' )
            )
            ->validator( Validate::dbValues() ),
        Field::inst( 'T_Fornitori.Fornitore' ),



        Field::inst( 'T_Ordini.ID_St_Ord' ), 
        Field::inst( 'T_Ordini.D_Garanzia' ), 
        Field::inst( 'T_Ordini.Note' )
        
    )
    ->on( 'postCreate', function ( $editor, $id, $values, $row) {
        $nrichiesta = $values["T_Ordini"]["id_richiesta"];
        $editor->db()
        ->query('update', 'T_Richieste_Oggetti')
        ->set( 'T_Richieste_Oggetti.id_ordine', $id)
        ->where('id', $nrichiesta )
        ->exec();
    })
    ->on( 'preCreate', function ( $editor, $values ) {

        
       
        $nrichiesta = $values["T_Ordini"]["id_richiesta"];

        //aggiorna lo stato della richiesta in "Ordine"
        $editor->db()
        ->query('update', 'T_Richieste')
        ->set( 'T_Richieste.id_stato_richiesta', "Ordine")
        ->where('id', $nrichiesta )
        ->exec();


         //Recupera i dati della richiesta per copiarli nell'ordine
        $result = $editor->db()->select("T_Richieste", ['*'] , function($q) use ( $nrichiesta )
		{
			$q->where('T_Richieste.id', $nrichiesta, '=');
		})->fetchAll();
        
		foreach ($result as $value){
            //echo json_encode($value);
            
            $editor
        ->field( 'T_Ordini.id_richiedente' )
        ->setValue( $value["id_richiedente"]);

        $editor
        ->field( 'T_Ordini.id_cdc' )
        ->setValue( $value["id_progetto"]);

        $editor
        ->field( 'T_Ordini.Anno_Ordine' )
        ->setValue( 2021);

        // $editor
        // ->field( 'T_Ordini.Data_Ordine' )
        // ->setValue( 2020);

        $editor
        ->field( 'T_Ordini.Oggetto' )
        ->setValue( $value["oggetto"]);

        $editor
        ->field( 'T_Ordini.ID_Fornitore' )
        ->setValue( $value["id_fornitore"]);

        $editor
        ->field( 'T_Ordini.ID_St_Ord' )
        ->setValue( 0 );

        $editor
        ->field( 'T_Ordini.D_Garanzia' )
        ->setValue( "" );

        $editor
        ->field( 'T_Ordini.Note' )
        ->setValue( "" );
		}


        //copia i beni dalla tabella T_Richieste_Oggetti a T_Dati_Fiscali
        $result = $editor->db()->select("T_Richieste_Oggetti", ['*'] , function($q) use ( $nrichiesta )
		{
			$q->where('T_Richieste_Oggetti.id_richiesta', $nrichiesta, '=');
		})->fetchAll();

        // foreach ($result as $value){
        //     $editor->db()
        //     ->query('insert', 'T_Dati_Fisc')
        //     ->set(  array( 'T_Dati_Fisc.descrizione_bene' => $value['descrizione'],   
        //                     'T_Dati_Fisc.qta_ordine' => $value['quantita'],
        //                     'T_Dati_Fisc.imp_ordine' => $value['importo_unitario']
        //     ))  
        //     ->exec();
        //     //id_richiesta descrizione quantita importo_unitario importo iva totale numero_rate rateazione inizio fine

        //     // --       descrizione_bene qta_ordine imp_ordine 
        // }

        
        //Genera numero d'ordine
        $year = date("Y");
        $a = $editor->db()->raw()->exec('SELECT MAX(N_Ordine) as n FROM T_Ordini where Anno_Ordine = ' . $year )->fetch();
        $num = $a["n"];
        if($num == null) $num = 0; 
        $num++;
        // ob_start();
        // var_dump($a);
        // syslog(LOG_WARNING, ob_get_clean());
        // syslog(LOG_WARNING, $num);
        
        $editor
            ->field( 'T_Ordini.N_Ordine' )
            ->setValue( $num );
        $editor
            ->field( 'T_Ordini.Anno_Ordine' )
            ->setValue( $year );
    } )
    ->leftJoin( 'T_Fornitori', 'T_Fornitori.ID_Fornitore', '=', 'T_Ordini.ID_Fornitore' )
    ->leftJoin( 'T_Richieste', 'T_Richieste.ID', '=', 'T_Ordini.id_richiesta' )
    ->leftJoin( 'T_Progetti', 'T_Progetti.ID', '=', 'T_Ordini.id_cdc' )
    ->leftJoin( 'V_People_all', 'V_People_all.ID', '=', 'T_Ordini.id_richiedente' )
	->process( $_POST )
	->json();