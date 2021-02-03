//Comodato 

$/*
 * Editor client script for DB table Comodato
 * Created by http://editor.datatables.net/generator
 */

    (function ($) {

        $(document).ready(function () {
            var editor = new $.fn.dataTable.Editor({
                ajax: 'scripts/crs4-richieste-servizi.php',
                table: '#T_Richieste_Servizi',
                fields: [
                    {
                        label: "Id:",
                        name: "T_Richieste_Servizi.id_richiesta",
                        type: "hidden"
                    },
                    {
                        label: "Descrizione:",
                        name: "T_Richieste_Servizi.descrizione"
                    },
                    {
                        label: "Rateazione:",
                        name: "T_Richieste_Servizi.rateazione"
                    },
                    {
                        label: "Numero Rate:",
                        name: "T_Richieste_Servizi.numero_rate"
                    },
                    {
                        label: "Importo:",
                        name: "T_Richieste_Servizi.importo"
                    },
                    {
                        label: "IVA (%):",
                        name: "T_Richieste_Servizi.iva",
                        def: "22"
                    },
                    {
                        label: "Totale:",
                        name: "T_Richieste_Oggetti.totale"
                    },
                    {
                        label: "Inizio:",
                        name: "T_Richieste_Oggetti.inizio"
                    },
                    {
                        label: "Fine:",
                        name: "T_Richieste_Oggetti.fine"
                    },
                ]
            });


           

            // editor.dependent(['T_Richieste_Oggetti.importo_unitario', 'T_Richieste_Oggetti.quantita'], function (val, data, callback) {
            //     editor.field('T_Richieste_Oggetti.importo').set(data.values['T_Richieste_Oggetti.importo_unitario'] * data.values['T_Richieste_Oggetti.quantita']);
            //     callback(true);
            // });

            // editor.on('preSubmit', function (e, data, action) {
            //     $.each(data.data, function (key, values) {
            //         var text = values['T_Richieste_Oggetti']['importo_unitario'];
            //         data.data[key]['T_Richieste_Oggetti']['importo_unitario'] = text === "" ? {} : text;

            //     });
            // });

            // editor.dependent(['T_Richieste_Oggetti.importo', 'T_Richieste_Oggetti.iva'], function (val, data, callback) {
            //     editor.field('T_Richieste_Oggetti.totale').set(data.values['T_Richieste_Oggetti.importo'] * (1 + data.values['T_Richieste_Oggetti.iva'] / 100));
            //     callback(true);
            // });

            editor.on('initCreate', function () {
                //alert(parent.ID_RICHIESTA);
                editor.field('T_Richieste_Servizi.id_richiesta').val(parent.ID_RICHIESTA);
            });


            // // Activate an inline edit on click of a table cell
            // $('#T_Richieste_Oggetti').on('click', 'tbody td:not(:first-child)', function (e) {
            //     editor.inline(this, {
            //         onBlur: 'submit'
            //     });
            // });

            var command = "";
            var options = ""

            var richieste_servizi = $('#T_Richieste_Servizi').DataTable({
                scrollY: 400,
                scrollX: true,
                pageLength: 5,
                paging: true,
                deferLoading: true,
                serverSide: true,
                order: [1, "desc"],
                dom: 'Blfrtip',
                ajax: {
                    url: 'scripts/crs4-richieste-servizi.php',
                    type: 'POST',
                    "data": function (d) {
                        d.cmd = command;
                        d.opt = options;
                    }
                },
                columns: [
                    {
                        data: "T_Richieste_Servizi.id_richiesta",
                        visible: false,
                        // searchable: true,
                    },

                    {
                        data: "T_Richieste_Servizi.descrizione",
                        width: "50%",
                    },
                    {
                        data: "T_Richieste_Servizi.numero_rate",
                        width: "2%",
                    },
                    {
                        data: "T_Richieste_Servizi.rateazione",
                        render: $.fn.dataTable.render.number('.', ',', 2, '€ '),
                        width: "10%",
                    },
                    {
                        data: "T_Richieste_Servizi.importo",
                        render: $.fn.dataTable.render.number('.', ',', 2, '€ '),
                        width: "10%",
                    },
                    {
                        data: "T_Richieste_Servizi.iva",
                        width: "5%",
                    },
                    {
                        data: "T_Richieste_Servizi.totale",
                        render: $.fn.dataTable.render.number('.', ',', 2, '€ '),
                        width: "30%",
                    },
                    {
                        data: "T_Richieste_Servizi.inizio",
                        width: "30%",
                    },
                    {
                        data: "T_Richieste_Servizi.fine",
                        width: "30%",
                    }
                ],
                select: true,
                lengthChange: false,

                // footerCallback: function (row, data, start, end, display) {
                //     var api = this.api(), data;
                //     // Remove the formatting to get integer data for summation
                //     var intVal = function (i) {
                //         return typeof i === 'string' ?
                //             i.replace(/[\$,]/g, '') * 1 :
                //             typeof i === 'number' ?
                //                 i : 0;
                //     };

                //     // Total over all pages
                //     total = api
                //         .column(6)
                //         .data()
                //         .reduce(function (a, b) {
                //             return intVal(a) + intVal(b);
                //         }, 0);

                //     // Update footer
                //     total =  total.toFixed(2);
                //     $(api.column(6).footer()).html('€ ' + total);
                // },



                buttons: [
                    { extend: 'create', editor: editor, text: 'Nuovo Servizio'},
                    { extend: 'edit', editor: editor },
                    { extend: 'remove', editor: editor },
                    

                    {
                        extend: 'pdfHtml5', editor: editor,
                        text: 'Visualizza Richiesta',
                        title: "Richiesta di acquisto",
                        download: "open",
                        attr:  {
                            id: 'servizi_button'
                        },
                        footer: true,
                        customize: function (doc) {
                            console.trace();
                            return false;
                        },
                        
                    }
                ]
            });
        });

    }(jQuery));
