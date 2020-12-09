<?php

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Easy set variables
 */
 
// DB table to use
$table = 'T_Ordini';
 
// Table's primary key
$primaryKey = 'ID_Ordine';
 
// Array of database columns which should be read and sent back to DataTables.
// The `db` parameter represents the column name in the database, while the `dt`
// parameter represents the DataTables column identifier. In this case object
// parameter names
$columns = array(
    array( 'db' => 'ID_Ordine', 'dt' => 'DT_RowId' ),
    array( 'db' => 'N_Ordine', 'dt' => 'numero' ),
    array( 'db' => 'ID_Persona', 'dt' => 'nome' ),
    array( 'db' => 'ID_CdC',  'dt' => 'cdc' ),
    array( 'db' => 'Anno_Ordine',  'dt' => 'anno' ),
    array( 'db' => 'Data_Ordine',  'dt' => 'data' ),
    array( 'db' => 'Oggetto',  'dt' => 'oggetto' ),
    array( 'db' => 'ID_Fornitore',  'dt' => 'fornitore' ),
    array( 'db' => 'ID_St_Ord',  'dt' => 'stato' ),

    // array(
    //     'db'        => 'start_date',
    //     'dt'        => 'start_date',
    //     'formatter' => function( $d, $row ) {
    //         return date( 'jS M y', strtotime($d));
    //     }
    // ),
    // array(
    //     'db'        => 'salary',
    //     'dt'        => 'salary',
    //     'formatter' => function( $d, $row ) {
    //         return '$'.number_format($d);
    //     }
    // )
);
 
// SQL server connection information
$sql_details = array(
    'user' => 'root',
    'pass' => 'Pippo2003',
    'db'   => 'ordini',
    'host' => ''
);
 
 
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * If you just want to use the basic configuration for DataTables with PHP
 * server-side, there is no need to edit below this line.
 */
 
require( 'ssp.class.php' );
 
echo json_encode(
    SSP::simple( $_GET, $sql_details, $table, $primaryKey, $columns )
);


