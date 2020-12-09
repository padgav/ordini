/*
 * Editor client script for DB table T_permessi
 * Created by http://editor.datatables.net/generator
 */

(function($){

$(document).ready(function() {
	var editor = new $.fn.dataTable.Editor( {
		ajax: 'scripts/crs4-persone-ruolo.php',
		table: '#T_Persone_Ruolo',
		fields: [
			{
				"label": "Persona:",
				"name": "T_Persone_Ruolo.id_persona",
				"type": "select"
			},
			{
				"label": "Ruolo:",
				"name": "T_Persone_Ruolo.id_ruolo",
				"type": "select",
			}
		]
	} );
	

	var table = $('#T_Persone_Ruolo').DataTable( {
		dom: 'Bfrtip',
		ajax: 'scripts/crs4-persone-ruolo.php',
		columns: [
			{
				"data": null,
				render: function ( data, type, row ) {
                    // Combine the first and last names into a single table field
                    return data.V_People_all.Cognome + ' ' + data.V_People_all.Nome;
                },
				editField: "T_Persone_Ruolo.id_persona"
			},
			{
				"data": null,
				render: function ( data, type, row ) {
                    // Combine the first and last names into a single table field
                    return data.T_Ruoli.ruolo;
                },
				editField: "T_Persone_Ruolo.id_ruolo"
			},
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
