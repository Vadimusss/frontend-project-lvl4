import faker from 'faker';
import Cookies from 'js-cookie';

const setNameIfEmpty = () => {
  const name = Cookies.get('name');
  if (name) {
    return name;
  }
  // @ts-ignore
  Cookies.set('name', faker.name.firstName());
  return Cookies.get('name');
};

export default setNameIfEmpty;
