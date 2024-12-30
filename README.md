# REST API SEDERHANA DENGAN EXPRESS
Sebuah API sederhana bertujuan memudahkan dalam mencari user. 
## PROGRAM ini dibangun menggunakan :
- Node.js
- Express
- MySQL

## Feautures
- CRUD
- Unit test Jest
- Valdasi Joi
- Request Log Morgan
  
## Routes
| Endpoint   | Method | Route Param | Descriprion          |
|------------|--------|-------------|----------------------|
| /users     | GET    | -           | Mengambil semua user | 
| /users/:id | GET    | id: string  | Mengambil semua user |
| /users     | POST   | -           | Menambahkan user     | 
| /users/:id | PUT    | id: string  | Mengupdate user      |
| /users/:id | DEL    | id: string  | Menghapus user       |

## CARA INSTALL DAN MENJANLANKAN PROGRAM
1. Clone Repo ini
```
git clone https://github.com/hablanm/node-crud.git
```
2. Masuk Repo
```
cd node-crud
```
3. Install Dependensi
```
npm install
```
4.Run Program
```
npm start

```
