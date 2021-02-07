ALTER TABLE `ordini`.`T_Ordini` 
CHANGE COLUMN `Data_Ordine` `Data_Ordine` DATE NULL DEFAULT NULL ;
ALTER TABLE `ordini`.`T_Richieste_Oggetti` 
CHANGE COLUMN `inizio` `inizio` DATE NULL DEFAULT NULL ,
CHANGE COLUMN `fine` `fine` DATE NULL DEFAULT NULL ;
