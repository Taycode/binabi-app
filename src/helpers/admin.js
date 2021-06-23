import { auth } from '../services/firebase'

export default class Admin {
  async authenticate ({ email, password }) {
    const data = await auth().signInWithEmailAndPassword(email, password)
    return data
  }

  async currentAdmin () {
    return new Promise ((resolve, reject ) => {
      auth().onAuthStateChanged((adminUser) => {
        if (!adminUser) {
          reject(new Error('There is no signed in admin'))
          return
        }
        // console.log(adminUser)
        resolve(adminUser)
      })
    })
  }
}