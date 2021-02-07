/*
 * Editor client script for DB table T_Dati_Fisc
 * Created by http://editor.datatables.net/generator
 */

(function($){

$(document).ready(function() {

	var editorduplica = new $.fn.dataTable.Editor( {
		ajax: 'scripts/crs4-dati-fiscali-new.php',
		table: '#T_Dati_Fiscali_New',
		fields: [
			
			{
				"name": "T_Dati_Fiscali_New.owner",
				type: 'hidden'
				
			},
			{
				"name": "T_Dati_Fiscali_New.id_ordine",
				type: 'hidden'
			},
			{
				name: "T_Dati_Fiscali_New.id_richiesta",
				type: 'hidden'
				
			},		
			{
				"name": "T_Dati_Fiscali_New.id_richiesta_oggetto",
				type: 'hidden'
			},
		
			{
				"name": "T_Dati_Fiscali_New.id_bolla",
				type: 'hidden'
				
			},
			
			{
				"name": "T_Dati_Fiscali_New.id_fattura",
				type: 'hidden'
				
			},
			{
				label: "Qauntità",
				"name": "T_Dati_Fiscali_New.quantita"
			},
			{
				"name": "T_Dati_Fiscali_New.rata",
				type: 'hidden'
			},
			{
				"name": "T_Dati_Fiscali_New.id_fornitore",
				type: 'hidden'
			},
			{
				"name": "T_Dati_Fiscali_New.numero_inventario",
				type: 'hidden'
			},
			{
				"name": "T_Dati_Fiscali_New.matricola",
				type: 'hidden'
			},
			{
				"name": "T_Dati_Fiscali_New.invetariato_da",
				type: 'hidden'
			},
			{
				"name": "T_Dati_Fiscali_New.posizione",
				type: 'hidden'
			}
			
		]
	} );

	// var editorquantita = new $.fn.dataTable.Editor( {
	// 	ajax: 'scripts/crs4-dati-fiscali-new.php',
	// 	table: '#T_Dati_Fiscali_New',
	// 	fields: [
			
	// 		{
	// 			"label": "Quantità:",
	// 			"name": "T_Dati_Fiscali_New.quantita"
	// 		}
	// 	]
	// } );

	var editorbollafattura = new $.fn.dataTable.Editor( {
		ajax: 'scripts/crs4-dati-fiscali-new.php',
		table: '#T_Dati_Fiscali_New',
		fields: [
		
			{
				"name": "T_Dati_Fiscali_New.id_bolla",
				type: 'hidden'
				
			},
			
			{
				"name": "T_Dati_Fiscali_New.id_fattura",
				type: 'hidden'
				
			},
			
		]
	} );

	var editorinventario = new $.fn.dataTable.Editor( {
		ajax: 'scripts/crs4-dati-fiscali-new.php',
		table: '#T_Dati_Fiscali_New',
		fields: [
			{
				"label": "Inventario:",
				"name": "T_Dati_Fiscali_New.numero_inventario"
			},
			{
				"label": "Matricola:",
				"name": "T_Dati_Fiscali_New.matricola"
			}
			
		]
	} );

	var editor = new $.fn.dataTable.Editor( {
		ajax: 'scripts/crs4-dati-fiscali-new.php',
		table: '#T_Dati_Fiscali_New',
		fields: [
			{
				"label": "Quantità:",
				"name": "T_Dati_Fiscali_New.quantita"
			}
		]
	} );

	var dati_fiscali_new = $('#T_Dati_Fiscali_New').DataTable( {
		dom: 'Bfrtip',
		deferLoading: true,
		ajax: {
			url: 'scripts/crs4-dati-fiscali-new.php',
			type: 'POST'
		},
		serverSide: true,
		paging: true,
		scrollY: 400,
		scrollX: true,
		columns: [
			{
				"data": "T_Richieste_Oggetti.descrizione",
				width: '100%'
			},
			{
				data: "T_Dati_Fiscali_New.id_ordine",
				visible: false,
				name: "id_ordine",
				searchable: true,
			},		
			{
				"data": "T_Richieste_Oggetti.quantita"
			},
			{
				"data": "T_Dati_Fiscali_New.quantita"
			},
			{
				"data": "T_Dati_Fiscali_New.rata"
			},
			{
				"data": "T_Dati_Fiscali_New.importo_fattura"
			},
			{
				"data": "T_Fatture.n_fattura",
				editField: "T_Fatture.id_fattura"
			},
			{
				"data": "T_Bolle.n_bolla",
				editField: "T_Bolle.id_bolla"
			},
			{
				"data": "T_Richieste.cig"
			},
			{
				"data": "T_Richieste_Oggetti.tipo"
			},
			{
				"data": "T_Richieste_Oggetti.categoria"
			},
			{
				"data": "T_Dati_Fiscali_New.numero_inventario"
			},
			{
				"data": "T_Dati_Fiscali_New.matricola"
			}
		],
		select: true,
		lengthChange: false,
		buttons: [
			{ extend: 'create', editor: editor, text: 'Nuovo' },
			{ extend: 'remove', editor: editor, text: 'Elimina' },
			{ extend: 'edit',   editor: editor, text: 'Modifica Quantità' },
			{ 
				text: 'Assegna Bolla',
				action: function ( e, dt, node, config ) { 
					if(parent.ID_BOLLA != undefined){
						editorbollafattura
						.edit( dati_fiscali_new.rows( { selected: true } ).indexes(), false )
						.set( 'T_Dati_Fiscali_New.id_bolla', parent.ID_BOLLA)
						.submit();
					}
				}
			},
			{ 
			text: 'Assegna Fattura',
			action: function ( e, dt, node, config ) { 
				if(parent.ID_BOLLA != undefined){
					editorbollafattura
					.edit( dati_fiscali_new.rows( { selected: true } ).indexes(), false )
					.set( 'T_Dati_Fiscali_New.id_fattura', parent.ID_FATTURA)
					.submit();
				}
			}
			},
			{
                extend: "selected",
                text: 'Duplica',
                action: function ( e, dt, node, config ) {
                    // Start in edit mode, and then change to create
                    editorduplica
                        .edit( dati_fiscali_new.rows( {selected: true} ).indexes(), {
                            title: 'Duplica',
                            buttons: 'Duplica'
                        } ) 
                        .mode( 'create' );
                }
			},
			{ extend: 'edit',   editor: editorinventario, text: 'Inventario' },

		]
	} );
} );

}(jQuery));
