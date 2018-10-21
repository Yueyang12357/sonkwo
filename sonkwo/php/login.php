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
if (mysql_num_rows($select_res) == 0) {//获取行数，确认是否存在
    die("用户不存在");
}
while ($item = mysql_fetch_array($select_res)) {
    if ($item['password'] != $password) {
        die('密码错误');
    }
}
echo "成功";

mysql_close($con);
?>