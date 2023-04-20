export const SET_BOOKS = 'SET_BOOKS';
export const SET_ORDER_PENDING = 'SET_ORDER_PENDING';
export const SET_COUNT_NOTIFICATION = 'SET_COUNT_NOTIFICATION';

export const setBooks = (data) => ({
  type: SET_BOOKS,
  payload: data,
});

export const setOrderPending = (data) => ({
  type: SET_ORDER_PENDING,
  payload: data,
});

export const setCountNotifi = (data) => ({
  type: SET_COUNT_NOTIFICATION,
  payload: data,
});
