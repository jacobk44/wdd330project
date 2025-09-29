import { getLocalStorage } from "./utils.mjs";


const services = new ExternalServices();

function formDataToJSON(formElement){
    const formData = new formData(formElement);
    const convertedJSON = {}; 
    formData.formEach((value,key) => {
        convertedJSON[key] = value;
    });

    return convertedJSON();
}

export default class CheckoutProcess{
    constructor(key,outputSelector){
        this.key = key;
        this.outputSelector = outputSelector;
        this.list = [];
        this.itemTotal = 0;
        this.shipping = 0;
        this.tax = 0;
        this.orderTotal = 0;
    }

    init(){
        this.list = getLocalStorage(this.key);
        this.calculateItemSummary();
    }

    calculateItemSubtotal(){
         // calculate and display the total dollar amount of the items in the cart, and the number of items.
    

    }

    calculateOrderTotal(){
        // calculate the tax and shipping amounts. Add those to the cart total to figure out the order total
        this.tax = (this.itemTotal * 0.06);
        this.shipping = 
        this.orderTotal = 

        // display the totals.
        this.displayOrderTotals();
    }

    displayOrderTotals(){
        // once the totals are all calculated display them in the order summary page
        const tax = document.querySelector(`${this.outputSelector} #tax`)

        tax.innerText = `$${this.tax.toFixed(2)}`;
    }

    async checkout(){
        const formElement = document.forms["checkout"];
        const order = formDataToJSON(formElement);

        order.orderDate = new Date().toISOString();
        order.orderTotal = this.orderTotal;
        order.tax = this.tax;
        order.shipping = this.shipping;
        order.items = packageItems(this.list);

        try {
            const response = await services.checkout(order);
            console.log(response);
        } catch (err) {
            console.log(err);

        }
    }
}