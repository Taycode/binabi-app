const { db } = require('../services/firebase');

export default class Order {
    async createOrder (data){
        try {
            const order = await db.collection('orders').add({
                name: data.name,
                address: data.address,
                phoneNumber: data.phoneNumber,
                capacity: data.capacity,
            });
            console.log(order)
            return order
        } catch (error) {
            throw (error);
        }
    }

    async getOrders (){
        try {
            const orderRef = db.collection('orders');
            const orders = await orderRef.get();
            return orders.docs.map(doc=>doc.data());
        } catch (error) {
            throw (error);
        }
    }

    async updateOrder (orderId, data) {
        try {
            const orderRef = db.collection('orders').doc(orderId);
            const orderExists = (await orderRef.get()).exists
            if (!orderExists){
                const error = new Error()
                error.message = 'Order not Found'
                throw error;
            }
            await orderRef.update({
                ...data
            });
            return (await orderRef.get()).data()
        } catch (error) {
            throw (error);
        }
    }

    async getOneOrder(orderId) {
        try {
            const orderRef = db.collection('orders').doc(orderId);
            const orderExists = (await orderRef.get()).exists
            if (!orderExists){
                const error = new Error()
                error.message = 'Order not Found'
                throw error;
            }
            return (await orderRef.get()).data()
        } catch (error) {
            throw (error);
        }
    }

    async setPrice(data) {
        try {
            const priceRef = db.collection('admin').doc('price');
            await priceRef.update({...data});
            return (await priceRef.get()).data()
        } catch (error) {
            throw error;
        }

    }
}
