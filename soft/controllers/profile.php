<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Profile extends CI_Controller {

    private $username;

    function __construct() {
        parent::__construct();
        $this->session->set_flashdata('redirectToCurrent', current_url());

        $subdomain_arr = explode('.', $_SERVER['HTTP_HOST'], 2);
        $this->session->set_userdata('affiliate', $this->db->from('user')->where('user_name', $subdomain_arr[0])->get()->row()->user_id);
        $this->username = $this->db->from('user')->where('user_name', $subdomain_arr[0])->get()->row()->user_name;
    }

    function index() {
        $this->lang->load('profile/index', $this->session->userdata('lang'));
        $data['component'] = 'profile/index_view';
        $data['rs_component'] = $this->Profile_model->index($this->username);
        $data['notification'] = $this->session->flashdata('notification');

        $param['title'] = $this->username;
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
    function info() {
        if ($this->input->post('ajax') == 1) {
            $this->lang->load('profile/location', $this->session->userdata('lang'));
            $data = $this->Profile_model->info($this->session->userdata('affiliate'));
            echo preg_replace('/\s\s+/', '', $this->load->view('profile/info_view', $data, TRUE));
        } else {
            redirect();
        }
    }
    function product() {
        if ($this->input->post('ajax') == 1) {
            $this->lang->load('profile/product', $this->session->userdata('lang'));
            $config['base_url'] = base_url('profile/product');
            $config['total_rows'] = $this->Profile_model->product_count($this->session->userdata('affiliate'));
            $config['full_tag_open'] = '<div class="pagination"><ul>';
            $config['full_tag_close'] = '</ul></div>';
            $config['first_link'] = '&larr; First';
            $config['last_link'] = 'Last &rarr;';
            $config['first_tag_open'] = '<li>';
            $config['first_tag_close'] = '</li>';
            $config['prev_link'] = '&larr; Previous';
            $config['prev_tag_open'] = '<li class="prev">';
            $config['prev_tag_close'] = '</li>';
            $config['next_link'] = 'Next &rarr;';
            $config['next_tag_open'] = '<li>';
            $config['next_tag_close'] = '</li>';
            $config['last_tag_open'] = '<li>';
            $config['last_tag_close'] = '</li>';
            $config['cur_tag_open'] = '<li class="active"><a href="' . $config['base_url'] . '">';
            $config['cur_tag_close'] = '</a></li>';
            $config['num_tag_open'] = '<li>';
            $config['num_tag_close'] = '</li>';
            $config['per_page'] = 3;
            $config['uri_segment'] = 3;
            $config['num_links'] = 2;
            $this->pagination->initialize($config);
            $data = $this->Profile_model->product($this->session->userdata('affiliate'), $this->uri->segment(3, 0), $config['per_page']);
            echo preg_replace('/\s\s+/', '', $this->load->view('profile/product_view', $data, TRUE));
        } else {
            redirect();
        }
    }

    function location() {
        if ($this->input->post('ajax') == 1) {
            $this->lang->load('profile/location', $this->session->userdata('lang'));
            echo preg_replace('/\s\s+/', '', $this->load->view('profile/location_view', NULL, TRUE));
        } else {
            redirect();
        }
    }

}