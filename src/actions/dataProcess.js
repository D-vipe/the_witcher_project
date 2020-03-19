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
    currentTarget: target
  }
};
