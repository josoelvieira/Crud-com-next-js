import { getDatabase } from 'firebase/database'
import firestore, {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from 'firebase/firestore'
import Cliente from '../../core/Cliente'
import ClienteRepositorio from '../../core/ClienteRepositorio'
 
export default class ColecaoCliente implements ClienteRepositorio {
  
 
  #conversor = {
    toFirestore: (cliente: Cliente) => {
      return {
        nome: cliente.nome,
        idade: cliente.idade,
      }
    },
    fromFirestore: (
      snapshot: firestore.QueryDocumentSnapshot,
      options: firestore.SnapshotOptions,
      ) => {
        const dados = snapshot.data(options)
        return new Cliente(dados.nome, dados.idade, snapshot.id)
      },
    }
    
  #colecaoCliente = collection(getDatabase, 'clientes').withConverter(this.#conversor)
 
  async salvar(cliente: Cliente): Promise<Cliente> {
    if (cliente?.id) {
      await setDoc(
        doc(getDatabase, 'clientes', cliente.id).withConverter(this.#conversor),
        cliente,
      )
      return cliente
    } else {
      const docRef = await addDoc(
        this.#colecaoCliente,
        cliente,
      )
      const doc = await getDoc(docRef)
      return doc.data()
    }
  }
 
  async excluir(cliente: Cliente): Promise<void> {
    return await deleteDoc(doc(getDatabase, 'clientes', cliente.id))
  }
 
  async obterTodos(): Promise<Cliente[]> {
    const clientesCol = this.#colecaoCliente
    const clientesSnapshot = await getDocs(clientesCol)
    const clientesList = clientesSnapshot.docs.map((doc) => doc.data()) ?? []
    return clientesList
  }
}