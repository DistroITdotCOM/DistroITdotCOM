<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Auth extends CI_Controller {

    private $mail = null;

    function __construct() {
        parent::__construct();
        $this->lang->load('notification', $this->session->userdata('lang'));
        require_once('mail.php');
        $this->mail = new mail();
        $this->session->set_flashdata('redirectToCurrent', $this->session->flashdata('redirectToCurrent'));
    }

    function register() {
        $username = $this->input->post('username');
        $email = $this->input->post('email');
        $gender = $this->input->post('gender');
        $phone = $this->input->post('phone');
        $password = random_string('alnum', 8);
        $affiliate = $this->session->userdata('affiliate');

        if ($username != NULL || $email != NULL || $gender != NULL || $phone != NULL) {
            if ($this->Validation_model->email_check($email) != TRUE) {
                $this->Auth_model->register_user($username, $email, $gender, $phone, $password, $affiliate);
//                $this->mail->_register($email, $password);
                $this->session->set_flashdata('notification', $this->lang->line('email_notification'));
                echo json_encode(array("success", "{$this->session->flashdata('redirectToCurrent')}"));
            } else {
                redirect();
            }
        } else {
            redirect();
        }
    }

    function login() {
        $email = $this->input->post('email');
        $password = $this->input->post('password');

        if ($email != NULL) {
            if ($this->Auth_model->login_unactive($email) == TRUE) {
                echo json_encode(array("unactive"));
            } else if ($this->Auth_model->login($email, $password) == TRUE) {
                $session_temp = $this->Auth_model->login_session($email);
                $data = array('user_id' => $session_temp->user_id, 'user_role' => $session_temp->role_role_id, 'Clogin' => TRUE);
                $this->session->set_userdata($data);
                $this->session->set_flashdata('notification', $this->lang->line('login_notification'));
                echo json_encode(array("$session_temp->role_role_id", "{$this->session->flashdata('redirectToCurrent')}"));
            } else {
                echo json_encode(array("failed"));
            }
        } else {
            redirect();
        }
    }

    function activation($user_activation) {
        if ($this->Auth_model->activation($user_activation) == TRUE) {
            $this->session->set_flashdata('notification', $this->lang->line('active_notification'));
            redirect($this->session->flashdata('redirectToCurrent'));
        } else {
            $this->session->set_flashdata('notification', $this->lang->line('inactive_notification'));
            redirect($this->session->flashdata('redirectToCurrent'));
        }
    }

    function logout() {
        $this->session->unset_userdata('user_id');
        $this->session->unset_userdata('user_role');
        $this->session->unset_userdata('Clogin');
        $this->session->set_flashdata('notification', $this->lang->line('logout_notification'));
        redirect($this->session->flashdata('redirectToCurrent'));
    }

    function send() {
        $email = $this->input->post('email');
//        $this->mail->_send($email);
        $this->session->set_flashdata('notification', $this->lang->line('email_notification'));
        echo json_encode(array("success", "{$this->session->flashdata('redirectToCurrent')}"));
    }

    function forgot() {
        $email = $this->input->post('email');
        $randomPass = random_string('alnum', 8);
        $this->Auth_model->forgot($email, $randomPass);
//        $this->mail->_forgot($email, $randomPass);
        $this->session->set_flashdata('notification', $this->lang->line('email_notification'));
        echo json_encode(array("success", "{$this->session->flashdata('redirectToCurrent')}"));
    }

}

