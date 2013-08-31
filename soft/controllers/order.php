<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Order extends CI_Controller {

    function __construct() {
        parent::__construct();
        $this->lang->load('notification', $this->session->userdata('lang'));
        $this->session->set_flashdata('redirectToCurrent', current_url());
    }

    function add() {
        $id = $this->input->post('product_id');
        $cty = $this->input->post('quantity');

        $this->db->where('product_id', $id);
        $query = $this->db->get('product', 1);
        if ($query->num_rows > 0) {

            foreach ($query->result() as $row) {
                $data = array(
                    'id' => $id,
                    'qty' => $cty,
                    'price' => $row->product_price,
                    'name' => $row->product_name
                );

                $this->cart->insert($data);

                if ($this->input->post('ajax') != '1') {
                    redirect();
                } else {
                    echo 'true';
                }
            }
        } else {
            return FALSE;
        }
    }

    function update() {
        $total = $this->cart->total_items();

        $item = $this->input->post('rowid');
        $qty = $this->input->post('qty');

        for ($i = 0; $i < $total; $i++) {
            $data = array(
                'rowid' => $item[$i],
                'qty' => $qty[$i]
            );
            $this->cart->update($data);
        }
        redirect('order/display');
    }

    function display() {
        if ($this->cart->contents()) {
            $this->lang->load('order/display', $this->session->userdata('lang'));
            $data['component'] = 'order/display_view';
            $data['rs_component'] = $this->Home_model->index();
            $data['notification'] = $this->session->flashdata('notification');

            $param['title'] = $this->lang->line('cart');
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
        } else {
            redirect();
        }
    }

    function checkout() {
        if ($this->cart->contents()) {
            $this->lang->load('order/checkout', $this->session->userdata('lang'));
            $data['component'] = 'order/checkout_view';
            $data['rs_component'] = $this->Home_model->index();
            $data['notification'] = $this->session->flashdata('notification');

            $param['title'] = $this->lang->line('form');
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
        } else {
            redirect();
        }
    }

    function invoice_print() {
        if ($this->cart->contents()) {
            if ($this->input->post('ajax') == 1) {
                require_once('mail.php');
                $mail = new mail();

                $fullname = $this->input->post('name');
                $email = $this->input->post('email');
                $phone = $this->input->post('phone');
                $password = random_string('alnum', 8);
                $affiliate = $this->session->userdata('affiliate');

                $address = $this->input->post('address');
                $city = $this->input->post('city');
                $state_state_id = $this->input->post('state');
                $zip = $this->input->post('zip');
                if ($this->Validation_model->email_check($email) == TRUE) {
                    $session = $this->Auth_model->login_session($email);
                    $this->Order_model->invoice_print_user($session->user_id);
                } else {
                    $mail->_register($email, $password);
                    $this->Order_model->invoice_print_guest($fullname, $email, $phone, $password, $affiliate);
                }
                $mail->_invoice_print($fullname, $email, $phone, $address, $city, $state_state_id, $zip);

                $this->cart->destroy();
                $this->session->set_flashdata('notification', $this->lang->line('email_notification'));
                echo json_encode(array("success", true_url('www')));
            } else {
                redirect();
            }
        } else {
            redirect();
        }
    }

}