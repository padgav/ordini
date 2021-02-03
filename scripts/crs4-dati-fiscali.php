<?php

/*
 * Editor server script for DB table T_Dati_Fisc
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
// $db->sql( "CREATE TABLE IF NOT EXISTS `T_Dati_Fisc` (
// 	`ID_Dati_Fisc` int(10) NOT NULL auto_increment,
// 	`seq_ord` datetime,
// 	`seq_ord_old` numeric(9,2),
// 	`id_record` numeric(9,2),
// 	`descrizione_bene_ord` varchar(255),
// 	`descrizione_bene` varchar(255),
// 	`qta_ordine_orig` numeric(9,2),
// 	`qta_ordine` numeric(9,2),
// 	`qta_bolla` numeric(9,2),
// 	`qta_fattura` numeric(9,2),
// 	`imp_ordine` numeric(9,2),
// 	`imp_fattura` numeric(9,2),
// 	`id_fattura` numeric(9,2),
// 	`id_bolla` numeric(9,2),
// 	`id_ordine` numeric(9,2),
// 	`id_bene` numeric(9,2),
// 	`id_dati_fisc_proven` numeric(9,2),
// 	`inventariato` numeric(9,2),
// 	`id_dismissione` numeric(9,2),
// 	`id_categoria` numeric(9,2),
// 	`id_marca` numeric(9,2),
// 	`tipo` varchar(255),
// 	`modello` varchar(255),
// 	`matricola` varchar(255),
// 	`id_iva` numeric(9,2),
// 	`sc_data` date,
// 	`e_scadenza` numeric(9,2),
// 	`ras` numeric(9,2),
// 	PRIMARY KEY( `ID_Dati_Fisc` )
// );" );


// Build our Editor instance and process the data coming from _POST
$editor = Editor::inst( $db, 'T_Dati_Fisc', 'ID_Dati_Fisc' );
$crs4 = new Crs4("Ordini", $db, $editor);
	$editor->fields(
		Field::inst( 'seq_ord' )
			->validator( Validate::dateFormat( 'Y-m-d H:i:s' ) )
			->getFormatter( Format::datetime( 'Y-m-d H:i:s', 'Y-m-d H:i:s' ) )
			->setFormatter( Format::datetime( 'Y-m-d H:i:s', 'Y-m-d H:i:s' ) ),
		Field::inst( 'seq_ord_old' ),
		Field::inst( 'id_record' ),
		Field::inst( 'descrizione_bene_ord' ),
		Field::inst( 'descrizione_bene' ),
		Field::inst( 'qta_ordine_orig' ),
		Field::inst( 'qta_ordine' ),
		Field::inst( 'qta_bolla' ),
		Field::inst( 'qta_fattura' ),
		Field::inst( 'imp_ordine' ),
		Field::inst( 'imp_fattura' ),
		Field::inst( 'id_fattura' ),
		Field::inst( 'id_bolla' ),
		Field::inst( 'id_ordine' ),
		Field::inst( 'id_bene' ),
		Field::inst( 'id_dati_fisc_proven' ),
		Field::inst( 'inventariato' ),
		Field::inst( 'id_dismissione' ),
		Field::inst( 'id_categoria' ),
		Field::inst( 'id_marca' ),
		Field::inst( 'tipo' ),
		Field::inst( 'modello' ),
		Field::inst( 'matricola' ),
		Field::inst( 'id_iva' ),
		Field::inst( 'sc_data' )
			->validator( Validate::dateFormat( 'D, j M y' ) )
			->getFormatter( Format::dateSqlToFormat( 'D, j M y' ) )
			->setFormatter( Format::dateFormatToSql( 'D, j M y' ) ),
		Field::inst( 'e_scadenza' ),
		Field::inst( 'ras' )
	)
	->process( $_POST )
	->json();
