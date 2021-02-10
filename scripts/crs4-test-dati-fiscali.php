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


// Build our Editor instance and process the data coming from _POST
$editor =  Editor::inst( $db, 'v_beni_dati_fisc', 'ID_Dati_Fisc' );

	$dati_fisc = $editor->fields(
		Field::inst( 'v_beni_dati_fisc.id_ordine' ),
		Field::inst( 'v_beni_dati_fisc.id_fattura' ),
		Field::inst( 'v_beni_dati_fisc.id_bolla' ),
		Field::inst( 'v_beni_dati_fisc.imp_fattura' ),
		Field::inst( 'v_beni_dati_fisc.qta_fattura' ),
		Field::inst( 'v_beni_dati_fisc.descrizione_bene' ),
		Field::inst( 'v_beni_dati_fisc.n_inventario' ),
		Field::inst( 'v_beni_dati_fisc.matricola' ),
	)
	->process( $_POST )
	->data();
	//print_r($gamma['data']);


	foreach ($dati_fisc['data'] as $value){
		$row = $value['v_beni_dati_fisc'];
		//print($row['descrizione_bene'] . "<br/>");

		
		
	

		$insert = array(
			'id_ordine'   => $row['id_ordine'],
			'id_fattura'   => $row['id_fattura'],
			'id_bolla'   => $row['id_bolla'],
			'importo_fattura' => $row['imp_fattura'],
			'quantita' => $row['qta_fattura'],
			'numero_inventario' => $row['n_inventario'],
			'matricola' => $row['matricola']
		);

		$db->insert( 'T_Dati_Fiscali_New', $insert);
		print_r ($insert);

		//$db->insert( 'T_Dati_Fiscali_New',$insert );

		// $db->insert( 'T_Dati_Fiscali_New', array(
		// 		'id_ordine' => $id_ordine,
		// 		'descrizione' => $row['descrizione']
		// ) );
		// // $statement2 = 'SELECT LAST_INSERT_ID() as id';
		// // $result2 =$db ->raw()->exec($statement2);
		// // $row2 = $result2->fetch();
		// // $id_obj = $row2['id'];

	

	}
