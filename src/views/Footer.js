class Footer {
    footer = document.querySelector("footer");

    render() {
        this.generateMarkup();
    }

    clear() {
        this.footer.innerHTML = "";
    }

    generateMarkup() {
        const markup = /*html*/
        `
        <nav class="w-full mx-auto text-center z-40 p-8 bg-zinc-100 grid grid-cols-4 items-center shadow-md">

        </nav>
        `

        this.clear();
        this.footer.insertAdjacentHTML("afterbegin", markup);
    }
}

export default new Footer();