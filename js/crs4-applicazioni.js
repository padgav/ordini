/*
 * Editor client script for DB table T_permessi
 * Created by http://editor.datatables.net/generator
 */

(function($){

$(document).ready(function() {
	var editor = new $.fn.dataTable.Editor( {
		ajax: 'scripts/crs4-applicazioni.php',
		table: '#T_Applicazioni',
		fields: [
			{
				"label": "Applicazione:",
				"name": "T_Applicazioni.applicazione",
			}
		]
	} );
	

	var table = $('#T_Applicazioni').DataTable( {
		dom: 'Bfrtip',
		ajax: 'scripts/crs4-applicazioni.php',
		columns: [
			{
				"data": "T_Applicazioni.applicazione"
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
