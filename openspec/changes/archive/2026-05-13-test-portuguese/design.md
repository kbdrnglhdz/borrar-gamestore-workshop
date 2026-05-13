## Context

Endpoint de teste simples para verificar se o servidor Express responde corretamente. Não requer lógica de negócio nem acesso a banco de dados.

## Goals / Non-Goals

**Goals:**
- Prover um endpoint GET `/api/test/portuguese` que retorne `{ success: true, data: { message: "El lenguaje se cambio a Portuguese" } }`
- Manter o endpoint sem autenticação para facilitar testes
- Seguir o formato de resposta JSON existente no projeto

**Non-Goals:**
- Não modificar funcionalidade existente
- Não adicionar dependências externas
- Não requer testes automatizados (por ser endpoint temporário de teste)

## Decisions

| Decisão | Alternativas | Por quê |
|---|---|---|
| Usar rota `/api/test/portuguese` | `/api/test/pt` ou `/api/health/language` | Segue o padrão de nomes descritivos e é consistente com o propósito |
| Sem autenticação | Requerer JWT | É um endpoint de teste; com autenticação não seria útil para verificações rápidas |
| Resposta JSON padrão | Texto plano | Consistente com o resto da API do projeto |

## Arquivos novos e modificados

- **Novo**: `src/routes/test.ts` — Router com o endpoint de teste
- **Modificado**: `src/app.ts` — Registrar o novo router

## Riscos / Trade-offs

- [Baixo] O endpoint fica exposto sem autenticação → Apenas retorna uma mensagem estática, sem acesso a dados sensíveis nem mutação de estado
- [Baixo] Pode acumular dívida técnica se não for removido → É trivial de remover quando não for mais necessário
