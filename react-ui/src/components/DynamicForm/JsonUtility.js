function getJson(questions) {


  for (let [key, value] of Object.entries(questions)) {

    // console.warn("value.options", typeof value.options);
    if (typeof (value.options) === 'string') {
      // let len = value.options.length;
      let valArray = value.options.split(/\,\s?(?![^\(]*\))/);
      // console.warn("arr", valArray);
      var newOptions = [];

      var keyVal = "" + (parseInt(key) + 1);
      // console.warn(keyVal);
      for (var i = 0; i < valArray.length; i++) {
        var j = i + 1;
        var x = { key: "options" + j, label: "" + valArray[i], name: "" + keyVal, value: "" + j }
        newOptions.push(x);
      }
      value.options = newOptions;
    }
    else {
      value.options = undefined;
    }
  }
  var newJson = JSON.parse(JSON.stringify(questions));

  // console.warn("newjson", newJson);


  return newJson;
};

function getAns(correct_value, wrong_value, questions, answers, exid, model, level) {
  // console.log(exid);
  // console.log("correct_value ", correct_value, " --- ", "wrong_value ", wrong_value);

  let data = { correct_value, wrong_value, questions, answers, exid, model, level }
  try {
    fetch(
      `http://localhost:8090/api/userresponse?userId=admin@gmail.com`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      }
    )
      .then(res => res.json()
        .then(response =>
          console.log("bababa", response)
        ));
  }
  catch (error) {
    console.log(error);
  }
}



module.exports = {
  getJson: getJson,
  getAns: getAns,
}





