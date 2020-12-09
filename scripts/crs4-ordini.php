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
Editor::inst( $db, 'T_Ordini', 'T_Ordini.ID_Ordine' )
	->fields(
        Field::inst( 'T_Ordini.Id_Ordine' ),
		Field::inst( 'T_Ordini.N_Ordine' ),
		Field::inst( 'T_Ordini.ID_Persona' ),
        Field::inst( 'T_Ordini.cdc' ),
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
        
    )->on( 'preCreate', function ( $editor, $values ) {
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
	->process( $_POST )
	->json();