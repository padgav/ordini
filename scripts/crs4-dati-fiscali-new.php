<?php

/*
 * Editor server script for DB table T_Dati_Fisc
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
$editor = Editor::inst( $db, 'T_Dati_Fiscali_New', 'id' );
$crs4 = new Crs4("Ordini", $db, $editor);
	$editor->fields(
		Field::inst( 'T_Dati_Fiscali_New.owner' ),

        Field::inst( 'T_Dati_Fiscali_New.id_ordine' ),
			
		Field::inst( 'T_Dati_Fiscali_New.id_richiesta' )
		->options( Options::inst()
                ->table( 'T_Richieste' )
                ->value( 'ID' )
                ->label( array('cig'))                
            )
			->validator( Validate::dbValues() ),
		Field::inst( 'T_Richieste.cig' ),

		Field::inst( 'T_Dati_Fiscali_New.id_richiesta_oggetto' )
		->options( Options::inst()
					->table( 'T_Richieste_Oggetti' )
					->value( 'id' )
					->label( array('descrizione'))                
				)
				->validator( Validate::dbValues() ),
		Field::inst( 'T_Richieste_Oggetti.descrizione' ),
		Field::inst( 'T_Richieste_Oggetti.quantita' ),
		Field::inst( 'T_Richieste_Oggetti.tipo' ),
		Field::inst( 'T_Richieste_Oggetti.categoria' ),


		Field::inst( 'T_Dati_Fiscali_New.id_bolla' )
		->options( Options::inst()
					->table( 'T_Bolle' )
					->value( 'ID_Bolla' )
					->label( 'n_bolla')                
	),
				
		Field::inst( 'T_Bolle.n_bolla' ),

		Field::inst( 'T_Dati_Fiscali_New.id_fattura' )
		->options( Options::inst()
							->table( 'T_Fatture' )
							->value( 'ID_Fattura' )
							->label( array('n_fattura'))                
	),
		Field::inst( 'T_Fatture.n_fattura' ),

		Field::inst( 'T_Dati_Fiscali_New.importo_fattura' ),
		Field::inst( 'T_Dati_Fiscali_New.quantita' ),
		Field::inst( 'T_Dati_Fiscali_New.rata' ),
		Field::inst( 'T_Dati_Fiscali_New.numero_inventario' ),
		Field::inst( 'T_Dati_Fiscali_New.matricola' ),

		Field::inst( 'T_Dati_Fiscali_New.assegnato_a' )
		->options( Options::inst()
		->table( 'V_People_all' )
		->value( 'ID' )
		->label( array('Nome', 'Cognome')  )
		)
		->validator( Validate::dbValues() ),


		Field::inst( 'T_Dati_Fiscali_New.inventariato_da' )
		->options( Options::inst()
							->table( 'V_People_all' )
							->value( 'ID' )
							->label( array('Nome', 'Cognome'))                
						)
		->validator( Validate::dbValues() ),
		Field::inst( 'V_People_all.Cognome' ),
		Field::inst( 'V_People_all.Nome' ),
		Field::inst( 'v2.Cognome' ),
		Field::inst( 'v2.Nome' )


	)
	->leftJoin( 'T_Ordini', 'T_Ordini.ID_Ordine', '=', 'T_Dati_Fiscali_New.id_ordine' )
    ->leftJoin( 'T_Richieste', 'T_Richieste.ID', '=', 'T_Dati_Fiscali_New.id_richiesta' )
    ->leftJoin( 'T_Richieste_Oggetti', 'T_Richieste_Oggetti.id', '=', 'T_Dati_Fiscali_New.id_richiesta_oggetto' )
	->leftJoin( 'T_Bolle', 'T_Bolle.ID_Bolla', '=', 'T_Dati_Fiscali_New.id_bolla' )
	->leftJoin( 'T_Fatture', 'T_Fatture.ID_Fattura', '=', 'T_Dati_Fiscali_New.id_fattura' )
	->leftJoin( 'V_People_all', 'V_People_all.ID', '=', 'T_Dati_Fiscali_New.inventariato_da' )
	->leftJoin( 'V_People_all as v2', 'v2.ID', '=', 'T_Dati_Fiscali_New.assegnato_a' )
	->process( $_POST )
	->json();
