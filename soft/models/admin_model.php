<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Admin_model extends CI_Model {

    function __construct() {
        parent::__construct();
    }

    function account($offset, $limit) {
        $sql = "SELECT * FROM user LIMIT $offset, $limit";

        $query = $this->db->query($sql);
        $data['account'] = $query->result();
        return ($data);
    }

    function account_count() {
        $sql = "SELECT * FROM user";

        $query = $this->db->query($sql);
        $data = $query->num_rows;
        return ($data);
    }

    function account_payout($user_payout, $user_id) {
        $sql = "UPDATE user SET user_payout = user_payout + $user_payout WHERE user_id =$user_id";
        $this->db->query($sql);
    }

    function account_active($user_id, $user_active) {
        if ($user_active == 0) {
            $sql = "UPDATE user SET user_active = '1' WHERE user_id =$user_id";
            $this->db->query($sql);
        } else if ($user_active == 1) {
            $sql = "UPDATE user SET user_active = '0' WHERE user_id =$user_id";
            $this->db->query($sql);
        }
    }

    function order($offset, $limit) {
        $sql = "SELECT * FROM invoice, user WHERE user_user_id = user_id ORDER BY invoice_date DESC LIMIT $offset, $limit";

        $query = $this->db->query($sql);
        $data['order'] = $query->result();
        return ($data);
    }

    function order_count() {
        $sql = "SELECT * FROM invoice, user WHERE user_user_id = user_id";

        $query = $this->db->query($sql);
        $data = $query->num_rows;
        return ($data);
    }

    function order_invoice($invoice_id, $user_id) {
        $sql_invoice = "SELECT * FROM invoice_has_product, product WHERE invoice_invoice_id = $invoice_id and product_product_id = product_id";
        $sql_user = "SELECT * FROM user, state WHERE user_id = $user_id and state_id = state_state_id";

        $query_invoice = $this->db->query($sql_invoice);
        $query_user = $this->db->query($sql_user);
        $data['invoice'] = $query_invoice->result();
        $data['user'] = $query_user->result();
        return ($data);
    }

    function order_invoice_active($invoice_id, $invoice_active) {
        if ($invoice_active == 0) {
            $sql = "UPDATE invoice SET invoice_status = '1' WHERE invoice_id =$invoice_id";
            $this->db->query($sql);
        } else if ($invoice_active == 1) {
            $sql = "UPDATE invoice SET invoice_status = '0' WHERE invoice_id =$invoice_id";
            $this->db->query($sql);
        }
    }

    function product($offset, $limit) {
        $sql = "SELECT * FROM product LIMIT $offset, $limit";

        $query = $this->db->query($sql);
        $data['product'] = $query->result();
        return ($data);
    }

    function product_count() {
        $sql = "SELECT * FROM product";

        $query = $this->db->query($sql);
        $data = $query->num_rows;
        return ($data);
    }

    function product_active($product_id, $product_active) {
        if ($product_active == 0) {
            $sql = "UPDATE product SET product_active = '1' WHERE product_id =$product_id";
            $this->db->query($sql);
        } else if ($product_active == 1) {
            $sql = "UPDATE product SET product_active = '0' WHERE product_id =$product_id";
            $this->db->query($sql);
        }
    }

}