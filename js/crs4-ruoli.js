/*
 * Editor client script for DB table T_permessi
 * Created by http://editor.datatables.net/generator
 */

(function($){

$(document).ready(function() {
	var editor = new $.fn.dataTable.Editor( {
		ajax: 'scripts/crs4-ruoli.php',
		table: '#T_Ruoli',
		fields: [
			{
				"label": "Ruolo:",
				"name": "T_Ruoli.ruolo",
			}
		]
	} );
	

	var table = $('#T_Ruoli').DataTable( {
		dom: 'Bfrtip',
		ajax: 'scripts/crs4-ruoli.php',
		columns: [
			{
				"data": "T_Ruoli.ruolo"
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
