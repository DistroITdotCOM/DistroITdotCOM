<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Product_model extends CI_Model {

    function __construct() {
        parent::__construct();
    }

    function detail($product_id) {
        if (is_numeric($product_id) && $product_id != 0) {
            $sql_product = "SELECT * FROM product, user WHERE product_active = '1' and user_id = user_user_id and product_id = $product_id";
            $sql_pict = "SELECT * FROM pict WHERE pict_name != '../no-img.jpg' and product_product_id = $product_id";
            $sql_random = "SELECT * FROM product, pict 
                WHERE product_product_id = product_id and product_active = '1' and product_id > 50 and pict_name != '../no-img.jpg' 
                ORDER BY RAND() LIMIT 0,2";

            $query_product = $this->db->query($sql_product);
            if ($query_product->num_rows() < 1) {
                header("Location: " . true_url('www'));
            }
            $query_pict = $this->db->query($sql_pict);
            $query_random = $this->db->query($sql_random);

            $data['product'] = $query_product->row();
            $data['pict'] = $query_pict->result();
            $data['random'] = $query_random->result();
            return ($data);
        } else {
            redirect();
        }
    }

}