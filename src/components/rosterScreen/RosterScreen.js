import React from 'react';
import OptionItem from '../optionItem/OptionItem';
import TopRowCarousel from '../topRowCarousel/TopRowCarousel';
import './RoasterScreen.sass';
import data from '../../input.js';

class RosterScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectElements: {},
      targetId: null,
      parentId: null,
      currentIndex: 0,
      loaded: false
    }
  }

  componentDidMount() {
    if (!this.state.loaded) {
      /**
       * check if the state.loaded is false
       * and form necessary data array to be rendered
       */
      this.collectData();
    }
  }


  handleNavigation = (targetId, parentId) => {
    let elements = this.getCurrentElements(data, parentId, targetId);
    console.log(targetId);
    console.log(parentId);
    if (elements !== undefined) {
      this.setState({
        selectElements: elements,
        parentId: parentId,
        targetId: targetId,
      })
    }
  };

  /**
   * simple buttonclick handler
   * for history back action
   */
  handleBackAction = () => {
    console.log('back action');
    // this.props.history.goBack();
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

    parentId = this.getParentId(data, targetId);
    // console.log(parentId);
    // console.log(targetId);
    elements = this.getCurrentElements(data, parentId, targetId);

    this.setState({
      selectElements: elements,
      parentId: parentId,
      targetId: targetId,
      loaded: true
    });
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
  getCurrentElements(data, parentId, targetId) {
    let elements = {
      target: {},
      neighbours: [],
      children: []
    };
    /**
     * go through the data props to get target item's neighbours (same level),
     * children and set target item as well
     */
    data.forEach(item => {
      if (item.id === parseInt(targetId)) {
        elements.target = item;
      }

      if (parentId === null || parentId === undefined) {
        if (item.parent === undefined) {
          elements.neighbours.push(item);
        }
      } else {
        if (item.parent === parseInt(parentId)) {
          elements.neighbours.push(item);
        }
      }

      if (item.parent === parseInt(targetId)) {
        /*
        add new value to object items
         */
        item.vassals = this.getCountVassals(item, data);
        elements.children.push(item);
      }
    });
    console.log(elements);
    return elements;
  }


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
    let backFunc = this.props.backFunc;
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
                  if(this.state.loaded) {
                    return (<TopRowCarousel neighbours={this.state.selectElements.neighbours}
                                            target={this.state.selectElements.target}
                                            navigationFunc={this.handleNavigation}/>)
                  }
                })()
              }

            </div>
            <div className="col-2 d-flex align-items-top justify-content-end">
              <button className="homeButton" onClick={backFunc}> </button>
            </div>
          </div>
          {
            (() => {
              if(this.state.loaded && this.state.selectElements.children.length > 0) {
                return ( <div className="d-flex w-100 justify-content-center timeline-block">
                </div>)
              }
            })()
          }
          <div className="row">
            {
              (() => {
                if(this.state.loaded) {
                  return (<OptionItem select_func={this.handleNavigation}
                                      items={this.state.selectElements.children}/>)
                }
              })()
            }
          </div>
        </div>
      </div>
    )
  }
}

export default RosterScreen;
