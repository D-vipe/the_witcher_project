import React from 'react';
import './OptionItem.sass';
import getImageUrl from '../../common_js/helper';

class OptionItem extends React.Component {

  render() {
    let select_func = this.props.select_func;

    let items = this.props.items.map(item => {
      let image_src = getImageUrl(item.image);
      return (
        <div onClick={select_func.bind(this, item.id, item.parent)} data-id={item.id} key={`image_block_${item.id}`} className="element-select__item">
          <div className="img-wrapper">
            <div style={{background: `url(${image_src}) center no-repeat`}} className="topRowVassal">
            {
              (() => {
                if (item.vassals !== null && item.vassals !== undefined && item.vassals !== 0 &&
                item.parent !== undefined) {
                  return (
                    <div className="vassal-count-wrapper">
                       <span className="vassal-count">
                          {item.vassals}
                       </span>
                    </div>
                  )
                }
              })()
            }
            </div>
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
