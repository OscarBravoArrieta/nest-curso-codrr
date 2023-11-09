import { CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn } from "typeorm";

 export abstract class BaseEntity {
     @PrimaryGeneratedColumn('uuid')
     id: string;

     @CreateDateColumn({
         type: 'timestamp',
         name: 'created_at'
     })
     createdAt: Date


     @UpdateDateColumn({
         type: 'timestamp',
         name: 'updatet_at'
     })
     updatedAt: Date
 }