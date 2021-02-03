/*
 * Editor client script for DB table T_Fatture
 * Created by http://editor.datatables.net/generator
 */

(function($){


$(document).ready(function() {
	var editor = new $.fn.dataTable.Editor( {
		ajax: 'scripts/crs4-bolle.php',
		table: '#T_Bolle',
		fields: [
	
			{
				"label": "Numero Bolla:",
				"name": "n_bolla"
			},
			{
				"label": "Data Bolla:",
				"name": "data_bolla",
				"type": "datetime"
				
			},		
			{
				"label": "ID_Fornitore:",
				"name": "id_fornitore"
			}
			
		]
	} );

	var table = $('#T_Bolle').DataTable( {
		dom: 'Bfrtip',
		ajax: {
			url: 'scripts/crs4-bolle.php',
			type: 'POST'
		},
		serverSide: true,
		deferLoading: true,
		paging: true,
        scrollY: 200,
		columns: [
	
			{
				"data": "n_bolla"
			},
			{
				"data": "data_bolla"
			},
			
			{
				"data": "id_fornitore"
			},
			{
				"data": "id_ordine",
				name: "id_ordine"
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
