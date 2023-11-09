export class CreateFilmeDto {
 
    titulo: string;
  
    imgUrl:string;
  
    favoritos: number[]; // IDs dos usuários que favoritaram o filme
    
}
