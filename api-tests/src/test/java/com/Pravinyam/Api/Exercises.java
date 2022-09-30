package com.Pravinyam.Api;

import static io.restassured.RestAssured.given;

import io.restassured.RestAssured;
import io.restassured.response.Response;

public class Exercises {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		RestAssured.baseURI = "http://localhost:8090/api";

		Response response = given().when().get("exercises?module=reader&language=C").then().log().all().extract().response();
		
		System.out.println(response.asPrettyString());
	}

}
