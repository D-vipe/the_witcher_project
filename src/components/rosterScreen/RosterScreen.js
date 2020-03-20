import React from 'react';
import OptionItem from '../optionItem/OptionItem';
import TopRowCarousel from '../topRowCarousel/TopRowCarousel';
import './RoasterScreen.sass';
import data from '../../input.js';
import {
  dropSecondScreen,
  setNewItemCollection,
  setTargetHistory,
  clearTargetHistory,
  historyTargetBack
} from '../../actions/dataProcess';
import connect from "react-redux/es/connect/connect";

class RosterScreen extends React.Component {

  componentDidMount() {
    this.collectData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.targetId !== prevProps.targetId) {
      this.collectData();
    }
  }

  handleNavigation = (targetId, parentId) => {
    console.log('handle navigation roaster');
    let elements = this.getCurrentElements(data, parentId, targetId);

    if (elements !== undefined) {
      this.props.setNewItemCollection(elements, parentId, targetId, true);
      this.props.setTargetHistory(targetId);
    }
  };

  /**
   * simple buttonclick handler
   * for history back action
   */
  handleBackAction = () => {
    this.props.historyTargetBack();
  };

  /**
   * An aggregate function to collect data from
   * seperate small functions
   *
   * retuns new state with all necessary data set
   */
  collectData() {
    let {
      targetId
    } = this.props,
      parentId,
      elements;

    // parentId = this.getParentId(data, targetId);
    elements = this.getCurrentElements();

    this.props.setNewItemCollection(elements, parentId, targetId, true);
    this.props.setTargetHistory(targetId);
  }

  /**
   * @param  {array} data props data passed from the parent component
   * @param  {string} targetId id of the clicked block
   * @return {string} parentId parent id value of the target element
   */
  getParentId(data, targetId) {
    let parentId = null;
    data.forEach(item => {
      if (item.id === parseInt(targetId)) {
        return item.id;
      }
    });
    return parentId;
  }

  /**
   * @param  {array} data props data passed from the parent component
   * @param  {string} targetId id of the clicked block
   * @param  {string} parentId parent id value of the target element
   * @return {{target: {}, neighbours: Array, children: Array}} elements new array to render roaster screen
   */
  getCurrentElements() {
    let elements = {
      target: {},
      neighbours: [],
      children: []
    };

    console.log('parent: ' + this.props.parentId);
    console.log('targetId: ' + this.props.targetId);
    /**
     * go through the data props to get target item's neighbours (same level),
     * children and set target item as well
     */
    data.forEach(item => {
      if (item.id === parseInt(this.props.targetId)) {
        elements.target = item;
      }

      if (this.props.parentId === null || this.props.parentId === undefined) {
        if (item.parent === undefined) {
          elements.neighbours.push(item);
        }
      } else {
        if (item.parent === parseInt(this.props.parentId)) {
          elements.neighbours.push(item);
        }
      }

      if (item.parent === parseInt(this.props.targetId)) {
        /*
        add new value to object items
         */
        item.vassals = this.getCountVassals(item, data);
        elements.children.push(item);
      }
    });
    return elements;
  }

  returnHome = () => {
    this.props.dropSecondScreen(false, null);
    this.props.clearTargetHistory();
  };


  /**
   * @param  {object} item single item from data array
   * @param  {array} data array of objects passed from the parent component
   * @return {int} count counted amount of all vassal of the current item
   */
  getCountVassals(item, data){
    let count = 0;
    data.forEach(dataEl => {
      if(parseInt(item.id) === parseInt(dataEl.parent)) {
        count++;
        count += this.getCountVassals(dataEl, data);
      }
    });
    return count;
  }

  render () {
    return (
      <div className="roster-screen">
        <div className="container">
          <div className="row">
            <div className="col-2 d-flex align-items-top justify-content-start">
              <span className="linkButton" onClick={this.handleBackAction}>Back</span>
            </div>
            <div className="col-8">
              {
                (() => {
                  if(this.props.loaded) {
                    return (<TopRowCarousel navigationFunc={this.handleNavigation} />)
                  }
                })()
              }

            </div>
            <div className="col-2 d-flex align-items-top justify-content-end">
              <button className="homeButton" onClick={this.returnHome}> </button>
            </div>
          </div>
          {
            (() => {
              if(this.props.loaded && this.props.selectElements.children.length > 0) {
                return ( <div className="d-flex w-100 justify-content-center timeline-block">
                </div>)
              }
            })()
          }
          <div className="row">
            {
              (() => {
                if(this.props.loaded) {
                  return (<OptionItem select_func={this.handleNavigation}
                                      items={this.props.selectElements.children}/>)
                }
              })()
            }
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    dataGovernments: state.dataGovernments,
    selectElements: state.selectElements,
    targetId: state.targetId,
    parentId: state.parentId,
    currentIndex: state.currentIndex,
    loaded: state.loaded
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    setNewItemCollection: (selectElements, parentId, targetId, loaded) => {
      dispatch(setNewItemCollection(selectElements, parentId, targetId, loaded))
    },
    dropSecondScreen: (screen, target) => { dispatch(dropSecondScreen(screen, target)) },
    setTargetHistory: (targetId) => { dispatch(setTargetHistory(targetId)) },
    clearTargetHistory: () => { dispatch(clearTargetHistory()) },
    historyTargetBack: () => { dispatch(historyTargetBack()) }
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(RosterScreen);
