<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class User extends CI_Controller {

    function __construct() {
        parent::__construct();
        $this->lang->load('notification', $this->session->userdata('lang'));
        if ($this->session->flashdata('notification') == 'Logout Sukses.' || $this->session->flashdata('notification') == 'Logout Successfully.')
            $this->session->keep_flashdata('notification');
        if ($this->session->userdata('Clogin') != TRUE)
            redirect();
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
        if ($this->input->post('update') == 1) {
            if (!empty($_FILES['userfile']['name'])) {
                $config['upload_path'] = './upload/img/pict/';
                $config['allowed_types'] = 'png|jpg|jpeg|gif';
                $config['remove_spaces'] = true;
                $config['max_size'] = 700;
                $this->load->library('upload', $config);
                if ($this->upload->do_upload()) {
                    $user_pict = $this->upload->file_name;
                    $this->upload->data();
                }
            } else {
                $pict_temp = $this->User_model->account($this->session->userdata('user_id'));
                foreach ($pict_temp as $value) {
                    $user_pict = $value->user_pict;
                }
            }
            $user_id = $this->session->userdata('user_id');
            $user_name = $this->input->post('username');
            $user_email = $this->input->post('email');
            $user_gender = $this->input->post('gender');
            $user_phone = $this->input->post('phone');
            $this->User_model->account_update($user_id, $user_name, $user_email, $user_pict, $user_gender, $user_phone);
            header('Location: ' . true_url($user_name));
        }
        $this->lang->load('user/account', $this->session->userdata('lang'));
        $data['component'] = 'user/account_view';
        $data['rs_component'] = $this->User_model->account($this->session->userdata('user_id'));
        $data['notification'] = $this->session->flashdata('notification');
        $param['title'] = $this->lang->line('account');
        $param['arrCss'] = array(
            '../plugin/bootstrap/css/bootstrap.min.css',
            '../plugin/bootstrap/css/bootstrap-responsive.min.css',
            '../plugin/bootstrap-notify-1.0.0/css/styles/alert-blackgloss.css',
            '../plugin/bootstrap-notify-1.0.0/css/bootstrap-notify.css',
            'style.css',
            '../plugin/jasny-bootstrap/css/jasny-bootstrap.min.css',
            '../plugin/jasny-bootstrap/css/jasny-bootstrap-responsive.min.css');
        $param['arrJs'] = array();
        $param['arrPlugin'] = array(
            'jquery.min.js',
            'bootstrap/js/bootstrap.min.js',
            'bootstrap-notify-1.0.0/js/bootstrap-notify.js',
            'jquery.validate.min.js',
            'jasny-bootstrap/js/jasny-bootstrap.min.js');
        $this->load->library('Header_lib', $param);
        $data['header'] = $this->header_lib->loadHeader();
        echo preg_replace('/\s\s+/', '', $this->load->view('template_view', $data, TRUE));
    }

    function change_password() {
        if ($this->input->post('update') == 1) {
            $user_id = $this->session->userdata('user_id');
            $user_password = $this->input->post('password');
            $this->User_model->change_password($user_id, $user_password);
            redirect('auth/logout');
        }
        $this->lang->load('user/change-password', $this->session->userdata('lang'));
        $data['component'] = 'user/change-password_view';
        $data['rs_component'] = '';
        $data['notification'] = $this->session->flashdata('notification');
        $param['title'] = $this->lang->line('change_password');
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

    function career() {
        $config['base_url'] = base_url('user/career');
        $config['total_rows'] = $this->User_model->career_count($this->session->userdata('user_id'));
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
        $this->lang->load('user/career', $this->session->userdata('lang'));
        $data['component'] = 'user/career_view';
        $data['rs_component'] = $this->User_model->career($this->session->userdata('user_id'), $this->uri->segment(3, 0), $config['per_page']);
        $data['notification'] = $this->session->flashdata('notification');
        $param['title'] = $this->lang->line('career');
        $param['arrCss'] = array(
            '../plugin/bootstrap/css/bootstrap.min.css',
            '../plugin/bootstrap/css/bootstrap-responsive.min.css',
            'style.css');
        $param['arrJs'] = array();
        $param['arrPlugin'] = array(
            'jquery.min.js',
            'bootstrap/js/bootstrap.min.js');
        $this->load->library('Header_lib', $param);
        $data['header'] = $this->header_lib->loadHeader();
        echo preg_replace('/\s\s+/', '', $this->load->view('template_view', $data, TRUE));
    }

    function product() {
        $config['base_url'] = base_url('user/product');
        $config['total_rows'] = $this->User_model->product_count($this->session->userdata('user_id'));
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
        $config['per_page'] = 4;
        $config['uri_segment'] = 3;
        $config['num_links'] = 2;
        $this->pagination->initialize($config);
        $this->lang->load('user/product', $this->session->userdata('lang'));
        $data['component'] = 'user/product_view';
        $data['rs_component'] = $this->User_model->product($this->session->userdata('user_id'), $this->uri->segment(3, 0), $config['per_page']);
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
            'jquery.validate.min.js');
        $this->load->library('Header_lib', $param);
        $data['header'] = $this->header_lib->loadHeader();
        echo preg_replace('/\s\s+/', '', $this->load->view('template_view', $data, TRUE));
    }

    function upload_image() {
        $this->lang->load('user/upload-image', $this->session->userdata('lang'));
        $UploadDirectory = 'upload/img/product/';
        $userfile = $this->input->post('userfile');
        if ($this->input->post('userfile') != '') {
            if (isset($_FILES[$userfile]['name'])) {
                $FileName = strtolower($_FILES[$userfile]['name']);
                $FileType = $_FILES[$userfile]['type'];
                $FileSize = $_FILES[$userfile]['size'];
                $RandNumber = rand(0, 9999999999);
                if (($FileType == 'image/png' || $FileType == 'image/gif' || $FileType == 'image/jpeg') && $FileSize < 1500000) {
                    $Name['message'] = $RandNumber . '_' . $FileName;
                    move_uploaded_file($_FILES[$userfile]['tmp_name'], $UploadDirectory . $Name['message']);
                    echo json_encode($Name);
                } else if ($FileSize > 1500000) {
                    echo $this->lang->line('file');
                } else {
                    echo $this->lang->line('type');
                }
            }
        }
    }

    function product_insert() {
        $pict_name[0] = null;
        $pict_name[1] = null;
        $pict_name[2] = null;
        if ($this->input->post('insert') == 1) {
            $user_id = $this->session->userdata('user_id');
            $product_name = $this->input->post('name');
            $product_desc = $this->input->post('pdetail');
            $pict_name[0] = $this->input->post('file0');
            $pict_name[1] = $this->input->post('file1');
            $pict_name[2] = $this->input->post('file2');
            $product_commission = reverse_number($this->input->post('commission'));
            $product_price = reverse_number($this->input->post('price'));
            $this->User_model->product_insert($user_id, $product_name, $product_desc, $product_commission, $product_price, $pict_name);
            redirect('user/product');
        }
        $this->lang->load('user/product-insert', $this->session->userdata('lang'));
        $data['component'] = 'user/product-insert_view';
        $data['rs_component'] = '';
        $data['notification'] = $this->session->flashdata('notification');
        $param['title'] = $this->lang->line('product_post');
        $param['arrCss'] = array(
            '../plugin/bootstrap/css/bootstrap.min.css',
            '../plugin/bootstrap/css/bootstrap-responsive.min.css',
            'style.css',
            '../plugin/jasny-bootstrap/css/jasny-bootstrap.min.css',
            '../plugin/jasny-bootstrap/css/jasny-bootstrap-responsive.min.css');
        $param['arrJs'] = array();
        $param['arrPlugin'] = array(
            'jquery.min.js',
            'bootstrap/js/bootstrap.min.js',
            'jquery.validate.min.js',
            'jasny-bootstrap/js/jasny-bootstrap.min.js',
            'tinymce/jscripts/tiny_mce/tiny_mce.js',
            'autoNumeric.js',
            'jquery.form.js');
        $this->load->library('Header_lib', $param);
        $data['header'] = $this->header_lib->loadHeader();
        echo preg_replace('/\s\s+/', '', $this->load->view('template_view', $data, TRUE));
    }

    function product_update() {
        $pict_name[0] = null;
        $pict_name[1] = null;
        $pict_name[2] = null;
        if ($this->input->post('update') == 1) {
            $product_id = $this->input->post('product_id');
            $product_name = $this->input->post('name');
            $product_desc = $this->input->post('pdetail');
            $pict_name[0] = $this->input->post('file0');
            $pict_name[1] = $this->input->post('file1');
            $pict_name[2] = $this->input->post('file2');
            $product_commission = reverse_number($this->input->post('commission'));
            $product_price = reverse_number($this->input->post('price'));
            $this->User_model->product_update($product_id, $product_name, $product_desc, $product_commission, $product_price, $pict_name);
            redirect('product/detail/' . $product_id . '/' . url_title($product_name));
        }
        $this->lang->load('user/product-update', $this->session->userdata('lang'));
        $data['component'] = 'user/product-update_view';
        $data['rs_component'] = $this->User_model->product_get_update($this->session->userdata('user_id'), $this->uri->segment(3, 0));
        $data['notification'] = $this->session->flashdata('notification');
        $param['title'] = $this->lang->line('product_edit') . '-' . $data['rs_component']['product']->product_name;
        $param['arrCss'] = array(
            '../plugin/bootstrap/css/bootstrap.min.css',
            '../plugin/bootstrap/css/bootstrap-responsive.min.css',
            'style.css',
            '../plugin/jasny-bootstrap/css/jasny-bootstrap.min.css',
            '../plugin/jasny-bootstrap/css/jasny-bootstrap-responsive.min.css');
        $param['arrJs'] = array();
        $param['arrPlugin'] = array(
            'jquery.min.js',
            'bootstrap/js/bootstrap.min.js',
            'jquery.validate.min.js',
            'jasny-bootstrap/js/jasny-bootstrap.min.js',
            'tinymce/jscripts/tiny_mce/tiny_mce.js',
            'autoNumeric.js',
            'jquery.form.js');
        $this->load->library('Header_lib', $param);
        $data['header'] = $this->header_lib->loadHeader();
        echo preg_replace('/\s\s+/', '', $this->load->view('template_view', $data, TRUE));
    }

    function product_delete() {
        $this->User_model->product_delete($this->session->userdata('user_id'), $this->uri->segment(3, 0));
        redirect('user/product');
    }

    function address() {
        if ($this->input->post('update') == 1) {
            $user_id = $this->session->userdata('user_id');
            $company = $this->input->post('company');
            $address = $this->input->post('address');
            $city = $this->input->post('city');
            $state = $this->input->post('state');
            $zip = $this->input->post('zip');
            $this->User_model->address_update($user_id, $company, $address, $city, $state, $zip);
            $this->session->set_flashdata('notification', $this->lang->line('save_notification'));
            redirect('user/address');
        }
        $this->lang->load('user/address', $this->session->userdata('lang'));
        $data['component'] = 'user/address_view';
        $data['rs_component'] = $this->User_model->address($this->session->userdata('user_id'));
        $data['notification'] = $this->session->flashdata('notification');
        $param['title'] = $this->lang->line('address');
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

    function map() {
        $this->lang->load('user/map', $this->session->userdata('lang'));
        $data['component'] = 'user/map_view';
        $data['rs_component'] = $this->User_model->map($this->session->userdata('user_id'));
        $data['notification'] = $this->session->flashdata('notification');
        $param['title'] = $this->lang->line('map');
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

    function map_update() {
        $user_id = $this->session->userdata('user_id');
        $user_latitude = $this->input->post('latitude');
        $user_longitude = $this->input->post('longitude');
        $this->User_model->map_update($user_id, $user_latitude, $user_longitude);
    }

}