import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyB7e2tG_ZVMAudD70JzMbZkSRvYmHADmkM',
  authDomain: 'pwr-lab-pizza.firebaseapp.com',
  projectId: 'pwr-lab-pizza',
  storageBucket: 'pwr-lab-pizza.appspot.com',
  messagingSenderId: '303923634388',
  appId: '1:303923634388:web:7c7893bc79503ad6c49b41',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

export interface IPizzaData {
  name: string;
  ingredients: [string];
  image?: string;
}

export interface IPizzaDataServer {
  user: string;
  name: string;
  ingredients: [string];
  image: string;
  time: firebase.firestore.FieldValue;
}

export const auth = firebase.auth();

export const firestore = firebase.firestore();

export const getAllPizzas = () => {
  return firestore.collection('pizzas').get();
};

export const getPizza = (name: string) => {
  return firestore.collection('pizzas').doc(name).get();
};

export const addOrder = (data: IPizzaData) => {
  if (auth.currentUser) {
    firestore
      .collection('orders')
      .add({
        user: auth.currentUser.uid,
        name: data.name,
        ingredients: data.ingredients,
        time: new Date().toDateString(),
        image: data.image,
      })
      .catch(it => console.log(it));
  }
};

export const getOrders = (user: string) => {
  return firestore.collection('orders').where('user', '==', user).get();
};

export const getIngredients = () => {
  return firestore.collection('ingredients').get();
};
