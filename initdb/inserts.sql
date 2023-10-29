INSERT INTO `editora` (`nome`,`email`,`telefone`, `cnpj`)
VALUES
  ("Venenatis A Magna Corp.","adipiscing@protonmail.com","12827240831", "13226492000180"),
  ("Ipsum Primis Ltd","pede@outlook.org","13334123753", "37993890000190"),
  ("Dictum Incorporated","eros@outlook.org","15214371705", "67961987000181"),
  ("Facilisis Inc.","dolor.vitae@yahoo.org","2563656882", "18052635000106"),
  ("Sit Amet Nulla Associates","quis@icloud.couk","5817976145", "38066817000135"),
  ("Diam Eu Inc.","rutrum.non@icloud.couk","1734591625", "68981100000180"),
  ("Mollis Company","fringilla.purus@yahoo.org","2673254579", "08281848000148"),
  ("Odio Auctor Limited","nascetur@aol.com","14526694173", "49339512000176"),
  ("Imperdiet Corp.","magna.lorem@google.net","3462066911", "61965563000109"),
  ("Alta Books","suporte@altabooks.com","2132788069", "04713695000100"),
  ("Mi Ac Industries","elit.nulla.facilisi@aol.couk","8457093400", "67567158000119");



INSERT INTO `autor` (`nome`,`email`)
VALUES
	  ("Solomon Henry","cras.dictum.ultricies@outlook.couk"),
	  ("Galvin Carney","ut.nisi.a@outlook.edu"),
	  ("Camden Carney","et@yahoo.edu"),
	  ("Edward Kramer","varius.et@hotmail.ca"),
	  ("Justina Gregory","lobortis.quam@hotmail.couk"),
	  ("Jane Acosta","suspendisse.eleifend@icloud.com"),
	  ("Sybil Michael","eu.augue@google.couk"),
	  ("Cadman Mosley","non@outlook.edu"),
	  ("Zenia Hampton","eu.odio@hotmail.net"),
	  ("Ariana Tanner","in@outlook.ca"),
	  ("Robert C. Martin", "robertcmartin@gmail.com"),
	  ("Sarah Hansen","nam.ligula@hotmail.edu");


INSERT INTO `livro` (`isbn`,`valor`, `nome`, `nome_autor`, `cnpj_editora`)
VALUES
	  ("FO8442026867387233","85.68", "O Capital", "Ariana Tanner", "49339512000176"),
	  ("PS495975147361502274026612445","40.05", "Hamlet", "Jane Acosta", "37993890000190"),
	  ("GL6061333034883574","53.38", "Crime e Castigo", "Jane Acosta", "38066817000135"),
	  ("LB12484665443761188150877142","92.52", "1984", "Justina Gregory", "68981100000180"),
	  ("LT956649817974290664","73.34", "Orgulho e Preconceito", "Sybil Michael", "67567158000119"),
	  ("AE880513735330703445245","66.69", "Sapiens", "Sybil Michael", "49339512000176"),
	  ("AE985824791581476961151","83.25", "Ideias Para Adiar o Fim do Mundo", "Sarah Hansen", "68981100000180"),
	  ("AE978855080477711111111","79.9", "Código Limpo", "Robert C. Martin", "04713695000100", "")
	  ("MR0702791611597146376538668","36.73", "Senhor das moscas", "Cadman Mosley", "49339512000176");

INSERT INTO `estoque` (`sku`,`quantidade`, `isbn`)
VALUES
  (1388,3, "FO8442026867387233"),
  (1975,13, "PS495975147361502274026612445"),
  (4952,6, "GL6061333034883574"),
  (1817,5, "LB12484665443761188150877142"),
  (4962,0, "LT956649817974290664"),
  (4350,18, "AE880513735330703445245"),
  (2976,3, "AE985824791581476961151"),
  (1503, 6, "AE978855080477711111111"),
  (3094,14, "MR0702791611597146376538668");


-- Abc@123
INSERT INTO `usuario` (`nome`,`email`,`telefone`, `cpf`, `senha`)
VALUES
	  ("Rafael Maestro","rafaelmaestro@live.com","11995885577", "52776711111", "$2b$10$PhKT4keZEMBtRTDWj1AVpOAKvbq1XnthpUqVbFqubSHZCaQI3JjQe");


INSERT INTO `endereco_usuario` (`rua`,`cidade`,`cep`,`estado`, `cpf`)
VALUES
  ("Rua Castro Alves, 65","São Roque","18136-111","SP", "52776711111");


INSERT INTO `usuario_admin` (`cpf`,`setor`)
VALUES
    ("52776711111", "TI");