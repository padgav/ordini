<?php

/*
 * Editor server script for DB table T_permessi
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
// $db->sql( "DROP TABLE T_Permessi; CREATE TABLE IF NOT EXISTS `T_Permessi` (
// 	`id` int(10) NOT NULL auto_increment,
// 	`id_persona` varchar(255),
// 	`id_funzione` varchar(255),
// 	`permesso` varchar(255),
// 	PRIMARY KEY( `id` )
// );" );

// Build our Editor instance and process the data coming from _POST


$editor = Editor::inst( $db, 'T_Permessi', 'id' );
$crs4 = new Crs4("Admin", $db, $editor);

	$editor->fields(
		Field::inst( 'T_Permessi.id_persona' )
		->options( Options::inst()
		->table( 'V_People_all' )
		->value( 'ID' )
		->label( array('Cognome', 'Nome')  )
		)
		->validator( Validate::dbValues() ),
		Field::inst( 'V_People_all.Cognome' ),
		Field::inst( 'V_People_all.Nome' ),
		
		Field::inst( 'T_Permessi.id_applicazione' )
		->options( Options::inst()
		->table( 'T_Applicazioni' )
		->value( 'id' )
		->label( 'applicazione'  )
		)
		->validator( Validate::dbValues() ),
		Field::inst( 'T_Applicazioni.applicazione' ),
	
		Field::inst( 'T_Permessi.permesso' ),
		Field::inst( 'T_Permessi.owner' )
	)
	->leftJoin( 'V_People_all', 'V_People_all.ID', '=', 'T_Permessi.id_persona' )
	->leftJoin( 'T_Applicazioni', 'T_Applicazioni.id', '=', 'T_Permessi.id_applicazione' )
	->process( $_POST )
	->json();
