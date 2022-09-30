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