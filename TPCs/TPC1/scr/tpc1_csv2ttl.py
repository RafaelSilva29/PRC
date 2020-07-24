import csv

file = 'PRI2019-Avaliacao.csv'
outPut = 'tpc1.ttl'

with open(file) as csv_file:
    fileOutPut = open(outPut, 'a')
    csv_reader = csv.reader(csv_file, delimiter=',')
    line_count = 0
    temp = ''
    aula = ''
    frequentadoPor = ''
    for row in csv_reader:
        if line_count == 0:
            # print(f'Column names are {", ".join(row)}')
            line_count += 1
        else:
            temp += f'''###  urn:absolute:PRC_01_SalaAula#{row[0]}
                    :{row[0]} rdf:type owl:NamedIndividual ,
                                    :Aluno ;
                    :frequenta :gcs ,
                            :prc ,
                            :pri,
                            :spln;
                    :id "{row[0]}"^^xsd:string ;
                    :nome "{row[1]}"^^xsd:string ;
                    :email "{row[0]}@alunos.uminho.pt"^^xsd:string ;
                    :curso "MIEI"^^xsd:string .
                    \n
                    '''
            frequentadoPor += f' :{row[0]}, '
            line_count += 1
    frequentadoPor = frequentadoPor[:-2]
    frequentadoPor += ';'
    aula = f'''
    ###  urn:absolute:PRC_01_SalaAula#jcr
    :jcr rdf:type owl:NamedIndividual ,
              :Professor ;
     :leciona :prc ,
              :pri ;
     :id "D1513"^^xsd:string ;
     :nome "José Carlos Ramalho"^^xsd:string .

    \n

    ###  urn:absolute:PRC_01_SalaAula#prh
    :prh rdf:type owl:NamedIndividual ,
              :Professor ;
     :leciona :gcs ;
     :nome "Pedro Rangel Henriques"^^xsd:string .

    \n

    ###  urn:absolute:PRC_01_SalaAula#jj
    :jj rdf:type owl:NamedIndividual ,
              :Professor ;
     :leciona :spln ;
     :id "D"^^xsd:string ;
     :nome "José João"^^xsd:string .

     \n
    
    ###  urn:absolute:PRC_01_SalaAula#prc
    :prc rdf:type owl:NamedIndividual ,
                  :UC ;
         :frequentadaPor {frequentadoPor}
         :lecionadaPor :jcr ;
         :nome "Processamento e Representação de Conhecimento"^^xsd:string .
    \n
         ###  urn:absolute:PRC_01_SalaAula#gcs
    :gcs rdf:type owl:NamedIndividual ,
              :UC ;
     :frequentadaPor {frequentadoPor}
     :lecionadaPor :prh ;
     :nome "Gramáticas na Compreensão de Software"^^xsd:string .
     \n
     ###  urn:absolute:PRC_01_SalaAula#pri
    :pri rdf:type owl:NamedIndividual ,
                  :UC ;
         :frequentadaPor {frequentadoPor}
         :lecionadaPor :jcr ;
         :nome "Processamento e Representação de Informação"^^xsd:string .
    \n
    ###  urn:absolute:PRC_01_SalaAula#spln
    :spln rdf:type owl:NamedIndividual ,
                  :UC ;
         :frequentadaPor {frequentadoPor}
         :lecionadaPor :jj ;
         :nome "Scripting no Processamento de Linguagem Natural"^^xsd:string .
    '''
    
    print(f'Processed {line_count} lines.')
    fileOutPut.write(temp)
    fileOutPut.write(aula)
    fileOutPut.close()