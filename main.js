import './src/style/style.css';
import './src/views/template';
import Header from './src/views/Header';
import Products from './src/views/Products';
import { Action, state } from './src/model';
import Footer from './src/views/Footer';

Header.render();



const getProducts = async () => {
  Products.renderProductsSkeleton();
  await Action.getProducts()
  .then(() => {
    Products.render(state.products);
    Products.handleProductsEvents(addToCart);
  })
}

const addToCart = async (id) => {

  state.product = state.products.filter((product) => {
    if(product?.id == id) {
      return product;
    }
  })[0]

  state.product = {
    ...state.product,
    count: 1
  }

  let repeatitive = state.cart.filter(product => {
    if(product.title == state.product.title) {
      return product;
    }
  })[0]

  if(repeatitive?.title == state.product.title) {
    state.cart.filter(product => {
      if(product.title == state.product.title) {
        product.count = product.count + 1;
      }
    })

  } else {
    state.cart.push(state.product);
  }

  Header.showAddModal();

}



export const increseProductCount = (id) => {
  state.cart.filter(product => {
    if(product.id == id) {
      product.count = product.count + 1;
    }
  })

}

export const decreaseProductCount = (id) => {
  state.cart.filter(product => {
    if(product.id == id) {
      if(product.count > 1) {
        product.count = product.count - 1;

      } else if(product.count == 1) {

        state.cart = state.cart.filter((p) => {
          if(p.id != id) {
            return p;
          }
        })
      }
    }
  })
}


Footer.render();


const init = () => {
  ["load", "hashchange"].map(e => {
    window.addEventListener(e, getProducts);
  })
}

init();