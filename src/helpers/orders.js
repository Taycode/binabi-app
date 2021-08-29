const { db } = require('../services/firebase');

export default class Order {
    async createOrder (data){
        try {
            const order = await db.collection('orders').add({
                name: data.name,
                address: data.address,
                phoneNumber: data.phoneNumber,
                capacity: parseFloat(data.capacity),
                price: parseFloat(data.price),
                status: 'pending',
                timeCreated: Date.now(),
            });
            const statisticsRef = await db.collection('admin').doc('statistics');
            const statisticsDoc = await statisticsRef.get();
            let { pending, total } = await statisticsDoc.data();
            pending += 1;
            total += 1
            await statisticsRef.update({ pending, total });
            return order
        } catch (error) {
            console.log(error);
            throw (error);
        }
    }

    async getOrders (sortMethod = 'timeCreated', sortDirection = 'desc', lastDoc){
        const limit = 5
        try {
            const orderRef = db.collection('orders');
            const orders = lastDoc
                ? await orderRef.orderBy(sortMethod, sortDirection).startAfter(lastDoc).limit(limit).get()
                : await orderRef.orderBy(sortMethod, sortDirection).limit(limit).get();
            return orders.docs.map( (doc) => {
                return {
                    orderId: doc.id,
                    ...doc.data()
                }
            });
        } catch (error) {
            console.log('error')
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
            const statisticsRef = await db.collection('admin').doc('statistics');
            const statisticsDoc = await statisticsRef.get();
            let { pending, completed, cancelled } = await statisticsDoc.data();

            const { status } = data;
            if (status === 'cancelled') {
                cancelled += 1;
                pending -= 1;
            } else if (status === 'completed') {
                completed += 1;
                pending -= 1;
            }
            await statisticsRef.update({ pending, completed, cancelled });
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
            await priceRef.set({...data});
            return (await priceRef.get()).data()
        } catch (error) {
            throw error;
        }

    }

    async getPrice() {
        try {
            const priceRef = db.collection('admin').doc('price');
            return (await priceRef.get()).data()
        } catch (error) {
            throw error;
        }

    }
}
