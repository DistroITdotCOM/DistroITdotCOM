<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Home_model extends CI_Model {

    function __construct() {
        parent::__construct();
    }

    function index() {
        $sql = "SELECT * FROM product, pict WHERE product_product_id = product_id and product_active = '1' and product_id > 50 GROUP BY product_id ORDER BY RAND() LIMIT 0,8";
        $data['product'] = $this->db->query($sql)->result();
        return ($data);
    }

    function search($native_keyword) {
        $keyword = $this->db->escape_like_str($native_keyword);
        $sql = "SELECT * FROM product, pict WHERE (product_product_id = product_id and product_active = '1' and product_id > 50) and (product_name LIKE '%$keyword%' OR product_desc LIKE '%$keyword%') GROUP BY product_id ORDER BY RAND() LIMIT 0,4";
        $data['product'] = $this->db->query($sql)->result();
        return ($data);
    }

}