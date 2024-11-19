package Tests.Connection;

import java.sql.*;


public class Connection_Test {
    public static void main(String[] args) {
        // This code snippet is establishing a connection to a MySQL database named "gretris" running
        // on localhost at port 3306. It is using the DriverManager class in Java to get a connection
        // to the database using the URL "jdbc:mysql://localhost:3306/gretris", the username "root",
        // and an empty password "".
        try{
            Connection connection = DriverManager.getConnection(
                    "jdbc:mysql://localhost:3306/gretris",
                    "root",
                    ""
            );

            // The code snippet `Statement statement = connection.createStatement();` is creating a
            // Statement object associated with the Connection object `connection`. This Statement
            // object is used to execute SQL queries against the database.
            Statement statement = connection.createStatement();
            ResultSet resultSet = statement.executeQuery("SELECT * FROM Player");

            // The code snippet `while(resultSet.next()){
            // System.out.println(resultSet.getString("username"));
            // System.out.println(resultSet.getString("email")); }` is iterating through the result set
            // obtained from the SQL query `SELECT * FROM Player`.
            while(resultSet.next()){
                System.out.println(resultSet.getString("username"));
                System.out.println(resultSet.getString("email"));
            }
        }catch(SQLException e){
            e.printStackTrace();
        }
    }
}
