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


$db->sql( "CREATE TABLE IF NOT EXISTS `T_Persone_Ruolo` (
	`id` int(10) NOT NULL auto_increment,
	`id_persona` varchar(255),
	`id_ruolo` int,
	PRIMARY KEY( `id` )
);" );

// Build our Editor instance and process the data coming from _POST
$editor = Editor::inst( $db, 'T_Persone_Ruolo', 'id' );
$crs4 = new Crs4("Admin", $db, $editor);

$editor
	->fields(
		Field::inst( 'T_Persone_Ruolo.id_persona' )
		->options( Options::inst()
		->table( 'V_People_all' )
		->value( 'ID' )
		->label( array('Cognome', 'Nome')  )
		)
		->validator( Validate::dbValues() ),
		Field::inst( 'V_People_all.Cognome' ),
		Field::inst( 'V_People_all.Nome' ),
		
		Field::inst( 'T_Persone_Ruolo.owner' ),

		Field::inst( 'T_Persone_Ruolo.id_ruolo' )
		->options( Options::inst()
		->table( 'T_Ruoli' )
		->value( 'ID' )
		->label( 'Ruolo' )
		)
		->validator( Validate::dbValues() ),
		Field::inst( 'T_Ruoli.ruolo' ),



	)
	->leftJoin( 'V_People_all', 'V_People_all.ID', '=', 'T_Persone_Ruolo.id_persona' )
	->leftJoin( 'T_Ruoli', 'T_Ruoli.ID', '=', 'T_Persone_Ruolo.id_ruolo' )
	->process( $_POST )
	->json();
