# Gerenciador de Metas CLI

Este é um projeto simples de Gerenciador de Metas utilizando a biblioteca @inquirer/prompts para criar uma interface de linha de comando (CLI) interativa. O projeto permite que você cadastre metas, liste metas existentes, marque/desmarque metas como concluídas, e planeja-se para implementar a funcionalidade de remover metas.

## Funcionalidades

- **Cadastrar Metas:** Permite que o usuário adicione novas metas ao sistema.
- **Listar Metas:** Exibe todas as metas cadastradas, permitindo que o usuário veja tanto as metas abertas quanto as realizadas.
- **Marcar/Desmarcar Metas como Concluídas:** Permite que o usuário marque uma meta como concluída ou desmarque se desejar reabrir a meta.
- **Remover Metas (Em desenvolvimento):** Planejado para permitir que o usuário remova metas indesejadas.
- **Sistema de Mensagens:** Exibe mensagens de feedback para o usuário durante as interações, como confirmação de metas cadastradas notificações sobre metas vazias, etc.


## Requisitos

- Node.js v14 ou superior
- NPM (Node Package Manager) v6 ou superior

## Instalação

1. Clone este repositório para o seu ambiente local:

   ```bash
   git clone https://github.com/seu-usuario/gerenciador-metas-cli.git
   ``` 
   
2. Navegue até o diretório do projeto:

   ```bash
   cd gerenciador-metas-cli
   ```
   
3. Instale as dependências do projeto:

   ```bash
   npm install
   ```


## Uso

1. Para iniciar o Gerenciador de Metas, execute o seguinte comando:

   ```bash
   node index.js
   ```

2. O menu principal oferece as seguintes opções:

- Cadastrar Meta: Insere uma nova meta no sistema.
- Listar Metas: Exibe as metas cadastradas e permite que o usuário marque ou desmarque como concluídas.
- Sair: Encerra o programa.

### Funcionalidades futuras

- Remover metas: será implementada a capacidade de remover metas do sistema.

### Licença

Este projeto está licenciado sob a MIT License.
