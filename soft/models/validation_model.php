<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Validation_model extends CI_Model {

    function __construct() {
        parent::__construct();
    }

    function email_check($user_email) {
        $sql = "select user_email from user where user_email='$user_email' and role_role_id = 2";
        $query = $this->db->query($sql);
        if ($query->num_rows() > 0) {
            return TRUE;
        } else {
            return FALSE;
        }
    }

    function username_id_check($user_name, $user_id) {
        $sql = "select user_name from user where user_name='$user_name' and user_id = $user_id";
        $query = $this->db->query($sql);
        if ($query->num_rows() > 0) {
            return TRUE;
        } else {
            return FALSE;
        }
    }

    function username_check($user_name) {
        $sql = "select user_name from user where user_name='$user_name'";
        $query = $this->db->query($sql);
        if ($query->num_rows() > 0) {
            return TRUE;
        } else {
            return FALSE;
        }
    }

    function password_check($user_password, $user_id) {
        $sql = "select user_password from user where user_password=md5('$user_password') and user_id = $user_id";
        $query = $this->db->query($sql);
        if ($query->num_rows() > 0) {
            return TRUE;
        } else {
            return FALSE;
        }
    }

}