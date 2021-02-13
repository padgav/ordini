/*
 * Editor client script for DB table T_Richiesta
 * Created by http://editor.datatables.net/generator
 */


(function ($) {

	$(document).ready(function () {
		var editor = new $.fn.dataTable.Editor({
			ajax: 'scripts/crs4-richieste.php',
			table: '#T_Richieste',
			template: '#RichiesteCustomForm',
			fields: [
				{
					"label": "Richiedente:",
					"name": "T_Richieste.id_richiedente",
					"type": "select"
				},
				{
					"label": "Responsabile:",
					"name": "T_Richieste.id_responsabile",
					"type": "select"
				},
				{
					"label": "Progetto:",
					"name": "T_Richieste.id_progetto",
					"type": "select"
				},
				{
					"label": "CIG:",
					"name": "T_Richieste.cig"
				},
				{
					"label": "Fornitore:",
					"name": "T_Richieste.id_fornitore",
					"type": "select"
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
					"name": "T_Richieste.note",
					type: "textarea"
				},

				{
					label: "Soglia",
					"name": "T_Richieste.soglia",
					type: "select",
					options: ["Sotto soglia comunitaria", "Sopra soglia comunitaria"]
				},

				{
					label: "Procedura",
					"name": "T_Richieste.procedura",
					type: "select",
					options: ["Procedura aperta", "Procedura negoziata", "Affidamento diretto"]
				},

				// {
				// 	label: "Tipologia di Spesa",
				// 	"name": "T_Richieste.tipologia_spesa",
				// 	type: "select",
				// 	options: ["", "", ""]
				// },

				{
					label: "Prodotti informatici",
					"name": "T_Richieste.prod_inf",
					type: "select",
					options: ["Si", "No"]
				},
				{
					label: "Mepa",
					"name": "T_Richieste.mepa",
					type: "select",
					options: ["Si", "No"]
				},

				{
					label: "Prestazione di servizi",
					"name": "T_Richieste.prestazione_servizi",
					type: "select",
					options: ["Si", "No"]
				},

				{
					label: "Consegna",
					"name": "T_Richieste.consegna",
					type: "checkbox",
					separator: ",",
					options: ["Nessuna", "Posta elettronica", "Invio bene fisico"]
				},

				{
					label: "Convenzione Consip Attiva",
					"name": "T_Richieste.consip",
					type: "select",
					options: ["Si", "No"]
				},

				{
					label: "Forniture presenti su Mepa Beni",
					"name": "T_Richieste.mepa_beni",
					type: "select",
					options: ["Si", "No"]
				},
				{
					label: "Forniture presenti su Mepa Servizi",
					"name": "T_Richieste.mepa_servizi",
					type: "select",
					options: ["Si", "No"]
				},




				{
					label: "Allegati",
					"name": "T_Files[].id",
					type: "uploadMany",
					display: function (file_id, counter) {
						return '<a href="' + editor.file('T_Files', file_id).web_path + '">' + editor.file('T_Files', file_id).filename + '</a>';
					},
					clearText: "Clear",
					noImageText: 'Nessun file'

				},

				{
					"label": "Stato Richiesta:",
					"name": "T_Richieste.id_stato_richiesta",
					type: "select",
					options:[
						"Bozza",
						"In Valutazione",
						"Approvata",
						"Ordine"
					]
				}
			]
		});

		editor.dependent(['T_Richieste.imponibile', 'T_Richieste.iva'], function (val, data, callback) {
			editor.field('T_Richieste.totale').set(parseFloat(data.values['T_Richieste.imponibile']) +  parseFloat( data.values['T_Richieste.iva']));
			callback(true);
		});

		var table = $('#T_Richieste').DataTable({
			dom: 'Bfrtip',
			ajax: 'scripts/crs4-richieste.php',
			scrollX: true,
			language: {
				url: 'http://cdn.datatables.net/plug-ins/1.10.22/i18n/Italian.json'
			},
			order: [[ 2, "desc" ]],
			columns: [
				{
					"data": "T_Richieste.id",
				},
				{
					"data": null,
					render: function (data, type, row) {
						return data.V_People_all.Cognome + ' ' + data.V_People_all.Nome;
					},
					editField: "T_Richieste.owner"
				},
				{
					"data": null,
					render: function (data, type, row) {
						return data.v2.Cognome + ' ' + data.v2.Nome;
					},
					editField: "T_Richieste.id_richiedente"
				},
				{
					"data": null,
					render: function (data, type, row) {
						return data.v3.Cognome + ' ' + data.v3.Nome;
					},
					"editField": "T_Richieste.id_responsabile"
				},
				{
					"data": null,
					render: function (data, type, row) {
						return data.T_Progetti.cdc + ' ' + data.T_Progetti.acronimo;
					},
					"editField": "T_Richieste.id_progetto"
				},
				{
					"data": "T_Richieste.cig"
				},

				{ "data": "T_Fornitori.fornitore", editField: "T_Richieste.id_fornitore" },

				{
					"data": "T_Richieste.oggetto"
				},
				{ data: "T_Richieste.imponibile", render: $.fn.dataTable.render.number('.', ',', 2, '€ ') },
				{ data: "T_Richieste.iva", render: $.fn.dataTable.render.number('.', ',', 2, '€ ') },
				{ data: "T_Richieste.totale", render: $.fn.dataTable.render.number('.', ',', 2, '€ ') },
				{ data: "T_Richieste.note" },
				{ "data": "T_Richieste.soglia" },
				{ "data": "T_Richieste.procedura" },
				// { "data": "T_Richieste.tipologia_spesa" },
				{ "data": "T_Richieste.prod_inf" },
				{ "data": "T_Richieste.mepa" },
				{ "data": "T_Richieste.prestazione_servizi" },
				{ "data": "T_Richieste.consegna" },
				{ "data": "T_Richieste.consip" },
				{ "data": "T_Richieste.mepa_beni" },
				{ "data": "T_Richieste.mepa_servizi" },

				{
					"data": "T_Files[].id",
					type: "uploadMany",
					render: function (file_id) {
						var str = "";
						file_id.forEach(element => {
							str = str + '<a href="' + table.file('T_Files', element).web_path + '">' + table.file('T_Files', element).filename + '</a><br/>';
						});
						return str;
					},
					defaultContent: "Nessun File",
					title: "Allegati"
				},

				// {
				// 	data: "T_Files",
				// 	render: function ( d ) {
				// 		console.log(d);
				// 		return d.length ?
				// 			d.length+' image(s)' :
				// 			'No image';
				// 	},
				// 	title: "Image"
				// },


				{
					"data": "T_Richieste.id_stato_richiesta"
				}
			],
			select: "single",
			lengthChange: false,
			buttons: [
				{ extend: 'create', editor: editor, text:'Nuova Richiesta' },
				{ extend: 'edit', editor: editor, text: 'Modifica'},
				{ extend: 'remove', editor: editor, text: 'Elimina' },
				{ text: "Mostra Bozze", action: function(e, dt, node, config){ dt.column(22).search("Bozza").draw(); }},
				{ text: "Mostra In Valutazione", action: function(e, dt, node, config){ dt.column(22).search("In Valutazione").draw(); }},
				{ text: "Mostra Approvate", action: function(e, dt, node, config){ dt.column(22).search("Approvata").draw(); }},
				{ text: "Mostra trasformate in Ordini", action: function(e, dt, node, config){ dt.column(22).search("Ordine").draw(); }},
				{ text: "Stampa richesta", action: function(e, dt, node, config){ 
					var tobj = $('#T_Richieste_Oggetti').DataTable();
					tobj.button( 'stampa:name' ).trigger(); },
					extend: 'selected'
				}
			]
		});


		table.on('select', function (e, dt, type, indexes) {
			if (type === 'row') {
				var data = table.rows(indexes).data();
				var id = data[0].T_Richieste.id;
				parent.richiesta = data
				parent.ID_RICHIESTA = id;
				$("#crs4-oggetti").css('visibility', 'visible');
				var ro = $('#T_Richieste_Oggetti').DataTable();
				ro.column(0).search(id);
				ro.draw();
			}
		});
		table.on('deselect', function (e, dt, type, indexes) {
			if (type === 'row') {
				var data = table.rows(indexes).data();
				var id = data[0].T_Richieste.id;
				parent.richiesta = data
				parent.ID_RICHIESTA = id;
				$("#crs4-oggetti").css('visibility', 'hidden');
				var ro = $('#T_Richieste_Oggetti').DataTable();
				ro.column(0).search('a');
				ro.draw();
			}
		});
	});



}(jQuery));
