 //NodeJS.ProcessEnv

 declare namespace NodeJS {
     interface ProcessEnv {
         PORT: numbner
         DB_HOST: string
         DB_PORT: number
         DB_USER: string
         DB_PASSWORD: string
         DB_NAME: string
         HASH_SALT: number
         JWT_SECRET: string
     }
     
 }