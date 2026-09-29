import { courseworkSchema } from "./schema";

export const coursework = courseworkSchema.parse({
  discipline: "Fundamentals of Relational Modeling and SQL",
  intro:
    "Coursework from college (Instituto Infnet), reorganized as case studies: data modeling, database administration (DBA) routines, and building a database from scratch with Python.",
  repoUrl: "https://github.com/GustavoTozzo/estudos-sql-dba",
  concepts: [
    "Relational Modeling",
    "Normalization (1NF, 2NF, 3NF)",
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
      title: "Relational Modeling and Normalization",
      focus: "From raw data to a sound schema, applying 1NF → 3NF and 1:N, N:N, and 1:1 relationships",
      cases: [
        {
          title: "Academic System",
          context:
            "Incremental modeling of a university enrollment system (students, professors, courses, class sections, enrollments), from scratch.",
          points: [
            "Composite primary key (student_id, section_id) on enrollments — prevents duplicate enrollment in the same section",
            "Foreign keys prevent 'orphan' enrollments pointing to nonexistent students or sections",
            "4 deliberate constraint-violation tests (UNIQUE, NOT NULL, FOREIGN KEY, composite PRIMARY KEY) — all confirmed rejected by the DBMS",
          ],
          demonstrates:
            "Modeling entities and relationships from scratch, and validating the model's integrity in practice, not just in theory.",
          sourceUrl:
            "https://github.com/GustavoTozzo/estudos-sql-dba/blob/main/01-modelagem-relacional-normalizacao/sistema_academico.sql",
        },
        {
          title: "Bookstore — from a raw spreadsheet to a normalized model",
          context:
            "A denormalized CSV mixing books, authors, publishers, and sales into a single table, with insertion and update anomalies.",
          points: [
            "1NF: authors separated by commas in one column → extracted into their own Authors table",
            "2NF: title and price stay on Books, not on the N:N associative table BookAuthors, since they only depend on book_id",
            "3NF: publisher_city isolated on Publishers — previously depended transitively on the book through the publisher",
          ],
          demonstrates:
            "Understanding why each Normal Form exists, not just how to apply it — normalization (structure) and business rules (semantics) are complementary.",
          sourceUrl:
            "https://github.com/GustavoTozzo/estudos-sql-dba/blob/main/01-modelagem-relacional-normalizacao/livraria_normalizacao.sql",
        },
      ],
    },
    {
      slug: "manutencao-rotinas-dba",
      title: "DBA Maintenance and Routines",
      focus: "INSERT/UPDATE/DELETE, schema evolution, retention policies, and data cleanup",
      cases: [
        {
          title: "Farmácia VidaPlus",
          context: "A pharmacy chain with stock, suppliers, and promotions — day-to-day maintenance without breaking integrity.",
          points: [
            "Schema evolution without breaking existing data: a new optional column via CREATE OR REPLACE TABLE, since SQLite restricts ALTER TABLE ADD COLUMN",
            "Bulk price adjustment (UPDATE relative to the current value, filtered by category)",
            "DELETE vs. DROP TABLE justified in a comment: one empties the table keeping its structure, the other removes the definition entirely",
          ],
          demonstrates:
            "Every maintenance operation has a distinct purpose and side effect — the discipline of technically justifying each choice, essential to avoid a production incident.",
          sourceUrl:
            "https://github.com/GustavoTozzo/estudos-sql-dba/blob/main/02-manutencao-rotinas-dba/farmacia_vidaplus.sql",
        },
        {
          title: "StreamCast",
          context: "A podcast streaming platform — episodes, subscribers, and periodically regenerated recommendations.",
          points: [
            "Automatic publishing by a time-based rule (UPDATE conditioned on both status AND date)",
            "Retention policy with prior audit: SELECT COUNT(*) before the DELETE, never a blind removal",
            "Bulk classification with CASE — fills a column by applying a business rule across the whole table",
          ],
          demonstrates:
            "Thinking in recurring operational routines, not just isolated commands — and prioritizing an audit step before any destructive operation.",
          sourceUrl: "https://github.com/GustavoTozzo/estudos-sql-dba/blob/main/02-manutencao-rotinas-dba/streamcast.sql",
        },
        {
          title: "Data Cleanup and Analysis",
          context: "A records database with typing inconsistencies — a common scenario for legacy systems or manual entry.",
          points: [
            "Correcting incorrectly typed fields from the original data load via UPDATE",
            "Aggregations with GROUP BY / HAVING (average income by profession, professions above a threshold)",
            "Subquery for records with income above the overall average, computed dynamically",
          ],
          demonstrates: "Hands-on experience with the work that precedes any trustworthy analysis: data quality and cleanup.",
          sourceUrl:
            "https://github.com/GustavoTozzo/estudos-sql-dba/blob/main/02-manutencao-rotinas-dba/limpeza_analise_dados.sql",
        },
      ],
    },
    {
      slug: "python-sqlite",
      title: "Python + SQLite",
      focus: "Building a database from absolute scratch via code — connection, schema, loading, and queries",
      cases: [
        {
          title: "Building Materials Store",
          context:
            "Unlike the others (built in a managed SQL environment), this one creates a database from scratch via Python: connection, schema definition, data loading, and queries.",
          points: [
            "sqlite3.connect creates the database file automatically if it doesn't exist",
            "Load validated by reading the data back with pandas.read_sql_query — a habit worth having in any ETL routine",
            "Analytical queries with DISTINCT, COUNT(DISTINCT), IN/NOT IN, and combined filters",
          ],
          demonstrates:
            "The bridge between Python and a DBMS (sqlite3 + pandas) — the same kind of integration used in maintenance scripts, migrations, and database automation.",
          sourceUrl: "https://github.com/GustavoTozzo/estudos-sql-dba/blob/main/03-projeto-python-sqlite/loja_material.py",
        },
      ],
    },
  ],
});
