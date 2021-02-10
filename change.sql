ALTER TABLE `ordini`.`T_Dati_Fiscali_New` 
ADD COLUMN `posizione` VARCHAR(45) NULL AFTER `assegnato_a`;

ALTER TABLE `ordini`.`T_Dati_Fiscali_New` 
CHANGE COLUMN `numero_inventario` `numero_inventario` VARCHAR(45) NULL ,
CHANGE COLUMN `matricola` `matricola` VARCHAR(45) NULL ;

ALTER TABLE `ordini`.`T_Dati_Fiscali_New` 
CHANGE COLUMN `id_bolla` `id_bolla` VARCHAR(45) NULL ,
CHANGE COLUMN `id_fattura` `id_fattura` VARCHAR(45) NULL ;

ALTER TABLE `ordini`.`T_Fornitori` 
CHANGE COLUMN `id_stato` `id_stato` INT NOT NULL DEFAULT 0 ;
