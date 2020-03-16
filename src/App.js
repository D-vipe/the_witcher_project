import React from 'react';
import HomeScreen from './components/homeScreen/HomeScreen';
import RosterScreen from './components/rosterScreen/RosterScreen';
import './App.sass';
import data from './input.js';

class App extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      dataGovernments: [],
      secondScreen: false,
      currentTarget: null
    }
  }

  /**
   * @param itemId
   * function listening to click on item selection
   * changes state to render second screen
   */
  handleItemSelect = (itemId) => {
    if (!this.state.secondScreen) {
      this.setState({
        secondScreen: true,
        currentTarget: itemId
      });
    }
  };

  returnHome = () => {
    console.log('fired!');
    this.setState({
      secondScreen: false,
      currentTarget: null
    })
  };

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
  }

  render () {
    return (
        <div className="App">
          {
            (() => {
              if(this.state.secondScreen) {
                return (<RosterScreen targetId={this.state.currentTarget} backFunc={this.returnHome}/>)
              } else {
                return (<HomeScreen select_func={this.handleItemSelect} governments={this.state.dataGovernments}/>)
              }
            })()
          }
        </div>
    )
  }
}

export default App;
