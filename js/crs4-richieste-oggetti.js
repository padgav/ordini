//Comodato 

$/*
 * Editor client script for DB table Comodato
 * Created by http://editor.datatables.net/generator
 */

    (function ($) {

        $(document).ready(function () {
            var editor2 = new $.fn.dataTable.Editor({
                ajax: 'scripts/crs4-richieste-oggetti.php',
                table: '#T_Richieste_Oggetti',
                fields: [
                    {
                        label: "Id:",
                        name: "T_Richieste_Oggetti.id_richiesta",
                        type: "hidden"
                    },
                    {
                        label: "Descrizione:",
                        name: "T_Richieste_Oggetti.descrizione"
                    },
                    {
                        label: "Tipo:",
                        name: "T_Richieste_Oggetti.tipo",
                        type: "hidden"
                    },
                    {
                        label: "Rateazione:",
                        name: "T_Richieste_Oggetti.rateazione",
                        type: "select",
                        options: [
                            "Oraria",
                            "Giornaliera",
                            "Settimanale",
                            "Mensile",
                            "Bimestrale",
                            "Semestrale",
                            "Annuale",
                            "Biennale"
                        ]
                    },
                    {
                        label: "Numero Rate:",
                        name: "T_Richieste_Oggetti.numero_rate"
                    },
                    {
                        label: "Inizio:",
                        name: "T_Richieste_Oggetti.inizio",
                        type:       "datetime",
                    },
                    {
                        label: "Fine:",
                        name: "T_Richieste_Oggetti.fine",
                        type:       "datetime",
                    },
                    {
                        label: "Importo Unitario:",
                        name: "T_Richieste_Oggetti.importo_unitario",
                        def: "0"

                    },
                    {
                        label: "Importo:",
                        name: "T_Richieste_Oggetti.importo"
                    },
                    {
                        label: "IVA (%):",
                        name: "T_Richieste_Oggetti.iva",
                        def: "22"
                    },
                    {
                        label: "Totale:",
                        name: "T_Richieste_Oggetti.totale"
                    }
                ]
            });

            editor2.dependent(['T_Richieste_Oggetti.importo_unitario', 'T_Richieste_Oggetti.numero_rate'], function (val, data, callback) {
                editor2.field('T_Richieste_Oggetti.importo').set(data.values['T_Richieste_Oggetti.importo_unitario'] * data.values['T_Richieste_Oggetti.numero_rate']);
                callback(true);
            });
            editor2.dependent(['T_Richieste_Oggetti.importo', 'T_Richieste_Oggetti.iva'], function (val, data, callback) {
                editor2.field('T_Richieste_Oggetti.totale').set(data.values['T_Richieste_Oggetti.importo'] * (1 + data.values['T_Richieste_Oggetti.iva'] / 100));
                callback(true);
            });

            editor2.on('initCreate', function () {
                editor2.field('T_Richieste_Oggetti.tipo').val("Servizio");
                editor2.field('T_Richieste_Oggetti.id_richiesta').val(parent.ID_RICHIESTA);
            });
           

            var editor = new $.fn.dataTable.Editor({
                ajax: 'scripts/crs4-richieste-oggetti.php',
                table: '#T_Richieste_Oggetti',
                fields: [
                    {
                        label: "Id Richiesta:",
                        name: "T_Richieste_Oggetti.id_richiesta",
                        type: "hidden"
                    },
                    {
                        label: "Descrizione:",
                        name: "T_Richieste_Oggetti.descrizione"
                    },
                    {
                        label: "Tipo:",
                        name: "T_Richieste_Oggetti.tipo",
                        type: "hidden"
                    },
                    {
                        label: "Quantità:",
                        name: "T_Richieste_Oggetti.quantita"
                    },
                    {
                        label: "Importo Unitario:",
                        name: "T_Richieste_Oggetti.importo_unitario",
                        def: "0"

                    },
                    {
                        label: "Importo:",
                        name: "T_Richieste_Oggetti.importo"
                    },
                    {
                        label: "IVA (%):",
                        name: "T_Richieste_Oggetti.iva",
                        def: "22"
                    },
                    {
                        label: "Totale:",
                        name: "T_Richieste_Oggetti.totale"
                    }
                ]
            });

            editor.dependent(['T_Richieste_Oggetti.importo_unitario', 'T_Richieste_Oggetti.quantita'], function (val, data, callback) {
                editor.field('T_Richieste_Oggetti.importo').set(data.values['T_Richieste_Oggetti.importo_unitario'] * data.values['T_Richieste_Oggetti.quantita']);
                callback(true);
            });

            editor.on('preSubmit', function (e, data, action) {
                $.each(data.data, function (key, values) {
                    var text = values['T_Richieste_Oggetti']['importo_unitario'];
                    data.data[key]['T_Richieste_Oggetti']['importo_unitario'] = text === "" ? {} : text;

                });
            });

            editor.dependent(['T_Richieste_Oggetti.importo', 'T_Richieste_Oggetti.iva'], function (val, data, callback) {
                editor.field('T_Richieste_Oggetti.totale').set(data.values['T_Richieste_Oggetti.importo'] * (1 + data.values['T_Richieste_Oggetti.iva'] / 100));
                callback(true);
            });

            editor.on('initCreate', function () {
                //alert(parent.ID_RICHIESTA);
                editor.field('T_Richieste_Oggetti.id_richiesta').val(parent.ID_RICHIESTA);
            });

            editor.on('initCreate', function () {
                //alert(parent.ID_RICHIESTA);
                editor.field('T_Richieste_Oggetti.tipo').val("Bene");
            });


            // Activate an inline edit on click of a table cell
            $('#T_Richieste_Oggetti').on('click', 'tbody td:not(:first-child)', function (e) {
                editor.inline(this, {
                    onBlur: 'submit'
                });
            });

            var command = "";
            var options = ""

            var richieste_oggetti = $('#T_Richieste_Oggetti').DataTable({
                scrollY: 400,
                scrollX: true,
                pageLength: 5,
                paging: true,
                deferLoading: true,
                serverSide: true,
                order: [1, "desc"],
                dom: 'Blfrtip',
                ajax: {
                    url: 'scripts/crs4-richieste-oggetti.php',
                    type: 'POST',
                    "data": function (d) {
                        d.cmd = command;
                        d.opt = options;
                    }
                },
                columns: [
                    {
                        data: "T_Richieste_Oggetti.id_richiesta",
                        visible: false,
                        // searchable: true,
                    },
                    {
                        data: "T_Richieste_Oggetti.tipo",
                        width: "50%",
                    },
                    {
                        data: "T_Richieste_Oggetti.descrizione",
                        width: "50%",
                    },
                    {
                        data: "T_Richieste_Oggetti.quantita",
                        width: "2%",
                    },
                    {
                        data: "T_Richieste_Oggetti.numero_rate",
                        width: "2%",
                    },
                    {
                        data: "T_Richieste_Oggetti.rateazione",
                        width: "2%",
                    },
                    {
                        data: "T_Richieste_Oggetti.inizio",
                        width: "2%",
                    },
                    {
                        data: "T_Richieste_Oggetti.fine",
                        width: "2%",
                    },
                    {
                        data: "T_Richieste_Oggetti.importo_unitario",
                        render: $.fn.dataTable.render.number('.', ',', 2, '€ '),
                        width: "10%",
                    },
                    {
                        data: "T_Richieste_Oggetti.importo",
                        render: $.fn.dataTable.render.number('.', ',', 2, '€ '),
                        width: "10%",
                    },
                    {
                        data: "T_Richieste_Oggetti.iva",
                        width: "5%",
                    },
                    {
                        data: "T_Richieste_Oggetti.totale",
                        render: $.fn.dataTable.render.number('.', ',', 2, '€ '),
                        width: "30%",
                    }
                ],
                select: true,
                lengthChange: false,

                footerCallback: function (row, data, start, end, display) {
                    var api = this.api(), data;
                    // Remove the formatting to get integer data for summation
                    var intVal = function (i) {
                        return typeof i === 'string' ?
                            i.replace(/[\$,]/g, '') * 1 :
                            typeof i === 'number' ?
                                i : 0;
                    };

                    // Total over all pages
                    total = api
                        .column(6)
                        .data()
                        .reduce(function (a, b) {
                            return intVal(a) + intVal(b);
                        }, 0);

                    // Update footer
                    total =  total.toFixed(2);
                    $(api.column(6).footer()).html('€ ' + total);
                },



                buttons: [
                    { extend: 'create', editor: editor, text: 'Nuovo Bene'},
                    { extend: 'create', editor: editor2, text: 'Nuovo Servizio'},
                    { extend: 'edit', editor: editor, text: 'Modifica Bene'},
                    { extend: 'edit', editor: editor2, text: 'Modifica Servizio'},
                    { extend: 'remove', editor: editor },

                    // {
                    //     text: 'Trasforma in ordine',
                    //     action: function (e, dt, node, config) {
                    //         command = "create_order";
                    //         options = parent.ID_RICHIESTA;
                    //         this.ajax.reload();
                    //     }
                    // },

                    {
                        extend: 'pdfHtml5', editor: editor,
                        text: 'Visualizza Richiesta',
                        title: "Richiesta di acquisto",
                        footer: true,
                        customize: function (doc) {
                            $("#servizi_button").trigger("click");
                            var r = parent.richiesta[0];
                            console.log(r);
                            var stsc = '[   ]';
                            var spsc = '[   ]';
                            if (r['T_Richieste']['soglia'] == "Sotto soglia comunitaria") stsc = '[X]';
                            if (r['T_Richieste']['soglia'] == "Sopra soglia comunitaria") spsc = '[X]';
                            var ppa = '[   ]';
                            var ppn = '[   ]';
                            var pad = '[   ]';
                            if (r['T_Richieste']['procedura'] == "Procedura aperta") ppa = '[X]';
                            if (r['T_Richieste']['procedura'] == "Procedura negoziata") ppn = '[X]';
                            if (r['T_Richieste']['procedura'] == "Affidamento diretto") pad = '[X]';

                            var mepas = '[   ]';
                            var mepab = '[   ]';
                            var consipsi = '[   ]';
                            var consipno = '[   ]';
                            if (r['T_Richieste']['mepa_servizi'] == "Si") mepas = '[X]';
                            if (r['T_Richieste']['mepa_beni'] == "Si") mepab = '[X]';
                            if (r['T_Richieste']['consip'] == "Si") consipsi = '[X]';
                            if (r['T_Richieste']['consip'] == "No") consipno = '[X]';

                            console.log(doc.styles);
                            doc.styles.header =  { fillColor: '#d3d3d3' };
                            
                            doc.content.splice(0, 0, {
                                margin: [0, 0, 0, 12],
                                alignment: 'center',
                                width: 150,
                                image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAApUAAADHCAYAAABIiKhyAAAAAXNSR0IArs4c6QAAAFBlWElmTU0AKgAAAAgAAgESAAMAAAABAAEAAIdpAAQAAAABAAAAJgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAClaADAAQAAAABAAAAxwAAAABWq7BCAAABWWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS40LjAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyI+CiAgICAgICAgIDx0aWZmOk9yaWVudGF0aW9uPjE8L3RpZmY6T3JpZW50YXRpb24+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgpMwidZAABAAElEQVR4Ae29CbQc1ZkmeDPfouU9oc3arA0JxCoJkKHAMGBXUbYbg12nmeoGU26qZwxtjnWmYaanrDnCNcsZrDO4e85A91ANBzh9mraxqPYww2ZVeYzLlgYsF5QASayyJLRgLRgtPD1Jb435v3vjz7wZLyIzMmPP/K8UL7a7fhEZ8cW/XaUkCQKCgCAgCAgCgoAgIAgIAoKAICAICAKCgCAgCAgCgoAgIAgIAoKAICAICAKCgCAgCAgCgoAgIAgIAoKAICAICAKCgCAgCAgCgoAgIAgIAoKAICAICAKCgCAgCAgCgoAgIAgIAoKAICAICAKCgCAgCAgCgoAgIAgIAoKAICAICAKCgCAgCAgCgoAgIAgIAoKAICAICAKCgCAgCAgCgoAgIAgIAoKAICAICAKCgCAgCAgCgoAgIAgIAoKAICAICAKCgCAgCAgCgoAgIAgIAoKAICAICAKCABAotTMMx0/vcobHBtTxM7vUCK3rpbn9a/Tpvt4Fqn/SgrbGpR4Ock4QEAQEAUFAEBAEBIFWEGgr8nTgxGbn6Klt6ujANk0kWwGEy4BcYpk37QrV0zVNzZyyQi+93dPaCjMer6wFAUFAEBAEBAFBQBCIgkDhCdKpoUPOzkNPqoMnf6WGx05FwSJU2d6ufjVjygWqH6Rz0nwFCadIN0NBJ5kEAUFAEBAEBAFBoI0RKCypBJncdvAhIpObc3N5QDBBOmdOXVEhnrRdWIxzA6x0RBAQBAQBQUAQEARyj0AhCc97R58h6eQTqUgm47iCtiqdt6FOF1V6HOhKHYKAICAICAKCgCCQBwQKRyq3fviAs+fYS3nALnIfWJUOySbIJoimqNIjwyoVCAKCgCAgCAgCgkAGCBSKVLYToWx0raFKZ7tNtuEUVXoj1OS8ICAICAKCgCAgCGSFQGFI5Y5DTzg7yCGn0xOkmfBGh1c6q9LnTVtTmOvY6ddPxi8ICAKCgCAgCLQrAoUgI4g3uem9O9v1GsQyLlGlxwKjVCIICAKCgCAgCAgCLSJQCFL58w/W6viTLY6x44vZqnTjoU5xNzvAK/30yIBz7OxRCnx/Rg2PnlVDej2o74dSV4/qKfWqyT3TVE+5m0wNZqo5UxcW4vfQ8Te0ACAICAKCgCCQSwRy/xJFQPMte9blEryid4odg9hRCOr0oqrSQSDf/eTv1dHTH6mPTx9UIyOfqnKpS3WVelR3eZLq7pmsppa66ViPGndG9Hp47KwaHR9Sp50xdXb4OJHPQTVemqymT/4MEcxFavk5l6jzZ12uusrduf+dFP1elP4LAoKAICAIFB+B3L8sN+9e5+QpFmXxL3njEbCtJpNNkE8seQqBNDY+6hwa3Kd2fPyK+u2xN/WgZk+aoxb2LSRb05k0AWlPdaBEIn2Tm6eHyCenUtdkNTxyQh0e/FB9fOawOji4X82bMl9dMuc6tWb+jWpqj8yoxFjJWhAQBAQBQUAQsBHINakcHh1wfrL9y3Z/ZTtjBLJWpX98+iPn9cMvayI5tatXfXb6JWpmdx9JI3tJ6jis0RklySNSicikQ8QRazuNjo+pLiKPfB7nui1iibpASplsnhn9lEjmAXVgYIdS5enq8wu+rFbPuy5XJNsen2wLAoKAICAICAJZIJBrUrnnk5ecrfseyAIXabNJBJJUpUMquf/T99SWg8+rgTMH1ZxpK9SSqUt0D0EgQQ5BFDmNkEq72dRDKnJO3eUuTUaxD7Jpk8yBkeNq94kd6vCZI2rVrDXqhqV/ovonLcj174jHJWtBQBAQBAQBQSBJBHL9MvyHgw857x99JsnxS90JI+CnSsexMEQMZBKq7Z99+LTu5cUzLibHmul6e4zsIZFsAjlMxBL2ks0k28YS5XqJUNoJZBMkEwlSz8ldU4hojqtRNUkdJKK75+Tfq4tm3SDk0gZNtgUBQUAQEAQ6EoFck0rx+m7ve9JWpXsDvH9w7E3nlx/+SDvPLJu+Wp0zaZayiSQIJBKTSJZUOhapHHPGyVGnrLC2E455U2+5pEacblJ5jxJ5NFJLEE6bZDLBBLmsSDCpogNELj/4dJe6bsEfqz9YeJOoxb3gyr4gIAgIAoJARyCQa1L53M5bncHhQx1xIWSQVQRGyleq/YMn1IWz16iFk+dq1TYkkjaRtEmkTRodx9hVVmtrvFWi0EI9pREilT2ahKJESdtUVgnmJOKhJfIMR2JVOSSYXeXJRDAdNeqUiFy+o46eOaS+dN6/UBfMujzXvy09EPkjCAgCgoAgIAjEiECuX3xPb/u8E+NYpaqcI3BmfLo6ONSvFkxZRuF8LtDkjckkJJIgkiyJBJG0CeTQuKNI1lh3hA7sLy2HHM7cC8ccT+omssgJUkxIL0EsQTxZesmSS+TT5JLqOXH2sNrz6Q712b4V6o+W/3PxFmcQZS0ICAKCgCDQ9ggIqWz7S1yMAR4fma9+N9StLp1J0kkKC+RHJusRSRDGMcf+BhltMPBukkpWnXtKrsq7twxVuSGULMEcJ/tJEEskJpd+UstuCqLeRaQVUsvdJ96ktVJfXXGPBFXXyMkfQUAQEAQEgXZHQEhlu1/hnI9vzJmiDg3NUENOn7riM39AjjAUJ9J1uGHJJMjk8Pi4tndkiWQtiRzVBA4hykcdQybLyiaYE0Eol+xbH2TQ7FfJZVV6CULJxJJJJWoMIpaO6iYSqtTvBn9Hyy51/ZI/Uxd/5mq7wYkdkiOCgCAgCAgCgkDBEegueP+l+wVGAIRyz9lZRCRnqc9ReB6olc/qWW6Mmpslk8PjpH4mWnd6nNTbLmlk8kg00iBAxyEZ5AT/bAoIRItXYgkCSXnHu8mr2+Qe1xLOEh2n6it1VCWWXCfWJQfhiqrhh3CsrM5Q76Zgk+od1fUOU/2L+pdokvz3B3+ifrHvr50/WvpPhVhqlOSPICAICAKCQDsi4L5W8zm03q7+fHZMehUZARDK9wZna0KJeI9ITCgxdeKZsVEtnYRkcpSInA4dpIkjyCPCCRFZxBok0yWauhJNIplI8tqc4fNjmjiCWJIjDpUtazX4KKnP7XzYNmGLsFVW/rEvJ5G6nAkl8nEqUT9GiQTPmDxfnXvOKnXo5A71/xGx5POyFgQEAUFAEBAE2g2BXJNKhJmR1H4IwCHn7VPT1Dk0nSITSszDPeLOxQ1VNxxzRsZPV8jkOHl1V8gkQTLmzppTRQek0BBDkMMxKs9rI60EwfRbIJ005BMSTHLFqVZpbXW7NpW95Ym8sKc0VIllydJP2FbqRIR4+qTpRCwvUocG3hdiaWEqm4KAICAICALthUCuSWV7QS2jAQIglLsGJ6m+7nM0oQR5BKFk6eTQGLy8hzQpHCdbynEij1VVt8GQCSX5crtE0k/KiLyGIMKBxzjx2KTS1OX3d1LZkEycYwedisrbDSs0maaIZCmlU5qqVd6GUBpnHZSF3SaWcSKtfT396rP9yzWx3Lr//5rITFFAkiAgCAgCgoAgUGAEck0q5027osDQSte9CEDlDULZRXEh4ZSjpZGWdNI434AgjtA5Qygn1lH12PaeM/sgkra0Efl5sUuQ7SPNjFNSJq4l7CmDkldKyQ46CKI+uYvccvSvyJBJSCiZTKK+cqlbL9gGsZw7dak6cupdJcQSiEgSBAQBQUAQaCcEck0qMZ2fpPZAgG0ox8jp5orZV5I0ckyru9mzG9JJ2E6CUHLq1h7ZdUikldeUqZY1+56yUHO7qm5uA+syBS9HjMseam8S1Nwl43TTW6YpGWkfcSy12puklCyhLJf7VVfXVMo7mUgyBUHXZJJm2in3VIgkCKU3QRU+Y/ISTSzf/f1vRGLpBUj2BQFBQBAQBAqLQK5JJabxk9QeCOw7068GxwbVRTMuUpO7p5IdI2weTaggEEpSUGvppD3aUe2KXZ2Le4ymUazYKtoZrW0ODWTHoKTIkQpLJXnIpfb6Vj2V09iYTLaTLKHEPmbPAaFE6ukiz3Gyv/SSyW4in2WSXmJBzEpe+BivZ0zqU32989R7RzergwO7hVhqVOWPICAICAKCQNERyDWp7J+0oCQe4EW/xZQ6MjRX/X5kVM3una3mTaXA5qTyhnc320/6EUqMuszOLkQJkYwjDa2Jguqljspa57eJpK6h+qfHvfNZ7Y1pGjmBUHLSs+1oaaQhnSCUUH93lSdR/4xkEmQSBBKksYe2sXSRlJIX7DOhRL0Iqj5j0kzV3zNZvfm7n6rTIwPVBrlhWQsCgoAgIAgIAgVDINekElgumv6FgkEq3bURgGPOvrOkWla96uIZKysqb7afBKFEYtLFa66jlli66uSKWhnEDWSTF8MyWVqpQOxqiKUlrUSbNbaX6ENVXV0u92mbS/TDzPtNZBGEkmJfsqob+Y00Eurvbk0m0f8ukmjywuPBeWNraX5yvV2TaArHWbruNz56nocra0FAEBAEBAFBoLAI5J5UzhVnncLeXOyYgwEsmbaciFdZq7whoUT4HyaUFHacyFp1QX4mY2a7iwgeiyWrxA/nmk095TEifx5bS6oEpA+pt2x+EnDiKZNEEmpvJPRdE0otkTR2kyCURhrZo0lkCedIgmmPRe8jH4gmSTYNuTQqcjjuQKV+4uwh9f7vXxdppUZa/ggCgoAgIAgUFYHck8pF028oKrYd3+/fne1TZykAeF9Xn1owZd4EQsnkywsUH8faTt0u8bOP1W4bYghCODGNEplkYoqzFJCISB4SpnfkVCbVdJdLJHEMRBDq6jKRTSNphGMObCwNoQT5BZlEX7tR1nXasdeV8YB0QpLpjgPbU3qmK0gtd33ya1GD80WQtSAgCAgCgkAhEYgm9klhyL3d00qbd69zDp7cnEJrzTcBD/VFM25QM6esIOeLBUQQpqmZU1eUjgxsq0iejp7apis+fnoXxWQ8pQaHD+ml+daKUwJq70PDRiK4uG+R7vjZsSHtjMMSSns0IFh2QkghJD5OE+uQunqciFu3iVtJa8zvjeNsa4n8PCtON9U3SnXAdnKEqqollGTXqKdwpOMWoUR5Tr5SSi1pNDaRrMrW0kndFyN9LFXsQBFUvSoR5diaqB9jQj+x7iFvceMANKy2/m4TNy9rQUAQEAQEAUGgcAjknlQCUZC2vJFKOBCtWXSfWj77ZqIlz0648POmrQmgK9Wsw6MDzvEzu/QBJp5HBt7Q+yfOfKAJaDV3sbb2ncGtNa6llOf0ztVOORx/EiNhsmhvU6hw7IIq6vMgliyt1EJGl2gaieWoJpSIEVmdr5vV2Cb2pK6M/rBTDu9j3UVhhLzyTFZ9231DXpZSlogElokEop9agqkljyC3EwklyoFgMrEskfqe+8k4mPEpklb20xSVx9SZM/vVx6c/cuZMXdjw3kH9kgQBQUAQEAQEgTwhUAxSmTMVOAjlP7roKQXv9CgXE1LYRuVPDR1yWLKJNSSdkHgiMRFtVEfa50+MnKM+HTWU7bNT5hD5gw0lZsoZIbJoVNogVFARc2JCiX3eZm01Sy3heFONMwlVsnG8KeG4Loeg6VVIIa30S1Bf29JS4+hTzctSTF0nqbTNGkHNu4kYEs11OwbC6yWUrNrmdiGr1OOksaP/49RMaQzYIITSKElRzfzl8CjvLZ9Vb5E3uCRBQBAQBAQBQaCICBSCVOZNBX798gcjE8qwN0sY4sqqdkg9R8YGNOnMUs1+4GyVLE7tmann78Z0i0hYM7HEPksFbbUxjutEKuKq1NImgrht2ZPbbIMYkkySFoQGIkcaWkPFXKJ/Dv3zJhBCozav/Ql47SlRrpZkIlA6ORXBjpKkj+g/991LKFEWx+CU1EUSTkXEEsGQUMYsxpMc5zHl41lnshoaPak+OPamc8Gsy6vsGBVJEgQEAUFAEBAEco5A7Rs1x53NiwoctpNhVNtpQtmoP6xmB9GEWh2J1exxSzshpTzj6pXhoAM7SBPEnO0Lq4STMWLJJO/zWpM1l1jiGBxqaHJFomWYeYdzgbhVt+0tHB9nnbN7Av0hKmtna7jtUKtlColULzGhLFlOPsjv0MxBTCxBJGnySU1Iu0hSO1ohxrU17z/2Wu0B2RMEBAFBQBAQBAqAQHFIZU5U4CC3Sj1VgEtb7WIYNTup1J1hSDldaefg0GF1ynUogto9bDo8DGkh2USSTO6c3pnaqWZk3EgVTRxIQy5taWXYupGvy41rWYlFqQsbaaU+7xJM5pJGUum2rwmlLtDUnxpJpStpRAVQfdvJSyjtc7yNMi7ndqWVPWqsBOJp6sJ0kIPDR/RMO4umnRdAl7k2WQsCgoAgIAgIAvlBoDCkMi8q8HadOhIe6/VuyzDSTnh8sy0l6pre00cSxSHaYjtKkvi59o84D7tG7dVNLUOl7E3s5OI9HnYfU0EiVWlc2JImH+xAJ5UnUz9BSutLKoNqBtGEtNKbWAVuH0eQ9SE364cndtinZFsQEAQEAUFAEMg9AoUhlUAyLyrw3F/VBDoYRtr5H968n5TSxnsd0xuWSQKn4KTjSioxtSESh9cBseLEBJLtE3kfNpUVRx3OHGEND+5GyZBIkwvzkxvpIjkW0SFDhM02VNm2tBLk0Sut9COUqBljsp2FcGyYbCqJXVMMzGG17/g/KBD5MLijrCRBQBAQBAQBQSBrBBq/YbPuodW+BEK3wMjZJuavfuf427pXUH33dZ9DTkPwbq4KQMfGEaeSHWyqxMoQLKMUBpmEtzjIpB30p4sI6qhlR1lv+CyhRB6vk45DZK5eGvNIFR2nNjyRqbMqeWTCC2cbfY7Kg0jygmN8DtsgopzgSY5EUSv1urcET3BaKIGU7z7xjt6WP4KAICAICAKCQBEQKBSphNQGjjKS8ofAb4+9Sf7WEwnYOKm/sdjJEEuQRyyGZGEN8oUF27xABY0EQmnsKauktFrnxGNMLEFGOdkk1SslhETSTuMuueNjhuxW23FI+soEmaWqNnnkcrw25Ykok7EnyqL9EmJl0viM3JNU37VdUB+d2M7FZS0ICAKCgCAgCOQegUKRSqC5bPbNmYIat7d0poOJsfE3D79cU1tfFwjjEJEoQyiZWEJaiWS8tw3hA3HE4iV6XCGOs4MOHzOhg7BXJXolHU6omgNbtpd47RnvXrUeJrqcY3zcsD1IOccpLBATX5yHKh/5bWLJ5JjXTCghpcRYDGEmQonYlUiaTFcZ5SgMTdVZtW+AAuCTClznkT+CgCAgCAgCgkDOESgcqcxaBc6Bx3N+XVPtHlTf75+sqr4xDw4SE8qR8TN63yaWkPKB8I2TerkawxLSSkMuQb5skjmm3bmZ+LlkTNda/w+HG7KllFxCk0GLlJq+VKWto64qHFJM9AuksCKdRP9ciaM5boglCKR30STSLVspA4JKGBAtpXHyuMiu0jIXmERB1j/8dDd3V9aCgCAgCAgCgkCuESgcqUQw8CxV4CKpnHg/HxzYrQbHBvUJEEqeTxtzb2OxZ7ZhYonMTCxBrJhYmuMgXGbRlWryBakg0UyOFaRPVP+wlJLV3jgDe0qWVAbFwkS+MZYYYsdNTPQ0yQXxJWmlIYvUL1daqc+5avBRyjNK/cTCfcca+0aaSSpvyosykGDCVlOPB+V13URmtcrdSHKHMfUOSV4PkrRSkiAgCAgCgoAgUAQECkcqAWqWKnAEED9wYrOoJK27e7dl+wcnHSRjL2nU2yCWLK3kYlCDs+MOiJ8hXoZcMsHUoYCIgJlUXTNRtFXfXC/WVWJp2tfHSFLI6zDOOoYYGqcZlGNppZZYgjhaxHJsbFgTRpBkLIZggmRCCou8ZAbgEkoEY0dZHKdatZQSdbM9JVTfwyTZhZQX4zx0Ukgl8JckCAgCgoAgkH8ECkkqs1aBf3Ric/6vbIo93D+wR7fGhNJu2iaXTCxtaSXyGoJliCWXZWJpiGOVUPJ5m1CylLJ6rnbLT/WNHDXqdU0SIR0FETQqcEgroQK3pZUsaTRk0Ugdje0kbbvkUqu4iURqIknHTBk3L831jbK6DOWBh7z2MCcp5fC4adf0HsTTUcfO7q0djOwJAoKAICAICAI5RaCQpDJrFfiRU9tyejmz6dZ+157S27r2bCZ1r528xJIdd2qJJSSMCCEEqR9IJwiWIVmmLiaZZo8ll1UJpd0iQj/S/Ny0NE7VehFaiKWVTCxHQQhJVY31qJa0Qi1OZJH2QRJHSbo4QsQQC4gk1jhmSKeRbtqEcozOg1BCSglvc5ZSDo2BgOKYUYXvPbGT9iQJAoKAICAICAL5RiDMmzaXI8hSBY5pCzGtYS6BSblTcNIZJhLkTSCBnEquzWRV+mjOMGnyEsuqdBIkr0r0dDB1dx+kyxAv046XWMKekmfSgaTSK61kFTiII9tPoldQRXullRxeCESRiSVLH0dcyePo2JkqwaRjI7QPsqlV3UQ8cR4k0pBRklTqbZBR6j8RyrNjJa32NsigHTPunvKIGhg6bg7LX0FAEBAEBAFBIMcIFJZUZq0CF2mluauPnT1aE5+S5+S2pYaGqFVJJksr7d8FiKUhjZDsQeVsFoTbsVXoXMah47bauzwhnFDVnpLL+K2hAgexRDIOO1USC2LIpHPYdURiYgm1NW9rokj9AcHEAsKoJZK0xrY+ps+7qnCLUEIKymrv3tIQTdN4mupFb0z9w2Pj6tOz4edeR0lJgoAgIAgIAoJAFggUllRmrQI/KHaV+n49/Oku3/t2hGaLYWLJa5ZYogATS5ZW6mNE1DCtYyVVtg3RA5FE4jXn8xJK7yw6nK+eGrxWWlm1q2Q1OM7bxBJq6+HR01odPjI2pCWYkGLCQ1yrvaEep/5rVThJHXFOE0wao96mc0wox8cHtZTyLNlfgkwaKSXItLGxPHH2CA9B1oKAICAICAKCQG4RKNTc314UMRf48TP+pMabN+59hBaSuZkpRDeRpXqJCSXyQGJp4kZiFm2QwyGaVWYSkSdjO1imbUzrCJUvJ9gjmjKQ3GFWnaokcZyIKymN9XzZpr5qOezzrN1spwAVuG1bCRU4zwUOiSTagbSyq9yj+0pRI003xnsxlyJJUg2xLJdojm7+HDNCTjRGc3ZPppUb3N2U1H8xbiQTRsiQSexDQglCeRaxKZ0zaoQcc1jtjXBDkFLSX/UJSYMlCQKCgCAgCAgCeUeAX41576dv/xZN/4Lv8bQOHjy5Oa2mctsOq269nt/aOYUoEYLmINnk0rat5ADpyANy2VOGuhjB02sJIs57kyaU3oO0D6oJ+lm1qeyuIZNchAkl77O0ktXPOM72lSyxHCPpIWwsIbVkBx5tF0l5IYH0W0AmR4k8GnU51O3G09\
                                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\
                                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\
                                aNr+6OXd1fGAMwg4fVKxSoZcrIB7D//L1+suU/RNcYf29v3HMcqEv4UU9khUqnr4T+IaLJkbp+u3/6dQAiSFHbeDyT8Fi+9q/be4/7JWhDICwKpkEoMNgyxDAIlT4SS+/jGu8tTtatEu7BZTDuxijvvc3F7cREy6UVk4r5X9QlVyrfpJckvTXzk3fPwKxMLRjgSRdXTqFlIsa6998VKNhABVk9DWhlHQn32xy+r1t9xKwfxIRzVLen/VBsOD9eb1bVeMyMmYw0rCZEhSC25/oUQhetk+S4RPb43kQ1kks0MGH8cx32weiO2mk+4ft6PBlalsw7NO2Xwdx9/vfmGPCXwQeJNGKseC80Sh3NpSSmT/I16x9hJ+0FmCtdH/F3YGObh2sUap9IenN82iCUGjYd92JRHQom+v/3b9FXgcNjZceiJVGJWQsW9efc6PesNVN2QlBYh9Xb1q1ULviUz4LRwsUA4oPK2E6RYkJDYx/K6bRNHEJvrV86rdDVIglnJ0OKGV82KZ1zeJX4Y6gyPen56f77V9bgHbekq4axt8Zkk25cvipT4hyTBtT8a8P7xqrcfu++6EggtJ5A/SCt5v5U1f/ygrF33lp1HKtXZ47fzQPIsSRDICwKpSSp5wI0klpwP67wSSvQtCxU42gXBQzD0mVNXxK6SLKqKG7iATF449zZ14ZzbVB7sTtGnIia8kL2SmB1k6xxX2r73ONlsHq55AYMgRCEC3DdbkgOyB2KJ6WGRQBTiUFOir3aCTeLt3/87Z+3XL65IAe3zedpm7IGFLV3DmCDFjMuoBVI37zUGDhAm4PnfCib2tUV59DcJswy6R2q6h+v62H01h/TO2j+5WNkq8jglvauXz6xIZLk/kKAuvN2IX0Eol87rq+SxpbcTe9r8Eb5P7JJx/UbtOmU7fgTycO1SJ5WAEQ8W/Ehgs2V/odkQ55lQcj+zUIFDYrh13/8aq9NOUVXcuA4TyeRdfHlk3SICePnbUpE4X5j2i5i7B/IXNXntzaCWhhTLdsrz2qi10ibIr9dTFxJSLHBuWn/H6gmSrVbaSaKMH/a41o/ee23LZM+vn3im+zkyQUvVajp5qtbeHtf3wVYrq1POe6/jevtlX71sZs3hLTsP1+xH2aH7Vt9PqIMl7LZN8Ndo7HBqTSr53Sdx/EaT6m9R6sUHqP08Qr+Ba5xOcnm4dqmqv+2LD2IZpAovAqHEWLa+daE6PZo+hMfP7FJwloFk0ca02e2iqrgxTlZzf/3SZ0ndfVdJpJPNXv3g/EvJIaFoyZZkQarCalGQD062epyPtbKm8ET6ZeAtC4kRHDcg6fWey+s+kfEKgclrH9GvOElbvXFCipt28pqXgLDiHuYEqS+TSxwTgsfIyDqPCGQiqWQg/CSWcRDKKF/E3Lew68HyLnVs6Odhs8eWj4lls6rwIqu4AZ5IJmO7hQIr8kpr4rS3g2Rsel9PTdtQVW+qOdL8DpxjOOGFvJbie2LfJiMgDLbjA+dvdo3nFsrA2QUSXfuFj+M4hnh3ccR/RH1xJTxb4f0NKRcTbGACCQo8nknV6yuVa7Z94A8VrjfheKvJ2BBW7QtbrSepclHG5lVfY6wgjnyNcH/xPYZ2YLMLaXlSY0nqN5pUf6XeKgJ5uHaZkkpAQT+Siip8FX2hwQi6ClFrWyylaK10c6UwLeGWPemTSvTSEMvvaOedRraERVZx8xVBAPiV5ITTP2kB3SOi5mZc4l57VWteVV+U9h6868qKFJHriUooYUrD9maoEy9pECW/ZKv1/c43c4wdOCBpWvfEaxUSgDrg8JG3ZHt/g1zbnvKPPGdsT+PoMwiln0pv04bWawcZthOTLPtYHNsgc3bduLZ+tpte5xh8GLXocD6h22gPJJ9JJaTwTDwheX+MGrp+5fxKP70fgRMqbPJAEr/RJrvQltn9vL83xej5DdDycO0yJ5UAAsQS61fxp2Bp8YwbSj9560tOVt7RaBehhrDAW5sceNTc/jUVFOExfnTgjUIFKq903t2oJZPf856W/RgRgKrNtoeDZCTNj7RWhmLbmzUqH4ddpbcNJh1E0hy2EWcS4M2bl33YCtq2oXnvr1b5/riKHhyw8DHB747qmWhbIIc2qQz6CPEej1slfcvViyuOQHxPYWSwp3zMM0RImyUJAnlBIH2DwLyMPMZ+LJr+hRhra70qnn8b9pa8bN33gNpz7KXWK82wJMgkbCavOfd7JSOdzLAzHdA0vKNv//4va0YK79e8J5sEoK8wf7EXqIQ4gTxBSsf7rayh2vbawYHgnLCcSUDG85yAgY1b3vuLDxs7jA6IFD5+/LzMvdemmevwHc/9Dok3zBzsOnD9beyMurr1KTm9Uk+0hQ8Ve7zcPuHAm7IWBHKJQC4klblEpolOLZxxQ2GJWxPDTC3rouk3qDWL7nPV3CKZTAp4qGjxgoS6Gyo0L6EEGYvbLhBEwOsBifGBBLYqEWU1IepBn731QJVoS3vs2H8o00wCYcGsJiAb8PZGaBckBMy2JUaspmym7qTz8vVmQma3F2d/Qbj8rjHaizIHMQKd21J0XFPs29cBM0PZeewxhtkGmSMPWgeSUE5wvkLYKEgxoYr2mlb84O4rIwW730999kuQfv7o5WoMSlyjuCWzfu0m8Rv1ayfqsaD7DLj5mV9Eba8I5YOunZ/qPanxiKQyBmShAscMLpKiIQC1/Y0rHlE3nPegSCajQRmqNKR2eEGClHnVn+bB/OVQ9WSZCZKqGjJHakNvsoOg45xXdenNX2/fdvwBZnixYbH7AKnfD+6+ql41mZzDuHG9XdVxpQ8g4nnsb6WD7gY+FjC7jTfZ1wHbWOh61EgXvWXq7T9491UlrzobvxFgZ3+coA70J85g97Z0EqpuO4FUShIE8o6AkMqYrtAiklZKag0BJpN/fMEjpXnT1kR21GqtF1IKZAgvLqM6/kopDalIVNRtKSXq8pIBHCPSVKNKBDFoVUUKhxH7xY/67QQP63eevDUViZLdbivbGAckGLjeRbjWGCOco95+4lY9MUbQmHEf0/UNOh3qOCRdwAZ1+SX+6GJnLb88rRxjyTfKelXdX7tmSaVKb0QGPzOASmbZEARSREBe4DGBjdA+m967M6baOqMakElMqShEMvh6g/xA8sIJUqUoBMBbH9cLgsEOJ3wsjnVQe966Wx0XEcQaSaVX9c3tePO12h7X5zeuoLa5TBbrILIRdfzesXjx9Z7n/bgx8htfUm3A9pE/KuL8rdj3EkgsXZuG72VIYvFxxCnK9bTb5/r81lHa8KuvlWN+19tbT1gMveWw78Uiyr3kvUZJPGO9bfiNCceSaDuorYY3b1BBOT4Rged23urA21pSfQRgKgCbSZgN1M8pZwUBQUAQEAQEAUGgKAjISz3GK7Xj0BMOQvtI8kcAZBKSyeWzb5b7zh8iOSoICAKCgCAgCBQWAXm5x3jpEGD8+bdvjbHG9qhKyGR7XEcZhSAgCAgCgoAgUA8BIZX10Gnh3KZ373Qw040kM6XiygV3qYvm3ib3mdwQgoAgIAgIAoJAmyMgL/uYL/CeT15yEHC8k9PE+bk7GQ0ZuyAgCAgCgoAg0BkISPDzmK8zAnd3appIJu/qVChk3IKAICAICAKCQMchIJLKBC455uDGlImdlC6ce5taNf9bqrd7mtxTnXThZayCgCAgCAgCgoCLgBCABG6FAyc2O1v2rEug5vxVifm5V5JHt8zNnb9rIz0SBAQBQUAQEATSREBIZUJo/+StLznDY9Wg1Qk1k1m1QiYzg14aFgQEAUFAEBAEcomATNOY0GVZNvvmhGrOtlrMgvP1S59V15z7PZmfO9tLIa0LAoKAICAICAK5QkAklQldjnaLWSlTKiZ0o0i1goAgIAgIAoJAmyAgpDLBC/nzD9Y6R09tS7CF5KsWMpk8xtKCICAICAKCgCDQDggIqUzwKh4Z2Oa8vGttgi0kV7XMz50ctlKzICAICAKCgCDQjggIqUz4qhZNWilTKiZ8Q0j1goAgIAgIAoJAmyIgpDLhCwvbyr95706Vd09wIZMJ3whSvSAgCAgCgoAg0OYICKlM4QLneerGibPgpACINCEICAKCgCAgCAgCbYeAkMqULunWDx9w9hx7KaXWGjcjZLIxRpJDEBAEBAFBQBAQBMIjIKQyPFaRc+aFWK6iGXAunHObTKkY+YpKBYKAICAICAKCgCDACAipZCRSWmdJLGUWnJQusjQjCAgCgoAgIAh0IAJCKjO46O8dfcbZdvCh1FoWMpka1NKQICAICAKCgCDQsQgIqczo0sMrfOu+B1SSwdEXTb9BrVpwl5o5dYVc54yuszQrCAgCgoAgIAh0CgJCNjK+0giQ/v7RZ9TBk5tj6QlmwFk04wYFQtk/aYFc31hQlUoEAUFAEBAEBAFBoBECQjoaIZTS+eHRAQfE8ujAG+oITe04OHyoYcuILYll3rQrFMjkzCkrxPmmIWqSQRAQBAQBQUAQEASSQEBIZRKoxlTn8dO7nOGxgQm1gUiKFHICLHJAEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBASBDkfg/wfyJ/xBjVo27wAAAABJRU5ErkJggg=='
                            });
                            doc.content.splice(2, 0, {
                                styles: {
                                    tableBody: {
                                        bold: true,
                                        fontSize: 11,
                                        color: 'white',
                                        fillColor: '#2d4154',
                                        alignment: 'center'
                                    },
                                },
                                margin: [0, 0, 0, 12],
                                layout: "noBorders",
                                table: {
                                    widths: ['auto', 'auto', 'auto', 'auto', 'auto', 'auto'],
                                    headerRows: 0,
                                    body: [
                                        [spsc, 'SOPRA SOGLIA  COMUNITARIA', stsc, 'SOTTO SOGLIA  COMUNITARIA', '', ''],
                                        [ppa, 'PROCEDURA APERTA', ppn, 'PROCEDURA NEGOZIATA', pad, 'AFFIDAMENTO DIRETTO'],
                                    ]

                                },

                            });


                            doc.content.splice(3, 0, {
                                margin: [0, 0, 0, 12],
                                layout: "noBorders",
                                table: {
                                    widths: ['25%', '25%', '25%', '25%'],
                                    headerRows: 1,
                                    body: [
                                        [{text:'Dati sul Richiedente',style:'header', colSpan: 4 }, '', '', ''],
                                        ['Richiedente:', r['v2']['Cognome'] + " " + r['v2']['Nome'], 'Data:', '____________________'],
                                        ['Firma:', '____________________', 'RUP', r['v3']['Cognome'] + " " + r['v3']['Nome']],
                                    ]
                                }
                            });
                            doc.content.splice(4, 0, {
                                margin: [0, 0, 0, 12],
                                layout: "noBorders",
                                table: {
                                    widths: ['25%', '25%', '25%', '25%'],
                                    headerRows: 1,
                                    body: [
                                        [{text: 'Dati sul Progetto', style:'header', colSpan: 4}, '', '', ''],
                                        ['CDC:', r['T_Progetti']['cdc'], 'Acronimo:', r['T_Progetti']['acronimo']],
                                        ['Fonte di finanziamento:', r['T_Progetti']['finanziamento'], 'CUP:', r['T_Progetti']['cup']],
                                    ]
                                }
                            });
                            doc.content.splice(5, 0, {
                                margin: [0, 0, 0, 12],
                                layout: "noBorders",
                                table: {
                                    widths: ['25%', '25%', '25%', '25%'],
                                    headerRows: 1,
                                    body: [
                                        [{text: 'Dati sul Fornitore', style:'header', colSpan: 4}, '', '', ''],
                                        ['Fornitore:', r['T_Fornitori']['fornitore'], 'Consegna:', r['T_Richieste']['consegna']],
                                    ]
                                }
                            });
                            doc.content.splice(6, 0, {
                                margin: [0, 0, 0, 12],
                                layout: "noBorders",
                                table: {
                                    widths: ['25%', '25%', '25%', '25%'],
                                    headerRows: 1,
                                    body: [
                                        [{text: 'Dati sulla Richiesta', style:'header', colSpan: 4}, '', '', ''],
                                        ['Fornitura di:', r['T_Richieste']['oggetto'], '', ''],
                                        ['Imponibile:', r['T_Richieste']['imponibile'] + ' €' , 'IVA:', r['T_Richieste']['iva'] + ' €'],
                                        ['Mepa:', r['T_Richieste']['mepa'],'Prestazione di servizi:', r['T_Richieste']['prestazione_servizi']],
                                        ['Prodotti informatici:', r['T_Richieste']['prod_inf'], '', ''],
                                    ]
                                }

                            });
                            doc.content.splice(7, 0, {
                                margin: [0, 0, 0, 12],
                                text: " Verificato che: (da compilare solo nelle ipotesi di acquisti informatici)\n\
                                " + consipsi + " è attiva convenzione CONSIP attinente alla fornitura/servizio richiesta \n\
                                " + consipno + " non è attiva alcuna convenzione CONSIP attinente alla fornitura/servizio richiesta \n\
                                " + mepab + " tali forniture sono contemplate sul MEPA nel Bando Beni, categoria merceologica lnformatica, Elettronica, Telecomunicazioni, Macchine per Ufficio;\n\
                                " + mepas + " tali servizi sono contemplati sul MEPA nel Bando Servizi, categoria servizi di assistenza, manutenzione e riparazione di beni e apparecchiature.\n\
                                (chiarire esattamente dove sono contemplati. Indicare alternativamente l’una o l’altra opzione a seconda che si tratti di forniture o servizi).\n\
                             "
                            });

                            doc.content.splice(8, 0, {
                                margin: [0, 0, 0, 12],
                                text: "Il sottoscritto Dirigente/Responsabile del Procedimento dichiara di non essere in rapporto di parentela, di affinità, di non intrattenere relazioni amicali e di non avere rapporti di carattere economico con i rappresentanti legali e/o con i soci della ditta suindicata."
                            });

                            doc.content.splice(9, 0, {
                                margin: [0, 0, 0, 12],
                                layout: "noBorders",
                                table: {
                                    widths: ['50%', '50%'],
                                    headerRows: 0,
                                    body: [
                                        ['Il Dirigente/Responsabile Procedimento (Nome e Cognome)', 'Firma _________________________'],
                                        ['L\' Amministratore Unico (Giacomo Cao)', 'Firma _________________________'],
                                  
                                    ]
                                }

                            });
                            console.log(doc);

                        }


                    }
                ]
            });

           
        });

    }(jQuery));
