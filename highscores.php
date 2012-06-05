<?php
   $db =  mysql_connect("localhost", "tyrozakc_admin", "Admin1@");
    mysql_select_db("tyrozakc_CritterStack");
    $query = mysql_query("SELECT * FROM HighScores ORDER BY Score DESC LIMIT 10");  
	   
echo "<table border='1'>";
		
		echo "<tr><th> Name</th><th>Score</th><th> Level</th></tr>";
		while($row = MYSQL_FETCH_ARRAY($query))
		{
			echo "<tr>";
			echo "<td>" . $row['Name'] . "</td>";
     			echo "<td>" . $row['Score'] . "</td>";
			echo "<td>" . $row['Level'] . "</td>";
			echo "</tr>";
		}
		echo "</table>";

	mysql_close($db);  
?>