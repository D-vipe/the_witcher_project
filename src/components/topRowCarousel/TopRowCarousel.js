import React, { Component } from 'react';
import getImageUrl from '../../common_js/helper';
import {setCarouselState} from "../../actions/dataProcess";
import connect from "react-redux/es/connect/connect";

class TopRowCarousel extends Component {

  componentDidMount() {
    if (!this.props.loadedCarousel && this.props.targetItem !==undefined) {
      this.prepareAndSetState();
    }
  }

  componentDidUpdate(prevProps, nextProps) {
    if (parseInt(this.props.targetItem.id) !== parseInt(prevProps.targetItem.id)) {
      this.prepareAndSetState();
    }
  }

  /**
   * @description function that runs through the array of elements of the same level and
   * finds the index of the current target.
   */
  prepareAndSetState() {
    let targetIdx = null;

    this.props.selectElements.neighbours.forEach(item => {
      if (parseInt(item.id) === parseInt(this.props.targetItem.id)) {
        targetIdx = this.props.selectElements.neighbours.indexOf(item);
      }
    });

    this.props.setCarouselState(targetIdx, this.props.targetItem, true);
  }


  /**
   * @description Function to handle carousel navigation between elements of the same level
   * @param action
   */
  scrollNavigation = (action) => {
    let {
      navigationFunc
    } = this.props,
        neighbours = this.props.selectElements.neighbours,
        arrayLength = neighbours.length,
        new_index = 0;


    if (action === 'increment') {
      new_index = parseInt(this.props.itemIdx) + 1;
      if (new_index > (arrayLength - 1)) {
        new_index = 0;
      }
    } else {
      new_index = parseInt(this.props.itemIdx) - 1;
      if (new_index < 0) {
        new_index = arrayLength - 1
      }
    }

    this.props.setCarouselState(new_index, neighbours[new_index], true);

    navigationFunc(neighbours[new_index].id, neighbours[new_index].parent)
  };

  render() {
    return (
      <div className="navigation-block">
        <div className="navigation-block__controls">
          {
            (() => {
              if (this.props.loadedCarousel && this.props.selectElements.neighbours) {
                if (this.props.selectElements.neighbours.length > 1) {
                  return (<span className="navigation-link__left" onClick={ ()=>{this.scrollNavigation('decrement')} }>
                    <img src={require('./img/vector_arrow.png')} alt=""/>
                  </span>);
                }
              }
            })()
          }

          <div className="target-logo">
            {
              (() => {
                if(this.props.loadedCarousel)
                  return (<img src={getImageUrl(this.props.targetItem.image)}
                               alt="pic" className="navigationTargetImg" id="navigationTargetImg"/>)
              })()
            }
          </div>

          {
            (() => {
              if (this.props.loadedCarousel && this.props.selectElements.neighbours) {
                if (this.props.selectElements.neighbours.length > 1) {
                  return (<span className="navigation-link__right" onClick={ () => {this.scrollNavigation('increment')} } >
                    <img src={require('./img/vector_arrow.png')} alt=""/>
                  </span>);
                }
              }
            })()
          }

        </div>
        <div className="curr-target-name">
          <p className="text-center">
            {
              (() => {
                if(this.props.loadedCarousel)
                  return (this.props.targetItem.name)
              })()
            }
          </p>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    selectElements: state.selectElements,
    itemIdx: state.itemIdx,
    targetItem: state.targetItem,
    loadedCarousel: state.loadedCarousel
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCarouselState: (itemIdx, targetItem, loadedCarousel) => {
      dispatch(setCarouselState(itemIdx, targetItem, loadedCarousel))
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(TopRowCarousel);
