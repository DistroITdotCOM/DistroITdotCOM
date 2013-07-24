<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class User extends CI_Controller {

    function __construct() {
        parent::__construct();
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
        $UploadDirectory = 'upload/img/product/';
        $userfile = $this->input->post('userfile');
        if ($this->input->post('userfile') != '') {
            $FileName = strtolower($_FILES[$userfile]['name']);
            $FileType = $_FILES[$userfile]['type'];
            $FileSize = $_FILES[$userfile]['size'];
            $RandNumber = rand(0, 9999999999);
            if (($FileType == 'image/png' || $FileType == 'image/gif' || $FileType == 'image/jpeg') && $FileSize < 1500000) {
                $Name['message'] = $RandNumber . '_' . $FileName;
//                move_uploaded_file($_FILES[$userfile]['tmp_name'], $UploadDirectory . $Name['message']);
                echo json_encode($Name);
            } else if ($FileSize > 1500000) {
                echo 'file lebih dari 1 MB';
            } else {
                echo 'file format tidak diijinkan';
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
            if (!empty($_FILES['userfile0']['name'])) {
                $config['upload_path'] = './upload/img/product/';
                $config['allowed_types'] = 'png|jpg|jpeg|gif';
                $config['remove_spaces'] = true;
                $this->load->library('upload', $config);
                if ($this->upload->do_upload('userfile0')) {
                    $pict_name[0] = $this->upload->file_name;
                    $this->upload->data();
                }
            } else {
                $pict_name[0] = '../no-img.jpg';
            }
            if (!empty($_FILES['userfile1']['name'])) {
                $config['upload_path'] = './upload/img/product/';
                $config['allowed_types'] = 'png|jpg|jpeg|gif';
                $config['remove_spaces'] = true;
                $this->load->library('upload', $config);
                if ($this->upload->do_upload('userfile1')) {
                    $pict_name[1] = $this->upload->file_name;
                    $this->upload->data();
                }
            } else {
                $pict_name[1] = '../no-img.jpg';
            }
            if (!empty($_FILES['userfile2']['name'])) {
                $config['upload_path'] = './upload/img/product/';
                $config['allowed_types'] = 'png|jpg|jpeg|gif';
                $config['remove_spaces'] = true;
                $this->load->library('upload', $config);
                if ($this->upload->do_upload('userfile2')) {
                    $pict_name[2] = $this->upload->file_name;
                    $this->upload->data();
                }
            } else {
                $pict_name[2] = '../no-img.jpg';
            }
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
            if (!empty($_FILES['userfile0']['name'])) {
                $config['upload_path'] = './upload/img/product/';
                $config['allowed_types'] = 'png|jpg|jpeg|gif';
                $config['remove_spaces'] = true;
                $this->load->library('upload', $config);
                if ($this->upload->do_upload('userfile0')) {
                    $pict_name[0] = $this->upload->file_name;
                    $this->upload->data();
                }
            } else {
                $pict_temp = $this->User_model->product_get_update($this->session->userdata('user_id'), $this->input->post('product_id'));
                foreach ($pict_temp['pict'] as $key => $value) {
                    if ($key == 0) {
                        !empty($value->pict_name) ? $pict_name[2] = $value->pict_name : $pict_name[2] = '../no-img.jpg';
                    }
                }
            }
            if (!empty($_FILES['userfile1']['name'])) {
                $config['upload_path'] = './upload/img/product/';
                $config['allowed_types'] = 'png|jpg|jpeg|gif';
                $config['remove_spaces'] = true;
                $this->load->library('upload', $config);
                if ($this->upload->do_upload('userfile1')) {
                    $pict_name[1] = $this->upload->file_name;
                    $this->upload->data();
                }
            } else {
                $pict_temp = $this->User_model->product_get_update($this->session->userdata('user_id'), $this->input->post('product_id'));
                foreach ($pict_temp['pict'] as $key => $value) {
                    if ($key == 1) {
                        !empty($value->pict_name) ? $pict_name[1] = $value->pict_name : $pict_name[1] = '../no-img.jpg';
                    }
                }
            }
            if (!empty($_FILES['userfile2']['name'])) {
                $config['upload_path'] = './upload/img/product/';
                $config['allowed_types'] = 'png|jpg|jpeg|gif';
                $config['remove_spaces'] = true;
                $this->load->library('upload', $config);
                if ($this->upload->do_upload('userfile2')) {
                    $pict_name[2] = $this->upload->file_name;
                    $this->upload->data();
                }
            } else {
                $pict_temp = $this->User_model->product_get_update($this->session->userdata('user_id'), $this->input->post('product_id'));
                foreach ($pict_temp['pict'] as $key => $value) {
                    if ($key == 2) {
                        !empty($value->pict_name) ? $pict_name[0] = $value->pict_name : $pict_name[0] = '../no-img.jpg';
                    }
                }
            }
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
            'autoNumeric.js');
        $this->load->library('Header_lib', $param);
        $data['header'] = $this->header_lib->loadHeader();
        echo preg_replace('/\s\s+/', '', $this->load->view('template_view', $data, TRUE));
    }

    function product_delete() {
        $this->User_model->product_delete($this->session->userdata('user_id'), $this->uri->segment(3, 0));
        redirect('user/product');
    }

    function address() {
        
    }

}