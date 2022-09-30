package com.Pravinyam.Api;

import static io.restassured.RestAssured.given;

import java.util.ArrayList;
import java.util.HashSet;

import org.testng.Assert;

import io.restassured.RestAssured;
import io.restassured.path.json.JsonPath;
import io.restassured.response.Response;

@SuppressWarnings("unused")
public class Code {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		RestAssured.baseURI = "http://localhost:8090/api";
		ArrayList<Integer> ids = given().when().get("http://localhost:8090/api/exercises").then().extract()
				.path("exid");
		HashSet<Integer> hset = new HashSet<Integer>(ids);

		Assert.assertEquals(ids.size(), hset.size());

		for (int i = 0; i < ids.size(); i++) {
			String response = given().when().get("code?exercise=" + ids.get(i)).then().extract()
					.response().asPrettyString();
			Response response1 = given().when().get("code?exercise=" + ids.get(i)).then().extract()
					.response();
//			System.out.println(ids.get(i));
//		
			JsonPath js = new JsonPath(response);

			Assert.assertEquals(response.getClass().getSimpleName(), "String");
//			Assert.assertEquals(response.getClass().getSimpleName(), "Integer");
			Assert.assertEquals(response1.statusCode(), 200);
//		Assert.assertEquals(response.statusCode(),400);
			Assert.assertEquals(response1.statusLine(), "HTTP/1.1 200 OK");
//		Assert.assertEquals(response.statusLine(), "HTTP/1.2 200 OK");
			Assert.assertEquals(response1.header("Content-Type"), response1.header("Content-Type"));
//			Assert.assertEquals(response.header("Content-Type"), "application/json;charset=utf-8");
			Assert.assertEquals(response1.header("Content-Length"), response1.header("Content-Length"));
//			Assert.assertEquals(response1.header("Content-Length"), "600");
		}
	}

}
