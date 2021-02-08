<?php

/*
 * Editor server script for DB table T_Richiesta
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
$editor = Editor::inst( $db, 'T_Richieste', 'ID' );
$crs4 = new Crs4("Richieste", $db, $editor);
	$editor->fields(
		Field::inst( 'T_Richieste.owner' ),

		Field::inst( 'T_Richieste.id_richiedente' )
		->options( Options::inst()
		->table( 'V_People_all' )
		->value( 'ID' )
		->label( array('Cognome', 'Nome')  )
		)
		->validator( Validate::dbValues() ),
		

		Field::inst( 'T_Richieste.id_responsabile' )
		->options( Options::inst()
		->table( 'V_People_all' )
		->value( 'ID' )
		->label( array('Cognome', 'Nome')  )
		)
		->validator( Validate::dbValues() ),


		Field::inst( 'T_Richieste.id_progetto' )
		->options( Options::inst()
		->table( 'T_Progetti' )
		->value( 'ID' )
		->label( array('cdc', 'acronimo')  )
		)
		->validator( Validate::dbValues() ),

		Field::inst( 'T_Richieste.cig' ),

		Field::inst( 'T_Richieste.id_fornitore' )
		->options( Options::inst()
		->table( 'T_Fornitori' )
		->value( 'id_fornitore' )
		->label( 'fornitore' )
		)
		->validator( Validate::dbValues() ),


		Field::inst( 'T_Richieste.oggetto' ),
		Field::inst( 'T_Richieste.imponibile' ),
		Field::inst( 'T_Richieste.iva' ),
		Field::inst( 'T_Richieste.totale' ),
		Field::inst( 'T_Richieste.note' ),
		
		Field::inst( 'T_Richieste.soglia' ),
		Field::inst( 'T_Richieste.procedura' ),
		Field::inst( 'T_Richieste.tipologia_spesa' ),
		Field::inst( 'T_Richieste.prod_inf' ),
		Field::inst( 'T_Richieste.mepa' ),
		Field::inst( 'T_Richieste.prestazione_servizi' ),
		Field::inst( 'T_Richieste.consegna' ),
		Field::inst( 'T_Richieste.consip' ),
		Field::inst( 'T_Richieste.mepa_beni' ),
		Field::inst( 'T_Richieste.mepa_servizi' ),
		Field::inst( 'T_Richieste.id_stato_richiesta' ),
		Field::inst( 'V_People_all.Cognome' ),
		Field::inst( 'V_People_all.Nome' ),
		Field::inst( 'v2.Cognome' ),
		Field::inst( 'v2.Nome' ),
		Field::inst( 'v3.Cognome' ),
		Field::inst( 'v3.Nome' ),
		Field::inst( 'T_Fornitori.fornitore' ),
		Field::inst( 'T_Progetti.cdc' ),
		Field::inst( 'T_Progetti.acronimo' ),
		Field::inst( 'T_Progetti.cup' ),
		Field::inst( 'T_Progetti.finanziamento' ),
		Field::inst( 'T_Richieste.id' )
		)
		->join(
			Mjoin::inst( 'T_Files' )
				->link( 'T_Richieste.id', 'T_richieste_files.id_richiesta' )
				->link( 'T_Files.id',     'T_richieste_files.id_file' )
				->fields(
					Field::inst( 'id' )
						->upload( Upload::inst( $_SERVER['DOCUMENT_ROOT'].'/uploads/__ID__.__EXTN__' )
							->db( 'T_Files', 'id', array(
								'filename'    => Upload::DB_FILE_NAME,
								'filesize'    => Upload::DB_FILE_SIZE,
								'filetype'    => Upload::DB_CONTENT_TYPE,
								'web_path'    => Upload::DB_WEB_PATH,
							) )
							
		
						)
				)
		)
	 ->leftJoin( 'V_People_all', 'V_People_all.ID', '=', 'T_Richieste.owner' )
	 ->leftJoin( 'V_People_all as v2', 'v2.ID', '=', 'T_Richieste.id_richiedente' )
	 ->leftJoin( 'V_People_all as v3', 'v3.ID', '=', 'T_Richieste.id_responsabile' )
	 ->leftJoin( 'T_Fornitori ', 'T_Fornitori.id_fornitore', '=', 'T_Richieste.id_fornitore' )
	 ->leftJoin( 'T_Progetti ', 'T_Progetti.id', '=', 'T_Richieste.id_progetto' )
	->process( $_POST )
	->json();



	// Field::inst( 'T_Richieste.allegati' )
		// 	->upload( Upload::inst( $_SERVER['DOCUMENT_ROOT'].'/uploads/__ID__.__EXTN__' ) 
		// 	->db( 'T_Files', 'id', array(
		// 		'filename' => Upload::DB_FILE_NAME,
		// 		'filesize' => Upload::DB_FILE_SIZE,
		// 		'filetype' => Upload::DB_CONTENT_TYPE,
		// 		'web_path' => Upload::DB_WEB_PATH
		// 	) )
		// 	)
		// 	->setFormatter( 'Format::nullEmpty' ),