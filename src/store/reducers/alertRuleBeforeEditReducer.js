const BEFORE_EDIT_ALERT_RULE = "BEFORE_EDIT_ALERT_RULE";

const initialState = {};

const alertRuleBeforeEditReducer = (state = initialState, action) => {
  switch (action.type) {
    case BEFORE_EDIT_ALERT_RULE:
      return action.payload;
    default:
      return state;
  }
};

export default alertRuleBeforeEditReducer;
