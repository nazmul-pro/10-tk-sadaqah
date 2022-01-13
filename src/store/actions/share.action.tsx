import { shareSlice } from "../slices/share.slice";
const { actions: slice } = shareSlice;

// login actions
export const loginAction = (phone) => (dispatch) => {
  dispatch(slice.setLogin(phone));
};

// logout action
export const logoutAction = () => (dispatch) => {
  dispatch(slice.setLogout());
};

// get data

export const getDataAction = () => (dispatch) => {
  // dispatch(slice.setLogout())
  fetch("https://jsonplaceholder.typicode.com/t")
    .then((response) => {
        if(response.ok){
            return response.json()
        } else {
            console.log("Something went wrong !")
        }
    })
    .then((json) => dispatch(slice.setData(json)))
};
