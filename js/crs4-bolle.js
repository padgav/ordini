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
				"label": "id_ordine",
				"name": "T_Bolle.id_ordine",
				type: 'hidden'
			},
			{
				"label": "Numero Bolla:",
				"name": "T_Bolle.n_bolla"
			},
			{
				"label": "Data Bolla:",
				"name": "T_Bolle.data_bolla",
				"type": "datetime"
				
			},		
		]
	} );

	editor.on('initCreate', function () {
		//alert(parent.ID_RICHIESTA);
		editor.field('T_Bolle.id_ordine').val(parent.ID_ORDINI);
	});

	var bolle = $('#T_Bolle').DataTable( {
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
				"data": "T_Bolle.n_bolla"
			},
			{
				"data": "T_Bolle.data_bolla"
			},
			
			{
				"data": "T_Bolle.id_ordine",
				name: "id_ordine",
				visible: false,
				searchable: true
			}
		],
		select: {
            style: 'single'
        },
		lengthChange: false,
		buttons: [
			{ extend: 'create', editor: editor },
			{ extend: 'edit',   editor: editor },
			{ extend: 'remove', editor: editor }
		]
	} );

	bolle.on( 'select', function ( e, dt, type, indexes ) {
		if ( type === 'row' ) {
			var data = bolle.rows( indexes ).data();
			var id_bolla = data[0].T_Bolle.id_bolla;
			parent.ID_BOLLA = id_bolla;
		}
	} );
	bolle.on( 'deselect', function ( e, dt, type, indexes ) {
		delete parent.ID_BOLLA;
		// if ( type === 'row' ) {
		// 	var id = parent.ID_ORDINI;
			
		// 	var df = $('#T_Dati_Fisc').DataTable();
		// 	var v = df.columns().search( '' ).column('id_ordine:name').search(id).draw();
	
		// }
	} );

} );

}(jQuery));
