import { decreaseProductCount, increseProductCount } from "../../main";
import { state } from "../model";

class Header {
    header = document.querySelector("header");

    render() {
        this.generateMarkup();
        this.handleHeaderEvents();
    }

    clear() {
        this.header.innerHTML = "";
    }



    renderCart() {
        const markup = /*html*/
        `
        <div class="cartBackdrop fixed top-0 left-0 w-full h-screen z-50 bg-zinc-600/30 flex justify-center items-center overflow-y-scroll">
        <div class="cart lg:w-[50%] md:w-[60%] sm:w-[80%] max-sm:w-[87%] p-5 bg-zinc-100">
          ${
              state.cart?.length == 0 ?
              /*html*/`
              <p class="text-center">There is nothing in your cart yet!</p>
              <p class="text-center mt-2 text-zinc-500">Total price: 0 $</p>
              ` : 
              /*html*/`

              <div class="cartProductsContainer">
              ${ state.cart.length == 1 ? `<p class="text-center">There is ${state.cart.length} item existing in your cart.</p>` : `<p class="text-center">There are ${state.cart.length} items existing in your cart.</p>`}
              

              <ul class="mt-5 mx-auto w-[96%] border-t border-x border-zinc-400">
              ${
                  state.cart.map((product) => {
                      return(/*html*/`
                      <li class="p-5 border-b border-zinc-400 grid grid-cols-3">
                        <div class="col-span-1 grid justify-start items-center">
                          <img src="${product?.image}" class="w-[70px] aspect-square flex items-center" />
                        </div>

                        <div class="col-span-2 text-center grid grid-cols-1">
                          <p class="text-center">${product?.title}</p>
                          <div class="mt-5 flex gap-2 justify-center items-center">
                            <button id="${product?.id}" class="removeProductBtn w-[30px] h-[30px] rounded-md bg-red-500 flex justify-center items-center text-lg text-white">-</button>
                            <div class="flex items-center"><p class="text-center mt-2 text-zinc-500">Quantity: ${product?.count} - Price: ${((product?.count) * (product?.price)).toFixed(2)} $</p></div>
                            <button id="${product?.id}" class="addProductBtn w-[30px] h-[30px] rounded-md bg-green-500 flex justify-center items-center text-lg text-white">+</button>
                          </div>
                        </div>
                      </li>
                      `)
                  }).join("")
              }
              </ul>

              <p class="text-center mt-2 text-zinc-500">Total price: ${(state.cart.reduce((t, c) => t + (c.count * c.price), 0)).toFixed(2)} $</p>
              </div>
              `
          }
        </div>
      </div>
        `

        this.clearCart();
        this.header.querySelector(".cartContainer").insertAdjacentHTML("afterbegin", markup);
        this.handleHeaderEvents();
    }

    clearCart() {
        this.header.querySelector(".cartContainer").innerHTML = "";
    }


    
    renderCartProducts() {
        const markup = /*html*/`
        ${
            state.cart?.length == 0 ?
            /*html*/`
            <p class="text-center">There is nothing in your cart yet!</p>
            <p class="text-center mt-2 text-zinc-500">Total price: 0 $</p>
            ` : 
            /*html*/`

            <div class="cartProductsContainer">
            ${ state.cart.length == 1 ? `<p class="text-center">There is ${state.cart.length} item existing in your cart.</p>` : `<p class="text-center">There are ${state.cart.length} items existing in your cart.</p>`}
            

            <ul class="mt-5 mx-auto w-[96%] border-t border-x border-zinc-400">
            ${
                state.cart.map((product) => {
                    return(/*html*/`
                    <li class="p-5 border-b border-zinc-400 grid grid-cols-3">
                      <div class="col-span-1 grid justify-start items-center">
                        <img src="${product?.image}" class="w-[70px] aspect-square flex items-center" />
                      </div>

                      <div class="col-span-2 text-center grid grid-cols-1">
                        <p class="text-center">${product?.title}</p>
                        <div class="mt-5 flex gap-2 justify-center items-center">
                          <button id="${product?.id}" class="removeProductBtn w-[30px] h-[30px] rounded-md bg-red-500 flex justify-center items-center text-lg text-white">-</button>
                          <div class="flex items-center"><p class="text-center mt-2 text-zinc-500">Quantity: ${product?.count} - Price: ${((product?.count) * (product?.price)).toFixed(2)} $</p></div>
                          <button id="${product?.id}" class="addProductBtn w-[30px] h-[30px] rounded-md bg-green-500 flex justify-center items-center text-lg text-white">+</button>
                        </div>
                      </div>
                    </li>
                    `)
                }).join("")
            }
            </ul>

            <p class="text-center mt-2 text-zinc-500">Total price: ${(state.cart.reduce((t, c) => t + (c.count * c.price), 0)).toFixed(2)} $</p>
            </div>
            `
        }
              </ul>
        `


        this.clearCartProducts();
        this.header.querySelector(".cartProductsContainer").insertAdjacentHTML("afterbegin", markup);
    }

