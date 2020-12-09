/*
 * Editor client script for DB table T_Richiesta
 * Created by http://editor.datatables.net/generator
 */

(function ($) {

	$(document).ready(function () {
		var editor = new $.fn.dataTable.Editor({
			ajax: 'scripts/crs4-richieste.php',
			table: '#T_Richieste',
			fields: [
				{
					"label": "Compilata da:",
					"name": "T_Richieste.id_compilata_da"
				},
				{
					"label": "Richiedente:",
					"name": "T_Richieste.id_richiedente",
					"type": "select"
				},
				{
					"label": "Responsabile:",
					"name": "T_Richieste.id_responsabile"
				},
				{
					"label": "Progetto:",
					"name": "T_Richieste.id_progetto"
				},
				{
					"label": "CIG:",
					"name": "T_Richieste.cig"
				},
				{
					"label": "Fornitore:",
					"name": "T_Richieste.id_fornitore"
				},
				{
					"label": "Oggetto:",
					"name": "T_Richieste.oggetto",
					"type": "textarea"
				},
				{
					"label": "Imponibile:",
					"name": "T_Richieste.imponibile"
				},
				{
					"label": "IVA:",
					"name": "T_Richieste.iva"
				},
				{
					"label": "Totale:",
					"name": "T_Richieste.totale"
				},
				{
					"label": "Note:",
					"name": "T_Richieste.note"
				},
				{
					"label": "Cond. Pagamento:",
					"name": "T_Richieste.c_pagamento"
				},
				{
					"label": "Preventivo:",
					"name": "T_Richieste.preventivo"
				},
				{
					"label": "Stato Richiesta:",
					"name": "T_Richieste.id_stato_richiesta"
				}
			]
		});

		var table = $('#T_Richieste').DataTable({
			dom: 'Bfrtip',
			ajax: 'scripts/crs4-richieste.php',
			columns: [
				{
					"data": "T_Richieste.id_compilata_da"
				},
				{
					"data": "V_People_all.Cognome",
					editField: "T_Richieste.id_richiedente"
				},
				{
					"data": "T_Richieste.id_responsabile"
				},
				{
					"data": "T_Richieste.id_progetto"
				},
				{
					"data": "T_Richieste.cig"
				},
				{
					"data": "T_Richieste.id_fornitore"
				},
				{
					"data": "T_Richieste.oggetto"
				},
				{
					"data": "T_Richieste.imponibile"
				},
				{
					"data": "T_Richieste.iva"
				},
				{
					"data": "T_Richieste.totale"
				},
				{
					"data": "T_Richieste.note"
				},
				{
					"data": "T_Richieste.c_pagamento"
				},
				{
					"data": "T_Richieste.preventivo"
				},
				{
					"data": "T_Richieste.id_stato_richiesta"
				}
			],
			select: true,
			lengthChange: false,
			buttons: [
				{ extend: 'create', editor: editor },
				{ extend: 'edit', editor: editor },
				{ extend: 'remove', editor: editor }
			]
		});
	});

}(jQuery));
