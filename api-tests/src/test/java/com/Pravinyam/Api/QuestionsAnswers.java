package com.Pravinyam.Api;

import static io.restassured.RestAssured.given;

import java.util.ArrayList;

import org.testng.Assert;

import io.restassured.RestAssured;
import io.restassured.path.json.JsonPath;
import io.restassured.response.Response;

public class QuestionsAnswers {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		RestAssured.baseURI = "http://localhost:8090/api";

		ArrayList<Integer> ids = given().when().get("http://localhost:8090/api/exercises").then().extract()
				.path("exid");
		System.out.println(ids);

		for (int i = 0; i < ids.size(); i++) {
			String response = given().when().get("questions?exercise=" + ids.get(i)).then().extract().response()
					.asPrettyString();
			String response1 = given().log().method().when().get("questions?exercise=" + ids.get(i) + "&answers=true")
					.then().extract().response().asPrettyString();
			JsonPath js = new JsonPath(response);
			JsonPath js1 = new JsonPath(response1);
//			System.out.println(js.getList("$").size() + "--" + js1.getList("$").size());
			Assert.assertEquals(js.getList("$").size(), js1.getList("$").size());
		}
		Response response = given().when().get("questions?exercise=" + ids.get(0) + "").then().extract().response();
		Assert.assertEquals(response.statusCode(), 200);
//		Assert.assertEquals(response.statusCode(),400);
		Assert.assertEquals(response.statusLine(), "HTTP/1.1 200 OK");
//		Assert.assertEquals(response.statusLine(), "HTTP/1.2 200 OK");
		Assert.assertEquals(response.header("Content-Type"), response.header("Content-Type"));
//		Assert.assertEquals(response.header("Content-Type"), "application/json;charset=utf-8");
		Assert.assertEquals(response.header("Content-Length"), response.header("Content-Length"));
//		Assert.assertEquals(response.header("Content-Length"), "600");

	}

}
