<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Mail_model extends CI_Model {

    function __construct() {
        parent::__construct();
    }

    function invoice_print($state_id) {
        $sql_product = "SELECT * FROM invoice_has_product, product WHERE invoice_invoice_id = (SELECT invoice_id FROM invoice ORDER BY invoice_id DESC LIMIT 1)
            and product_product_id = product_id";
        $sql_invoice = "SELECT * FROM invoice ORDER BY invoice_id DESC LIMIT 1";
        $sql_state = "SELECT * FROM state WHERE state_id={$state_id}";
        $data['product'] = $this->db->query($sql_product)->result();
        $data['invoice'] = $this->db->query($sql_invoice)->result();
        $data['state'] = $this->db->query($sql_state)->row();
        return ($data);
    }

}