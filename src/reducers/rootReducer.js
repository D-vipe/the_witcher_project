let initState = {
  dataGovernments: [],
  secondScreen: false,
  targetId: null,
  selectElements: {},
  parentId: null,
  currentIndex: 0,
  itemIdx: null,
  targetItem: null,
  loaded: false,
  loadedCarousel: false
};

if (window.localStorage.app_state !== undefined) {
  initState = JSON.parse(window.localStorage.app_state);
}


const rootReducer = (state = initState, action) => {
  if (action.type === 'SET_GOVERNMENTS') {
     return {
       ...state,
       dataGovernments: action.dataGovernments
     }
  }

  if (action.type === 'SET_SECONDSCREEN') {
    return {
      ...state,
      secondScreen: action.secondScreen,
      targetId: action.targetId
    }
  }

  if (action.type === 'DROP_SECONDSCREEN') {
    return {
      ...state,
      secondScreen: action.secondScreen,
      targetId: action.targetId
    }
  }

  if (action.type === 'SET_ITEM_COLLECTION') {
    return {
      ...state,
      selectElements: action.selectElements,
      parentId: action.parentId,
      targetId: action.targetId,
      loaded: action.loaded
    }
  }
  if (action.type === 'SET_CAROUSEL_STATE') {
    return {
      ...state,
      itemIdx: action.itemIdx,
      targetItem: action.targetItem,
      loadedCarousel: action.loadedCarousel,
    }
  }

  return state;
};

export default rootReducer;
