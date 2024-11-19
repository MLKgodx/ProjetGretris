package src;

import java.sql.*;


public class test {
    public static void main(String[] args) {
        try{
            Connection connection = DriverManager.getConnection(
                    "jdbc:mysql://localhost:3306/gretris",
                    "root",
                    ""
            );

            Statement statement = connection.createStatement();
            ResultSet resultSet = statement.executeQuery("SELECT * FROM Player");

            while(resultSet.next()){
                System.out.println(resultSet.getString("username"));
                System.out.println(resultSet.getString("email"));
            }
        }catch(SQLException e){
            e.printStackTrace();
        }
    }
}
