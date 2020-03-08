import React from 'react';
import OptionItem from '../optionItem/OptionItem';
import { Link } from 'react-router-dom';
import './RoasterScreen.sass'

class RosterScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectElements: {},
      parentId: null,
      loaded: false
    }
  }
  componentDidMount() {
    let allData = this.props.allData,
        targetId = this.props.match.params.targetId,
        parentId,
        elements;

    parentId = this.getParentId(allData);
    elements = this.getCurrentElements(allData, parentId, targetId);

    this.setState({
      selectElements: elements,
      parentId: parentId,
      loaded: true
    });
  }

  getParentId(data, targetId) {
    let parentId = null;
    data.forEach(item => {
      if (item.id === parseInt(targetId)) {
        parentId = item.id;
      }
    });
    return parentId;
  }

  getCurrentElements(data, parentId, targetId) {
    let elements = {
      target: {},
      neighbours: [],
      children: []
    };
    data.forEach(item => {
      if (item.id === parseInt(targetId)) {
        elements.target = item;
      }
      if (parentId === null) {
        if (item.parent === undefined) {
          elements.neighbours.push(item);
        }
      } else {
        if (item.parent === parseInt(parentId)) {
          elements.neighbours.push(item);
        }
      }

      if (item.parent === parseInt(targetId)) {
        elements.children.push(item);
      }
    });
    return elements;
  }

  getImageUrl(img_url) {
    try{
      return require('../../images/' + img_url);
    }
    catch(err){
      console.log('Image is not found!');
      // return require('../../images/fakeImage.jpg');
    }
  }


  render () {
    let targetId = this.props.match.params.targetId;
    console.log(this.state.selectElements);
    return (
      <div className="roster-screen">
        <div className="container">
          <div className="row">
            <div className="col-2 d-flex align-items-top justify-content-start">
              <Link className="linkButton" to={'/hierarchy/'}>Back</Link>
            </div>
            <div className="col-8">
              <div className="navigation-block">
                <div className="navigation-block__controls">
                  <Link className="navigation-link__left" to={'/hierarchy/1'}>
                    <img src={require('./vector_arrow.png')} alt=""/>
                  </Link>
                  <div className="target-logo">
                    {
                      (() => {
                        if(this.state.loaded) {
                          return (<img src={this.getImageUrl(this.state.selectElements.target.image)}
                                       alt="pic" className="navigationTargetImg"/>)
                        }
                      })()
                    }
                  </div>
                  <Link className="navigation-link__right" to={'/hierarchy/2'}>
                    <img src={require('./vector_arrow.png')} alt=""/>
                  </Link>
                </div>
                <div className="curr-target-name"></div>
              </div>
            </div>
            <div className="col-2 d-flex align-items-top justify-content-end">
              <Link className="homeButton" exact to={'/'}></Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default RosterScreen;
