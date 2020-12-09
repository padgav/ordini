/*
 * Editor client script for DB table T_Dati_Fisc
 * Created by http://editor.datatables.net/generator
 */

(function($){

$(document).ready(function() {
	var editor = new $.fn.dataTable.Editor( {
		ajax: 'scripts/crs4-dati-fiscali.php',
		table: '#T_Dati_Fisc',
		fields: [
			
			{
				"label": "Descrizione_Bene_Ord:",
				"name": "descrizione_bene_ord"
			},
			{
				"label": "Descrizione_Bene:",
				"name": "descrizione_bene"
			},
			{
				"label": "Qta_Ordine_Orig:",
				"name": "qta_ordine_orig"
			},
			{
				"label": "Qta_Ordine:",
				"name": "qta_ordine"
			},
			{
				"label": "Qta_Bolla:",
				"name": "qta_bolla"
			},
			{
				"label": "Qta_Fattura:",
				"name": "qta_fattura"
			},
			{
				"label": "Imp_Ordine:",
				"name": "imp_ordine"
			},
			{
				"label": "Imp_Fattura:",
				"name": "imp_fattura"
			},
			{
				"label": "ID_Fattura:",
				"name": "id_fattura"
			},
			{
				"label": "ID_Bolla:",
				"name": "id_bolla"
			},
			{
				"label": "ID_Ordine:",
				"name": "id_ordine"
			},
			{
				"label": "ID_Bene:",
				"name": "id_bene"
			},
			{
				"label": "Id_Dati_Fisc_Proven:",
				"name": "id_dati_fisc_proven"
			},
			{
				"label": "Inventariato:",
				"name": "inventariato"
			},
			{
				"label": "ID_Dismissione:",
				"name": "id_dismissione"
			},
			{
				"label": "ID_Categoria:",
				"name": "id_categoria"
			},
			{
				"label": "ID_Marca:",
				"name": "id_marca"
			},
			{
				"label": "Tipo:",
				"name": "tipo"
			},
			{
				"label": "Modello:",
				"name": "modello"
			},
			{
				"label": "Matricola:",
				"name": "matricola"
			},
			{
				"label": "ID_IVA:",
				"name": "id_iva"
			},
			{
				"label": "Sc_Data:",
				"name": "sc_data",
				"type": "datetime",
				
			},
			{
				"label": "E_Scadenza:",
				"name": "e_scadenza"
			},
			{
				"label": "Ras:",
				"name": "ras"
			}
		]
	} );

	var dati_fiscali = $('#T_Dati_Fisc').DataTable( {
		dom: 'Bfrtip',
		deferLoading: true,
		ajax: {
			url: 'scripts/crs4-dati-fiscali.php',
			type: 'POST'
		},
		serverSide: true,
		paging: true,
		scrollY: 400,
		scrollX: true,
		columns: [
			
			{
				"data": "descrizione_bene_ord"
			},
			{
				"data": "descrizione_bene"
			},
			{
				"data": "qta_ordine_orig"
			},
			{
				"data": "qta_ordine"
			},
			{
				"data": "qta_bolla"
			},
			{
				"data": "qta_fattura"
			},
			{
				"data": "imp_ordine",
				render: $.fn.dataTable.render.number( '.', ',', 0, 'L. ' )
			},
			{
				"data": "imp_fattura",
				render: $.fn.dataTable.render.number( '.', ',', 0, 'L. ' )
			},
			{
				"data": "id_fattura"
			},
			{
				"data": "id_bolla"
			},
			{
				"data": "id_ordine"
			},
			{
				"data": "id_bene"
			},
			{
				"data": "id_dati_fisc_proven"
			},
			{
				"data": "inventariato"
			},
			{
				"data": "id_dismissione"
			},
			{
				"data": "id_categoria"
			},
			{
				"data": "id_marca"
			},
			{
				"data": "tipo"
			},
			{
				"data": "modello"
			},
			{
				"data": "matricola"
			},
			{
				"data": "id_iva"
			},
			{
				"data": "sc_data"
			},
			{
				"data": "e_scadenza"
			},
			{
				"data": "ras"
			}
		],
		select: true,
		lengthChange: false,
		buttons: [
			{ extend: 'create', editor: editor },
			{ extend: 'edit',   editor: editor },
			{ extend: 'remove', editor: editor }
		]
	} );
} );

}(jQuery));
