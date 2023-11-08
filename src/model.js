import { url } from "../api"

export const state = {
    products: [],
    product: {},
    cart: []
}

class Actions {

    async getProducts() {
        await fetch(`${url}products`)
        .then(res => res.json())
        .then(data => state.products = data);
    }

    async getProduct(id) {
        await fetch(`${url}products/${id}`)
        .then(res => res.json())
        .then(data => state.product = data);
    }
}

export const Action =  new Actions();