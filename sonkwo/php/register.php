<?php
    $password = @$_POST['password'];
    $email = @$_POST['email'];
    
    if ($email == '' || $password == '') {
        die('输入错误，邮箱或密码为空');
    }

    $con = mysql_connect('localhost', 'root', '123456');//链接数据库
    if (!$con) {
        die('数据库链接失败' . mysql_error());
    }

    mysql_select_db("sonkwo", $con);//选择数据库
    if (mysql_error()) {
        die('选择数据库错误' . mysql_error());
    }

    $password = md5($password);//md5加密
    $select_res = mysql_query("SELECT email,password FROM login WHERE email='$email'");
    while ($item = mysql_fetch_array($select_res)) {
        if ($item['email'] == $email) {
            die('邮箱已存在');
        }
    }
     //向数据库中添加数据
     $sql_insert_item = "INSERT INTO login (password , email) VALUES( '$password' , '$email');";
     $insert_res = mysql_query($sql_insert_item);
 
     if (!$insert_res) {
         echo "数据库插入错误" . mysql_error();
     }
     echo "成功";

    mysql_close($con);
?>