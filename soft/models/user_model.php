<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class User_model extends CI_Model {

    function __construct() {
        parent::__construct();
    }

    function account($user_id) {
        $sql = "SELECT user_name, user_email, user_pict, user_gender, user_phone FROM user WHERE user_id={$this->db->escape($user_id)}";

        $query = $this->db->query($sql);
        $data['account'] = $query->row();
        return ($data);
    }

    function account_update($user_id, $user_name, $user_email, $user_pict, $user_gender, $user_phone) {
        $sql = "UPDATE user SET 
            user_name={$this->db->escape($user_name)},
            user_email={$this->db->escape($user_email)},
            user_pict={$this->db->escape($user_pict)},
            user_gender={$this->db->escape($user_gender)},
            user_phone={$this->db->escape($user_phone)} WHERE user_id={$this->db->escape($user_id)}";
        $this->db->query($sql);
    }

    function change_password($user_id, $user_password) {
        $sql = "UPDATE user SET 
            user_password=md5({$this->db->escape($user_password)}) WHERE user_id={$this->db->escape($user_id)}";
        $this->db->query($sql);
    }

    function career($user_id, $offset, $limit) {
        $sql_gain = "SELECT sum(invoice_has_product_quantity * product_commission) as gain FROM invoice, invoice_has_product, product WHERE 
            invoice_id = invoice_invoice_id and product_product_id = product_id and invoice_status = '1' and product_id > 50";
        $sql_user = "SELECT * FROM user WHERE user_active = '1'";
        $sql_affiliate = "SELECT * FROM user WHERE user_affiliate = {$this->db->escape($user_id)} ORDER BY user_log DESC LIMIT $offset,$limit";
        $sql_amount_affiliate = "SELECT * FROM user WHERE user_affiliate = {$this->db->escape($user_id)} and user_active != 1";
        $sql_payout = "SELECT user_payout FROM user WHERE user_id = {$this->db->escape($user_id)}";

        $query_gain = $this->db->query($sql_gain);
        $query_user = $this->db->query($sql_user);
        $query_affiliate = $this->db->query($sql_affiliate);
        $query_amount_affiliate = $this->db->query($sql_amount_affiliate);
        $query_payout = $this->db->query($sql_payout);
        $data['gain'] = $query_gain->row();
        $data['user'] = $query_user->num_rows;
        $data['affiliate'] = $query_affiliate->result();
        $data['amount_affiliate'] = $query_amount_affiliate->num_rows;
        $data['payout'] = $query_payout->row();
        return ($data);
    }

    function career_count($user_id) {
        $sql = "SELECT * FROM user WHERE user_affiliate = {$this->db->escape($user_id)}";

        $query = $this->db->query($sql);
        $data = $query->num_rows;
        return ($data);
    }

    function product($user_id, $offset, $limit) {
        $sql = "SELECT * FROM product WHERE user_user_id = {$this->db->escape($user_id)} and product_active = '1' ORDER BY product_id DESC LIMIT $offset,$limit";

        $query = $this->db->query($sql);
        $data['product'] = $query->result();
        return ($data);
    }

    function product_count($user_id) {
        $sql = "SELECT * FROM product WHERE user_user_id = {$this->db->escape($user_id)} and product_active = '1' ";

        $query = $this->db->query($sql);
        $data = $query->num_rows;
        return ($data);
    }

    function product_insert($user_id, $product_name, $product_desc, $product_commission, $product_price, $pict_name) {
        $sql_product = "INSERT INTO product (
            user_user_id, 
            product_name, 
            product_desc, 
            product_commission, 
            product_price, 
            product_active) VALUES (
            {$this->db->escape($user_id)}, 
            {$this->db->escape($product_name)}, 
            {$this->db->escape($product_desc)},
            {$this->db->escape($product_commission)}, 
            {$this->db->escape($product_price)}, 
            '1')";
        $this->db->query($sql_product);

        foreach ($pict_name as $value) {
            if ($value != '../no-img.jpg') {
                $sql_pict = "INSERT INTO pict (
                product_product_id,
                pict_name)VALUES(
                last_insert_id(),
                {$this->db->escape($value)})";
                $this->db->query($sql_pict);
            }
        }
    }

    function product_get_update($user_id, $product_id) {
        $sql_product = "SELECT * FROM product WHERE product_id = {$this->db->escape($product_id)} and user_user_id = {$this->db->escape($user_id)}";
        $sql_pict = "SELECT * FROM pict WHERE product_product_id = {$this->db->escape($product_id)}";

        $query_product = $this->db->query($sql_product);
        if ($query_product->num_rows() < 1) {
            header("Location: " . true_url('www'));
        }
        $query_pict = $this->db->query($sql_pict);
        $data['product'] = $query_product->row();
        $data['pict'] = $query_pict->result();
        return ($data);
    }

    function product_update($product_id, $product_name, $product_desc, $product_commission, $product_price, $pict_name) {
        $sql_product = "UPDATE product SET
            product_name =  {$this->db->escape($product_name)},
            product_desc =  {$this->db->escape($product_desc)},
            product_commission =  {$this->db->escape($product_commission)},
            product_price =  {$this->db->escape($product_price)} WHERE product_id ={$this->db->escape($product_id)}";
        $this->db->query($sql_product);

        $sql_pict = "DELETE FROM pict WHERE product_product_id = {$this->db->escape($product_id)}";
        $this->db->query($sql_pict);

        foreach ($pict_name as $value) {
            if ($value != '../no-img.jpg') {
                $sql_pict = "INSERT INTO pict (
                product_product_id,
                pict_name)VALUES(
                {$this->db->escape($product_id)},
                {$this->db->escape($value)})";
                $this->db->query($sql_pict);
            }
        }
    }

    function product_delete($user_id, $product_id) {
        $sql_product = "SELECT * FROM product WHERE product_id = {$this->db->escape($product_id)} and user_user_id = {$this->db->escape($user_id)}";

        $query_product = $this->db->query($sql_product);
        if ($query_product->num_rows() < 1) {
            header("Location: " . true_url('www'));
        } else {
            $sql = "UPDATE product SET product_active = '0' WHERE product_id = {$this->db->escape($product_id)}";
            $this->db->query($sql);
        }
    }

}