//Fornitori 

$/*
 * Editor client script for DB table T_Fornitori
 * Created by http://editor.datatables.net/generator
 */

    (function ($) {
        var editor; // use a global for the submit and return data rendering in the examples


        $(document).ready(function () {
            editor = new $.fn.dataTable.Editor({
                ajax: 'scripts/crs4-fornitori.php',
                table: '#T_Fornitori',
                fields: [
                    {
                        "label": "Ragione sociale:",
                        "name": "T_Fornitori.fornitore"
                    },
                    {
                        "label": "Indirizzo:",
                        "name": "T_Fornitori.indirizzo"
                    },
                    {
                        "label": "N. Civico:",
                        "name": "T_Fornitori.n_civico"
                    },
                    {
                        "label": "Citta:",
                        "name": "T_Fornitori.citta"
                    },
                    {
                        "label": "CAP:",
                        "name": "T_Fornitori.cap"
                    },
                    {
                        "label": "Prov:",
                        "name": "T_Fornitori.prov"
                    },
                    {
                        "label": "Paese:",
                        "name": "T_Fornitori.id_stato",
                        "type": "select"
                    },
                    {
                        "label": "Telefono:",
                        "name": "T_Fornitori.n_telef"
                    },
                    {
                        "label": "Fax:",
                        "name": "T_Fornitori.n_fax"
                    },
                    {
                        "label": "Email:",
                        "name": "T_Fornitori.email"
                    },
                    {
                        "label": "PEC:",
                        "name": "T_Fornitori.pec"
                    },
                    {
                        "label": "Partita IVA:",
                        "name": "T_Fornitori.piva"
                    },
                    {
                        "label": "Codice Fiscale:",
                        "name": "T_Fornitori.cfiscale"
                    },
                    {
                        "label": "IBAN:",
                        "name": "T_Fornitori.iban"
                    },
                    {
                        "label": "Note:",
                        "name": "T_Fornitori.note",
                        "type": "textarea"
                    }
                ],
                i18n: {
                    create: {
                        button: "Nuovo",
                        title:  "Nuovo Fornitore ",
                        submit: "Crea"
                    },
                    edit: {
                        button: "Modifica",
                        title:  "Modifica Fornitore ",
                        submit: "Modifica"
                    },
                    remove: {
                        button: "Rimuovi",
                        title:  "Rimuovi Fornitore ",
                        submit: "Rimuovi",
                        confirm: "Sei sicuro di voler rimuovere %d fornitore(i)?"
                    }
                }
            });

            // Activate an inline edit on click of a table cell
            $('#T_Fornitori').on('click', 'tbody td:not(:first-child)', function (e) {
                editor.inline(this, {
                    onBlur: 'submit'
                });
            });

            var table = $('#T_Fornitori').DataTable({
                scrollY: 400,
                scrollX: true,
                pageLength: 50,
                paging: true,
                fixedColumns: true,
                dom: 'Blfrtip',
                ajax: {
                    url: 'scripts/crs4-fornitori.php',
                },
                columns: [
                    {
                        "data": "T_Fornitori.fornitore",
                        "width": "200",
                    },
                    {
                        "data": "T_Fornitori.indirizzo"
                    },
                    {
                        "data": "T_Fornitori.n_civico"
                    },
                    {
                        "data": "T_Fornitori.citta"
                    },
                    {
                        "data": "T_Fornitori.cap"
                    },
                    {
                        "data": "T_Fornitori.prov"
                    },
                    {
                        "data": "T_Stati.Nome_Stati", 
                        editField: "T_Fornitori.id_stato"
                    },
                    {
                        "data": "T_Fornitori.n_telef",
                        "width": "50",
                    },
                    {
                        "data": "T_Fornitori.n_fax",
                        "width": "50",
                    },
                    {
                        "data": "T_Fornitori.email",
                        "width": "50",
                    },
                    {
                        "data": "T_Fornitori.pec",
                        "width": "50",
                    },
                    {
                        "data": "T_Fornitori.piva",
                        "width": "50",
                    },
                    {
                        "data": "T_Fornitori.cfiscale",
                        "width": "50",
                    },
                    {
                        "data": "T_Fornitori.iban",
                        "width": "50",
                    },
                    {
                        "data": "T_Fornitori.note"
                    }
                ],
                select: true,
                lengthChange: true,
                buttons: [
                    { extend: 'create', editor: editor },
                    { extend: 'edit', editor: editor },
                    { extend: 'remove', editor: editor }
                ]
            });
        });

    }(jQuery));
