//Comodato 

$/*
 * Editor client script for DB table Comodato
 * Created by http://editor.datatables.net/generator
 */

    (function ($) {
        var editor; // use a global for the submit and return data rendering in the examples
        var date = new Date();
        var d   = date.getDate();
        var m = date.getMonth();
        m++;
        var y = date.getFullYear();
        var datestring = d +"/" + m + "/" + y;
        

        $(document).ready(function () {
            editor = new $.fn.dataTable.Editor({
                ajax: 'scripts/crs4-documenti.php',
                table: '#T_Documenti',
                fields: [
                    // {
                    //     "label": "Nome:",
                    //     "name": "T_Documenti.owner",
                    //     "type": "select"
                    // },
                    {
                        "label": "Tipo:",
                        "name": "T_Documenti.tipo",
                        "type": "select",
                        options: [
                            "Contratto di Comodato",
                            
                        ]
                    },
                    {
                        "label": "Documento:",
                        "name": "T_Documenti.file",
                        "type": "upload",
                         display: function ( file_id ) {
                             
                            return '<a href="'+editor.file( 'T_Files', file_id ).web_path+'">'+editor.file( 'T_Files', file_id ).filename+'</a>';
                        },
                        clearText: "Cancella",
                        noImageText: 'Nessun documento'
                    },
        
                ]
            });


            // Activate an inline edit on click of a table cell
            // $('#T_Documenti').on('click', 'tbody td:not(:first-child)', function (e) {
            //     editor.inline(this, {
            //         onBlur: 'submit'
            //     });
            // });

            var table = $('#T_Documenti').DataTable({
                scrollY: 400,
                scrollX: true,
                pageLength: 50,
                paging: true,
                fixedColumns: true,
                dom: 'Blfrtip',
                ajax: 'scripts/crs4-documenti.php',
                columns: [
                    {
                        "data": null,
                        render: function ( data, type, row ) {
                            // Combine the first and last names into a single table field
                            return data.V_People_all.Cognome + ' ' + data.V_People_all.Nome;
                        },
                        editField: "T_Documenti.owner"
                    },
                    {
                        "data": "T_Documenti.tipo"
                    },
                    {
                        "data": "T_Documenti.file",
                        type: "upload",
                        render: function ( file_id ) {
                            return file_id ?
                                '<a href="'+editor.file( 'T_Files', file_id ).web_path+'">'+editor.file( 'T_Files', file_id ).filename+'</a>' :
                                null;
                        },
                        defaultContent: "Nessun File",
                        title: "Documento"
                    }
                ],
                select: true,
                lengthChange: true,
                buttons: [
                    { extend: 'create', editor: editor, text: 'Nuovo documento'},
                    { extend: 'edit', editor: editor, text: 'Modifica' },
                    { extend: 'remove', editor: editor, text: 'Elimina' },
                    
                ]
            });
        });
      

    }(jQuery));
