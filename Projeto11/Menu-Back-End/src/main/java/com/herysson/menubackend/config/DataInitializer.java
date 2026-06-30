package com.herysson.menubackend.config;
import com.herysson.menubackend.model.Cliente;
import com.herysson.menubackend.model.ItemPedido;
import com.herysson.menubackend.model.Pedido;
import com.herysson.menubackend.model.Produto;
import com.herysson.menubackend.repository.ClienteRepository;
import com.herysson.menubackend.repository.PedidoRepository;
import com.herysson.menubackend.repository.ProdutoRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Configuration
public class DataInitializer {

    @Bean
    public CommandLineRunner carregarProdutos(ProdutoRepository produtoRepository) {
        return args -> {
            List<Produto> produtos = new ArrayList<>();

            produtos.add(criarProduto("Xis Bacon", "Xis", 36.50, "https://static.ifood-static.com.br/image/upload/t_medium/pratos/e84d4122-291e-4d25-8273-8e00f18e1c5f/202407091540_783B_i.jpg", "Pão tradicional de xis , bife ,bacon, ovo , milho, tomate, alface, catchup , mostarda, maionese artesanal."));
            produtos.add(criarProduto("Xis Salada", "Xis", 28.00, "https://www.rbsdirect.com.br/imagesrc/25692330.jpg?format=webp&w=1600&h=1600&a=c", "Pão de xis prensado, bife de hambúrguer, queijo derretido, ovo, milho, ervilha, tomate, alface, catchup, mostarda e maionese artesanal da casa."));
            produtos.add(criarProduto("Xis Coração", "Xis", 38.50, "https://conteudo.imguol.com.br/c/entretenimento/eb/2020/06/29/xis-coracao-1593449300366_v2_4x3.jpg", "Pão de xis prensado, uma quantidade generosa de coração de galinha grelhado na chapa, queijo, ovo, milho, ervilha, tomate, alface e maionese artesanal."));
            produtos.add(criarProduto("Xis Frango", "Xis", 32.00, "https://assets.unileversolutions.com/recipes-v2/232239.jpg", "Pão de xis prensado, cubos de peito de frango grelhados e temperados, queijo derretido, ovo, milho, ervilha, tomate, alface e maionese artesanal."));
            produtos.add(criarProduto("Xis Calabresa", "Xis", 34.00, "https://www.pintoburguer.com.br/wp-content/uploads/2021/09/WhatsApp-Image-2022-02-08-at-17.46.25-600x450.jpeg", "Pão de xis prensado, calabresa fatiada acebolada na chapa, queijo, ovo, milho, ervilha, tomate, alface, catchup, mostarda e maionese artesanal."));
            produtos.add(criarProduto("Xis Tudo", "Xis", 45.00, "https://instadelivery-public.nyc3.cdn.digitaloceanspaces.com/groups/172304842966b3a1edd5564.jpeg", "O rei do cardápio! Pão prensado, bife, bacon, coração de galinha, calabresa, queijo em dobro, ovo, milho, ervilha, tomate, alface e muita maionese artesanal."));
            produtos.add(criarProduto("Xis Vegetariano", "Xis", 30.00, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgbvbCSp1JNRR_EYLmwut8rhZbFQLKVljE2w&s", "Pão de xis prensado, bife vegetal à base de lentilha, queijo derretido, ovo, dobro de milho e ervilha, tomate, alface e maionese artesanal."));

            List<Produto> novos = produtos.stream()
                    .filter(produto -> produtoRepository.findByNome(produto.getNome()).isEmpty())
                    .toList();

            if (!novos.isEmpty()) {
                produtoRepository.saveAll(novos);
            }
        };
    }

    @Bean
    public CommandLineRunner carregarClientes(ClienteRepository clienteRepository) {
        return args -> {
            List<Cliente> clientes = new ArrayList<>();

            clientes.add(criarCliente("Alice Johnson", "cliente1@email.com", "Rua Maple, 1234, Springfield, IL", "Cartão de Crédito"));
            clientes.add(criarCliente("Bob Smith", "cliente2@email.com", "Rua Oak, 5678, Springfield, IL", "Cartão de Débito"));
            clientes.add(criarCliente("Carol White", "cliente3@email.com", "Rua Pine, 91011, Springfield, IL", "Dinheiro"));
            clientes.add(criarCliente("David Brown", "cliente4@email.com", "Rua Elm, 1213, Springfield, IL", "PayPal"));
            clientes.add(criarCliente("Eva Green", "cliente5@email.com", "Rua Cedar, 1415, Springfield, IL", "Apple Pay"));
            clientes.add(criarCliente("Maxwell Mystery", "cliente6@email.com", "Rua Baker, 221B, Springfield, IL", "Criptomoeda"));

            List<Cliente> novos = clientes.stream()
                    .filter(cliente -> clienteRepository.findByEmail(cliente.getEmail()).isEmpty())
                    .toList();

            if (!novos.isEmpty()) {
                clienteRepository.saveAll(novos);
            }
        };
    }

    @Bean
    public CommandLineRunner carregarPedidos(
            PedidoRepository pedidoRepository,
            ClienteRepository clienteRepository,
            ProdutoRepository produtoRepository) {
        return args -> {
            // Só roda se não houver nenhum pedido no banco
            if (pedidoRepository.count() == 0) {

                // 1. Buscamos os clientes reais salvos no passo anterior
                Cliente alice = clienteRepository.findByEmail("cliente1@email.com").orElse(null);
                Cliente bob = clienteRepository.findByEmail("cliente2@email.com").orElse(null);
                Cliente carol = clienteRepository.findByEmail("cliente3@email.com").orElse(null);
                Cliente david = clienteRepository.findByEmail("cliente4@email.com").orElse(null);
                Cliente eva = clienteRepository.findByEmail("cliente5@email.com").orElse(null);

                // 2. Buscamos os lanches reais salvos no passo anterior
                Produto xisBacon = produtoRepository.findByNome("Xis Bacon").orElse(null);
                Produto xisSalada = produtoRepository.findByNome("Xis Salada").orElse(null);
                Produto xisCoracao = produtoRepository.findByNome("Xis Coração").orElse(null);
                Produto xisFrango = produtoRepository.findByNome("Xis Frango").orElse(null);
                Produto xisCalabresa = produtoRepository.findByNome("Xis Calabresa").orElse(null);
                Produto xisTudo = produtoRepository.findByNome("Xis Tudo").orElse(null);
                Produto xisVegetariano = produtoRepository.findByNome("Xis Vegetariano").orElse(null);

                // Garante que os dados principais existem antes de criar os pedidos
                if (alice != null && xisBacon != null) {
                    List<Pedido> pedidos = new ArrayList<>();
                    DateTimeFormatter formatter = DateTimeFormatter.ISO_DATE_TIME;

                    // ----------------------------------------------------
                    // Pedido 1 (Alice)
                    // ----------------------------------------------------
                    Pedido p1 = new Pedido();
                    p1.setClienteId(alice);
                    p1.setValorTotal(96.03);
                    p1.setStatus("concluido");
                    p1.setDataPedido(LocalDateTime.parse("2024-04-01T12:30:00Z", formatter));
                    p1.setDataEntrega(LocalDateTime.parse("2024-04-01T15:00:00Z", formatter));

                    ItemPedido i1 = new ItemPedido();
                    i1.setProdutoId(xisBacon);
                    i1.setQuantidade(2);
                    i1.setPedidoId(p1); // Vincula o item ao pedido de volta (obrigatório)

                    ItemPedido i2 = new ItemPedido();
                    i2.setProdutoId(xisCoracao);
                    i2.setQuantidade(1);
                    i2.setPedidoId(p1);

                    p1.setItensPedido(List.of(i1, i2));
                    pedidos.add(p1);

                    // ----------------------------------------------------
                    // Pedido 2 (Bob)
                    // ----------------------------------------------------
                    if (bob != null) {
                        Pedido p2 = new Pedido();
                        p2.setClienteId(bob);
                        p2.setValorTotal(124.96);
                        p2.setStatus("em andamento");
                        p2.setDataPedido(LocalDateTime.parse("2024-04-02T13:00:00Z", formatter));
                        p2.setDataEntrega(null);

                        ItemPedido i3 = new ItemPedido();
                        i3.setProdutoId(xisSalada);
                        i3.setQuantidade(1);
                        i3.setPedidoId(p2);

                        ItemPedido i4 = new ItemPedido();
                        i4.setProdutoId(xisFrango);
                        i4.setQuantidade(3);
                        i4.setPedidoId(p2);

                        p2.setItensPedido(List.of(i3, i4));
                        pedidos.add(p2);
                    }

                    // ----------------------------------------------------
                    // Pedido 3 (Carol)
                    // ----------------------------------------------------
                    if (carol != null) {
                        Pedido p3 = new Pedido();
                        p3.setClienteId(carol);
                        p3.setValorTotal(109.78);
                        p3.setStatus("concluido");
                        p3.setDataPedido(LocalDateTime.parse("2024-04-03T16:45:00Z", formatter));
                        p3.setDataEntrega(LocalDateTime.parse("2024-04-03T19:30:00Z", formatter));

                        ItemPedido i5 = new ItemPedido();
                        i5.setProdutoId(xisCalabresa);
                        i5.setQuantidade(1);
                        i5.setPedidoId(p3);

                        ItemPedido i6 = new ItemPedido();
                        i6.setProdutoId(xisTudo);
                        i6.setQuantidade(2);
                        i6.setPedidoId(p3);

                        p3.setItensPedido(List.of(i5, i6));
                        pedidos.add(p3);
                    }

                    // ----------------------------------------------------
                    // Pedido 4 (David)
                    // ----------------------------------------------------
                    if (david != null) {
                        Pedido p4 = new Pedido();
                        p4.setClienteId(david);
                        p4.setValorTotal(71.28);
                        p4.setStatus("pendente");
                        p4.setDataPedido(LocalDateTime.parse("2024-04-04T17:00:00Z", formatter));
                        p4.setDataEntrega(null);

                        ItemPedido i7 = new ItemPedido();
                        i7.setProdutoId(xisVegetariano);
                        i7.setQuantidade(2);
                        i7.setPedidoId(p4);

                        ItemPedido i8 = new ItemPedido();
                        i8.setProdutoId(xisBacon);
                        i8.setQuantidade(1);
                        i8.setPedidoId(p4);

                        p4.setItensPedido(List.of(i7, i8));
                        pedidos.add(p4);
                    }

                    // ----------------------------------------------------
                    // Pedido 5 (Eva)
                    // ----------------------------------------------------
                    if (eva != null) {
                        Pedido p5 = new Pedido();
                        p5.setClienteId(eva);
                        p5.setValorTotal(115.39);
                        p5.setStatus("concluido");
                        p5.setDataPedido(LocalDateTime.parse("2024-04-05T20:30:00Z", formatter));
                        p5.setDataEntrega(LocalDateTime.parse("2024-04-05T23:00:00Z", formatter));

                        ItemPedido i9 = new ItemPedido();
                        i9.setProdutoId(xisBacon);
                        i9.setQuantidade(3);
                        i9.setPedidoId(p5);

                        ItemPedido i10 = new ItemPedido();
                        i10.setProdutoId(xisSalada);
                        i10.setQuantidade(2);
                        i10.setPedidoId(p5);

                        p5.setItensPedido(List.of(i9, i10));
                        pedidos.add(p5);
                    }

                    pedidoRepository.saveAll(pedidos);
                }
            }
        };
    }

    private Produto criarProduto(String nome, String categoria, Double preco, String imagem, String descricao) {
        Produto produto = new Produto();
        produto.setNome(nome);
        produto.setCategoria(categoria);
        produto.setPreco(preco);
        produto.setImagem(imagem);
        produto.setDescricao(descricao);
        produto.setDisponibilidade(true);
        return produto;
    }

    private Cliente criarCliente(String nome, String email, String endereco, String pagamento) {
        Cliente cliente = new Cliente();
        cliente.setNome(nome);
        cliente.setEmail(email);
        cliente.setEnderecoEntrega(endereco);
        cliente.setPreferenciaPagamento(pagamento);
        return cliente;
    }
}