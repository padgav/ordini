<?php

/*
 * Editor server script for DB table T_Fatture
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
Editor::inst( $db, 'T_Fatture', 'ID_Fattura' )
	->fields(
		Field::inst( 'T_Fatture.id_fattura' ),
		Field::inst( 'T_Fatture.prot_iva' ),
		Field::inst( 'T_Fatture.n_fattura' ),
		Field::inst( 'T_Fatture.data_reg_fatt' )
			->validator( Validate::dateFormat( 'D, j M y' ) )
			->getFormatter( Format::dateSqlToFormat( 'D, j M y' ) )
			->setFormatter( Format::dateFormatToSql( 'D, j M y' ) ),
		Field::inst( 'T_Fatture.data_fattura' )
			->validator( Validate::dateFormat( 'D, j M y' ) )
			->getFormatter( Format::dateSqlToFormat( 'D, j M y' ) )
			->setFormatter( Format::dateFormatToSql( 'D, j M y' ) ),
		Field::inst( 'T_Fatture.n_convenzione' ),
		Field::inst( 'T_Fatture.id_fornitore' )
		->options( Options::inst()
			  ->table( 'T_Fornitori' )
			  ->value( 'id_fornitore' )
			  ->label( 'Fornitore' )
		  )
		  ->validator( Validate::dbValues() ),
	   Field::inst( 'T_Fornitori.fornitore' ),


		Field::inst( 'T_Fatture.id_st_fatt' ),
		Field::inst( 'T_Fatture.cambio_fattura' ),
		Field::inst( 'T_Fatture.id_valuta' ),
		Field::inst( 'T_Fatture.nascosto' ),
		Field::inst( 'T_Fatture.id_ordine' )
		
	)
	->leftJoin( 'T_Fornitori', 'T_Fornitori.id_fornitore', '=', 'T_Fatture.id_fornitore' )
	->process( $_POST )
	->json();
