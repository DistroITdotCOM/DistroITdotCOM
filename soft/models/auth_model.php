<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Auth_model extends CI_Model {

    function __construct() {
        parent::__construct();
    }

    function register_user($username, $email, $gender, $phone, $password, $affiliate) {
        $sql = "INSERT INTO user (
            user_name, 
            user_email, 
            user_password, 
            role_role_id, 
            user_activate, 
            user_active,
            user_log,
            user_payout,
            user_gender,
            user_phone,
            user_affiliate) VALUES (
            {$this->db->escape($username)}, 
            {$this->db->escape($email)}, 
            MD5({$this->db->escape($password)}), 
            '2', 
            SHA1({$this->db->escape($email)}), 
            '0',
            now(),
            '0',
            {$this->db->escape($gender)},
            {$this->db->escape($phone)},
            {$this->db->escape($affiliate)})";
        $this->db->query($sql);
    }

    function login_unactive($user_email) {
        $sql = "SELECT * FROM user WHERE user_email={$this->db->escape($user_email)} and user_active='0'";

        $query = $this->db->query($sql);
        if ($query->num_rows() > 0) {
            return TRUE;
        } else {
            return FALSE;
        }
    }

    function login($email, $password) {
        $sql = "SELECT * FROM user WHERE user_email={$this->db->escape($email)} and user_password=md5({$this->db->escape($password)}) and user_active='1'";

        $query = $this->db->query($sql);
        if ($query->num_rows() > 0) {
            return TRUE;
        } else {
            return FALSE;
        }
    }

    function login_session($email) {
        $sql = "SELECT user_id, role_role_id FROM user WHERE user_email={$this->db->escape($email)}";

        $query = $this->db->query($sql);
        $data = $query->row();
        return ($data);
    }

    function activation($user_activation) {
        $check = "SELECT user_activate FROM user WHERE user_activate ={$this->db->escape($user_activation)}";
        $query = $this->db->query($check);

        if ($query->num_rows() > 0) {
            $sql = "UPDATE user SET user_active='1' WHERE user_activate={$this->db->escape($user_activation)}";
            $this->db->query($sql);
            return TRUE;
        } else {
            return FALSE;
        }
    }

    function forgot($email, $randomPass) {
        $sql = "UPDATE user SET 
            user_password=md5({$this->db->escape($randomPass)}) WHERE user_email={$this->db->escape($email)}";
        $this->db->query($sql);
    }

}