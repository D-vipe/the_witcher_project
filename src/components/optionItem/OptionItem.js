import React from 'react';
import './OptionItem.sass';
import { Link } from 'react-router-dom';

class OptionItem extends React.Component {

  checkImgSource(img_url) {
    try{
      return require('../../images/' + img_url);
    }
    catch(err){
      return '../../images/fakeImage.jpg';
    }
  }

  render() {
    let items = this.props.items.map(item => {
    let image_src = this.checkImgSource(item.image);

    return (<Link to={'/hierarchy/' + item.id } key={`image_block_${item.id}`} className="country-select__item">
      <img src={image_src} alt="pic" className="topRowVassal"/>
        <p>{item.name}</p>
      </Link>);
    });
    return(
      <div className="country-select__wrapper">
        {items}
      </div>
    )
  }
}

export default OptionItem;
