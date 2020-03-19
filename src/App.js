import React from 'react';
import HomeScreen from './components/homeScreen/HomeScreen';
import RosterScreen from './components/rosterScreen/RosterScreen';
import { connect } from 'react-redux';
import {
  setTopRowElements,
  setSecondScreen
} from './actions/dataProcess';
import './common_css/App.sass';
import data from './input.js';

class App extends React.Component {

  componentDidMount() {
    let processedData = this.getGovernments();
    this.props.setTopRowElements(processedData);
  }

  /**
   * @param itemId
   * function listening to click on item selection
   * changes props to render second screen
   */
  handleItemSelect = (itemId) => {
    if (!this.props.secondScreen) {
      this.props.setSecondScreen(true, itemId);
    }
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

  render () {
    let {
      secondScreen,
    } = this.props;
    return (
        <div className="App">
          {
            (() => {
              if(secondScreen) {
                return (<RosterScreen backFunc={this.returnHome}/>)
              } else {
                return (<HomeScreen select_func={this.handleItemSelect} />)
              }
            })()
          }
        </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    dataGovernments: state.dataGovernments,
    secondScreen: state.secondScreen,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    setTopRowElements: (data) => { dispatch(setTopRowElements(data)) },
    setSecondScreen: (screen, target) => { dispatch(setSecondScreen(screen, target)) }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
