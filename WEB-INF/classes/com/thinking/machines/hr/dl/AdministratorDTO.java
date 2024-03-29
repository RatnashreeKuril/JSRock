package com.thinking.machines.hr.dl;
public class AdministratorDTO implements Comparable<AdministratorDTO>, java.io.Serializable
{
private String username;
private String password;
public void setUsername(String username)
{
this.username=username;
}
public String getUsername()
{
return this.username;
}
public void setPassword(String password)
{
this.password=password;
}
public String getPassword()
{
return this.password;
}
public int hashCode()
{
return username.hashCode();
}
public int compareTo(AdministratorDTO other)
{
return this.username.compareToIgnoreCase(other.username);
}
public boolean equals(Object object)
{
if(!(object instanceof AdministratorDTO)) return false;
AdministratorDTO other=(AdministratorDTO)object;
return this.username.equalsIgnoreCase(other.username);
}
}