    clearCartProducts() {
        this.header.querySelector(".cartProductsContainer").innerHTML = "";
    }


    handleHeaderEvents() {

        this.header.querySelector("#shoppingCartBtn").addEventListener("click", () => this.renderCart());

        if(this.header.querySelector(".cartBackdrop")) {
            this.header.querySelector(".cartBackdrop").addEventListener("click", () => {
                this.clearCart()
                this.handleHeaderEvents();
            });
        }

        if(this.header.querySelector(".cart")) {
            this.header.querySelector(".cart").addEventListener("click", e => e.stopPropagation());
        }

        this.header.querySelectorAll(".addProductBtn").forEach((btn) => {
            btn.addEventListener("click", () => {
                increseProductCount(parseInt(btn.id));
                this.clearCartProducts();
                this.renderCartProducts();
                this.handleHeaderEvents();
            })
        })

        this.header.querySelectorAll(".removeProductBtn").forEach((btn) => {
            btn.addEventListener("click", () => {
                decreaseProductCount(parseInt(btn.id));
                this.clearCartProducts();
                this.renderCartProducts();
                this.handleHeaderEvents();
            })
        })

        this.header.querySelector(".addModalBackdrop").addEventListener("click", () => {
            if(this.header.querySelector(".addModalBackdrop").classList.contains("hidden")) {
                this.header.querySelector(".addModalBackdrop").classList.remove("hidden");
            } else {
                this.header.querySelector(".addModalBackdrop").classList.add("hidden");
            }
        })
    }

    showAddModal() {
        this.header.querySelector(".addModalBackdrop").classList.remove("hidden");
    }

    generateMarkup() {
        const markup = /*html*/
        `
        <nav class="fixed top-0 left-0 w-full mx-auto text-center z-40 p-3 bg-zinc-100 grid grid-cols-4 items-center shadow-md">
            <div class="col-span-1 grid text-start">
              
           </div>

            <form class="col-span-2 flex grid-cols-2 mx-auto justify-center items-center">

           </form>


           <div class="col-span-1 text-end">
             <button id="shoppingCartBtn" class=" h-[40px] aspect-square border border-cyan-800 text-white rounded bg-cyan-500"><i class="fa fa-shopping-cart"></i></button>
           </div>
        </nav>

        <div class="cartContainer">
          
        </div>

        <div class="addModalBackdrop fixed top-0 left-0 z-50 w-full h-screen grid justify-center items-center bg-zinc-600/30 hidden">
          <div class="addModal p-5 w-[360px] bg-zinc-100 text-center">
            <i class="fa fa-check-circle-o text-7xl text-green-700"></i>
            <p class="text-center mt-5 text-lg">Item was successfully added to your cart!</p>
          </div>
        </div>
        `

        this.clear();
        this.header.insertAdjacentHTML("afterbegin", markup);
    }
}

export default new Header();