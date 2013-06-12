<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

if (!function_exists('get_image')) {

    function get_image($isi = '') {
        $CI = & get_instance();
        $url = $CI->config->item('base_url');
        $first_img = '';
        if (!preg_match_all('/<img.+src=[\'"]([^\'"]+)[\'"].*>/i', $isi, $matches)) {
            $matches = '';
        } else {
            $first_img = $matches[1][0];
        }

        if (empty($first_img)) {
            $first_img = $url . "upload/img/no-img.jpg";
        }
        return $first_img;
    }

}

if (!function_exists('date_convert')) {

    function date_convert($dateString, $Time = false) {
        /* Format : 2007-08-15 01:27:45 */
        $dateParse = strtotime($dateString);
        $month_arr = array(
            '01' => 'Januari',
            '02' => 'Februari',
            '03' => 'Maret',
            '04' => 'April',
            '05' => 'Mei',
            '06' => 'Juni',
            '07' => 'Juli',
            '08' => 'Agustus',
            '09' => 'September',
            '10' => 'Oktober',
            '11' => 'November',
            '12' => 'Desember'
        );
        $day_arr = Array(
            '0' => 'Minggu',
            '1' => 'Senin',
            '2' => 'Selasa',
            '3' => 'Rabu',
            '4' => 'Kamis',
            '5' => 'Jum`at',
            '6' => 'Sabtu'
        );
        $day = @$day_arr[date('w', $dateParse)];
        $date = date('j', $dateParse);
        $month = @$month_arr[date('m', $dateParse)];
        $year = date('Y', $dateParse);
        $time = $Time ? date('g:i A', $dateParse) : '';
        return "$day, <br/>$date $month $year $time";
    }

}

if (!function_exists('true_url')) {

    function true_url($url = '') {
        $ID = & get_instance();
        ($url) ? $subdomain = $url . "." : $subdomain = '';
        $true_url = "http://$subdomain" . $ID->config->item('true_url') . $ID->config->item('suffix_url');
        return $true_url;
    }

}

if (!function_exists('reverse_number')) {

    function reverse_number($number = '') {
        $count = strlen($number);
        $result = null;
        for ($i = $count; $i > 1; $i--) {
            if (substr($number, ($i * -1), 1) != ".") {
                if (substr($number, ($i * -1), 1) == ",") {
                    break;
                }
                $result.=substr($number, ($i * -1), 1);
            }
        }
        return $result;
    }

}