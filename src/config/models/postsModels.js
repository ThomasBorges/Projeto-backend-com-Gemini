import 'dotenv/config';
import { ObjectId } from "mongodb"
import conectarAoBanco from "../dbConfig.js"
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO)
// Chama a função para estabelecer a conexão com o banco de dados e armazena o objeto de conexão em uma constante. A string de conexão é obtida da variável de ambiente STRING_CONEXAO.


export async function getTodosPosts() {
    const db = conexao.db("imersao-instabytes")
    // Obtém o banco de dados específico chamado "imersao-instabytes" a partir da conexão estabelecida.
    const colecao = db.collection("posts")
    // Obtém a coleção de documentos chamada "posts" dentro do banco de dados.
    return colecao.find().toArray()
    // Executa uma consulta para encontrar todos os documentos na coleção "posts" e retorna os resultados como um array.
    }

export async function criarPost(novoPost) {
    const db = conexao.db("imersao-instabytes");
    const colecao = db.collection("posts");
    return colecao.insertOne(novoPost)
}

export async function atualizarPost(id, novoPost) {
    const db = conexao.db("imersao-instabytes");
    const colecao = db.collection("posts");
    const objID = ObjectId.createFromHexString(id)
    return colecao.updateOne({_id: new ObjectId(objID)}, {$set:novoPost})
}