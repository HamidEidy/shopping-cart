class Products {
    main = document.querySelector("main");
    products;

    render(products) {
        this.products = products;
        this.generateMarkup();
    }

    clear() {
        this.main.innerHTML = "";
    }

    handleProductsEvents(addToCart) {
        this.main.querySelectorAll(".addToCartBtn").forEach((btn) => {
            btn.addEventListener("click", async () => {
                await addToCart(parseInt(btn.id));
            })
        })
    }

    renderProductsSkeleton() {
        const markup = /*html*/
        `
        <div class="products">
          <ul class="mx-auto my-[200px] lg:w-[70%] md:w-[75%] sm:w-[78%] max-sm:w-[80%] grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 max-sm:grid-cols-1 gap-5">
            ${
                [1, 2, 3, 4, 5, 6].map(() => {
                    return(/*html*/`
                    <li role="status" class="aspect-square bg-zinc-100 shadow-lg p-5 text-center rounded animate-pulse md:p-6 dark:border-gray-700">
                    <div class="w-[100%] aspect-square mx-auto flex items-center justify-center mb-4 bg-gray-400 rounded dark:bg-gray-700">
                    <svg class="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                    <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z"/>
                    <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z"/>
                   </svg>
                 </div>
                 <div class="h-2.5 bg-gray-400 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                 <div class="h-2 bg-gray-400 rounded-full dark:bg-gray-700 mb-2.5"></div>
                 <div class="h-2 bg-gray-400 rounded-full dark:bg-gray-700 mb-2.5"></div>
                 <div class="h-2 bg-gray-400 rounded-full dark:bg-gray-700"></div>
                 <span class="sr-only">Loading...</span>
                </li>
                    `)
                })
                .join("")
            }
          </ul>
        </div>
        `

        this.clear();
        this.main.insertAdjacentHTML("afterbegin", markup);
    }

    generateMarkup() {
        const markup = /*html*/
        `
        <div>
          <ul class="products mx-auto my-[200px] lg:w-[75%] md:w-[78%] sm:w-[80%] max-sm:w-[84%] grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 max-sm:grid-cols-1 gap-5">
            ${
                this.products.map((product) => {
                    return(/*html*/`
                    <li class="product lg:aspect-[1/1.2] md:aspect-[1/1.2] sm:aspect-[1/1.3] max-sm:aspect-[1/1.35] bg-zinc-100 shadow-lg p-5 text-center">
                      <img src="${product?.image}" class="mx-auto w-[85%] aspect-square" />
                      <div class="my-2 mx-auto w-[90%] h-[50px] grid grid-cols-1">
                        <p class="my-1 lg:text-xs md:text-sm sm:text-md max-sm:text-lg">${product?.title}</p>
                        <p class="my-1 text-zinc-500 lg:text-xs md:text-sm sm:text-md max-sm:text-lg">${product?.price} $</p>
                        <button id="${product?.id}" class="addToCartBtn my-1 text-center p-1 text-white bg-cyan-600 rounded-lg">Add To Cart</button>
                      </div>
                    </li>
                    `)
                })
                .join("")
            }
          </ul>
        </div>
        `

        this.clear();
        this.main.insertAdjacentHTML("afterbegin", markup);
    }
}

export default new Products();