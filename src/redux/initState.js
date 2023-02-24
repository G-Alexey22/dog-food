export const initState = {
  user: {
    _id: "",
    name: "",
    about: "",
    avatar: "",
    group: "",
    email: "",
    token: "",
  },
  basket: [],
  favorite: [],
  filter: {
    search: "",
  },
};

export const getInitState = () => {
  const dataFromLS = window.localStorage.getItem("REDUX");
  return dataFromLS ? JSON.parse(dataFromLS) : initState;
};
