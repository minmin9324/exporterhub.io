const EDITTING_ALERT_RULE = "EDITTING_ALERT_RULE";
// const EDITTING_ALERT_RULE_FILENAME = "EDITTING_ALERT_RULE_FILENAME";
// const EDITTING_ALERT_RULE_DESCRIPTION = "EDITTING_ALERT_RULE_DESCRIPTION";

// const initialState = {
//   fileName: "",
//   description: "",
//   content: "",
// };
const initialState = "";

const alertRuleEdittingReducer = (state = initialState, action) => {
  switch (action.type) {
    case EDITTING_ALERT_RULE:
      return action.payload;
    default:
      return state;
  }
};
//   switch (action.type) {
//     case EDITTING_ALERT_RULE:
//       return (state = {
//         ...state,
//         content: action.payload,
//       });
//     case EDITTING_ALERT_RULE_FILENAME:
//       return (state = {
//         ...state,
//         fileName: action.payload,
//       });
//     case EDITTING_ALERT_RULE_DESCRIPTION:
//       return (state = {
//         ...state,
//         description: action.payload,
//       });
//     default:
//       return state;
//   }
// };

export default alertRuleEdittingReducer;
