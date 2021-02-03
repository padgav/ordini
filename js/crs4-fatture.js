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
				"label": "Prot_IVA:",
				"name": "T_Fatture.prot_iva"
			},
			{
				"label": "N_Fattura:",
				"name": "T_Fatture.n_fattura"
			},
			{
				"label": "Data_Reg_Fatt:",
				"name": "T_Fatture.data_reg_fatt",
				"type": "datetime"
				
			},
			{
				"label": "Data_Fattura:",
				"name": "T_Fatture.data_fattura",
				"type": "datetime"
				
			},
			{
				"label": "N_Convenzione:",
				"name": "T_Fatture.n_convenzione"
			},
			{
				"label": "Fornitore:",
				"name": "T_Fatture.id_fornitore",
				type: "select"
			},
			{
				"label": "ID_St_Fatt:",
				"name": "T_Fatture.id_st_fatt"
			},
			{
				"label": "Cambio_Fattura:",
				"name": "T_Fatture.cambio_fattura"
			},
			{
				"label": "ID_Valuta:",
				"name": "T_Fatture.id_valuta"
			},
			{
				"label": "Nascosto:",
				"name": "T_Fatture.nascosto",
				"type": "hidden"
			}
		]
	} );


	editor.on( 'initCreate', function () {
		alert(parent.ID_ORDINI);
		//editor.field( 'myField' ).val( 'defaultValue' );
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
				"data": "T_Fatture.data_reg_fatt"
			},
			{
				"data": "T_Fatture.data_fattura"
			},
			{
				"data": "T_Fatture.n_convenzione"
			},
			{ "data": "T_Fornitori.fornitore",  editField: "T_Fatture.id_fornitore"},
			
			{
				"data": "T_Fatture.id_st_fatt"
			},
			{
				"data": "T_Fatture.cambio_fattura"
			},
			{
				"data": "T_Fatture.id_valuta"
			},
			{
				"data": "T_Fatture.nascosto"
			},
			{
				"data": "T_Fatture.id_ordine",
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

	fatture.on( 'select', function ( e, dt, type, indexes ) {
		if ( type === 'row' ) {
			var data = fatture.rows( indexes ).data();
			var id_fattura = data[0].T_Fatture.id_fattura;
			parent.ID_FATTURA = id_fattura;
			var df = $('#T_Dati_Fisc').DataTable();
			var v = df.columns().search( '' ).column('id_fattura:name').search( id_fattura ).draw();
	
		}
	} );
	fatture.on( 'deselect', function ( e, dt, type, indexes ) {
		if ( type === 'row' ) {
			var id = parent.ID_ORDINI;
			alert(id);
			var df = $('#T_Dati_Fisc').DataTable();
			var v = df.columns().search( '' ).column('id_ordine:name').search(id).draw();
	
		}
	} );
	

} );




}(jQuery));
