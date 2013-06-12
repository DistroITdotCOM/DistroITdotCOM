<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

if (!function_exists('is_profile')) {

    function is_profile() {
        $CI = & get_instance();
        $subdomain_arr = explode('.', $_SERVER['HTTP_HOST'], 2);
        if ($CI->session->userdata('user_id') == $CI->db->from('user')->where('user_name', $subdomain_arr[0])->get()->row()->user_id) {
            return TRUE;
        } else {
            return FALSE;
        }
    }

}

if (!function_exists('is_admin')) {

    function is_admin() {
        $CI = & get_instance();
        if ($CI->session->userdata('user_role') == 1) {
            return TRUE;
        } else {
            return FALSE;
        }
    }

}

if (!function_exists('is_user')) {

    function is_user() {
        $CI = & get_instance();
        if ($CI->session->userdata('user_role') == 1 || $CI->session->userdata('user_role') == 2) {
            return TRUE;
        } else {
            return FALSE;
        }
    }

}

if (!function_exists('is_login')) {

    function is_login() {
        $CI = & get_instance();
        if ($CI->session->userdata('Clogin') == TRUE) {
            return TRUE;
        } else {
            return FALSE;
        }
    }

}