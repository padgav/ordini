/*
 * Editor client script for DB table T_Fatture
 * Created by http://editor.datatables.net/generator
 */

(function($){

$(document).ready(function() {
	var editor = new $.fn.dataTable.Editor( {
		ajax: 'scripts/crs4-fatture.php',
		table: '#T_Fatture',
		fields: [

			{
				"label": "id_ordine",
				"name": "T_Fatture.id_ordine",
				type: 'hidden'
			},
			{
				"label": "Prot_IVA:",
				"name": "T_Fatture.prot_iva"
			},
			{
				"label": "N_Fattura:",
				"name": "T_Fatture.n_fattura"
			},
			{
				"label": "Data_Fattura:",
				"name": "T_Fatture.data_fattura",
				"type": "datetime"
				
			}
		]
	} );


	editor.on( 'initCreate', function () {
		editor.field('T_Fatture.id_ordine').val(parent.ID_ORDINI);
	} );

	var fatture = $('#T_Fatture').DataTable( {
		dom: 'Bfrtip',
		ajax: {
			url: 'scripts/crs4-fatture.php',
			type: 'POST'
		},
		serverSide: true,
		deferLoading: true,
		paging: true,
        scrollY: 200,
		columns: [
			{
				"data": "T_Fatture.prot_iva"
			},
			{
				"data": "T_Fatture.n_fattura"
			},
			{
				"data": "T_Fatture.data_fattura"
			},
			{
				"data": "T_Fatture.id_ordine",
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

	fatture.on( 'select', function ( e, dt, type, indexes ) {
		if ( type === 'row' ) {
			var data = fatture.rows( indexes ).data();
			var id_fattura = data[0].T_Fatture.id_fattura;
			parent.ID_FATTURA = id_fattura;
			//var df = $('#T_Dati_Fiscali_New').DataTable();
			//var v = df.columns().search( '' ).column('id_fattura:name').search( id_fattura ).draw();
	
		}
	} );
	fatture.on( 'deselect', function ( e, dt, type, indexes ) {
		delete parent.ID_FATTURA;
		// if ( type === 'row' ) {
		// 	var id = parent.ID_ORDINI;
		// 	alert(id);
		// 	var df = $('#T_Dati_Fisc').DataTable();
		// 	var v = df.columns().search( '' ).column('id_ordine:name').search(id).draw();
	
		// }
	} );
	

} );




}(jQuery));
