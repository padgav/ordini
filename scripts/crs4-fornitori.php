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

// // The following statement can be removed after the first run (i.e. the database
// // table has been created). It is a good idea to do this to help improve
// // performance.
// $db->sql( "CREATE TABLE IF NOT EXISTS `T_Fornitori` (
// 	`ID_Fornitore` int(10) NOT NULL auto_increment,
// 	`fornitore` varchar(255),
// 	`indirizzo` varchar(255),
// 	`n_civico` varchar(255),
// 	`citta` varchar(255),
// 	`cap` varchar(255),
// 	`prov` varchar(255),
// 	`id_paese` numeric(9,2),
// 	`n_telef` varchar(255),
// 	`n_fax` varchar(255),
// 	`id_paga` numeric(9,2),
// 	`email` varchar(255),
// 	`note` varchar(255),
// 	PRIMARY KEY( `ID_Fornitore` )
// );" );

// Build our Editor instance and process the data coming from _POST

$editor = Editor::inst( $db, 'T_Fornitori', 'T_Fornitori.ID_Fornitore' );
$crs4 = new Crs4("Fornitori", $db, $editor);


	$editor->fields(
		Field::inst( 'T_Fornitori.id_fornitore' ),
		Field::inst( 'T_Fornitori.owner' ),
		Field::inst( 'T_Fornitori.fornitore' ),
		Field::inst( 'T_Fornitori.indirizzo' ),
		Field::inst( 'T_Fornitori.n_civico' ),
		Field::inst( 'T_Fornitori.citta' ),
		Field::inst( 'T_Fornitori.cap' ),
		Field::inst( 'T_Fornitori.prov' ),
		Field::inst( 'T_Fornitori.id_stato' )
		->options( Options::inst()
		->table( 'T_Stati' )
		->value( 'ID_Stati' )
		->label( 'Nome_Stati' )
		)
		->validator( Validate::dbValues() ),
		Field::inst( 'T_Stati.Nome_Stati' ),

		Field::inst( 'T_Fornitori.n_telef' ),
		Field::inst( 'T_Fornitori.n_fax' ),
		Field::inst( 'T_Fornitori.id_paga' ),
		Field::inst( 'T_Fornitori.email' )
		->validator( Validate::email(
			ValidateOptions::inst()
				->allowEmpty( false )
				->optional( false )
		) ),
		Field::inst( 'T_Fornitori.pec' )
		->validator( Validate::email(
			ValidateOptions::inst()
				->allowEmpty( false )
				->optional( false )
		) ),

		Field::inst( 'T_Fornitori.piva' ),
		Field::inst( 'T_Fornitori.cfiscale' ),
		Field::inst( 'T_Fornitori.iban' ),
		Field::inst( 'T_Fornitori.note' )
	)
	->leftJoin( 'T_Stati', 'T_Stati.ID_Stati', '=', 'T_Fornitori.id_stato' )
	->on( 'preCreate', function ( $editor, $values ) {
		$editor
            ->field( 'T_Fornitori.n_telef' )
            ->setValue("070888888" );
	});
	$editor->process( $_POST )
	->json();




	