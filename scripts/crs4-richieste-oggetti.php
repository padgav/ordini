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

$editor = Editor::inst( $db, 'T_Richieste_Oggetti', 'T_Richieste_Oggetti.id' );
$crs4 = new Crs4("Richieste", $db, $editor);

// if($_POST["cmd"] == "create_order"){
// 	$id_richiesta = $_POST["opt"];
// }

	$editor->fields(
		Field::inst( 'T_Richieste_Oggetti.id_richiesta' ),
		Field::inst( 'T_Richieste_Oggetti.owner' ),
		Field::inst( 'T_Richieste_Oggetti.tipo' ),
		Field::inst( 'T_Richieste_Oggetti.rateazione' ),
		Field::inst( 'T_Richieste_Oggetti.numero_rate' ),
		Field::inst( 'T_Richieste_Oggetti.descrizione' ),
		Field::inst( 'T_Richieste_Oggetti.quantita' ),
		Field::inst( 'T_Richieste_Oggetti.importo_unitario' ),
		Field::inst( 'T_Richieste_Oggetti.importo' ),
		Field::inst( 'T_Richieste_Oggetti.iva' ),
		Field::inst( 'T_Richieste_Oggetti.totale' ),
		Field::inst( 'T_Richieste_Oggetti.inizio' ),
		Field::inst( 'T_Richieste_Oggetti.fine' ),
		
	);

	$editor->process( $_POST )
	->json();




	