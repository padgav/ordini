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

// The following statement can be removed after the first run (i.e. the database
// table has been created). It is a good idea to do this to help improve
// performance.
// $db->sql( "CREATE TABLE IF NOT EXISTS `T_Fatture` (
// 	`ID_Fattura` int(10) NOT NULL auto_increment,
// 	`prot_iva` numeric(9,2),
// 	`n_fattura` varchar(255),
// 	`data_reg_fatt` date,
// 	`data_fattura` date,
// 	`n_convenzione` varchar(255),
// 	`id_fornitore` numeric(9,2),
// 	`id_st_fatt` numeric(9,2),
// 	`cambio_fattura` numeric(9,2),
// 	`id_valuta` numeric(9,2),
// 	`nascosto` varchar(255),
// 	PRIMARY KEY( `ID_Fattura` )
// );" );

// Build our Editor instance and process the data coming from _POST
$editor = Editor::inst( $db, 'T_Bolle', 'ID_Bolla' );
$crs4 = new Crs4("Ordini", $db, $editor);


$editor 
	->fields(
		Field::inst( 'n_bolla' ),
		Field::inst( 'data_bolla' )
			->validator( Validate::dateFormat( 'D, j M y' ) )
			->getFormatter( Format::dateSqlToFormat( 'D, j M y' ) )
			->setFormatter( Format::dateFormatToSql( 'D, j M y' ) ),
		
		Field::inst( 'id_fornitore' ),
		Field::inst( 'id_ordine' ),
		Field::inst( 'id_st_bolla' ),
		
	)
	->process( $_POST )
	->json();
