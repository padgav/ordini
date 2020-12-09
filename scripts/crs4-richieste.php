<?php

/*
 * Editor server script for DB table T_Richiesta
 * Created by http://editor.datatables.net/generator
 */

// DataTables PHP library and database connection
include( "lib/DataTables.php" );

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
// $db->sql( "CREATE TABLE IF NOT EXISTS `T_Richieste` (
// 	`ID_Richiesta` int(10) NOT NULL auto_increment,
// 	`id_compilata_da` numeric(9,2),
// 	`id_richiedente` numeric(9,2),
// 	`id_responsabile` numeric(9,2),
// 	`id_progetto` numeric(9,2),
// 	`cig` numeric(9,2),
// 	`id_fornitore` numeric(9,2),
// 	`oggetto` text,
// 	`imponibile` numeric(9,2),
// 	`iva` numeric(9,2),
// 	`totale` numeric(9,2),
// 	`note` varchar(255),
// 	`c_pagamento` varchar(255),
// 	`preventivo` varchar(255),
// 	`id_stato_richiesta` numeric(9,2),
// 	PRIMARY KEY( `ID_Richiesta` )
// );" );

// Build our Editor instance and process the data coming from _POST
Editor::inst( $db, 'T_Richieste', 'ID_Richiesta' )
	->fields(
		Field::inst( 'T_Richieste.id_compilata_da' ),
		Field::inst( 'T_Richieste.id_richiedente' )
		->options( Options::inst()
		->table( 'V_People_all' )
		->value( 'ID' )
		->label( array('Nome', 'Cognome')  )
		)
		->validator( Validate::dbValues() ),
		Field::inst( 'V_People_all.Cognome' ),

		Field::inst( 'T_Richieste.id_responsabile' ),
		Field::inst( 'T_Richieste.id_progetto' ),
		Field::inst( 'T_Richieste.cig' ),
		Field::inst( 'T_Richieste.id_fornitore' ),
		Field::inst( 'T_Richieste.oggetto' ),
		Field::inst( 'T_Richieste.imponibile' ),
		Field::inst( 'T_Richieste.iva' ),
		Field::inst( 'T_Richieste.totale' ),
		Field::inst( 'T_Richieste.note' ),
		Field::inst( 'T_Richieste.c_pagamento' ),
		Field::inst( 'T_Richieste.preventivo' ),
		Field::inst( 'T_Richieste.id_stato_richiesta' )
	)
	->leftJoin( 'V_People_all', 'V_People_all.ID', '=', 'T_Richieste.id_richiedente' )
	->process( $_POST )
	->json();
