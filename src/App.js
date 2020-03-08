import React from 'react';
import HomeScreen from './components/homeScreen/HomeScreen';
import RosterScreen from './components/rosterScreen/RosterScreen';
import { Switch, Route } from 'react-router-dom';
import './App.sass';
import data from './input.js';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      dataGovernments: []
    }
  }

  getGovernments() {
    if (data !== undefined || data !== null) {
      let governments = [];
      data.forEach((item) => {
        /**
         * if there is no parent id, then this is a top-level item
         */
        if (item.parent === undefined) {
            governments.push(item);
        }
      });
      return governments;
    }
  }

  componentDidMount() {
    let processedData = this.getGovernments();
    this.setState({
        dataGovernments: processedData
    });
    console.log(123);
  }

  render () {
    return (
        <div className="App">
          <Switch>
            <Route
              exact path="/"
              render={(props) => <HomeScreen {...props} governments={this.state.dataGovernments}/>}
            />
            <Route
              path="/hierarchy/:targetId"
              render={(props) => <RosterScreen {...props} allData={data} />}
            />
          </Switch>
        </div>
    )
  }
}

export default App;
