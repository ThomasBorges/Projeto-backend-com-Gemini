// Importa a biblioteca Express para criar uma aplicação web
import express from "express";

import cors from "cors";

// Importa funções para listar posts, criar novos posts e fazer upload de imagens do controlador de posts
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from "../controllers/postsController.js";

// Importa a biblioteca Multer para lidar com o envio de arquivos (uploads)
import multer from "multer";

const corsOptions = {
  origin:"http://localhost:8000",
  optionsSuccessStatus: 200
}

// Configura as opções de armazenamento para arquivos enviados usando multer.diskStorage
const storage = multer.diskStorage({
  // Define o diretório de destino para os arquivos enviados (uploads/)
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  // Define o nome do arquivo como o nome original do arquivo enviado
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

// Cria uma instância do Multer com as opções de armazenamento configuradas
const upload = multer({ storage });

// Define uma função chamada 'routes' que recebe a aplicação Express como argumento
const routes = (app) => {
  // Habilita o middleware para analisar dados JSON no corpo das requisições
  app.use(express.json());

  app.use(cors(corsOptions))

  // Define uma rota GET para "/posts" que chama a função 'listarPosts'
  app.get("/posts", listarPosts);

  // Define uma rota POST para "/posts" que chama a função 'postarNovoPost'
  app.post("/posts", postarNovoPost);

  // Define uma rota POST para "/upload" que:
  // - Utiliza o middleware 'upload.single("imagem")' para lidar com o envio de um único arquivo com o nome "imagem"
  // - Chama a função 'uploadImagem' após o upload ser concluído com sucesso, passando o objeto da requisição
  app.post("/upload", upload.single("imagem"), uploadImagem);

  app.put("/upload/:id", atualizarNovoPost)
};

// Exporta a função 'routes' como a exportação padrão
export default routes;