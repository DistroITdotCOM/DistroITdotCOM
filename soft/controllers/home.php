<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Home extends CI_Controller {

    function __construct() {
        parent::__construct();
        $this->session->set_flashdata('redirectToCurrent', current_url());
        $subdomain_arr = explode('.', $_SERVER['HTTP_HOST'], 2);
        $this->session->set_userdata('affiliate', $this->db->from('user')->where('user_name', $subdomain_arr[0])->get()->row()->user_id);
    }

    function index() {
        $this->lang->load('home/index', $this->session->userdata('lang'));
        $data['component'] = 'home/index_view';
        $data['rs_component'] = $this->Home_model->index();
        $data['notification'] = $this->session->flashdata('notification');
        $param['title'] = $this->lang->line('home');
        $param['arrCss'] = array(
            '../plugin/bootstrap/css/bootstrap.min.css',
            '../plugin/bootstrap/css/bootstrap-responsive.min.css',
            '../plugin/bootstrap-notify-1.0.0/css/styles/alert-blackgloss.css',
            '../plugin/bootstrap-notify-1.0.0/css/bootstrap-notify.css',
            'style.css');
        $param['arrJs'] = array();
        $param['arrPlugin'] = array(
            'jquery.min.js',
            'bootstrap/js/bootstrap.min.js',
            'bootstrap-notify-1.0.0/js/bootstrap-notify.js',
            'jquery.validate.min.js');
        $this->load->library('Header_lib', $param);
        $data['header'] = $this->header_lib->loadHeader();
        echo preg_replace('/\s\s+/', '', $this->load->view('template_view', $data, TRUE));
    }

    function search() {
        if (isset($_POST['keyword'])) {
            $data['keyword'] = $this->input->post('keyword');
            $this->session->set_userdata('searching', $data['keyword']);
        } else {
            $data['keyword'] = $this->session->userdata('searching');
        }
        $this->lang->load('home/search', $this->session->userdata('lang'));
        $data['component'] = 'home/search_view';
        $data['rs_component'] = $this->Home_model->search($data['keyword']);
        $data['notification'] = $this->session->flashdata('notification');
        $param['title'] = $this->session->userdata('searching');
        $param['arrCss'] = array(
            '../plugin/bootstrap/css/bootstrap.min.css',
            '../plugin/bootstrap/css/bootstrap-responsive.min.css',
            '../plugin/bootstrap-notify-1.0.0/css/styles/alert-blackgloss.css',
            '../plugin/bootstrap-notify-1.0.0/css/bootstrap-notify.css',
            'style.css');
        $param['arrJs'] = array();
        $param['arrPlugin'] = array(
            'jquery.min.js',
            'bootstrap/js/bootstrap.min.js',
            'bootstrap-notify-1.0.0/js/bootstrap-notify.js',
            'jquery.validate.min.js');
        $this->load->library('Header_lib', $param);
        $data['header'] = $this->header_lib->loadHeader();
        echo preg_replace('/\s\s+/', '', $this->load->view('template_view', $data, TRUE));
    }

    function change_lang() {
        if ($this->session->userdata('lang') == 'english') {
            $this->session->set_userdata('lang', 'indonesia');
        } else {
            $this->session->set_userdata('lang', 'english');
        }
        redirect($this->session->flashdata('redirectToCurrent'));
    }

}