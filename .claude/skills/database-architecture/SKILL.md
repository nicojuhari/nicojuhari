---
name: database-architecture
description: Database and architecture design skill for scalable applications using SQL/NoSQL systems, including Supabase and Firebase. Use for schema design, relationships, and system structure.
license: MIT
metadata:
  author: custom
  version: "1.0.0"
---

# Database & Architecture

Design scalable, clean, and maintainable data structures and system architecture.

---

## When to Apply

- Designing database schema  
- Planning backend structure  
- Working with Supabase or Firebase  
- Defining relationships and data flow  

---

## Core Principles

- Design before building  
- Keep schema clean and normalized  
- Optimize for real queries  
- Avoid redundant data  
- Plan for future growth  

---

## Rules

### 1. Schema Design (CRITICAL)

- Use clear table structure  
- Define relationships (1:N, N:N)  
- Normalize data where appropriate  
- Avoid duplication  

---

### 2. Performance (CRITICAL)

- Add indexes for frequent queries  
- Optimize query paths  
- Avoid heavy joins when unnecessary  

---

### 3. Security (HIGH)

- Implement access control (e.g. RLS in Supabase)  
- Validate data on backend  
- Never trust client input  

---

### 4. Data Flow (HIGH)

- Define how data moves through the system  
- Keep API responses minimal  
- Avoid over-fetching  

---

### 5. Scalability (MEDIUM)

- Plan for growth  
- Avoid designs that break at scale  
- Keep structure flexible  

---

## Output Requirements

- Clear schema (tables, fields, relations)  
- Suggested indexes  
- Security considerations  
- Explanation of decisions  