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

	exit(1);

// Build our Editor instance and process the data coming from _POST
$editor =  Editor::inst( $db, 'T_Beni_Gamma_New_New', 'id' );

	$gamma = $editor->fields(
		Field::inst( 'T_Beni_Gamma_New_New.numreg' ),
		Field::inst( 'T_Beni_Gamma_New_New.numero_inventario' ),
		Field::inst( 'T_Beni_Gamma_New_New.seriale' ),
		Field::inst( 'T_Beni_Gamma_New_New.descrizione' ),
		Field::inst( 'T_Beni_Gamma_New_New.ubicazione' ),
		Field::inst( 'T_Beni_Gamma_New_New.importo' ),
		Field::inst( 'T_Beni_Gamma_New_New.cdc' ),
		Field::inst( 'T_Beni_Gamma_New_New.cdc_descr' ),
		Field::inst( 'T_Beni_Gamma_New_New.ordine' ),
		Field::inst( 'T_Beni_Gamma_New_New.id_fornitore' ),
		Field::inst( 'T_Beni_Gamma_New_New.id_anagen' ),
		Field::inst( 'T_Beni_Gamma_New_New.ragione_sociale' ),
		Field::inst( 'T_Beni_Gamma_New_New.indirizzo' ),
		Field::inst( 'T_Beni_Gamma_New_New.p_iva' ),
		Field::inst( 'T_Beni_Gamma_New_New.cod_fisc' ),
		Field::inst( 'T_Beni_Gamma_New_New.cap' ),
		Field::inst( 'T_Beni_Gamma_New_New.citta') 
	)
	
	->process( $_POST )
	->data();
	//print_r($gamma['data']);

	$fornitori = array();
	$ordini = array();
	$cdc = array();
	foreach ($gamma['data'] as $value){
		$row = $value['T_Beni_Gamma_New_New'];
		$gammacdc = substr($row['cdc'], 0, 4);

		$gammacdc_descr = $row['cdc_descr'];

		$statementcdc = "SELECT id , acronimo from T_Progetti where cdc = $gammacdc";
			$resultcdc =$db ->raw()->exec($statementcdc);
			$rowcdc = $resultcdc->fetch();
			$idcdc = $rowcdc['id'];
			$acronimo = $rowcdc['acronimo'];
			print("$idcdc   $acronimo  $gammacdc_descr<br/>");
			$cdc[$row['cdc']] = $idcdc;
	}

	
	foreach ($gamma['data'] as $value){
		$row = $value['T_Beni_Gamma_New_New'];

		if(!array_key_exists($row['id_fornitore'] , $fornitori,) ){
			print("inserisco " . $row['id_fornitore'] . "<br/>");
			// print($row['id_fornitore'] . "<br/>");
			// print($row['ragione_sociale'] . "<br/>");
			// print($row['indirizzo'] . "<br/>");
			// print($row['p_iva'] . "<br/>");
			// print($row['cod_fisc'] . "<br/>");
			// print($row['cap'] . "<br/>");
			// print($row['citta'] . "<br/>");


			// 	//Fornitori
			$db->insert( 'T_Fornitori', array(
				'Fornitore'   => $row['ragione_sociale'],
				'Indirizzo'   => $row['indirizzo'],
				'cap'   => $row['cap'],
				'citta'   => $row['citta'],
				'piva'   => $row['p_iva'],
				'cfiscale'   => $row['cod_fisc'],
			) );
			$statement0 = 'SELECT LAST_INSERT_ID() as id';
			$result0 =$db ->raw()->exec($statement0);
			$row0 = $result0->fetch();
			$id_fornitore = $row0['id'];
			$fornitori[$row['id_fornitore']] = $id_fornitore;
		}		
		

	}

	// // Ordini	
	foreach ($gamma['data'] as $value){
		$row = $value['T_Beni_Gamma_New_New'];

		if(!array_key_exists($row['numreg'] , $ordini,) ){
		print($row['ordine'] . "<br/>");

		
		//Ordine Fo. num. 58 del 21/02/2019 Vs. num. ODA4800772 del 21/02/2019
		//Ordine Fo. num. 72/00/2019 del 18/03/2019 Vs. num. ODA4846439 del 18/03/2019


		$ordinearr = preg_split("/[\s\/]+/",$row['ordine'] );
		//print_r($ordinearr);
		$num = $ordinearr[3] ;
		$year = $ordinearr[7];
		$data = "$ordinearr[7]-$ordinearr[6]-$ordinearr[5]";
		if($ordinearr[4] == '00') {
			$year = $ordinearr[9];
			$data = "$ordinearr[9]-$ordinearr[8]-$ordinearr[7]";
		}
		print "$data $year $num   <br/>";
		
			
		// 	//Ordini
			$db->insert( 'T_Ordini', array(
				'Oggetto'   => $row['ordine'],
				'ID_Fornitore'   => $fornitori[$row['id_fornitore']],
				'id_cdc'   => $cdc[$row['cdc']],
				'Data_Ordine' => $data,
				'Anno_Ordine' => $year,
				'N_Ordine' => $num,
			) );
			$statement1 = 'SELECT LAST_INSERT_ID() as id';
			$result1 =$db ->raw()->exec($statement1);
			$row1 = $result1->fetch();
			$id_ordine = $row1['id'];


			$ordini[$row['numreg']] = $id_ordine;
		}
	}


	foreach ($gamma['data'] as $value){
		$row = $value['T_Beni_Gamma_New_New'];

		$db->insert( 'T_Richieste_Oggetti', array(
				'id_ordine' => $ordini[$row['numreg']],
				'descrizione' => $row['descrizione'],
		) );
		$statement2 = 'SELECT LAST_INSERT_ID() as id';
		$result2 =$db ->raw()->exec($statement2);
		$row2 = $result2->fetch();
		$id_obj = $row2['id'];

		             
		

		$db->insert( 'T_Dati_Fiscali_New', array(
			'id_ordine'   => $ordini[$row['numreg']],
			'numero_inventario' => $row['numero_inventario'],
			'matricola' => $row['seriale'],
			'importo_fattura' => $row['importo'],
			'posizione' => $row['ubicazione'],
			'id_richiesta_oggetto' => $id_obj
					
		) );

	

	}
