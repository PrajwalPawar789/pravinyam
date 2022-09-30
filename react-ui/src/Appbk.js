import React, { Component } from "react";
import DynamicForm from "./components/DynamicForm";
import "./App.css";


class App extends Component {


    onSubmit = model => {
        let message = "You have entered: \n";
        console.log(message);
        for (let [key, value] of Object.entries(model)) {
            console.log(key, value);
        }
        // message += "name = " + model.name + "\n";
        // message += "age = " + model.age + "\n"; 
        //console.log(message);


        // do nothing on Submit for now
        // let data = [];
        // if (model.id) {
        //   data = this.state.data.filter(d => {
        //     return d.id != model.id;
        //   });
        // } else {
        //   model.id = +new Date();
        //   data = this.state.data.slice();
        // }

        // this.setState({
        //   data: [model, ...data],
        //   current: {} // todo
        // });
    }

    // onEdit = id => {
    //   let record = this.state.data.find(d => {
    //     return d.id == id;
    //   });
    //   //alert(JSON.stringify(record));
    //   this.setState({
    //     current: record
    //   });
    // };

    // onNewClick = e => {
    //   this.setState({
    //     current: {}
    //   });
    // };

    render() {
        // let data = this.state.data.map(d => {
        //   return (
        //     <tr key={d.id}>
        //       <td>{d.name}</td>
        //       <td>{d.age}</td>
        //       <td>{d.qualification}</td>
        //       <td>{d.gender}</td>
        //       <td>{d.rating}</td>
        //       <td>{d.city}</td>
        //       <td>{d.skills && d.skills.join(",")}</td>
        //       <td>
        //         <button
        //           onClick={() => {
        //             this.onEdit(d.id);
        //           }}
        //         >
        //           edit
        //         </button>
        //       </td>
        //     </tr>
        //   );
        // });

        return (
            <div className="App">
                {/* <div className="form-actions">
          <button onClick={this.onNewClick} type="submit">
            NEW
          </button>
        </div> */}
                <DynamicForm
                    //          key={this.state.current.id} // hardcode id to some value for now
                    key={10}
                    className="form"
                    title="Answer the following"
                    // defaultValues={this.state.current}
                    model={newJson}
                />

                {/* <table border="1">
          <tbody>{data}</tbody>
        </table> */}
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
//     for (let [key, value] of Object.entries(newJson)) {
//  //   console.log(key, value.options);
//  //   console.log(key, typeof(value.options));
//     if (typeof(value.options) === 'string'){
//         var newOptions = JSON.parse(JSON.stringify(value.options));
//         value.options = newOptions;
//     }
//     }
//     console.log(JSON.parse(JSON.stringify(quesJSon)));
// var x = {key: "options1", label: "20", name: "10", value:"1"}
for (let [key, value] of Object.entries(newJson)) {
    if (value.type === 'radio' || value.type === 'select' || value.type === 'checkbox') {
        console.log(value.options);
    }
}
export default App;