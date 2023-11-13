package com.thinking.machines.hr.servlets;
import javax.servlet.*;
import javax.servlet.http.*;
import java.io.*;
import com.thinking.machines.hr.dl.*;
public class ServletTwo extends HttpServlet
{
public void doPost(HttpServletRequest request,HttpServletResponse response)
{
try
{
response.sendError(HttpServletResponse.SC_METHOD_NOT_ALLOWED);
}catch(Exception e)
{
// do nothing
}

}
public void doGet(HttpServletRequest request,HttpServletResponse response)
{
try
{
int code=Integer.parseInt(request.getParameter("code"));
PrintWriter pw=response.getWriter();
response.setContentType("text/plain");
DesignationDAO designationDAO=new DesignationDAO();
try
{
DesignationDTO designation=designationDAO.getDesignationByCode(code);
pw.print(designation.getCode()+","+designation.getTitle());
}catch(DAOException daoException)
{
pw.print("INVALID");
}

}catch(Exception e)
{
System.out.println(e);
try
{
response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
}catch(IOException ioe)
{
// do nothing
}
}
}
}