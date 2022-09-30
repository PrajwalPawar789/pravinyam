package com.Pravinyam.Api;

import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import io.restassured.path.json.JsonPath;
import io.restassured.response.Response;

import static io.restassured.RestAssured.*;
import static org.testng.Assert.assertNotNull;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.LinkedHashMap;

import org.testng.Assert;

@SuppressWarnings("unused")
public class SolverQues {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		RestAssured.baseURI = "http://localhost:8090/api";
		
		Response response = given().when().get("exercises?module=solver").then().log().all().extract().response();
		
//		System.out.println(response);
		System.out.println(given().when().get("exercises?module=solver").then().extract().headers());
		
		JsonPath jsp = new JsonPath(response.asPrettyString());
		
		
//		System.out.println(js.getList("$"));
		LinkedHashMap<String, Object> l = new LinkedHashMap<String, Object>();
		l.put("1", jsp.get("[0].exid"));
		l.put("2", jsp.get("[0].title"));
		l.put("3", jsp.get("[0].description"));
		l.put("4", jsp.get("[0].category"));
		l.put("5", jsp.get("[0].subctegoryid"));
		l.put("6", jsp.get("[0].level"));
		l.put("7", jsp.get("[0].language"));
		l.put("8", jsp.get("[0].qlocation"));
		l.put("9", jsp.get("[0].module"));
		
		Assert.assertEquals(l.size(), 9);
//		Assert.assertEquals(l.size(), 19);
		Assert.assertEquals(response.statusCode(),200);
//		Assert.assertEquals(response.statusCode(),400);
		Assert.assertEquals(response.statusLine(), "HTTP/1.1 200 OK");
//		Assert.assertEquals(response.statusLine(), "HTTP/1.2 200 OK");
		Assert.assertEquals(response.header("Content-Type"), "application/json; charset=utf-8");
//		Assert.assertEquals(response.header("Content-Type"), "application/json;charset=utf-8");
		Assert.assertEquals(response.header("Content-Length"), "545");
//		Assert.assertEquals(response.header("Content-Length"), "500");
		Assert.assertEquals(response.header("Connection"), "keep-alive");
//		Assert.assertEquals(response.header("Connection"), "keep-live");
		
		Assert.assertEquals(jsp.getList("$").size(), 2);
//		Assert.assertEquals(jsp.getList("$") ,"");
//		Assert.assertEquals(jsp.getList("$").get(0), jsp.getList("$").get(0));

//		Assert.assertNotEquals(jsp.getList("$"), "");
//		Assert.assertNull(jsp.getList("$"), null);
//		assertNotNull(jsp.getList("$"), null);
//		Assert.assertEquals(jsp.getList("$").size(), 3);
		
//		Assert.assertEquals(jsp.getList("exid").get(0).getClass().getSimpleName(), "String");
//		Assert.assertEquals(jsp.getList("exid").get(0).getClass().getSimpleName(), "Integer");
//		Assert.assertNull(jsp.getList("exid").get(0), null);
		Assert.assertNotEquals(jsp.getList("exid").get(0), "");
		
		Assert.assertEquals(jsp.getList("title").get(0).getClass().getSimpleName(), "String");
		Assert.assertEquals(jsp.getList("description").get(0).getClass().getSimpleName(), "String");
		Assert.assertEquals(jsp.getList("category").get(0).getClass().getSimpleName(), "String");
		Assert.assertEquals(jsp.getList("subctegoryid").get(0).getClass().getSimpleName(), "String");
		Assert.assertEquals(jsp.getList("level").get(0).getClass().getSimpleName(), "String");
		Assert.assertEquals(jsp.getList("language").get(0).getClass().getSimpleName(), "String");
		Assert.assertEquals(jsp.getList("qlocation").get(0).getClass().getSimpleName(), "String");
		Assert.assertEquals(jsp.getList("module").get(0).getClass().getSimpleName(), "String");
		
		Assert.assertEquals(jsp.getList("language").get(0), "C");
//		Assert.assertEquals(jsp.getList("language").get(0), "java");
		Assert.assertEquals(jsp.getList("module").get(0), "solver");
		
		ArrayList<Integer> ids = given().contentType(ContentType.JSON)
				.get("exercises?module=solver").then().extract().path("exid");
		HashSet<Integer> hset = new HashSet<Integer>(ids);

		Assert.assertEquals(ids.size(), hset.size());
		
//		System.out.println();
		
		
	}

}
