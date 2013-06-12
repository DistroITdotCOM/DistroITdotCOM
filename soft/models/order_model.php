<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Order_model extends CI_Model {

    function __construct() {
        parent::__construct();
    }

    function invoice_print_user($user_id) {
        $sql_invoice = "INSERT INTO invoice (
            user_user_id, 
            invoice_total, 
            invoice_date, 
            invoice_status) VALUES (
            $user_id, 
            {$this->db->escape($this->cart->total())}, 
            NOW(), 
            '0')";
        $this->db->query($sql_invoice);

        foreach ($this->cart->contents() as $value) {
            $sql_product = "INSERT INTO invoice_has_product (
            invoice_invoice_id, 
            product_product_id, 
            invoice_has_product_quantity) VALUES (
            last_insert_id(), 
            {$this->db->escape($value['id'])}, 
            {$this->db->escape($value['qty'])})";
            $this->db->query($sql_product);
        }
    }

    function invoice_print_guest($fullname, $email, $phone, $password, $affiliate) {
        $sql = "INSERT INTO user (
            user_email,  
            user_password, 
            user_activate, 
            user_active, 
            user_log, 
            user_affiliate, 
            role_role_id,
            user_payout,
            user_fullname,
            user_phone) VALUES (
            {$this->db->escape($email)}, 
            MD5({$this->db->escape($password)}), 
            SHA1({$this->db->escape($email)}), 
            '0', 
            NOW(), 
            {$this->db->escape($affiliate)}, 
            '2',
            '0',
            {$this->db->escape($fullname)},
            {$this->db->escape($phone)})";
        $this->db->query($sql);

        $id = mysql_insert_id();
        $sql_id = "UPDATE user SET user_name = '$id' WHERE user_id = $id";
        $this->db->query($sql_id);

        $sql_invoice = "INSERT INTO invoice (
            user_user_id, 
            invoice_total, 
            invoice_date, 
            invoice_status) VALUES (
            last_insert_id(), 
            {$this->db->escape($this->cart->total())}, 
            NOW(), 
            '0')";
        $this->db->query($sql_invoice);

        foreach ($this->cart->contents() as $value) {
            $sql_product = "INSERT INTO invoice_has_product (
            invoice_invoice_id, 
            product_product_id, 
            invoice_has_product_quantity) VALUES (
            last_insert_id(), 
            {$this->db->escape($value['id'])}, 
            {$this->db->escape($value['qty'])})";
            $this->db->query($sql_product);
        }
    }

}