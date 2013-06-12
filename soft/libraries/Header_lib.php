<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Header_lib {

    private $title;
    private $base_url;
    private $css;
    private $js;
    private $plugin;
    private $arrCss;
    private $arrJs;
    private $arrPlugin;

    function __construct($param) {
        $CI = & get_instance();
        $this->base_url = $CI->config->item('base_url');
        $this->css = $CI->config->item('css');
        $this->js = $CI->config->item('js');
        $this->plugin = $CI->config->item('plugin');

        if (!isset($param['title'])) {
            $this->title = 'DistroITdotCOM';
        } else {
            $this->title = $param['title'] . ' | DistroITdotCOM';
        }

        if (!isset($param['arrCss'])) {
            $this->arrCss = '';
        } else {
            $this->arrCss = $param['arrCss'];
        }

        if (!isset($param['arrJs'])) {
            $this->arrJs = '';
        } else {
            $this->arrJs = $param['arrJs'];
        }

        if (!isset($param['arrPlugin'])) {
            $this->arrPlugin = '';
        } else {
            $this->arrPlugin = $param['arrPlugin'];
        }
    }

    function loadHeader() {
        $CI = & get_instance();
        $pageCss = '';
        $pageJs = '';
        $pagePlugin = '';

        $header['title'] = $this->title;

        foreach ($this->arrCss as $value) {
            if ($value != '') {
                $pageCss = $pageCss . '<link href="' . $this->base_url . $this->css . $value . '" rel="stylesheet">';
            }
        }
        $header['css'] = $pageCss;

        foreach ($this->arrJs as $value) {
            if ($value != '') {
                $pageJs = $pageJs . '<script src="' . $this->base_url . $this->js . $value . '"></script>';
            }
        }
        $header['js'] = $pageJs;

        foreach ($this->arrPlugin as $value) {
            if ($value != '') {
                $pagePlugin = $pagePlugin . '<script src="' . $this->base_url . $this->plugin . $value . '"></script>';
            }
        }
        $header['plugin'] = $pagePlugin;
        return $CI->load->view('header_view', $header, TRUE);
    }

}