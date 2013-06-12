<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Mail extends CI_Controller {

    function __construct() {
        parent::__construct();
        if ($this->session->userdata('lang') == '') {
            $this->session->set_userdata('lang', 'indonesia');
            $this->lang->load($this->session->userdata('lang'), $this->session->userdata('lang'));
            $this->lang->load('mail', $this->session->userdata('lang'));
        } else {
            $this->lang->load($this->session->userdata('lang'), $this->session->userdata('lang'));
            $this->lang->load('mail', $this->session->userdata('lang'));
        }
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
        $this->email->from('no-reply@distroit.com', 'DistroITdotCOM');
        $this->email->to($email);

        $this->email->subject('Pendaftaran Anggota Baru');
        $data['activation'] = true_url('www') . "/auth/activation/" . sha1($email);
        $data['email'] = $email;
        $data['password'] = $password;
        $html = $this->load->view('main/mail/register_view', $data, TRUE);
        $this->email->message($html);
        $this->email->send();
    }

    function _send($email) {
        $this->email->from('no-reply@distroit.com', 'DistroITdotCOM');
        $this->email->to($email);

        $this->email->subject('Aktivasi Akun');
        $data['activation'] = true_url('www') . "/auth/activation/" . sha1($email);
        $html = $this->load->view('main/mail/send_view', $data, TRUE);
        $this->email->message($html);
        $this->email->send();
    }

    function _forgot($email, $randomPass) {
        $this->email->from('no-reply@distroit.com', 'DistroITdotCOM');
        $this->email->to($email);

        $this->email->subject('Lupa Password');
        $data['email'] = $email;
        $data['randomPass'] = $randomPass;
        $html = $this->load->view('main/mail/forgot_view', $data, TRUE);
        $this->email->message($html);
        $this->email->send();
    }

    function _invoice_print($email) {
        $this->email->from('billing@distroit.com', 'DistroITdotCOM');
        $this->email->to($email);

        $this->email->subject('Faktur');
        $data['invoice_print'] = $this->Mail_model->invoice_print();
        $html = $this->load->view('main/mail/invoice-print_view', $data, TRUE);
        $this->email->message($html);
        $this->email->send();
    }

}