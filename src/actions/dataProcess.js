export const setTopRowElements = (data) => {
  return {
    type: 'SET_GOVERNMENTS',
    dataGovernments: data,
  }
};

export const setSecondScreen = (screen, target) => {
  return {
    type: 'SET_SECONDSCREEN',
    secondScreen: screen,
    targetId: target
  }
};

export const dropSecondScreen = (screen, target) => {
  return {
    type: 'DROP_SECONDSCREEN',
    secondScreen: screen,
    targetId: target
  }
};

export const setNewItemCollection = (selectElements, parentId, targetId, loaded) => {
  return {
    type: 'SET_ITEM_COLLECTION',
    selectElements,
    parentId,
    targetId,
    loaded
  }
};

export const setCarouselState = (itemIdx, targetItem, loadedCarousel) => {
  return {
    type: 'SET_CAROUSEL_STATE',
    itemIdx,
    targetItem,
    loadedCarousel,
  }
};
