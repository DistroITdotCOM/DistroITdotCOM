<?php
if ($this->input->post('ajax') != 1) {
    echo $header;
}
?>
<?php if ($this->input->post('ajax') != 1) { ?>
    <body>
    <?php } ?>
    <?php
    if ($this->input->post('ajax') != 1) {
        $this->lang->load('navbar', $this->session->userdata('lang'));
        $this->load->view('navbar_view');
        if ($this->session->userdata('Clogin') != TRUE) {
            $this->lang->load('guest-modal', $this->session->userdata('lang'));
            $this->load->view('guest-modal_view');
        }
    }
    ?>
    <?php if ($this->input->post('ajax') != 1) { ?>
        <div id="ajax-header" class="container">
        <?php } ?>
        <?php
        $this->load->view($component, $rs_component);
        if ($this->input->post('ajax') != 1) {
            $this->load->view('footer_view');
        }
        ?>
        <?php if ($this->input->post('ajax') != 1) { ?>
        </div>
    <?php } ?>
    <?php if ($this->input->post('ajax') != 1) { ?>
    </body>
    </html>
<?php } ?>