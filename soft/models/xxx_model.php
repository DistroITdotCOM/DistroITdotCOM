<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Xxx_model extends CI_Model {

    function __construct() {
        parent::__construct();
    }

    function data_all() {
        $sql = "SELECT * FROM role";

        $query = $this->db->query($sql);
        $data['role'] = $query->result_array();
        return ($data);
    }

    function data_detail($role_id) {
        $sql = "SELECT * FROM role WHERE role_id = $role_id";

        $query = $this->db->query($sql);
        $data['role'] = $query->result_array();
        return ($data);
    }

    function add($role_name, $role_desc) {
        $sql = "INSERT INTO role(role_name,role_desc) VALUES (
            {$this->db->escape($role_name)},  
            {$this->db->escape($role_desc)})";
        $this->db->query($sql);
    }

    function edit_detail($role_id) {
        $sql = "SELECT * FROM role WHERE role_id = $role_id";

        $query = $this->db->query($sql);
        $data = $query->result_array();
        return ($data);
    }

    function edit_data($role_id, $role_name, $role_desc) {
        $sql = "UPDATE role SET role_name = {$this->db->escape($role_name)}, role_desc = {$this->db->escape($role_desc)} WHERE role_id = $role_id";
        $this->db->query($sql);
    }

    function delete_data($role_id) {
        $sql = "DELETE FROM role WHERE role_id = $role_id";
        $this->db->query($sql);
    }

}