# CEUmatch - Escopo do Sistema

Esse sistema fornece uma interface para que usuários do Centro Esportivo Universitário da UFMG (CEU) consigam se organizar para encontrar companheiros para praticarem seus esportes. O software conta como suas principais funcionalidades:
- Login
- Criar partida e adicionar participantes a ela
- Juntar-se a partidas
- Feedbacks aos participantes

# Membros da equipe e papel


- Bruno Lima de Oliveira - FULL
- Guilherme Drumond Rosa - FULL
- Lucas Braz Rossetti - FULL
- Otávio Maciel Munaier Zucheratto - FULL

# Tecnologias principais

- React
- Node
- Express
- Sequelize
- MySQL

# Backlog do Produto

- Como usuário, eu gostaria de me cadastrar no sistema e ter uma página de perfil.
- Como usuário, eu gostaria de criar, visualizar, editar e excluir uma partida.
- Como usuário, eu gostaria de visualizar e pedir para me juntar às partidas ativas.
- Como usuário, eu gostaria de aceitar ou recusar usuários que solicitaram entrada na minha partida.
- Como usuário, eu gostaria de avaliar os usuários que participaram da partida.
- Como usuário, eu gostaria de conseguir me comunicar com os outros usuários que juntaram a minha partida.
- Como usuário, eu gostaria de poder inserir estatísticas da partida.
- Como usuário, eu gostaria de adicionar e excluir amigos do meu perfil.
- Como admin, eu gostaria de criar, editar e excluir qualquer partida.
- Como admin, eu gostaria de apagar avaliações dos usuários.

# Backlog da Sprint

1) Como usuário, eu gostaria de me cadastrar no sistema e ter uma página de perfil.
   - Instalar sequelize e MySQL e criar primeiras tabelas [Otávio]
   - Instalar node.js e Express [Otávio]
   - Instalar react [Otávio]
   - Criar e testar uma primeira rota usando o Express [Otávio]
   - Criar tela de login [Bruno]
   - Implementar lógica de login [Lucas]
   - Criar tela de cadastro [Bruno]
   - Implementar lógica de cadastrar usuário [Lucas]
   - Criar tela de perfil [Bruno]
   - Implementar lógica para tela de perfil [Lucas]
    
2) Como usuário, eu gostaria de criar, visualizar, editar e excluir uma partida.
   - Criar tela das minhas partidas [Otávio]
   - Implementar lógica da tela das minhas partidas [Guilherme]
   - Criar tela de formulário de criação e edição da partida [Otávio]
   - Implementar lógica para formulário de criação e edição de partida [Guilherme]
   - Implementar lógica para excluir as minhas partidas [Guilherme]
   
3) Como usuário, eu gostaria de visualizar e pedir para me juntar às partidas ativas.
   - Criar tela do feed com todas as partidas ativas [Guilherme]
   - Implementar lógica para tela de partidas [Otávio]
   - Implementar lógica para me juntar a uma partida ativa [Otávio]
   
4) Como usuário, eu gostaria de aceitar ou recusar usuários que solicitaram entrada na minha partida.
   - Criar tela de solicitações [Lucas]
   - Implementar lógica para aceitar ou recusar solicitações [Bruno]
