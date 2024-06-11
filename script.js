const qst = require('readline-sync');

let playerMoney = 50;

console.log("\nSeus fundos: $", playerMoney);

const NPC_vendor_items = [
    {name: "Poção de Cura", price: 5},
    {name: "Espada de Ferro", price: 50},
    {name: "Lança de Madeira", price: 45},
];

let max_length = 0;

for (const item of NPC_vendor_items) {
    if (item.name.length > max_length) {
        max_length = item.name.length;
    }
}

function show_items() {
    let index = 1;
    for (const item of NPC_vendor_items) {
        const spaces = ' '.repeat(max_length - item.name.length + 1);
        console.log(index + " - " + item.name + spaces + "| Preço: R$" + item.price);
        index += 1;
    }
    console.log(index + " - Pronto.");
}

function inquireBuyer() {
    console.log("\nSelecione o item que quer comprar.");
    show_items();
    let questionEpic = qst.questionInt("> ");
    let itemSelected = questionEpic - 1;

    if (itemSelected == NPC_vendor_items.length) {
        return { success: "cancel" };
    } else if (NPC_vendor_items[itemSelected]) {
        let selectedItem = NPC_vendor_items[itemSelected];
        let itemPrice = selectedItem.price;
        if (playerMoney >= itemPrice) {
            console.log("\nVocê comprou " + selectedItem.name + "!\n");
            return { success: true, price: itemPrice, name: selectedItem.name };
        } else {
            console.log("\nVocê não tem dinheiro para comprar " + selectedItem.name);
            return { success: false, price: itemPrice };
        }
    } else {
        console.log("Opção inválida, tente novamente.");
        return { success: false, price: 0 };
    }
}

function main() {
    let items_bought = {};
    while (playerMoney > 0) {
        const { success, price, name } = inquireBuyer();
        if (success === "cancel") {
            break;
        } else if (success) {
            playerMoney -= price;
            console.log("Fundos: $" + playerMoney);
            if (!items_bought[name]) {
                items_bought[name] = 0;
            }
            items_bought[name] += 1;
        }
    }

    if (Object.keys(items_bought).length > 0) {
        console.log("Obrigado por comprar aqui!");
        for (const item in items_bought) {
            if (items_bought.hasOwnProperty(item)) {
                const quantity = items_bought[item];
                console.log("Você comprou " + quantity + "x " + item);
            }
        }
    } else {
        console.log("Obrigado por passar aqui!");
    }
}

main();