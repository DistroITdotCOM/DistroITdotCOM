<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Mail_model extends CI_Model {

    function __construct() {
        parent::__construct();
    }

    function invoice_print() {
        $sql_product = "SELECT * FROM invoice_has_product, product WHERE invoice_invoice_id = (SELECT invoice_id FROM invoice ORDER BY invoice_id DESC LIMIT 1)
            and product_product_id = product_id";
        $sql_invoice = "SELECT * FROM invoice ORDER BY invoice_id DESC LIMIT 1";

        $query_product = $this->db->query($sql_product);
        $query_invoice = $this->db->query($sql_invoice);
        $data['product'] = $query_product->result_array();
        $data['invoice'] = $query_invoice->result_array();
        return ($data);
    }

}