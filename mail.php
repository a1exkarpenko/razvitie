<?php
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

    require 'PHPMailer/PHPMailer/src/Exception.php';
    require 'PHPMailer/PHPMailer/src/PHPMailer.php';

    $mail = new PHPMailer(true);
    $mail->CharSet = 'UTF-8';
    $mail->setLanguage('ru', 'phpmailer/language/');
    $mail->isHTML(true);

    $mail->setFrom('from@example.com', 'razvitie');
    $mail->addAddress('from@example.com', 'razvitie');
    $mail->Subject = 'Message';

    $body = "";

    if (trim(!empty($_POST['name']))){
        $body.='<p><strong>Имя:</strong> '.$_POST['name'].'</p>';
    }
    if (trim(!empty($_POST['phone']))){
        $body.='<p><strong>Телефон:</strong> '.$_POST['phone'].'</p>';
    }
    if (trim(!empty($_POST['sum']))){
        $body.='<p><strong>Сумма займа:</strong> '.$_POST['sum'].'</p>';
    }
    if (trim(!empty($_POST['months']))){
        $body.='<p><strong>Срок займа:</strong> '.$_POST['months'].'</p>';
    }
    if (trim(!empty($_POST['type']))){
        $body.='<p><strong>Вид займа:</strong> '.$_POST['type'].'</p>';
    }
    if (trim(!empty($_POST['object']))){
        $body.='<p><strong>Объект залога:</strong> '.$_POST['object'].'</p>';
    }
    if (trim(!empty($_POST['place']))){
        $body.='<p><strong>Местонахождение объекта:</strong> '.$_POST['place'].'</p>';
    }

    $mail->Body = $body;
    // $mail->send();
    try {
        $mail->send();
        // echo "Message has been sent successfully";
    } catch (Exception $e) {
        // echo "Mailer Error: " . $mail->ErrorInfo;
    } finally{
        header("Location: ".$_SERVER['HTTP_REFERER']);
    }
    


