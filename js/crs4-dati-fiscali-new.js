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
			},
			{
				"label": "Inventariato da:",
				"name": "T_Dati_Fiscali_New.inventariato_da",
				"type": "select"
			},
			{
				"label": "Assegnato a:",
				"name": "T_Dati_Fiscali_New.assegnato_a",
				"type": "select"
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
		language: {
			url: 'http://cdn.datatables.net/plug-ins/1.10.22/i18n/Italian.json'
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
			},
			{
				"data": null,
				render: function (data, type, row) {
					return data.V_People_all.Cognome + ' ' + data.V_People_all.Nome;
				},
				editField: "T_Dati_Fiscali_New.inventariato_da"
			},
			{
				"data": null,
				render: function (data, type, row) {
					return data.v2.Cognome + ' ' + data.v2.Nome;
				},
				editField: "T_Dati_Fiscali_New.assegnato_a"
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
			{ extend: 'edit',   editor: editorinventario, text: 'Inventario' , name:'inventario'},

		]
	} );



	// dati_fiscali_new
    // .on('select', function () {
    //     dati_fiscali_new.rows({selected: true}).every( function ( rowIdx, tableLoop, rowLoop ) {
	// 		var data = this.data();
	// 		console.log(data.T_Richieste_Oggetti.categoria);
    //         if ( data.T_Richieste_Oggetti.categoria != 'Bene Inventariabile') {
	// 			console.log(dati_fiscali_new.button( 'inventario:name' ))
	// 			dati_fiscali_new.button( 6 ).disable();
    //             // window.setTimeout(function (){
	// 			// 	dati_fiscali_new.button( 6 ).disable();
	// 			// },30)
    //         }
    //     });
	// });
	
} );

}(jQuery));
