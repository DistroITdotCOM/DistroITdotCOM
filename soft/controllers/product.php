<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Product extends CI_Controller {

    function __construct() {
        parent::__construct();
        $this->session->set_flashdata('redirectToCurrent', current_url());

        $subdomain_arr = explode('.', $_SERVER['HTTP_HOST'], 2);
        $this->session->set_userdata('affiliate', $this->db->from('user')->where('user_name', $subdomain_arr[0])->get()->row()->user_id);
    }

    function detail() {
        $this->lang->load('product/detail', $this->session->userdata('lang'));
        $data['component'] = 'product/detail_view';
        $data['rs_component'] = $this->Product_model->detail($this->uri->segment(3, 0));
        $data['notification'] = $this->session->flashdata('notification');

        $param['title'] = $data['rs_component']['product']->product_name;
        $param['arrCss'] = array(
            '../plugin/bootstrap/css/bootstrap.min.css',
            '../plugin/bootstrap/css/bootstrap-responsive.min.css',
            '../plugin/bootstrap-notify-1.0.0/css/styles/alert-blackgloss.css',
            '../plugin/bootstrap-notify-1.0.0/css/bootstrap-notify.css',
            'style.css',
            '../plugin/jqzoom_ev-2.3/css/jquery.jqzoom.css');
        $param['arrJs'] = array();
        $param['arrPlugin'] = array(
            'jquery-1.8.3.min.js',
            'bootstrap/js/bootstrap.min.js',
            'bootstrap-notify-1.0.0/js/bootstrap-notify.js',
            'jquery.validate.min.js',
            'jqzoom_ev-2.3/js/jquery.jqzoom-core-pack.js');
        $this->load->library('Header_lib', $param);
        $data['header'] = $this->header_lib->loadHeader();
        echo preg_replace('/\s\s+/', '', $this->load->view('template_view', $data, TRUE));
    }

}