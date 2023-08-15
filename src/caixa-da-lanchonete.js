class CaixaDaLanchonete {
    constructor() {
        this.cardapio = {
            cafe: 3.00,
            chantily: 1.50,
            suco: 6.20,
            sanduiche: 6.50,
            queijo: 2.00,
            salgado: 7.25,
            combo1: 9.50,
            combo2: 7.50,
        };

        this.formasDePagamento = {
            dinheiro: 0.95, // 5% de desconto
            debito: 1,      // Sem acréscimo ou desconto
            credito: 1.03,  // 3% de acréscimo
        };
    }

    formatarValor(valor) {
        return `R$ ${valor.toFixed(2).replace(".", ",")}`;
    }

    calcularValorDaCompra(formaDePagamento, itens) {
        if (!this.formasDePagamento[formaDePagamento]) {
            return 'Forma de pagamento inválida!';
        }

        if (itens.length === 0) {
            return 'Não há itens no carrinho de compra!';
        }

        let total = 0;

        const quantidadeItens = {};
        const itensPrincipais = ['cafe', 'suco', 'sanduiche', 'salgado', 'combo1', 'combo2'];

        for (const item of itens) {
            const [codigo, quantidade] = item.split(',');

            if (!this.cardapio[codigo]) {
                return 'Item inválido!';
            }

            if (quantidade <= 0) {
                return 'Quantidade inválida!';
            }

            if (!quantidadeItens[codigo]) {
                quantidadeItens[codigo] = 0;
            }
            quantidadeItens[codigo] += parseInt(quantidade);
        }

        for (const codigo in quantidadeItens) {
            if (itensPrincipais.includes(codigo)) {
                total += this.cardapio[codigo] * quantidadeItens[codigo];
            }
        }

        const possuiItemPrincipal = itensPrincipais.some(codigo => quantidadeItens[codigo] > 0);
        const possuiItemExtra = itens.some(item => item.split(',')[0] === 'chantily' || item.split(',')[0] === 'queijo');

        if (possuiItemExtra && !possuiItemPrincipal) {
            return 'Item extra não pode ser pedido sem o principal';
        }

        total = formaDePagamento === 'dinheiro' ? total * this.formasDePagamento['dinheiro'] :
                formaDePagamento === 'credito'  ? total * this.formasDePagamento['credito']  : total;

        return this.formatarValor(total);
    }
}

export { CaixaDaLanchonete };
