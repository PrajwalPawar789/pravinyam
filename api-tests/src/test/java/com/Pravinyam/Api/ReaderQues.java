package com.Pravinyam.Api;

import io.restassured.RestAssured;
//import io.restassured.builder.RequestSpecBuilder;
import io.restassured.http.ContentType;
import io.restassured.http.Header;
import io.restassured.http.Headers;
import io.restassured.path.json.JsonPath;

import static io.restassured.RestAssured.*;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.LinkedHashMap;

import org.testng.Assert;

import io.restassured.response.Response;

public class ReaderQues {

	public static void main(String[] args) {
		
//		new RequestSpecBuilder().setBaseUri("http://localhost:8090/api"). 
	
		RestAssured.baseURI = "http://localhost:8090/api";

		Response resp = given().when().get("exercises?module=reader").then().extract().response();

		// print all the headers
		Headers allheaders = resp.headers();
		for (@SuppressWarnings("unused") Header header : allheaders) {
//			System.out.println(header.getName() + " : " + header.getValue());
		}

		JsonPath jsp = new JsonPath(resp.asPrettyString());

		//
		// we check the size of each element inside the array
		LinkedHashMap<String, Object> l = new LinkedHashMap<String, Object>();
//		for(int i=0; i<jsp.getList("$").size();i++)
//		{
		l.put("1", jsp.get("[0].exid"));
		l.put("2", jsp.get("[0].title"));
		l.put("3", jsp.get("[0].description"));
		l.put("4", jsp.get("[0].category"));
		l.put("5", jsp.get("[0].subctegoryid"));
		l.put("6", jsp.get("[0].level"));
		l.put("7", jsp.get("[0].language"));
		l.put("8", jsp.get("[0].qlocation"));
		l.put("9", jsp.get("[0].module"));
//		System.out.println("size " + l.size());
//			for (Map.Entry<String, Object> ite : l.entrySet())
//				System.out.println(ite.getKey() + " : " + ite.getValue());
//		System.out.println("----------------------------");
//		}
//		System.out.println(jsp.getList("$"));

		Assert.assertEquals(resp.getStatusCode(), 200);
//		Assert.assertEquals(resp.getStatusCode(), 400);
		Assert.assertEquals(resp.getStatusLine(), "HTTP/1.1 200 OK");
//		Assert.assertEquals(resp.getStatusLine(), "HTTP/1.1 200 Bad request");
		Assert.assertEquals(resp.header("Content-Type"), "application/json; charset=utf-8");
//		Assert.assertEquals(resp.header("Content-Type"), "application/json;");
		Assert.assertEquals(resp.header("Content-Length"), "16771");
//		Assert.assertEquals(resp.header("Content-Length"), "15771");
		Assert.assertEquals(resp.header("X-Powered-By"), "Express");
		Assert.assertEquals(resp.header("Connection"), "keep-alive");
		Assert.assertEquals(jsp.getList("$").size(), 60);
		Assert.assertEquals(jsp.getList("exid").get(0).getClass().getSimpleName(), "String");
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
		Assert.assertEquals(jsp.getList("module").get(0), "reader");

		ArrayList<Integer> ids = given().contentType(ContentType.JSON)
				.get("exercises?module=reader").then().extract().path("exid");
		HashSet<Integer> hset = new HashSet<Integer>(ids);

		Assert.assertEquals(ids.size(), hset.size());
	}

}
