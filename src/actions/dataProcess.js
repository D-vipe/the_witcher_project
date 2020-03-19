/**
 * @param data
 * @returns {{type: string, dataGovernments: *}}
 *
 * @description Set first data when app is loaded
 */
export const setTopRowElements = (data) => {
  return {
    type: 'SET_GOVERNMENTS',
    dataGovernments: data,
  }
};


/**
 * @description Set necessary data to switch to the roaster screen
 * where other not top-level elements are represented
 *
 * @param secondScreen
 * @param targetId
 * @returns {{type: string, secondScreen: *, targetId: *}}
 */
export const setSecondScreen = (secondScreen, targetId) => {
  return {
    type: 'SET_SECONDSCREEN',
    secondScreen,
    targetId
  }
};


/**
 * @description Set custom history state to let us go back through all our choices
 *
 * @param targetId
 * @returns {{type: string, targetId: *}}
 */
export const setTargetHistory = (targetId) => {
  return {
    type: 'SET_TARGET_HISTORY',
    targetId
  }
};


/**
 * @description Clears all history when we return to the first
 * home screen
 *
 * @returns {{type: string}}
 */
export const clearTargetHistory = () => {
  return {
    type: 'CLEAR_TARGET_HISTORY'
  }
};


/**
 * @description Removes last element from the history array and
 * sets new targetId. If there was only one element in the array,
 * reinitialise the latter and set state to show first screen
 *
 * @returns {{type: string}}
 */
export const historyTargetBack = () => {
  return {
    type: 'HISTORY_TARGET_BACK'
  }
};

/**
 * @description Return to the first screen
 *
 * @param secondScreen
 * @param targetId
 * @returns {{type: string, secondScreen: *, targetId: *}}
 */
export const dropSecondScreen = (secondScreen, targetId) => {
  return {
    type: 'DROP_SECONDSCREEN',
    secondScreen,
    targetId
  }
};


/**
 * @description Processes new data selection and sets new props.
 *
 * @param selectElements
 * @param parentId
 * @param targetId
 * @param loaded
 * @returns {{type: string, selectElements: *, parentId: *, targetId: *, loaded: *}}
 */
export const setNewItemCollection = (selectElements, parentId, targetId, loaded) => {
  return {
    type: 'SET_ITEM_COLLECTION',
    selectElements,
    parentId,
    targetId,
    loaded
  }
};


/**
 * @description Handles state of a carousel component
 *
 * @param itemIdx
 * @param targetItem
 * @param loadedCarousel
 * @returns {{type: string, itemIdx: *, targetItem: *, loadedCarousel: *}}
 */
export const setCarouselState = (itemIdx, targetItem, loadedCarousel) => {
  return {
    type: 'SET_CAROUSEL_STATE',
    itemIdx,
    targetItem,
    loadedCarousel,
  }
};
