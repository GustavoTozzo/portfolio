import { courseworkSchema } from "./schema";

export const coursework = courseworkSchema.parse({
  discipline: "Fundamentos de Modelagem Relacional e SQL",
  intro:
    "Trabalhos práticos da faculdade (Instituto Infnet), reorganizados como estudos de caso: modelagem de dados, rotinas de administração de banco (DBA) e criação de um banco do zero com Python.",
  repoUrl: "https://github.com/GustavoTozzo/estudos-sql-dba",
  concepts: [
    "Modelagem Relacional",
    "Normalização (1FN, 2FN, 3FN)",
    "PRIMARY KEY / FOREIGN KEY",
    "DDL",
    "DML",
    "JOIN",
    "GROUP BY / HAVING",
    "Subqueries",
    "SQLite",
    "Python (sqlite3, pandas)",
  ],
  groups: [
    {
      slug: "modelagem-normalizacao",
      title: "Modelagem Relacional e Normalização",
      focus: "Do dado bruto ao esquema íntegro, aplicando 1FN → 3FN e relacionamentos 1:N, N:N e 1:1",
      cases: [
        {
          title: "Sistema Acadêmico",
          context:
            "Modelagem incremental de um sistema de matrículas universitárias (alunos, professores, disciplinas, turmas, matrículas), do zero.",
          points: [
            "Chave primária composta (id_aluno, id_turma) em matrículas — impede matrícula duplicada na mesma turma",
            "Chaves estrangeiras evitam matrículas 'órfãs' apontando para alunos ou turmas inexistentes",
            "4 testes propositais de violação de integridade (UNIQUE, NOT NULL, FOREIGN KEY, PRIMARY KEY composta) — todos confirmados rejeitados pelo SGBD",
          ],
          demonstrates:
            "Modelar entidades e relacionamentos do zero, e validar a integridade do modelo na prática, não só na teoria.",
          sourceUrl:
            "https://github.com/GustavoTozzo/estudos-sql-dba/blob/main/01-modelagem-relacional-normalizacao/sistema_academico.sql",
        },
        {
          title: "Livraria — da planilha bruta ao modelo normalizado",
          context:
            "CSV desnormalizado misturando livros, autores, editoras e vendas numa única tabela, com anomalias de inserção e atualização.",
          points: [
            "1FN: autores separados por vírgula numa única coluna → extraídos para uma tabela Authors própria",
            "2FN: title e price ficam em Books, não na tabela associativa N:N BookAuthors, por dependerem só de book_id",
            "3FN: publisher_city isolado em Publishers — antes dependia transitivamente do livro via editora",
          ],
          demonstrates:
            "Entender por que cada Forma Normal existe, não só como aplicá-la — normalização (estrutura) e regras de negócio (semântica) são complementares.",
          sourceUrl:
            "https://github.com/GustavoTozzo/estudos-sql-dba/blob/main/01-modelagem-relacional-normalizacao/livraria_normalizacao.sql",
        },
      ],
    },
    {
      slug: "manutencao-rotinas-dba",
      title: "Manutenção e Rotinas de DBA",
      focus: "INSERT/UPDATE/DELETE, evolução de esquema, políticas de retenção e limpeza de dados",
      cases: [
        {
          title: "Farmácia VidaPlus",
          context:
            "Rede de farmácias com estoque, fornecedores e promoções — rotinas de manutenção do dia a dia sem quebrar integridade.",
          points: [
            "Evolução de esquema sem quebrar dados existentes: nova coluna opcional via CREATE OR REPLACE TABLE, já que o SQLite restringe ALTER TABLE ADD COLUMN",
            "Reajuste de preço em lote (UPDATE relativo ao valor atual, filtrado por categoria)",
            "DELETE vs. DROP TABLE justificado por comentário: um esvazia mantendo a estrutura, o outro remove a definição inteira",
          ],
          demonstrates:
            "Cada operação de manutenção tem propósito e efeito colateral diferente — disciplina de justificar tecnicamente cada escolha, essencial para não causar incidente em produção.",
          sourceUrl:
            "https://github.com/GustavoTozzo/estudos-sql-dba/blob/main/02-manutencao-rotinas-dba/farmacia_vidaplus.sql",
        },
        {
          title: "StreamCast",
          context: "Plataforma de streaming de podcasts — episódios, assinantes e recomendações regeneradas periodicamente.",
          points: [
            "Publicação automática por regra temporal (UPDATE condicionado a status E data)",
            "Política de retenção com auditoria prévia: SELECT COUNT(*) antes do DELETE, nunca remoção às cegas",
            "Classificação em massa com CASE — preenche uma coluna aplicando regra de negócio à tabela inteira",
          ],
          demonstrates:
            "Pensar em rotinas operacionais recorrentes, não só comandos isolados — e priorizar auditoria antes de qualquer operação destrutiva.",
          sourceUrl: "https://github.com/GustavoTozzo/estudos-sql-dba/blob/main/02-manutencao-rotinas-dba/streamcast.sql",
        },
        {
          title: "Limpeza e Análise de Dados",
          context: "Base cadastral com inconsistências de digitação — cenário comum de sistemas legados ou entrada manual.",
          points: [
            "Tratamento via UPDATE para corrigir campos digitados incorretamente na carga original",
            "Agregações com GROUP BY / HAVING (renda média por profissão, profissões acima de um limite)",
            "Subquery para registros com renda acima da média geral, calculada dinamicamente",
          ],
          demonstrates: "Experiência prática com o trabalho que antecede qualquer análise confiável: qualidade e limpeza de dados.",
          sourceUrl:
            "https://github.com/GustavoTozzo/estudos-sql-dba/blob/main/02-manutencao-rotinas-dba/limpeza_analise_dados.sql",
        },
      ],
    },
    {
      slug: "python-sqlite",
      title: "Python + SQLite",
      focus: "Criando um banco de dados do absoluto zero via código — conexão, esquema, carga e consultas",
      cases: [
        {
          title: "Loja de Materiais",
          context:
            "Diferente dos demais (feitos em SQL gerenciado), este cria um banco do zero via Python: conexão, definição de esquema, carga de dados e consultas.",
          points: [
            "sqlite3.connect cria o arquivo do banco automaticamente se não existir",
            "Carga validada lendo os dados de volta com pandas.read_sql_query — hábito de qualquer rotina de ETL",
            "Consultas analíticas com DISTINCT, COUNT(DISTINCT), IN/NOT IN e filtros combinados",
          ],
          demonstrates:
            "A ponte entre Python e um SGBD (sqlite3 + pandas) — o mesmo tipo de integração usada em scripts de manutenção, migração e automação de rotinas de banco.",
          sourceUrl: "https://github.com/GustavoTozzo/estudos-sql-dba/blob/main/03-projeto-python-sqlite/loja_material.py",
        },
      ],
    },
  ],
});
