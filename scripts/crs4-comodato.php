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

$editor = Editor::inst( $db, 'T_Comodato', 'T_Comodato.id' );
$crs4 = new Crs4("Comodato", $db, $editor);

$editor->on( 'preCreate', function ( $editor, $values ) {
	$descrizione = "";
	$valore = 0;
	$numeroserie = "";
	$numinv = "";
	$ninv = $values["T_Comodato"]["numero_inventario"];
	$nserie = $values["T_Comodato"]["numero_serie"];
	if($ninv != ""){
		$result = $editor->db()->select("V_Beni_Dati_Fisc", ['*'] , function($q) use ( $ninv )
		{
			$q->where('V_Beni_Dati_Fisc.N_inventario', $ninv, '=');
		})->fetchAll();

		
		foreach ($result as $value){
			//echo json_encode($value);
			
			$descrizione = $descrizione . " " . $value["Descrizione_Bene"];
			$valore = $valore + $value["Imp_Fattura"] / 1936.27;
			$numeroserie = $numeroserie ." ". $value["Matricola"];
		}
		$editor
		->field( 'T_Comodato.numero_serie' )
		->setValue($numeroserie);
	}
	elseif($nserie != ""){
		$result = $editor->db()->select("V_Beni_Dati_Fisc", ['*'] , function($q) use ( $nserie )
		{
			$q->where('V_Beni_Dati_Fisc.matricola', $nserie, '=');
		})->fetchAll();

		foreach ($result as $value){
			//echo json_encode($value);
			
			$descrizione = $descrizione . " " . $value["Descrizione_Bene"];
			$valore = $valore + $value["Imp_Fattura"] / 1936.27;
			$numinv = $numinv ." ". $value["N_Inventario"];
		}
		$editor
		->field( 'T_Comodato.numero_inventario' )
		->setValue($numinv);
	}
	

	//echo json_encode($result);
	$editor
	->field( 'T_Comodato.descrizione' )
	->setValue($descrizione);
	$editor
	->field( 'T_Comodato.valore' )
	->setValue(round($valore,2));
	
	
});

	$editor->fields(
		Field::inst( 'T_Comodato.owner' )
		->options( Options::inst()
		->table( 'V_People_all' )
		->value( 'ID' )
		->label( array('Cognome', 'Nome')  )
		)
		->validator( Validate::dbValues() ),
		Field::inst( 'V_People_all.Cognome' ),
		Field::inst( 'V_People_all.Nome' ),

		Field::inst( 'T_Comodato.descrizione' ),
		Field::inst( 'T_Comodato.numero_inventario' )
		->validator(Validate::minNum( 999 )),
		
		Field::inst( 'T_Comodato.numero_serie' ),
		Field::inst( 'T_Comodato.valore' )
		
	)
	->leftJoin( 'V_People_all', 'V_People_all.ID', '=', 'T_Comodato.owner' );

	$editor->process( $_POST )
	->json();




	