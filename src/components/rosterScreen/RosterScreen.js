import React from 'react';
import OptionItem from '../optionItem/OptionItem';
import { Link } from 'react-router-dom';
import './RoasterScreen.sass'

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


  componentDidUpdate(nextProps, nextState) {
    if (parseInt(nextProps.match.params.targetId) !== parseInt(this.props.match.params.targetId)) {
      this.collectData();
    }
    console.log(this.state.selectElements);
  }

  /**
   * simple buttonclick handler
   * for history back action
   */
  handleBackAction = () => {
    this.props.history.goBack();
  }

  /**
   * An aggregate function to collect data from
   * seperate small functions
   *
   * retuns new state with all necessary data set
   */
  collectData() {
    let allData = this.props.allData,
      targetId = this.props.match.params.targetId,
      parentId,
      elements;

    parentId = this.getParentId(allData, targetId);
    console.log(parentId);
    console.log(targetId);
    elements = this.getCurrentElements(allData, parentId, targetId);

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
        parentId = item.id;
      }
    });
    return parentId;
  }

  /**
   * @param  {array} data props data passed from the parent component
   * @param  {string} targetId id of the clicked block
   * @param  {string} parentId parent id value of the target element
   * @return {array} element new array to render roaster screen
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
        elements.neighbours.push(item);
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
    return elements;
  }


  /**
   * @param  {object} item single item from data array
   * @param  {array} data array of objects passed from the parent component
   * @return {int} count counted amount of all vassal of the current item
   */
  getCountVassals(item, data){
    let count = 0
    data.forEach(dataEl => {
      if(parseInt(item.id) === parseInt(dataEl.parent)) {
        count++;
        count += this.getCountVassals(dataEl, data);
      }
    })
    return count;
  }

  /**
   * @param  {str} image_name
   * @return {func} react require of a file
   */
  getImageUrl(img_name) {
    try{
      return require('../../images/' + img_name);
    }
    catch(err){

      return require('../../fake_img.png');
    }
  }

  scrollNeighbours = (action) => {
    let neighboursLength = this.state.selectElements.neighbours.length;
    console.log(this.state.currentIndex);
    console.log(this.state.selectElements.neighbours);
    if (action === 'increment') {
      this.setState({currentIndex: this.state.currentIndex++});
      if (this.state.currentIndex >= neighboursLength) {
        this.setState({currentIndex: 0})
      }
      console.log(this.state.selectElements.neighbours[this.state.currentIndex]);
    } else {
      if (this.state.currentIndex === 0) {
        this.setState({currentIndex: neighboursLength - 1})
      } else {
        this.setState({currentIndex: this.state.currentIndex--})
      }
      console.log(this.state.selectElements.neighbours[this.state.currentIndex]);
    }
  };

  render () {
    return (
      <div className="roster-screen">
        <div className="container">
          <div className="row">
            <div className="col-2 d-flex align-items-top justify-content-start">
              <span className="linkButton" onClick={this.handleBackAction}>Back</span>
            </div>
            <div className="col-8">
              <div className="navigation-block">
                <div className="navigation-block__controls">
                  <span className="navigation-link__left" onClick={ ()=>{this.scrollNeighbours('decrement')} }>
                    <img src={require('./img/vector_arrow.png')} alt=""/>
                  </span>
                  <div className="target-logo">
                    {
                      (() => {
                        if(this.state.loaded)
                          return (<img src={this.getImageUrl(this.state.selectElements.target.image)}
                                       alt="pic" className="navigationTargetImg"/>)
                      })()
                    }
                  </div>
                  <span className="navigation-link__right" onClick={ () => {this.scrollNeighbours('increment')} } >
                    <img src={require('./img/vector_arrow.png')} alt=""/>
                  </span>
                </div>
                <div className="curr-target-name">
                  <p className="text-center">
                    {
                      (() => {
                        if(this.state.loaded)
                          return (this.state.selectElements.target.name)
                      })()
                    }
                  </p>
                </div>
              </div>
            </div>
            <div className="col-2 d-flex align-items-top justify-content-end">
              <Link className="homeButton" exact to={'/'}> </Link>
            </div>
          </div>
          <div className="d-flex w-100 justify-content-center timeline-block">

          </div>
          <div className="row">
            {
              (() => {
                if(this.state.loaded) {
                  return (<OptionItem items={this.state.selectElements.children}/>)
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
