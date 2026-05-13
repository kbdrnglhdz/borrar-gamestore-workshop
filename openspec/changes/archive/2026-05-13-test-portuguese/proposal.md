## Why

Adicionar um endpoint de teste para verificar rapidamente se o servidor está respondendo corretamente com uma mensagem em português. Útil para validações da equipe de desenvolvimento.

## What Changes

- Novo endpoint GET `/api/test/portuguese` que retorna uma mensagem de confirmação em português
- Não modifica funcionalidade existente
- Não requer autenticação

## Capabilities

### New Capabilities
- `test-portuguese`: Endpoint de teste que retorna mensagem de confirmação de mudança de idioma para português

### Modified Capabilities

<!-- Nenhuma -->

## Impact

- **Backend**: Novo endpoint GET `/api/test/portuguese` no router de teste
- **Frontend**: Sem alterações
- **DB**: Sem alterações

## Riscos

- **Risco**: O endpoint pode ser implantado em produção sem restrição. **Mitigação**: O endpoint não acessa dados sensíveis nem modifica estado, apenas retorna uma mensagem estática.

## Complexidade

Baixa

## Migração de BD

Não requer
