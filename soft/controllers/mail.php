<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Mail extends CI_Controller {

    function __construct() {
        parent::__construct();
        $config = Array(
//            'protocol' => 'smtp',
//            'smtp_host' => 'ssl://smtp.googlemail.com',
//            'smtp_port' => 465,
//            'smtp_user' => 'admin@distroit.com',
//            'smtp_pass' => '5lA}o)OPJ=^C',
            'mailtype' => 'html',
            'charset' => 'iso-8859-1'
        );
        $this->load->library('email', $config);
        $this->email->set_newline("\r\n");
    }

    function _register($email, $password) {
        $this->lang->load('mail/register', $this->session->userdata('lang'));
        $this->email->from('no-reply@distroit.com', 'DistroITdotCOM');
        $this->email->to($email);
        $this->email->cc('register@distroit.com');
        $this->email->subject($this->lang->line('member'));
        $data['activation'] = true_url('www') . "/auth/activation/" . sha1($email);
        $data['email'] = $email;
        $data['password'] = $password;
        $html = $this->load->view('mail/register_view', $data, TRUE);
        $this->email->message($html);
        $this->email->send();
    }

    function _send($email) {
        $this->lang->load('mail/send', $this->session->userdata('lang'));
        $this->email->from('no-reply@distroit.com', 'DistroITdotCOM');
        $this->email->to($email);
        $this->email->cc('send@distroit.com');
        $this->email->subject($this->lang->line('activate'));
        $data['activation'] = true_url('www') . "/auth/activation/" . sha1($email);
        $html = $this->load->view('mail/send_view', $data, TRUE);
        $this->email->message($html);
        $this->email->send();
    }

    function _forgot($email, $randomPass) {
        $this->lang->load('mail/forgot', $this->session->userdata('lang'));
        $this->email->from('no-reply@distroit.com', 'DistroITdotCOM');
        $this->email->to($email);
        $this->email->cc('forgot@distroit.com');
        $this->email->subject($this->lang->line('password'));
        $data['email'] = $email;
        $data['randomPass'] = $randomPass;
        $html = $this->load->view('mail/forgot_view', $data, TRUE);
        $this->email->message($html);
        $this->email->send();
    }

    function _invoice_print($fullname, $email, $phone, $address, $city, $state_state_id, $zip) {
        $this->lang->load('mail/invoice-print', $this->session->userdata('lang'));
        $this->email->from('billing@distroit.com', 'DistroITdotCOM');
        $this->email->to($email);
        $this->email->cc('invoice_print@distroit.com');
        $this->email->subject($this->lang->line('invoice'));
        $data['input'] = $this->Mail_model->invoice_print($state_state_id);
        $shipping = Array(
            'fullname' => $fullname,
            'email' => $email,
            'phone' => $phone,
            'address' => $address,
            'city' => $city,
            'zip' => $zip
        );
        $data['shipping'] = $shipping;
        $html = $this->load->view('mail/invoice-print_view', $data, TRUE);
        $this->email->message($html);
        $this->email->send();
    }

}