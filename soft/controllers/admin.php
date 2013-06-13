<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Admin extends CI_Controller {

    function __construct() {
        parent::__construct();
        if ($this->session->userdata('user_role') != 1)
            redirect();
//        $this->lang->load('admin', $this->session->userdata('lang'));
        $this->session->set_flashdata('redirectToCurrent', current_url());
    }

    function _remap($method) {
        $param_offset = 2;
        if (!method_exists($this, $method)) {
            $param_offset = 1;
            $method = 'account';
        }
        $params = array_slice($this->uri->rsegment_array(), $param_offset);
        call_user_func_array(array($this, $method), $params);
    }

    function account() {
        $config['base_url'] = base_url('admin/account');
        $config['total_rows'] = $this->Admin_model->account_count();
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
        $config['per_page'] = 5;
        $config['uri_segment'] = 3;
        $config['num_links'] = 2;
        $this->pagination->initialize($config);
        $data['number'] = $this->uri->segment(3, 0);

        $this->lang->load('admin/account', $this->session->userdata('lang'));
        $data['component'] = 'admin/account_view';
        $data['rs_component'] = $this->Admin_model->account($this->uri->segment(3, 0), $config['per_page']);
        $data['notification'] = $this->session->flashdata('notification');

        $param['title'] = $this->lang->line('account');
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
            'jquery.validate.min.js',
            'autoNumeric.js');
        $this->load->library('Header_lib', $param);
        $data['header'] = $this->header_lib->loadHeader();
        echo preg_replace('/\s\s+/', '', $this->load->view('template_view', $data, TRUE));
    }

    function account_payout() {
        if ($this->input->post('ajax') == 1) {
            if ($this->input->post('update') == 1) {
                $user_id = $this->input->post('user');
                $user_payout = reverse_number($this->input->post('asset'));
                $this->Admin_model->account_payout($user_payout, $user_id);
                redirect('admin/account');
            }
            $data['user_id'] = $this->input->post('user');
            $this->load->view('admin/account-payout_view', $data);
        } else {
            redirect('admin/account');
        }
    }

    function account_active() {
        if ($this->input->post('ajax') == 1) {
            $user_id = $this->uri->segment(3, 0);
            $user_active = $this->uri->segment(4, 0);
            $url = base_url('admin/account_active/' . $user_id);
            $url_js = base_url('res/js/activate.js');
            $this->Admin_model->account_active($user_id, $user_active);
            echo '<script src="' . $url_js . '"></script>';
            if ($user_active == 0) {
                echo '<a class="activate active' . $user_id . '" href="' . $url . '/1">' . $this->lang->line('status_active') . '</a>';
            } else if ($user_active == 1) {
                echo '<a class="activate active' . $user_id . '" href="' . $url . '/0">' . $this->lang->line('status_non') . '</a>';
            }
        } else {
            redirect('admin/account');
        }
    }

    function order() {
        $config['base_url'] = base_url('admin/order');
        $config['total_rows'] = $this->Admin_model->order_count();
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
        $config['per_page'] = 5;
        $config['uri_segment'] = 3;
        $config['num_links'] = 2;
        $this->pagination->initialize($config);
        $data['number'] = $this->uri->segment(3, 0);

        $this->lang->load('admin/account', $this->session->userdata('lang'));
        $data['component'] = 'admin/order_view';
        $data['rs_component'] = $this->Admin_model->order($this->uri->segment(3, 0), $config['per_page']);
        $data['notification'] = $this->session->flashdata('notification');

        $param['title'] = $this->lang->line('order');
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
            'jquery.validate.min.js',
            'autoNumeric.js');
        $this->load->library('Header_lib', $param);
        $data['header'] = $this->header_lib->loadHeader();
        echo preg_replace('/\s\s+/', '', $this->load->view('template_view', $data, TRUE));
    }

    function order_invoice() {
        if ($this->input->post('ajax') == 1) {
            $invoice_id = $this->uri->segment(3, 0);
            $user_id = $this->uri->segment(4, 0);
            $data = $this->Admin_model->order_invoice($invoice_id, $user_id);
            $this->load->view('admin/order-invoice_view', $data);
        } else {
            redirect('admin/order');
        }
    }

    function order_invoice_active() {
        if ($this->input->post('ajax') == 1) {
            $invoice_id = $this->uri->segment(3, 0);
            $invoice_active = $this->uri->segment(4, 0);
            $url = base_url('admin/order_invoice_active/' . $invoice_id);
            $url_js = base_url('res/js/activate.js');
            $this->Admin_model->order_invoice_active($invoice_id, $invoice_active);
            echo '<script src="' . $url_js . '"></script>';
            if ($invoice_active == 0) {
                echo '<a class="activate status' . $invoice_id . '" href="' . $url . '/1">' . $this->lang->line('paid') . '</a>';
            } else if ($invoice_active == 1) {
                echo '<a class="activate status' . $invoice_id . '" href="' . $url . '/0">' . $this->lang->line('unpaid') . '</a>';
            }
        } else {
            redirect('admin/order');
        }
    }

    function product() {
        $config['base_url'] = base_url('admin/product');
        $config['total_rows'] = $this->Admin_model->product_count();
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
        $config['per_page'] = 5;
        $config['uri_segment'] = 3;
        $config['num_links'] = 2;
        $this->pagination->initialize($config);
        $data['number'] = $this->uri->segment(3, 0);

        $this->lang->load('admin/account', $this->session->userdata('lang'));
        $data['component'] = 'admin/product_view';
        $data['rs_component'] = $this->Admin_model->product($this->uri->segment(3, 0), $config['per_page']);
        $data['notification'] = $this->session->flashdata('notification');

        $param['title'] = $this->lang->line('product');
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
            'jquery.validate.min.js',
            'autoNumeric.js');
        $this->load->library('Header_lib', $param);
        $data['header'] = $this->header_lib->loadHeader();
        echo preg_replace('/\s\s+/', '', $this->load->view('template_view', $data, TRUE));
    }

    function product_active() {
        if ($this->input->post('ajax') == 1) {
            $product_id = $this->uri->segment(3, 0);
            $product_active = $this->uri->segment(4, 0);
            $url = base_url('admin/product_active/' . $product_id);
            $url_js = base_url('res/js/activate.js');
            $this->Admin_model->product_active($product_id, $product_active);
            echo '<script src="' . $url_js . '"></script>';
            if ($product_active == 0) {
                echo '<a class="activate product' . $product_id . '" href="' . $url . '/1">' . $this->lang->line('status_active') . '</a>';
            } else if ($product_active == 1) {
                echo '<a class="activate product' . $product_id . '" href="' . $url . '/0">' . $this->lang->line('status_non') . '</a>';
            }
        } else {
            redirect('admin/product');
        }
    }

}