import React, { Component } from "react";
import DynamicForm from "./index";
import "./App.css";
import { getJson, getAns } from './JsonUtility';

class App extends Component {

  constructor() {
    super();
    this.state = {
      questions: [],
      answers: [],
    };
  }



  componentDidMount() {
    let exid = this.props.data.state.exid;
    fetch(
      `http://localhost:8090/api/questions?exercise=${exid}`,
      {
        method: "GET",
      }
    )
      .then(res => res.json()
        .then(response =>
          this.setState({ questions: response })
        ))
      .catch(error => console.log(error));

    fetch(
      `http://localhost:8090/api/questions?exercise=${exid}&answers=true`,
      {
        method: "GET",
      }
    )
      .then(res => res.json()
        .then(response =>
          this.setState({ answers: response })
        ))
      .catch(error => console.log(error));
  }


  onSubmit = model => {
    // console.log(this.props.data);
    const { answers, questions } = this.state
    // console.log("answers", answers);
    // console.log("questions", questions);
    let message = "You have entered: \n";
    // console.log(model);
    console.log(message);
    var correct_value = [];
    var wrong_value = [];
    let exid = this.props.data.state.exid;
    let level = this.props.data.state.level

    // console.log(answers);

    for (let [k, v] of Object.entries(model)) {
      // console.log(k, v);
      // console.log("model", model);

      if (answers[parseInt(k) - 1].answer === v) {
        correct_value.push({ key: answers[parseInt(k) - 1].key, value: v });
        // console.log(k, v, " is the correct answer!");
      } else {
        wrong_value.push({ key: answers[parseInt(k) - 1].key, value: v });
        // console.log(k, v, " is the wrong answer!");
      }
    }
    // console.count()
    getAns(correct_value, wrong_value, answers, questions, exid, model, level)
  }

  render() {
    // console.warn("questions", this.state.questions);
    const { questions } = this.state

    return (
      <div className="App">
        {/* <ToCheckAnswer questions={this.state.questions} exid={exid} /> */}

        <DynamicForm
          counter={0}
          key={10}
          className="form"
          title="Answer the following"

          model={getJson(JSON.parse(JSON.stringify(questions)))}
          // model={newJson}
          onSubmit={model => {
            this.onSubmit(model);
          }}
        />
      </div>
    );
  }
}



const quesJSon = [

  {
    "key": "1",
    "label": "If num1 = 10 and num2 = 20, then what will be the output?",
    "type": "number",

    "options": null
  },

  {
    "key": "2",
    "label": "If num1 = 0 and num2 = 20, then what will be the output?",
    "type": "number",

    "options": null
  },

  {
    "key": "3",
    "label": "If num1 = 10 and num2 = 0, then what will be the output?",
    "type": "number",

    "options": null
  },

  {
    "key": "4",
    "label": "If num1 = -30 and num2 = -20, then what will be the output?",
    "type": "number",

    "options": null
  },

  {
    "key": "5",
    "label": "If num1 = 10 and num2 = -20, then what will be the output?",
    "type": "number",

    "options": null
  },

  {
    "key": "6",
    "label": "If num1 = -10 and num2 = 20, then what will be the output?",
    "type": "number",

    "options": null
  },

  {
    "key": "7",
    "label": "If num1 = * and num2 = 20, then what will be the output?",
    "type": "radio",
    "options": "*, 20, Compilation Error"
  },

  {
    "key": "8",
    "label": "If num1 = '*' and num2 = 20, then what will be the output?",
    "type": "radio",
    "options": "20, 62, Compilation Error"
  },

  {
    "key": "9",
    "label": "What is ASCII value for *?",
    "type": "radio",
    "options": "38,40,42"
  },

  {
    "key": "10",
    "label": "If num1 = '*' and num2 = 20, then what is stored in num1?",
    "type": "radio",
    "options": "20,62,42"
  }
];

for (let [key, value] of Object.entries(quesJSon)) {
  console.log(key, value.options);
  if (typeof (value.options) === 'string') {
    let len = value.options.length;
    let valArray = value.options.split(',');
    var newOptions = [];
    //     var myOption;
    // var val;
    //var newVal = `[`;
    var keyVal = "" + (parseInt(key) + 1);
    for (var i = 0; i < valArray.length; i++) {

      console.log("Value at index i = " + i + "is =" + valArray[i]);
      var j = i + 1;
      //   myOption = {key: "option" + j, label: valArray[i], name: keyVal, value : "" +j}
      //  myOption = new MyRadioOptions("option" + j, valArray[i], keyVal, "" +j);
      //  newOptions.push(myOption);
      //newVal +=  '{ key: "option' + j +'", label: "' + valArray[i] + '" , name: "' + (parseInt(key) + 1) +'", value:"' + j +'"}';
      //               newVal += `{key: "options${j}", label: "${valArray[i]}", name: "${parseInt(key)+1}", value:"${j}"}`
      var x = { key: "options" + j, label: "" + valArray[i], name: "" + keyVal, value: "" + j }
      //     console.log(JSON.parse(JSON.stringify(newVal)));
      newOptions.push(x);
      // if (i < valArray.length - 1){
      //     newVal += ',';
      // }
      //    newOptions.push(JSON.parse(JSON.stringify(newVal)));
    }
    //        newVal += `]`;
    //         newOptions.push(newVal);
    //           console.log("New Val =" + newOptions);

    //  value.options = JSON.parse(JSON.stringify(newVal));
    value.options = newOptions;
    //            console.log("Options =" + value.options);
  }
  else {
    value.options = undefined;
  }
}
// for (let [key, value] of Object.entries(quesJSon)) {
// console.log(key, value.options);
// }
// var quesString = JSON.stringify(quesJSon);
// var replaced = quesString.replace(/"qid"/g, 'key').replace(/"questiontext"/g, 'label');
// replaced = replaced.replace(/"questiontype"/g, 'type').replace(/"options"/g, 'options');
// replaced = replaced.replace(/\"Text\"/g, '\"text\"');
// replaced = replaced.replace(/\"Choice\"/g, '\"radio\"');

// console.log(replaced);

// console.log(typeof(JSON.parse(JSON.stringify(replaced))));
console.log(JSON.parse(JSON.stringify(quesJSon)));

//   var result = JSON.stringify(quesJSon);
//  console.log(JSON.parse(result));
var newJson = JSON.parse(JSON.stringify(quesJSon));


for (let [key, value] of Object.entries(newJson)) {
  if (value.type === 'radio' || value.type === 'select' || value.type === 'checkbox') {
    // console.log(value.options);
  }
}

export default App;