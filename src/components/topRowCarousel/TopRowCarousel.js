import React, { Component } from 'react';
import getImageUrl from '../../helper';

class TopRowCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      itemIdx: null,
      targetItem: null
    }
  }

  componentDidMount() {
    let target = this.props.target;

    if (!this.state.loaded && target !==undefined) {
      this.prepareAndSetState();
    }
  }

  componentDidUpdate(prevProps) {
    let target = this.props.target;

    if (parseInt(target.id) !== parseInt(prevProps.target.id)) {
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

    this.setState({
      loaded: true,
      itemIdx: targetIdx,
      targetItem: target
    })
  }

  scrollNavigation = (action) => {
    let {
      neighbours,
      navigationFunc
    } = this.props,
        arraLength = neighbours.length,
        new_index = 0;
    if (action === 'increment') {
      new_index = parseInt(this.state.itemIdx) + 1;
      if (new_index > (arraLength - 1)) {
        new_index = 0;
      }
    } else {
      new_index = parseInt(this.state.itemIdx) - 1;
      if (new_index < 0) {
        new_index = arraLength - 1
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
                if(this.state.loaded)
                  return (<img src={getImageUrl(this.state.targetItem.image)}
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
                if(this.state.loaded)
                  return (this.state.targetItem.name)
              })()
            }
          </p>
        </div>
      </div>
    )
  }
}

export default TopRowCarousel;
