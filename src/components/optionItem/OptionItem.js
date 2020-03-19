import React from 'react';
import './OptionItem.sass';

class OptionItem extends React.Component {

  static checkImgSource(img_url) {
    try{
      return require('../../images/' + img_url);
    }
    catch(err){
      return require('../../images/fake_img.png');
    }
  }

  render() {
    let select_func = this.props.select_func;

    let items = this.props.items.map(item => {
      let image_src = OptionItem.checkImgSource(item.image);
      return (
        <div onClick={select_func.bind(this, item.id, item.parent)} data-id={item.id} key={`image_block_${item.id}`} className="element-select__item">
          <div className="img-wrapper">
            <img src={image_src} alt="pic" className="topRowVassal"/>
            {
              (() => {
                if (item.vassals !== null && item.vassals !== undefined && item.vassals !== 0) {
                  return ( <div className="vassal-count-wrapper">
                           <span className="vassal-count">
                              {item.vassals}
                           </span>
                    </div>
                  )
                }
              })()
            }
          </div>

          <p>{item.name}</p>
          {
            (() => {
              if(item.post)
                return (<p className="small-text">{item.post}</p>)
            })()
          }
        </div>);
    });

    return(
      <div className="item-select__wrapper">
        {items}
      </div>
    )
  }
}

export default OptionItem;
