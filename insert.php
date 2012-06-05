<?php
  $NAME = $_POST['name'];
  $SCORE = $_POST['score'];
  $LEVEL = $_POST['level'];
  $PASS = $_POST['password'];
  if($PASS == "SinthushanIsLame" && $LEVEL <=4 )
{
   $db =  mysql_connect("localhost", "tyrozakc_admin", "Admin1@");
    mysql_select_db("tyrozakc_CritterStack");
    mysql_query("INSERT INTO `tyrozakc_CritterStack`.`HighScores` (`Name`, `Score`, `Level`) VALUES ('$NAME', '$SCORE', '$LEVEL');");     
	mysql_close($db);  
}
?>