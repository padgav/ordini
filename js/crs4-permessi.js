/*
 * Editor client script for DB table T_permessi
 * Created by http://editor.datatables.net/generator
 */

(function($){

$(document).ready(function() {
	var cookieValue = $.cookie("PHPSESSID");
    if (cookieValue === undefined) {
	    window.location.href  = "dashboard.html";
    }


	var editor = new $.fn.dataTable.Editor( {
		ajax: 'scripts/crs4-permessi.php',
		table: '#T_Permessi',
		fields: [
			{
				"label": "Persona:",
				"name": "T_Permessi.id_persona",
				"type": "select"
			},
			{
				"label": "Applicazione:",
				"name": "T_Permessi.id_applicazione",
				"type": "select",
				
			},
			{
				"label": "Permesso:",
				"name": "T_Permessi.permesso",
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
	

	var table = $('#T_Permessi').DataTable( {
		dom: 'Bfrtip',
		ajax: 'scripts/crs4-permessi.php',
		columns: [
			{
				"data": null,
				render: function ( data, type, row ) {
                    // Combine the first and last names into a single table field
                    return data.V_People_all.Cognome + ' ' + data.V_People_all.Nome;
                },
				editField: "T_Permessi.id_persona"
			},
			{
				"data": null,
				render: function ( data, type, row ) {
                    // Combine the first and last names into a single table field
                    return data.T_Applicazioni.applicazione;
                },
				editField: "T_Permessi.id_applicazione"
			},
			{
				"data": "T_Permessi.permesso"
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

	table.on( 'error.dt', function ( e, settings, techNote, message ) {
		console.log( 'An error has been reported by DataTables: ', message );
		window.location.href  = "dashboard.html";
    } )
} );

}(jQuery));
