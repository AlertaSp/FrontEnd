# 🌧️ AlertaSP - Frontend

O **AlertaSP** é um sistema web que visa aumentar a segurança urbana por meio do monitoramento de enchentes e participação da comunidade. A aplicação permite que usuários enviem relatos de alagamentos, visualizem alertas em tempo real e colaborem com denúncias de riscos urbanos.  

Este repositório contém o **frontend da aplicação**, que se comunica com um backend em Node.js conectado ao banco **MongoDB**.

---

## ⚙️ Funcionalidades

✅ Relato de alagamentos com:
- Captura de localização via endereço (convertido automaticamente em latitude e longitude)
- Inclusão de imagem (simulada para fins visuais)
- Salvamento direto no MongoDB (coleção `relatos` ou `enchentes.relatos`)

✅ Listagem dos relatos existentes  
✅ Integração com sensores IoT simulados  
✅ Interface responsiva em HTML + CSS + JS puro

---

## 🧰 Tecnologias Utilizadas

- **HTML5 + CSS3 + JavaScript**
- **Node.js + Express** (API backend)
- **MongoDB + Mongoose**
- **MongoDB Compass** para inspeção dos dados
- **OpenStreetMap API** para geocodificação de endereços

---
