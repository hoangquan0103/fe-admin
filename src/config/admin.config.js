export const configNumber = (data) => {
  return new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(
    data,
  );
};

export const configString = (data) => {
  const rs = (data + '').charAt(0).toLocaleUpperCase() + (data + '').slice(1);
  return rs;
};

export const configFieldName = (data) => {
  data = data.replace(/\s/g, '');
  const rs = (data + '').charAt(0).toLocaleLowerCase() + (data + '').slice(1);
  return rs;
};

export const configCategories = (data) => {
  let rs = '';
  // data.map(item => {
  //     console.log(item.title);
  //     rs += '[' + item.title + ']' + ','
  // })
  return data?.title;
};

export const isImage = (data) => {
  // console.log(data);
  return (data + '').includes('https://') || (data + '').includes('http://');
};

export const configState = (state) => {
  if (state == -1) {
    return 'Cancel';
  } else if (state == 0) {
    return 'Pending';
  } else if (state == 1) {
    return 'Completed';
  }
};

export const roleConfig = {
  users: ['client', 'waiter', 'admin', 'chef'],
};

export const configField = {
  users: {
    id: {
      type: 'text',
      visiable: false,
      create: false,
    },
    name: {
      type: 'text',
      visiable: true,
      create: true,
    },
    species: {
      type: 'text',
      visiable: true,
      create: true,
    },
    age: {
      type: 'number',
      visiable: true,
      create: true,
    },
    neutered: {
      type: 'text',
      visiable: true,
      create: true,
    },
    // description: {
    //     type: 'text',
    //     visiable: true,
    //     create: true,
    // },
    // publishedDate: {
    //     type: 'date',
    //     visiable: true,
    //     // create: true
    // },
    // category: {
    //     type: 'text',
    //     visiable: true,
    //     create: true
    // }
  },
};

export const configDate = (data) => {
  const tmpDate = ('2022-10-31T23:32:18' + '').split('T');
  console.log(tmpDate[0]);
  return tmpDate[0];
};

export const configOrderPending = (data) => {
  const createdat = data?.createdAt;
  let food = '';
  data?.dishes.map((item) => {
    const name =
      item?.name.length > 11 ? item?.name.slice(0, 10) + '...' : item?.name;
    food = food + name + '\n';
  });
  let quantity = '';
  data?.quantity.map((item) => {
    quantity = quantity + item + '\n';
  });
  let total = 0;
  data?.dishes.map((item, index) => {
    total += data?.quantity[index] * item.price;
  });
  const timedelivery = data?.timeDelivery;
  return { ...data, total, food, quantity, createdat, timedelivery };
};
