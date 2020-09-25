<?php

  $curl = curl_init();

  curl_setopt_array($curl, array(
    CURLOPT_URL => "https://platform.antares.id:8443/~/antares-cse/antares-id/FlowSensorProject/motor",
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => "",
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 30,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => "POST",
    CURLOPT_POSTFIELDS => "{\r\n  \"m2m:cin\": {\r\n    \"con\": \"{\\\"speed\\\":5}\"\r\n  }\r\n}",
    CURLOPT_HTTPHEADER => array(
      "accept: application/json",
      "cache-control: no-cache",
      "content-type: application/json;ty=4",
      "postman-token: 3bf649ed-ef66-8e9f-88bc-528f03e19963",
      "x-m2m-origin: 9634da50ff7abd7a:3bdb608765b907a4"
    ),
  ));

  $response = curl_exec($curl);
  curl_close($curl);
  $response = json_encode($response);
  echo $response;

?>