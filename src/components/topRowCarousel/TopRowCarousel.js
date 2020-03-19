import React, { Component } from 'react';
import getImageUrl from '../../common_js/helper';
import {setCarouselState} from "../../actions/dataProcess";
import connect from "react-redux/es/connect/connect";

class TopRowCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemIdx: null,
      targetItem: null
    }
  }

  componentDidMount() {
    if (!this.props.loadedCarousel && this.props.target !==undefined) {
      this.prepareAndSetState();
    }
  }

  componentDidUpdate(prevProps, nextProps) {
    if (parseInt(this.props.target.id) !== parseInt(prevProps.target.id)) {
      this.prepareAndSetState();
    }
  }

  prepareAndSetState() {
    let  {
      neighbours,
      target
    } = this.props,
      targetIdx = null;

    neighbours.forEach(item => {
      if (parseInt(item.id) === parseInt(target.id)) {
        targetIdx = neighbours.indexOf(item);
      }
    });

    this.props.setCarouselState(targetIdx, target, true);
    // this.setState({
    //   loadedCarousel: true,
    //   itemIdx: targetIdx,
    //   targetItem: target
    // })
  }

  scrollNavigation = (action) => {
    let {
      neighbours,
      navigationFunc
    } = this.props,
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

    this.setState({
      itemIdx: new_index,
      targetItem: neighbours[new_index]
    });

    navigationFunc(neighbours[new_index].id, neighbours[new_index].parent)
  };

  render() {
    return (
      <div className="navigation-block">
        <div className="navigation-block__controls">
                  <span className="navigation-link__left" onClick={ ()=>{this.scrollNavigation('decrement')} }>
                    <img src={require('./img/vector_arrow.png')} alt=""/>
                  </span>
          <div className="target-logo">
            {
              (() => {
                if(this.props.loadedCarousel)
                  return (<img src={getImageUrl(this.props.targetItem.image)}
                               alt="pic" className="navigationTargetImg" id="navigationTargetImg"/>)
              })()
            }
          </div>
          <span className="navigation-link__right" onClick={ () => {this.scrollNavigation('increment')} } >
                    <img src={require('./img/vector_arrow.png')} alt=""/>
                  </span>
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
  console.log(state);
  return {
    neighbours: state.selectElements.neighbours,
    target: state.selectElements.target,
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
