function format ( d ) {
    // `d` is the original data object for the row
    console.log(d)
    return '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">'+
        '<tr>'+
            '<td>Note:</td>'+
            '<td>'+d.Garanzia+'</td>'+
        '</tr>'+
        '<tr>'+
            '<td>Garanzia:</td>'+
            '<td>'+d.Note+'</td>'+
        '</tr>'+
        '<tr>'+
            '<td>Installazione:</td>'+
            '<td>'+d.installazione+'</td>'+
        '</tr>'+
    '</table>';
}

var editor; // use a global for the submit and return data rendering in the examples

//ORDINI 

$(function () {

    editornew = new $.fn.dataTable.Editor( {
        ajax: "scripts/crs4-ordini.php",
        table: "#ordini",
        fields: [ 
            {
                label: "Richiesta",
                name: "T_Ordini.id_richiesta",
                type: "select"
            }
        ]
    });

    editor = new $.fn.dataTable.Editor( {
        ajax: "scripts/crs4-ordini.php",
        table: "#ordini",
        fields: [ 
            // {
            //     label: "Numero:",
            //     name: "T_Ordini.N_Ordine",
            //     type: "readonly"
            // }, 
            {
                label: "Richiesta",
                name: "T_Ordini.id_richiesta",
                type: "select"
            }, 
            // {
            //     label: "Anno:",
            //     name: "T_Ordini.Anno_Ordine",
            //     type: "readonly"
            // }, 
            {
                label: "Data",
                name: "T_Ordini.Data_Ordine",
                type: "datetime"
            }, {
                label: "Fornitore:",
                name: "T_Ordini.ID_Fornitore",
                type: "select"
            }, {
                label: "Oggetto:",
                name: "T_Ordini.Oggetto"
            }, 
            {
                label: "Richiedente:",
                name: "T_Ordini.id_richiedente"
            }, 
            {
                label: "Stato:",
                name: "T_Ordini.ID_St_Ord"
            },
            {
                label: "Garanzia:",
                name: "T_Ordini.D_Garanzia"
            }, 
            {
                label: "Note:",
                name: "T_Ordini.Note"
            }

        ]
    } );


    // Activate an inline edit on click of a table cell
    $('#ordini').on( 'click', 'tbody td:not(:first-child)', function (e) {
        editor.inline( this, {
            onBlur: 'submit'
        } );
    } );


    $('#ordini').DataTable({

        //ajax: "data/arrays.json",
        ajax: "scripts/crs4-ordini.php",
        sAjaxDataProp: "data",
        serverSide: false,
        "processing": true,

        // createdRow: function( row, data, dataIndex ) {
        //     $( row ).attr('data-nordine', data.numero);
            
        // },

        "sPaginationType": "full_numbers",
        paging: true,
        scrollY: 400,
        "language": {
            "lengthMenu": " Mostra _MENU_ Ordini per pagina",
            paginate: {
                first:      "Inizio",
                previous:   "Precedente",
                next:       "Successivo",
                last:       "Ultimo"
            }
        },

        "columns": [

            {
                "className":      'details-control',
                "sorting":      false,
                "data":           null,
                "defaultContent": ''
            },

            { "data": "T_Ordini.N_Ordine" },
            { "data": "T_Ordini.Anno_Ordine" },
            { "data": "T_Ordini.id_cdc" },
            { "data": "T_Ordini.Data_Ordine" },
            { "data": "T_Fornitori.Fornitore",  editField: "T_Ordini.ID_Fornitore"},
            { "data": "T_Ordini.Oggetto"},
            { "data": "T_Ordini.id_richiedente" },
            { "data": "T_Ordini.ID_St_Ord"}

           
        ],
        "order": [[2, 'desc'],[1,'desc']],

        dom: "Bfrtip",
        select: true,

        buttons: [
            { extend: "create", editor: editornew },
            { extend: "edit",   editor: editor },
            { extend: "remove", editor: editor },
            { extend: "selectedSingle", 
              text: 'Mostra Beni', 
              action: function ( e, dt, node, config ) {
                var id = dt.row( { selected: true } ).data().T_Ordini.Id_Ordine;
                parent.ID_ORDINI = id;
                

                var df = $('#T_Dati_Fisc').DataTable();
                df.columns(13).search(id); 
                df.draw(); 

                var fatt = $('#T_Fatture').DataTable();
                fatt.columns(10).search(id);
                fatt.draw();

                var bolle = $('#T_Bolle').DataTable();
                bolle.columns(3).search(id);
                bolle.draw();

                }
            }
        ]


    });
    $("div.table_top select").addClass('tbl_length');
    $(".tbl_length").chosen({
        disable_search_threshold: 4
    });

    var ordini = $('#ordini').DataTable();

    ordini.on( 'select', function ( e, dt, type, indexes ) {
        if ( type === 'row' ) {
            var data = ordini.rows( indexes ).data();
            var id = data[0].T_Ordini.Id_Ordine;
            
            parent.ID_ORDINI = id;

            var df = $('#T_Dati_Fisc').DataTable();
            df.columns(11).search(id); 
            df.draw(); 

            var fatt = $('#T_Fatture').DataTable();
            fatt.columns(11).search(id);
            fatt.draw();

            var bolle = $('#T_Bolle').DataTable();
            bolle.columns(4).search(id);
            bolle.draw();
        }
    } );

    

    // $("#ordini tr").live("click", function(){
    //     if ( $(this).hasClass('selected') ) {
    //         $(this).removeClass('selected');
    //     }
    //     else {
    //         ordini.$('tr.selected').removeClass('selected');
    //         $(this).addClass('selected');
    //     }
    //     console.log($(this).data("nordine"));
    //     var nord = $(this).data("nordine");
    //     fatture.ajax.url("data/fatture.json?nord="+nord);
    //     fatture.ajax.reload();

    // })


    $('#ordini td.details-control').live('click', function () {
        console.log(this)
        var tr = $(this).closest('tr');
        var row = ordini.row( tr );
        console.log("row", row.data())
        if ( row.child.isShown() ) {
            // This row is already open - close it
            row.child.hide();
            tr.removeClass('shown');
        }
        else {
            // Open this row
            row.child( format(row.data()) ).show();
            tr.addClass('shown');
        }
    } );



//     //FATTURE
//     $('#fatture').dataTable({

//         "serverSide": false,
//         "ajax": "data/fatture.json",
//         paging: false,
//         scrollY: 400,
//         "dom": '<"toolbar">Bfrtip',
//         buttons: [
//             'copy', 'excel', 'pdf',
//             {
//                 text: 'Aggiungi Fattura',
                
//                 action: function ( e, dt, node, config ) {
//                     dt.row.add([
//                         "",
//                          "",
//                          "",
//                          "",
//                          ""
//                       ]).draw();
//                 }
//             }
//         ]

//     });

//     var fatture = $('#fatture').DataTable();

// });

// // BOLLE

// $(function () {

// 	$('#bolle').dataTable({
// 		"sPaginationType": "full_numbers",
// 		"iDisplayLength": 10,
// 		"oLanguage": {
// 			"sLengthMenu": "<span class='lenghtMenu'> _MENU_</span><span class='lengthLabel'>Entries per page:</span>",
// 		},
// 		"sDom": '<"table_top"fl<"clear">>,<"table_content"t>,<"table_bottom"p<"clear">>'
// 		/*
// 		  "fnDrawCallback": function () {
// 			  $('.data_editable tbody td').editable();
// 		  },*/

// 	});
// 	$("div.table_top select").addClass('tbl_length');
// 	$(".tbl_length").chosen({
// 		disable_search_threshold: 4
// 	});
// 	/* Apply the jEditable handlers to the table */
// 	$('.data_editable td').editable('../examples_support/editable_ajax.php', {
// 		"callback": function (sValue, y) {
// 			var aPos = oTable.fnGetPosition(this);
// 			oTable.fnUpdate(sValue, aPos[0], aPos[1]);
// 		},
// 		"submitdata": function (value, settings) {
// 			return {
// 				"row_id": this.parentNode.getAttribute('id'),
// 				"column": oTable.fnGetPosition(this)[2]
// 			};
// 		}
// 	});

 });
