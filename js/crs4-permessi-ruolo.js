/*
 * Editor client script for DB table T_permessi
 * Created by http://editor.datatables.net/generator
 */

(function($){

$(document).ready(function() {
	var editor = new $.fn.dataTable.Editor( {
		ajax: 'scripts/crs4-permessi-ruolo.php',
		table: '#T_Permessi_Ruolo',
		fields: [
			{
				"label": "Ruolo:",
				"name": "T_Permessi_Ruolo.id_ruolo",
				"type": "select"
			},
			{
				"label": "Applicazioni:",
				"name": "T_Permessi_Ruolo.id_applicazione",
				"type": "select",
				
			},
			{
				"label": "Permesso:",
				"name": "T_Permessi_Ruolo.permesso",
				"type": "checkbox",
				"separator": ",",
				"options": [
					"VO",
					"EO",
					"VA",
					"EA",
					"VR",
					"ER",
					"VS",
					"ES"
				]
			}
		]
	} );
	

	var table = $('#T_Permessi_Ruolo').DataTable( {
		dom: 'Bfrtip',
		ajax: 'scripts/crs4-permessi-ruolo.php',
		columns: [
			{
				"data": null,
				render: function ( data, type, row ) {
                    // Combine the first and last names into a single table field
                    return data.T_Ruoli.Ruolo;
                },
				editField: "T_Permessi_Ruolo.id_ruolo"
			},
			{
				"data": null,
				render: function ( data, type, row ) {
                    // Combine the first and last names into a single table field
                    return data.T_Applicazioni.applicazione;
                },
				editField: "T_Permessi_Ruolo.id_applicazione"

			},
			{
				"data": "T_Permessi_Ruolo.permesso"
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
