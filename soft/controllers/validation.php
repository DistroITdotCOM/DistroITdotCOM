<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Validation extends CI_Controller {

    function __construct() {
        parent::__construct();
        $this->session->set_flashdata('redirectToCurrent', $this->session->flashdata('redirectToCurrent'));
    }

    function email_check() {
        $user_email = $this->input->post('email');
        $id = $this->input->post('id');
        switch ($id) {
            case 1:
                if ($this->Validation_model->email_check($user_email) == TRUE) {
                    echo "FALSE";
                } else {
                    echo "TRUE";
                }
                break;
            case 2:
                if ($this->Validation_model->email_check($user_email) == TRUE) {
                    echo "TRUE";
                } else {
                    echo "FALSE";
                }
                break;
        }
    }

    function username_check() {
        $user_name = $this->input->post('username');
        $user_id = $this->input->post('user_id');
        if ($user_id != "#") {
            if ($this->Validation_model->username_id_check($user_name, $user_id) == TRUE) {
                echo "TRUE";
            } else {
                if ($this->Validation_model->username_check($user_name) == FALSE) {
                    echo "TRUE";
                } else {
                    echo "FALSE";
                }
            }
        } else {
            if ($this->Validation_model->username_check($user_name) == FALSE) {
                echo "TRUE";
            } else {
                echo "FALSE";
            }
        }
    }

    function username_reserved() {
        $reserved = array("distroit", "mail", "docs");
        $username = strtolower($this->input->post('username'));
        if (in_array($username, $reserved) != TRUE) {
            echo "TRUE";
        } else {
            echo "FALSE";
        }
    }

    function password_check() {
        $user_password = $this->input->post('password');
        $user_id = $this->input->post('user_id');
        if ($this->Validation_model->password_check($user_password, $user_id) == TRUE) {
            echo "TRUE";
        } else {
            echo "FALSE";
        }
    }

}