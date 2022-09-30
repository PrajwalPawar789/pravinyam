package com.Pravinyam.Api;

import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import io.restassured.path.json.JsonPath;

import static io.restassured.RestAssured.*;
import static org.hamcrest.Matchers.*;

import java.util.ArrayList;
//import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedHashMap;
//import java.util.List;
//import java.util.Map;

import org.testng.Assert;

import io.restassured.response.Response;

public class ApiPravinyam {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		RestAssured.baseURI = "http://localhost:8090/api";
		
		Response resp = given().when().get("/modules").then().log().all().extract().response();

		JsonPath jsp = new JsonPath(resp.asString());
		
//		System.out.println(jsp1.get("[0]").getClass().getSimpleName());
		LinkedHashMap<String,Object> l = new LinkedHashMap<String,Object>();
		
//		for(int i=0; i<jsp.getList("$").size();i++)
//		{
			l.put("1", jsp.get("[0].moduleid"));
			l.put("2", jsp.get("[0].module"));
			l.put("3", jsp.get("[0].title"));
			l.put("4", jsp.get("[0].description"));	
			System.out.println(l.size());		 
//			for (Map.Entry<String, Object> ite : l.entrySet())
//				System.out.println(ite.getKey() + " : " + ite.getValue());
//			System.out.println("----------------------------");
//		}
		
		Assert.assertEquals(resp.getStatusCode(), 200);
		Assert.assertEquals(resp.getStatusLine(), "HTTP/1.1 200 OK");
		Assert.assertEquals(resp.header("Content-Type"), "application/json; charset=utf-8");
		Assert.assertEquals(resp.header("Content-Length"), "364");
		Assert.assertEquals(jsp.getList("$").size(), 3);
		Assert.assertEquals(jsp.getList("moduleid").get(0).getClass().getSimpleName(), "String");
		Assert.assertEquals(jsp.getList("module").get(0).getClass().getSimpleName(), "String");
		Assert.assertEquals(jsp.getList("title").get(0).getClass().getSimpleName(), "String");
		Assert.assertEquals(jsp.getList("description").get(0).getClass().getSimpleName(), "String");
		
		//check the id's are unique or not
		ArrayList<Integer> ids = given().contentType(ContentType.JSON)
				.get("exercises?module=reader").then().extract().path("exid");
		HashSet<Integer> hset = new HashSet<Integer>(ids);
		Assert.assertEquals(ids.size(), hset.size());
		
		
		given()
		.when()
		.get("/modules")
		.then()
		.assertThat().statusCode(200)
		.assertThat().statusLine("HTTP/1.1 200 OK")
		.assertThat().header("Content-Length",equalTo("364"))
		.assertThat().header("Content-Type", "application/json; charset=utf-8")
		.assertThat().body("$", hasSize(3)) //checking the size of the array
		.assertThat().body("[0].size()", is(4)) //we are checking the size of object inside the array
		.assertThat().body("[0].moduleid",equalTo("1000"))
		.assertThat().body("[0].moduleid.getClass().getSimpleName()",is("String"));//checks for the data type.
//		.log().all();
		
	}

}
