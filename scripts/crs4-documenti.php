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

// The following statement can be removed after the first run (i.e. the database
// table has been created). It is a good idea to do this to help improve
// performance.
// $db->sql( "CREATE TABLE IF NOT EXISTS `T_Comodato` (
// 	`id` int(10) NOT NULL auto_increment,
// 	`owner` varchar(255),
// 	`descrizione` varchar(255),
// 	`numero_inventario` varchar(255),
// 	`numero_serie` varchar(255),
// 	PRIMARY KEY( `ID` )
// );" );

// Build our Editor instance and process the data coming from _POST

$editor = Editor::inst( $db, 'T_Documenti', 'T_Documenti.id' );
$crs4 = new Crs4("Documenti", $db, $editor);



	$editor->fields(
		Field::inst( 'T_Documenti.owner' )
		->options( Options::inst()
		->table( 'V_People_all' )
		->value( 'ID' )
		->label( array('Cognome', 'Nome')  )
		)
		->validator( Validate::dbValues() ),
		Field::inst( 'V_People_all.Cognome' ),
		Field::inst( 'V_People_all.Nome' ),

		Field::inst( 'T_Documenti.tipo' ),
		
		Field::inst( 'T_Documenti.file' )
			->upload( Upload::inst( $_SERVER['DOCUMENT_ROOT'].'/uploads/__ID__.__EXTN__' ) 
			->db( 'T_Files', 'id', array(
                'filename' => Upload::DB_FILE_NAME,
				'filesize' => Upload::DB_FILE_SIZE,
				'filetype' => Upload::DB_CONTENT_TYPE,
				'web_path' => Upload::DB_WEB_PATH
			) )
			)
    		->setFormatter( 'Format::nullEmpty' )

		
	)
	->leftJoin( 'V_People_all', 'V_People_all.ID', '=', 'T_Documenti.owner' );

	$editor->process( $_POST )
	->json();




	