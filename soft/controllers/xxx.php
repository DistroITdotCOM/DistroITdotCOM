<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Xxx extends CI_Controller {

    function __construct() {
        parent::__construct();
    }

    function index() {
        $param['title'] = 'MVC';
        $param['arrCss'] = array(
            '../plugin/bootstrap/css/bootstrap.min.css',
            '../plugin/bootstrap/css/bootstrap-responsive.min.css',
            'xxx.css');
        $param['arrJs'] = array(
            'backbone/util.js',
            'backbone/model/XxxModel.js',
            'backbone/view/XxxView.js',
            'backbone/XxxFunction.js',
            'backbone/XxxRouter.js');
        $param['arrPlugin'] = array(
            'jquery.min.js',
            'bootstrap/js/bootstrap.min.js',
            'underscore-min.js',
            'backbone-min.js');
        $this->load->library('Header_lib', $param);
        $data['header'] = $this->header_lib->loadHeader();

        $this->load->view('xxx_view', $data);
    }

    function home_data() {
        echo json_encode($this->Home_model->index());
    }

    function role_data() {
        echo json_encode($this->Xxx_model->data_all());
    }

    function home_add() {
        $json = json_decode($this->input->post('myData'), true);
        $this->Xxx_model->add($json['role'], $json['desc']);
    }

    function home_edit() {
        if ($this->uri->segment(3, 0) != '') {
            $role_id = $this->uri->segment(3, 0);
            echo json_encode($this->Xxx_model->edit_detail($role_id));
        } else {
            $json = json_decode($this->input->post('myData'), true);
            $this->Xxx_model->edit_data($json['id'], $json['role'], $json['desc']);
        }
    }

    function home_delete() {
        $json = $this->input->post('myData');
        $this->Xxx_model->delete_data($json);
    }

}