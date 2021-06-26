import { auth } from '../services/firebase'

export default class Admin {
  async authenticate ({ email, password }) {
    const data = await auth().signInWithEmailAndPassword(email, password)
    return data
  }

  async currentAdmin () {
    return new Promise (( resolve ) => {
      auth().onAuthStateChanged((adminUser) => {
        resolve(adminUser)
      })
    })
  }

  async logOut () {
    return auth().signOut()
  }
}