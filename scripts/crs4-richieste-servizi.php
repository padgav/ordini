<?php

/*
 * Editor server script for DB table T_Fornitori
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

$editor = Editor::inst( $db, 'T_Richieste_Servizi', 'T_Richieste_Servizi.id' );
$crs4 = new Crs4("Richieste", $db, $editor);

// if($_POST["cmd"] == "create_order"){
// 	$id_richiesta = $_POST["opt"];
// }

	$editor->fields(
		Field::inst( 'T_Richieste_Servizi.id_richiesta' ),
		Field::inst( 'T_Richieste_Servizi.owner' ),
		// Field::inst( 'T_Richieste_Servizi.tipo' ),
		Field::inst( 'T_Richieste_Servizi.rateazione' ),
		Field::inst( 'T_Richieste_Servizi.numero_rate' ),
		Field::inst( 'T_Richieste_Servizi.descrizione' ),
		Field::inst( 'T_Richieste_Servizi.inizio' ),
		Field::inst( 'T_Richieste_Servizi.fine' ),
		Field::inst( 'T_Richieste_Servizi.importo' ),
		Field::inst( 'T_Richieste_Servizi.iva' ),
		Field::inst( 'T_Richieste_Servizi.totale' )
	);

	$editor->process( $_POST )
	->json();




	