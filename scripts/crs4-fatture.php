<?php

/*
 * Editor server script for DB table T_Fatture
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


// Build our Editor instance and process the data coming from _POST
$editor =  Editor::inst( $db, 'T_Fatture', 'ID_Fattura' );
$crs4 = new Crs4("Ordini", $db, $editor);


	$editor->fields(
		Field::inst( 'T_Fatture.n_fattura' ),
		Field::inst( 'T_Fatture.owner' ),
		Field::inst( 'T_Fatture.data_fattura' ),
		Field::inst( 'T_Fatture.id_ordine' ),
		Field::inst( 'T_Fatture.id_fattura' ),
		Field::inst( 'T_Fatture.prot_iva' )
		
		
	)
	->process( $_POST )
	->json();
