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
$db->sql( "CREATE TABLE IF NOT EXISTS `T_Ruoli` (
	`id` int(10) NOT NULL auto_increment,
	`ruolo` varchar(255),
	PRIMARY KEY( `id` )
);" );

// Build our Editor instance and process the data coming from _POST

$editor = Editor::inst( $db, 'T_Ruoli', 'id' );
$crs4 = new Crs4("Admin", $db, $editor);
	$editor->fields(
		Field::inst( 'T_Ruoli.owner' ),
		Field::inst( 'T_Ruoli.ruolo' )
	)
	->process( $_POST )
	->json();
