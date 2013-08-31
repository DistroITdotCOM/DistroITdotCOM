<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Profile_model extends CI_Model {

    function __construct() {
        parent::__construct();
    }

    function index($username) {
        if ($username == '') {
            $sql = "SELECT user_name FROM user WHERE user_active='1' ORDER BY RAND() LIMIT 0,1";
            header("Location: " . true_url($this->db->query($sql)->row()->user_name));
        } else {
            $sql_user = "SELECT user_id, user_name, user_email, user_pict, user_gender, user_phone FROM user WHERE user_name='$username' and user_active='1'";
            $query_user = $this->db->query($sql_user);
            if ($query_user->num_rows() < 1) {
                header("Location: " . true_url('www'));
            }
            $data['user'] = $query_user->row();
            return ($data);
        }
    }

    function info($user_id) {
        $sql = "SELECT * FROM user,state WHERE user_id='$user_id' and user_active='1' and state_id=state_state_id";
        $data['user'] = $this->db->query($sql)->row();
        return ($data);
    }

    function product($user_id, $offset, $limit) {
        $sql = "SELECT * FROM product, pict WHERE product_product_id = product_id and product_active = '1' and product_id > 50 and user_user_id = $user_id
            GROUP BY product_id LIMIT $offset,$limit";
        $data['product'] = $this->db->query($sql)->result();
        $data['info'] = $this->info($user_id);
        return ($data);
    }

    function product_count($user_id) {
        $sql = "SELECT * FROM product WHERE product_active = '1' and product_id > 50 and user_user_id = $user_id";
        $data = $this->db->query($sql)->num_rows;
        return ($data);
    }

    function location($user_id) {
        $sql = "SELECT user_latitude, user_longitude FROM user WHERE user_id={$this->db->escape($user_id)}";
        $data['map'] = $this->db->query($sql)->row();
        return ($data);
    }

}