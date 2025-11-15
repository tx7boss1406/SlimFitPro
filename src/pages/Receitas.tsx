import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { XCircle } from "lucide-react";

type Receita = {
  id: number;
  nome: string;
  calorias: number;
  tempo: string;
  imagem: string;
  descricao: string;
  ingredientes: string[];
  preparo: string[];
  rendimento?: string;
  beneficios?: string;
  dicas?: string[];
  resumoVisual?: string;
};


const receitas: Receita[] = [
  
    {
  id: 1,
  nome: "Panqueca de Aveia e Banana Fit",
  calorias: 250,
  tempo: "15min",
  imagem: "/imagens/panqueca.jpg",
  descricao: "Uma opção nutritiva, leve e cheia de sabor para começar o dia com energia. Ideal para o café da manhã ou lanche pós-treino.",
  ingredientes: [
    "1 banana madura amassada",
    "1 ovo",
    "3 colheres (sopa) de aveia em flocos",
    "1 pitada de canela em pó",
    "1 colher (chá) de fermento em pó",
    "Azeite de oliva (para untar a frigideira)"
  ],
  preparo: [
    "Em uma tigela, amasse bem a banana até virar um purê.",
    "Acrescente o ovo e misture até formar uma massa homogênea.",
    "Adicione a aveia e a canela, mexendo bem.",
    "Finalize com o fermento e mexa delicadamente.",
    "Aqueça uma frigideira antiaderente, unte com azeite e despeje pequenas porções da massa.",
    "Doure dos dois lados até ficarem firmes e douradas.",
    "💡 Dica extra: Sirva com mel, pasta de amendoim ou frutas frescas para um café da manhã completo e nutritivo."
  ],
  rendimento: "4 panquecas médias",
  beneficios: "Rica em fibras, fornece energia de liberação lenta e ajuda na saciedade.",
  dicas: [
    "Substitua a banana por maçã ralada para uma variação de sabor.",
    "Adicione uma colher de whey protein para aumentar o teor proteico.",
    "Sirva com pasta de amendoim ou mel natural por cima."
  ],
  resumoVisual: "🕒 15 min 🔥 250 kcal 🍽️ 4 porções 💪 Fitness"
},
 {
  id: 2,
  nome: "Frango Grelhado com Legumes Coloridos",
  calorias: 350,
  tempo: "30min",
  imagem: "/imagens/frango.jpg",
  descricao: "Frango suculento e temperado, acompanhado de legumes frescos e coloridos, uma refeição saudável e equilibrada.",
  ingredientes: [
    "2 peitos de frango",
    "Sal e pimenta-do-reino a gosto",
    "1 colher (chá) de alho em pó",
    "1 colher (chá) de páprica",
    "1 colher (sopa) de azeite de oliva",
    "1 cenoura média cortada em rodelas",
    "1 abobrinha média cortada em rodelas",
    "1 pimentão vermelho cortado em tiras",
    "1 colher (chá) de ervas finas"
  ],
  preparo: [
    "Tempere os peitos de frango com sal, pimenta, alho em pó e páprica.",
    "Aqueça uma frigideira ou grelha com azeite de oliva.",
    "Grelhe o frango por aproximadamente 5-6 minutos de cada lado, até dourar e cozinhar completamente.",
    "Em outra frigideira, refogue os legumes com uma pitada de sal e ervas finas por 5-7 minutos, até ficarem levemente crocantes.",
    "Sirva o frango acompanhado dos legumes coloridos.",
    "💡 Dica extra: Acrescente um fio de azeite de oliva extra virgem por cima antes de servir para realçar o sabor e os nutrientes."
  ],
  rendimento: "2 porções",
  beneficios: "Excelente fonte de proteína magra e vitaminas dos legumes, ajuda na saciedade e energia saudável.",
  dicas: [
    "Substitua os legumes por brócolis e couve-flor para variar os nutrientes.",
    "Tempere com limão fresco para um toque cítrico delicioso."
  ],
  resumoVisual: "🕒 30 min 🔥 350 kcal 🍽️ 2 porções 💪 Saudável"
},
 {
  id: 3,
  nome: "Lasanha de Berinjela Low Carb",
  calorias: 400,
  tempo: "50min",
  imagem: "/imagens/lasanha_berinjela.jpg",
  descricao: "Uma lasanha saborosa e leve, perfeita para quem busca reduzir carboidratos sem abrir mão do sabor.",
  ingredientes: [
    "2 berinjelas médias cortadas em fatias finas",
    "300g de carne moída magra",
    "1 cebola picada",
    "2 dentes de alho picados",
    "300g de molho de tomate caseiro",
    "150g de queijo muçarela fatiado",
    "50g de queijo parmesão ralado",
    "Orégano a gosto",
    "Sal e pimenta a gosto",
    "Azeite de oliva para refogar"
  ],
  preparo: [
    "Preaqueça o forno a 180°C.",
    "Grelhe as fatias de berinjela rapidamente em uma frigideira com um fio de azeite para amolecer.",
    "Em outra frigideira, refogue a cebola e o alho, acrescente a carne moída, tempere com sal, pimenta e cozinhe até dourar.",
    "Adicione o molho de tomate à carne e misture bem.",
    "Em um refratário, monte a lasanha alternando camadas de berinjela, molho de carne e queijo muçarela.",
    "Finalize com parmesão e orégano por cima.",
    "Leve ao forno por 25-30 minutos, até o queijo gratinar.",
    "💡 Dica extra: Sirva com uma salada verde para uma refeição completa e equilibrada."
  ],
  rendimento: "4 porções",
  beneficios: "Baixa em carboidratos, rica em proteínas e fibras, ajuda na saciedade e manutenção de peso.",
  dicas: [
    "Pode adicionar abobrinha em fatias para variar a textura.",
    "Use queijo ricota para uma versão mais leve."
  ],
  resumoVisual: "🕒 50 min 🔥 400 kcal 🍽️ 4 porções 💪 Low Carb"
},
 {
  id: 4,
  nome: "Frango à Parmegiana Fit",
  calorias: 500,
  tempo: "1h",
  imagem: "/imagens/frango_parmegiana.jpg",
  descricao:
    "Frango suculento empanado com crosta dourada, coberto com molho de tomate caseiro e muito queijo derretido. Uma versão equilibrada e irresistível, perfeita para quem quer saborear sem culpa.",
  ingredientes: [
    "2 peitos de frango grandes",
    "Sal e pimenta-do-reino a gosto",
    "1 colher (chá) de alho em pó",
    "2 ovos batidos",
    "50g de farinha de trigo (ou farinha de aveia para versão fit)",
    "100g de farinha de rosca integral",
    "1 colher (sopa) de azeite de oliva (para grelhar ou assar)",
    "300g de molho de tomate caseiro ou pronto sem açúcar",
    "150g de queijo muçarela light fatiado",
    "50g de queijo parmesão ralado",
    "Orégano e manjericão a gosto"
  ],
  preparo: [
    "Corte os peitos de frango ao meio no sentido do comprimento para formar filés mais finos. Bata levemente com um martelo culinário para nivelar a espessura.",
    "Tempere os filés com sal, pimenta e alho em pó. Deixe marinar por 10 minutos para absorver os sabores.",
    "Prepare a estação de empanamento: um prato com farinha de trigo (ou aveia), outro com os ovos batidos e o terceiro com a farinha de rosca integral.",
    "Empane cada filé passando primeiro na farinha, depois no ovo e por fim na farinha de rosca, pressionando bem para fixar.",
    "Aqueça uma frigideira antiaderente com um fio de azeite e grelhe os filés até dourarem bem de ambos os lados (ou leve ao forno a 200°C por 15 minutos para uma versão mais leve).",
    "Em um refratário, espalhe um pouco do molho de tomate no fundo, coloque os filés, cubra com mais molho, muçarela, parmesão e finalize com orégano e manjericão.",
    "Leve ao forno pré-aquecido a 180°C por 20-25 minutos, até o queijo derreter e gratinar.",
    "Deixe descansar por 5 minutos antes de servir, para firmar o queijo e manter o frango suculento.",
    "💡 Dica extra: sirva com arroz integral, legumes salteados ou purê de batata-doce para uma refeição completa e equilibrada."
  ],
  rendimento: "Serve 2 a 3 pessoas",
  beneficios:
    "Excelente fonte de proteínas magras e cálcio. Ajuda na recuperação muscular e na saciedade, mantendo o sabor clássico em uma versão mais saudável.",
  dicas: [
    "Substitua o frango por filé de peixe branco para uma variação leve e saborosa.",
    "Use queijo cottage no lugar da muçarela para reduzir calorias.",
    "Para deixar o molho mais natural, refogue tomate fresco com alho, cebola e manjericão.",
    "Evite fritar o frango — asse ou grelhe para uma versão mais leve e sem gordura saturada."
  ],
  resumoVisual: "🕒 1h 🔥 500 kcal 🍽️ 3 porções 💪 Rico em proteínas 🧀 Clássico saudável"
},
{
  id: 5,
  nome: "Torta de Frango Integral Cremosa",
  calorias: 380,
  tempo: "50min",
  imagem: "/imagens/torta_frango_integral.jpg",
  descricao:
    "Torta leve e nutritiva com massa integral e recheio cremoso de frango desfiado. Ideal para o almoço, lanche da tarde ou marmita fitness.",
  ingredientes: [
    "2 xícaras (chá) de farinha de trigo integral",
    "1/2 xícara (chá) de aveia em flocos",
    "3 ovos",
    "1/2 xícara (chá) de azeite de oliva",
    "1 xícara (chá) de leite desnatado",
    "1 colher (sopa) de fermento químico em pó",
    "1 peito de frango cozido e desfiado",
    "1/2 cebola picada",
    "2 colheres (sopa) de requeijão light",
    "Sal, pimenta e orégano a gosto"
  ],
  preparo: [
    "Pré-aqueça o forno a 180°C e unte uma forma média com azeite e farinha integral.",
    "No liquidificador, bata os ovos, o leite e o azeite até misturar bem.",
    "Adicione a farinha integral, a aveia e o fermento, batendo até formar uma massa homogênea.",
    "Refogue o frango com cebola, sal e pimenta. Adicione o requeijão e o orégano, misturando bem até ficar cremoso.",
    "Despeje metade da massa na forma, espalhe o recheio e cubra com o restante da massa.",
    "Leve ao forno por 35-40 minutos ou até dourar.",
    "Espere esfriar levemente antes de cortar e servir."
  ],
  rendimento: "Serve 6 fatias médias",
  beneficios:
    "Fonte equilibrada de proteínas, fibras e gorduras boas. Ótima opção para refeições práticas e saudáveis.",
  dicas: [
    "Substitua o frango por atum ou legumes refogados para variar o sabor.",
    "Pode ser congelada em porções individuais.",
    "Sirva com salada verde para uma refeição completa."
  ],
  resumoVisual: "🕒 50 min 🔥 380 kcal 🍽️ 6 porções 🥗 Integral e leve"
},
{
  id: 6,
  nome: "Brownie Fit de Cacau e Aveia",
  calorias: 210,
  tempo: "30min",
  imagem: "/imagens/brownie_fit.jpg",
  descricao:
    "Um brownie úmido, intenso e saudável, feito sem farinha branca nem açúcar refinado. Ideal para quem quer um doce sem culpa.",
  ingredientes: [
    "2 bananas maduras amassadas",
    "2 ovos",
    "3 colheres (sopa) de cacau em pó 100%",
    "1/2 xícara (chá) de aveia em flocos finos",
    "2 colheres (sopa) de mel ou xilitol",
    "1 colher (chá) de fermento em pó",
    "1 pitada de sal",
    "Chips de chocolate 70% (opcional)"
  ],
  preparo: [
    "Pré-aqueça o forno a 180°C e forre uma forma pequena com papel manteiga.",
    "Misture em uma tigela as bananas, os ovos e o mel até formar um creme liso.",
    "Adicione o cacau, a aveia, o sal e o fermento, misturando até incorporar.",
    "Despeje na forma e espalhe bem a massa. Adicione os chips de chocolate por cima.",
    "Asse por 20-25 minutos, até firmar, mas ainda úmido no centro.",
    "Deixe esfriar antes de cortar em quadrados."
  ],
  rendimento: "8 quadrados pequenos",
  beneficios:
    "Rico em antioxidantes e fibras. Fornece energia de forma saudável e reduz o desejo por doces ultraprocessados.",
  dicas: [
    "Use cacau puro, não achocolatado.",
    "Guarde na geladeira por até 5 dias.",
    "Sirva com morangos frescos para um toque gourmet."
  ],
  resumoVisual: "🕒 30 min 🔥 210 kcal 🍫 Sem açúcar 💪 Rico em fibras"
},
{
  id: 7,
  nome: "Smoothie Tropical Proteico",
  calorias: 220,
  tempo: "5min",
  imagem: "/imagens/smoothie_tropical.jpg",
  descricao:
    "Bebida refrescante, cremosa e rica em proteínas, perfeita para o café da manhã, pós-treino ou lanche saudável.",
  ingredientes: [
    "1/2 banana congelada",
    "1 fatia grossa de manga madura",
    "1/2 xícara (chá) de leite de coco light",
    "1 scoop de whey protein sabor baunilha",
    "Gelo a gosto",
    "1 colher (chá) de chia (opcional)"
  ],
  preparo: [
    "Bata todos os ingredientes no liquidificador até obter um creme homogêneo.",
    "Ajuste a textura adicionando mais leite se desejar mais líquido.",
    "Sirva imediatamente, decorando com chia ou lascas de coco por cima."
  ],
  rendimento: "1 copo grande (350ml)",
  beneficios:
    "Fonte rápida de energia e proteínas. Ajuda na recuperação muscular e hidratação pós-treino.",
  dicas: [
    "Substitua o whey por proteína vegetal para versão vegana.",
    "Adicione folhas de hortelã para um toque refrescante.",
    "Congele as frutas para deixar o smoothie ainda mais cremoso."
  ],
  resumoVisual: "🕒 5 min 🔥 220 kcal 🥤 1 porção 💪 Pós-treino refrescante"
},
{
  id: 8,
  nome: "Espaguete de Abobrinha ao Pesto",
  calorias: 220,
  tempo: "15min",
  imagem: "/imagens/espaguete_abobrinha.jpg",
  descricao:
    "Leve, fresco e cheio de sabor. Uma versão low carb do clássico italiano, feita com abobrinha e molho pesto caseiro.",
  ingredientes: [
    "2 abobrinhas médias cortadas em tiras finas (espiralizador ou ralador)",
    "1 xícara (chá) de folhas de manjericão fresco",
    "2 colheres (sopa) de castanha-de-caju ou nozes",
    "1 dente de alho pequeno",
    "1/4 xícara (chá) de azeite de oliva",
    "2 colheres (sopa) de queijo parmesão ralado",
    "Sal e pimenta a gosto"
  ],
  preparo: [
    "Bata o manjericão, castanhas, alho, azeite, parmesão, sal e pimenta no processador até formar um molho pesto cremoso.",
    "Aqueça uma frigideira antiaderente e refogue rapidamente a abobrinha por 1 a 2 minutos (não deixe amolecer demais).",
    "Misture o pesto à abobrinha ainda quente.",
    "Sirva imediatamente, finalizando com parmesão extra e pimenta-do-reino moída na hora."
  ],
  rendimento: "Serve 2 pessoas",
  beneficios:
    "Baixo em calorias e carboidratos, rico em gorduras boas e antioxidantes. Ideal para dietas leves e anti-inflamatórias.",
  dicas: [
    "Adicione tomatinhos cereja grelhados para um toque extra de cor e sabor.",
    "Use espaguete de cenoura ou chuchu para variar.",
    "Sirva com frango grelhado para aumentar o teor proteico."
  ],
  resumoVisual: "🕒 15 min 🔥 220 kcal 🥗 Low Carb 🌿 Pesto fresco"
},
{
  id: 9,
  nome: "Sopa Cremosa de Abóbora com Gengibre",
  calorias: 180,
  tempo: "30min",
  imagem: "/imagens/sopa_abobora.jpg",
  descricao:
    "Sopa reconfortante, cremosa e funcional. O toque de gengibre traz calor e estimula a imunidade — perfeita para noites frias.",
  ingredientes: [
    "500g de abóbora cabotiá descascada e picada",
    "1 cebola pequena picada",
    "1 dente de alho picado",
    "1 colher (chá) de gengibre ralado",
    "1 colher (sopa) de azeite de oliva",
    "2 xícaras (chá) de água quente ou caldo de legumes",
    "Sal e pimenta a gosto",
    "Sementes de abóbora para decorar (opcional)"
  ],
  preparo: [
    "Aqueça o azeite e refogue a cebola e o alho até dourarem.",
    "Adicione a abóbora e o gengibre, refogue por 2 minutos.",
    "Cubra com a água e cozinhe até a abóbora ficar bem macia (cerca de 20 minutos).",
    "Bata tudo no liquidificador até formar um creme liso.",
    "Acerte o sal e a pimenta, aqueça novamente e sirva com sementes de abóbora torradas."
  ],
  rendimento: "Rende 3 porções médias",
  beneficios:
    "Rica em betacaroteno, fibras e antioxidantes. Ajuda na digestão e fortalece o sistema imunológico.",
  dicas: [
    "Adicione um fio de leite de coco para sabor mais aveludado.",
    "Sirva com croutons integrais ou queijo cottage por cima.",
    "Pode ser congelada em porções individuais."
  ],
  resumoVisual: "🕒 30 min 🔥 180 kcal 🍵 3 porções 💛 Imunidade e leveza"
},
{
  id: 10,
  nome: "Omelete de Legumes Colorido",
  calorias: 240,
  tempo: "12min",
  imagem: "/imagens/omelete_legumes.jpg",
  descricao:
    "Um omelete leve, nutritivo e cheio de cores, com vegetais salteados e textura macia. Ideal para começar o dia com energia ou encerrar a noite de forma leve.",
  ingredientes: [
    "2 ovos inteiros",
    "1 clara de ovo",
    "1/4 de cebola picada",
    "1/4 de pimentão vermelho picado",
    "1/4 de tomate sem sementes picado",
    "1/4 de cenoura ralada",
    "1 colher (chá) de azeite de oliva",
    "Sal e pimenta a gosto",
    "Cheiro-verde picado a gosto"
  ],
  preparo: [
    "Em uma tigela, bata os ovos e a clara com uma pitada de sal e pimenta até espumar.",
    "Em uma frigideira antiaderente, aqueça o azeite e refogue a cebola, pimentão, tomate e cenoura por 2 minutos.",
    "Despeje os ovos batidos sobre os legumes e espalhe bem.",
    "Cozinhe em fogo baixo com a frigideira tampada por 3 a 4 minutos, até firmar.",
    "Vire com cuidado ou dobre ao meio, finalize com cheiro-verde e sirva quente."
  ],
  rendimento: "Serve 1 pessoa",
  beneficios:
    "Rico em proteínas e fibras, ajuda na saciedade e fornece energia duradoura. Baixo em gordura e ideal para quem busca leveza sem abrir mão do sabor.",
  dicas: [
    "Adicione cubinhos de queijo branco para mais cremosidade.",
    "Use os legumes que tiver em casa — brócolis, abobrinha ou espinafre ficam ótimos.",
    "Sirva com uma fatia de pão integral ou tapioca."
  ],
  resumoVisual: "🕒 12 min 🔥 240 kcal 🍽️ 1 porção 🌈 Rico em nutrientes"
},
{
  id: 11,
  nome: "Purê de Batata-Doce Cremoso",
  calorias: 190,
  tempo: "25min",
  imagem: "/imagens/pure_batatadoce.jpg",
  descricao:
    "Purê leve e aveludado, com o sabor adocicado da batata-doce e um toque de manteiga. Acompanhamento perfeito para carnes, peixes ou legumes grelhados.",
  ingredientes: [
    "2 batatas-doces médias descascadas e cortadas em cubos",
    "1 colher (sopa) de manteiga ou azeite de oliva",
    "1/3 xícara (chá) de leite ou bebida vegetal",
    "Sal a gosto",
    "Pitada de noz-moscada (opcional)"
  ],
  preparo: [
    "Cozinhe as batatas-doces em água com sal até ficarem bem macias (cerca de 15 minutos).",
    "Escorra bem e amasse até formar um purê liso.",
    "Adicione a manteiga e o leite, misturando até atingir textura cremosa.",
    "Tempere com sal e noz-moscada e sirva ainda quente."
  ],
  rendimento: "Serve 2 porções médias",
  beneficios:
    "Fonte de carboidratos complexos e fibras, fornece energia estável e ajuda na recuperação muscular. Rica em vitamina A e antioxidantes.",
  dicas: [
    "Para versão vegana, use azeite e leite vegetal.",
    "Adicione gengibre ralado para um sabor especial.",
    "Pode ser guardado na geladeira por até 2 dias."
  ],
  resumoVisual: "🕒 25 min 🔥 190 kcal 🍠 Fonte de energia 💛 Rico em fibras"
},
{
  id: 12,
  nome: "Filé de Peixe ao Limão e Ervas",
  calorias: 280,
  tempo: "20min",
  imagem: "/imagens/peixe_limao_ervas.jpg",
  descricao:
    "Filé de peixe grelhado e suculento, com tempero leve de limão e ervas frescas. Uma refeição saborosa, leve e rica em proteínas.",
  ingredientes: [
    "2 filés de peixe branco (tilápia, linguado ou merluza)",
    "1 colher (sopa) de azeite de oliva",
    "Suco de 1/2 limão",
    "1 dente de alho amassado",
    "1 colher (chá) de ervas finas ou orégano",
    "Sal e pimenta a gosto",
    "Rodelas de limão para decorar"
  ],
  preparo: [
    "Tempere os filés com limão, alho, ervas, sal e pimenta. Deixe marinar por 10 minutos.",
    "Aqueça uma frigideira com o azeite e grelhe os filés por 3 a 4 minutos de cada lado, até dourarem.",
    "Sirva com rodelas de limão e um fio de azeite extra."
  ],
  rendimento: "Serve 2 pessoas",
  beneficios:
    "Rico em proteínas magras e ômega-3. Auxilia na saúde cardiovascular e é ideal para refeições leves e equilibradas.",
  dicas: [
    "Sirva com purê de batata-doce ou legumes no vapor.",
    "Adicione alcaparras ou cebolas caramelizadas para mais sabor.",
    "Prefira peixes frescos para melhor textura e aroma."
  ],
  resumoVisual: "🕒 20 min 🔥 280 kcal 🐟 Proteína magra 🍋 Refrescante"
},
{
  id: 13,
  nome: "Carne Salteada com Legumes",
  calorias: 370,
  tempo: "25min",
  imagem: "/imagens/carne_legumes.jpg",
  descricao:
    "Tirinhas de carne macias salteadas com legumes crocantes e molho leve. Um prato rápido, colorido e cheio de sabor.",
  ingredientes: [
    "300g de carne magra em tiras (patinho ou alcatra)",
    "1 colher (sopa) de azeite de oliva",
    "1/2 cebola fatiada",
    "1/2 pimentão vermelho em tiras",
    "1/2 cenoura em tiras finas",
    "1/2 xícara (chá) de brócolis cozido al dente",
    "2 colheres (sopa) de molho shoyu (baixo teor de sódio)",
    "1 colher (chá) de amido de milho (opcional, para engrossar o molho)",
    "Sal e pimenta a gosto"
  ],
  preparo: [
    "Aqueça uma frigideira grande ou wok com o azeite e adicione as tiras de carne, selando até dourar.",
    "Acrescente a cebola, cenoura e pimentão e refogue por 3 minutos.",
    "Adicione o brócolis e o shoyu, misture bem.",
    "Se desejar o molho mais espesso, dissolva o amido de milho em 2 colheres de água e adicione, mexendo até engrossar levemente.",
    "Acerte o sal, finalize com pimenta e sirva quente."
  ],
  rendimento: "Serve 2 porções grandes",
  beneficios:
    "Combinação rica em proteínas, fibras e vitaminas. Mantém a saciedade e ajuda na recuperação muscular.",
  dicas: [
    "Sirva com arroz integral ou quinoa.",
    "Adicione gengibre ralado para sabor asiático.",
    "Use frango ou tofu como variação proteica."
  ],
  resumoVisual: "🕒 25 min 🔥 370 kcal 🥦 Rico em fibras 🥩 Proteína completa"
},
{
  id: 14,
  nome: "Salada Tropical com Frango Grelhado",
  calorias: 310,
  tempo: "20min",
  imagem: "/imagens/salada_tropical_frango.jpg",
  descricao:
    "Uma salada refrescante, nutritiva e colorida com frango grelhado, frutas e mix de folhas. Ideal para um almoço leve e completo, repleto de vitaminas e proteínas.",
  ingredientes: [
    "150g de peito de frango grelhado em tiras",
    "2 xícaras (chá) de mix de folhas verdes (alface, rúcula, espinafre)",
    "1/2 manga madura cortada em cubos",
    "6 tomates-cereja cortados ao meio",
    "1 colher (sopa) de sementes de girassol ou chia",
    "1 colher (chá) de azeite de oliva extra virgem",
    "Suco de 1/2 limão",
    "Sal e pimenta-do-reino a gosto"
  ],
  preparo: [
    "Tempere o frango com sal, pimenta e limão. Grelhe em frigideira antiaderente até dourar dos dois lados.",
    "Monte a salada em uma tigela: folhas, manga, tomates e o frango fatiado.",
    "Finalize com azeite, suco de limão e sementes por cima. Sirva imediatamente."
  ],
  rendimento: "Serve 1 refeição completa",
  beneficios:
    "Combina proteínas magras com frutas e fibras, favorecendo saciedade e equilíbrio nutricional. Fonte natural de antioxidantes e gorduras boas.",
  dicas: [
    "Adicione pedaços de abacate para uma versão mais cremosa.",
    "Substitua o frango por filé de peixe grelhado para variar.",
    "Leve em potes de vidro para uma marmita fit prática."
  ],
  resumoVisual: "🕒 20 min 🔥 310 kcal 🥗 Refeição leve 💪 Rica em proteínas"
},
{
  id: 15,
  nome: "Legumes Assados com Ervas e Azeite",
  calorias: 180,
  tempo: "35min",
  imagem: "/imagens/legumes_assados.jpg",
  descricao:
    "Uma mistura colorida de legumes assados com azeite e ervas aromáticas. Prato simples, leve e cheio de sabor natural.",
  ingredientes: [
    "1 abobrinha média em rodelas",
    "1 cenoura em tiras finas",
    "1/2 pimentão vermelho em tiras",
    "1/2 cebola roxa fatiada",
    "1 colher (sopa) de azeite de oliva",
    "1 colher (chá) de ervas finas",
    "Sal e pimenta a gosto"
  ],
  preparo: [
    "Pré-aqueça o forno a 200°C.",
    "Em uma tigela, misture todos os legumes com azeite, sal, pimenta e ervas.",
    "Distribua em uma assadeira e leve ao forno por 30 a 35 minutos, mexendo na metade do tempo, até ficarem dourados e macios.",
    "Sirva quente ou frio como acompanhamento."
  ],
  rendimento: "Serve 2 porções",
  beneficios:
    "Rico em vitaminas, fibras e antioxidantes. Ajuda na digestão e é ótimo para acompanhar proteínas magras.",
  dicas: [
    "Adicione batata-doce ou couve-flor para variar.",
    "Finalize com raspas de limão e ervas frescas.",
    "Sirva com arroz integral ou quinoa para uma refeição completa."
  ],
  resumoVisual: "🕒 35 min 🔥 180 kcal 🥦 Natural e leve 🌿 Rico em fibras"
},
{
  id: 16,
  nome: "Arroz Integral com Legumes e Frango Desfiado",
  calorias: 350,
  tempo: "30min",
  imagem: "/imagens/arroz_integral_frango.jpg",
  descricao:
    "Refeição completa e equilibrada, com arroz integral, frango desfiado e legumes coloridos. Rico em proteínas e fibras, ideal para o dia a dia fit.",
  ingredientes: [
    "1 xícara (chá) de arroz integral cozido",
    "100g de peito de frango cozido e desfiado",
    "1/2 cenoura ralada",
    "1/4 de pimentão picado",
    "1/4 de cebola picada",
    "1 colher (chá) de azeite de oliva",
    "Sal e pimenta a gosto",
    "Cheiro-verde para finalizar"
  ],
  preparo: [
    "Em uma frigideira, aqueça o azeite e refogue a cebola até dourar.",
    "Adicione o pimentão e a cenoura, refogando por mais 2 minutos.",
    "Junte o frango desfiado e o arroz integral, mexendo bem até aquecer tudo.",
    "Tempere com sal, pimenta e finalize com cheiro-verde.",
    "Sirva quente, acompanhado de salada verde."
  ],
  rendimento: "Serve 2 porções completas",
  beneficios:
    "Refeição balanceada com proteínas magras e carboidratos integrais. Mantém energia estável e promove saciedade prolongada.",
  dicas: [
    "Adicione milho, ervilha ou brócolis para mais cor e sabor.",
    "Pode ser guardado em marmitas e congelado.",
    "Para mais cremosidade, adicione um fio de azeite ao final."
  ],
  resumoVisual: "🕒 30 min 🔥 350 kcal 🍗 Proteína magra 🍚 Rico em fibras"
},
{
  id: 17,
  nome: "Filé Mignon com Purê de Mandioquinha e Brócolis",
  calorias: 420,
  tempo: "40min",
  imagem: "/imagens/file_mignon_pure_mandioquinha.jpg",
  descricao:
    "Um prato sofisticado e equilibrado: filé mignon grelhado suculento servido com purê de mandioquinha leve e brócolis no vapor. Rico em sabor e perfeito para um jantar fit gourmet.",
  ingredientes: [
    "2 medalhões de filé mignon (150g cada)",
    "Sal e pimenta-do-reino a gosto",
    "1 colher (chá) de azeite de oliva",
    "1 dente de alho amassado",
    "300g de mandioquinha (batata-baroa) cozida",
    "1 colher (chá) de manteiga light ou azeite",
    "2 colheres (sopa) de leite desnatado",
    "1 xícara (chá) de brócolis cozido no vapor"
  ],
  preparo: [
    "Tempere os medalhões com sal, pimenta e alho. Aqueça uma frigideira antiaderente e grelhe o filé por 3 a 4 minutos de cada lado, até o ponto desejado.",
    "Para o purê: amasse a mandioquinha cozida, adicione a manteiga e o leite, e misture até ficar cremoso.",
    "Cozinhe o brócolis no vapor até ficar macio e vibrante.",
    "Monte o prato com o purê na base, o filé por cima e o brócolis ao lado. Finalize com um fio de azeite e pimenta moída."
  ],
  rendimento: "Serve 2 porções",
  beneficios:
    "Alto teor de proteínas magras, fibras e potássio. O purê de mandioquinha oferece energia leve e digestão fácil.",
  dicas: [
    "Adicione cebolas caramelizadas por cima do filé para mais sabor.",
    "Substitua o filé por frango grelhado para uma versão mais leve.",
    "Finalize com flor de sal e azeite trufado para um toque gourmet."
  ],
  resumoVisual: "🕒 40 min 🔥 420 kcal 🍽️ 2 porções 💪 Proteico e equilibrado"
},
{
  id: 18,
  calorias: 450,
  nome: "Salmão Grelhado com Crosta de Ervas e Quinoa",
  tempo: "35min",
  imagem: "/imagens/salmao_crosta_quinoa.jpg",
  descricao:
    "Salmão suculento com crosta de ervas finas e quinoa soltinha. Um prato completo, elegante e funcional, ideal para quem busca sabor e nutrição em equilíbrio.",
  ingredientes: [
    "2 filés de salmão (150g cada)",
    "Suco de 1/2 limão",
    "Sal e pimenta-do-reino a gosto",
    "1 colher (chá) de azeite de oliva",
    "1 colher (sopa) de ervas finas (salsa, alecrim, tomilho)",
    "1 xícara (chá) de quinoa cozida",
    "1/2 cenoura ralada",
    "1/2 abobrinha ralada",
    "1 colher (chá) de azeite"
  ],
  preparo: [
    "Tempere o salmão com sal, pimenta e limão. Misture as ervas com um fio de azeite e espalhe sobre o peixe.",
    "Aqueça uma frigideira antiaderente e grelhe o salmão 4 minutos de cada lado até dourar.",
    "Prepare a quinoa refogando a cenoura e a abobrinha no azeite e misturando com a quinoa cozida.",
    "Sirva o salmão sobre a quinoa e finalize com limão e ervas frescas."
  ],
  rendimento: "Serve 2 porções completas",
  beneficios:
    "Fonte de ômega-3, proteínas e aminoácidos essenciais. A quinoa fornece energia e melhora o metabolismo muscular.",
  dicas: [
    "Substitua o salmão por tilápia ou truta para variar.",
    "Finalize com raspas de limão siciliano e gergelim torrado.",
    "Sirva com legumes grelhados para uma refeição completa."
  ],
  resumoVisual: "🕒 35 min 🔥 450 kcal 🐟 Ômega-3 💪 Energia e leveza"
},
{
  id: 19,
  nome: "Estrogonofe Fit de Frango com Creme de Ricota",
  calorias: 380,
  tempo: "30min",
  imagem: "/imagens/estrogonofe_fit_frango.jpg",
  descricao:
    "Versão leve e cremosa do clássico estrogonofe, feita com peito de frango, creme de ricota e temperos naturais. Uma delícia com muito menos gordura e sódio.",
  ingredientes: [
    "300g de peito de frango em cubos",
    "1/2 cebola picada",
    "1 dente de alho picado",
    "1 colher (chá) de azeite de oliva",
    "2 colheres (sopa) de ketchup zero açúcar",
    "1 colher (sopa) de mostarda amarela",
    "3 colheres (sopa) de creme de ricota light",
    "Sal e pimenta a gosto",
    "Cheiro-verde para finalizar"
  ],
  preparo: [
    "Aqueça uma panela com azeite e refogue a cebola e o alho até dourar.",
    "Adicione o frango e refogue até dourar bem.",
    "Tempere com sal e pimenta, adicione o ketchup e a mostarda, misturando bem.",
    "Baixe o fogo e acrescente o creme de ricota, mexendo até obter um molho cremoso.",
    "Finalize com cheiro-verde e sirva com arroz integral ou purê de batata-doce."
  ],
  rendimento: "Serve 3 porções",
  beneficios:
    "Rico em proteínas magras e cálcio, com baixo teor de gordura. Uma opção funcional e saborosa para o almoço ou jantar.",
  dicas: [
    "Substitua o frango por carne magra moída ou cogumelos para versão vegetariana.",
    "Use molho de tomate natural para um sabor mais leve.",
    "Sirva com chips de batata-doce assada."
  ],
  resumoVisual: "🕒 30 min 🔥 380 kcal 🍗 Proteico 🥣 Leve e cremoso"
},
{
  id: 20,
  nome: "Escondidinho de Frango com Purê de Batata-Doce",
  calorias: 410,
  tempo: "45min",
  imagem: "/imagens/escondidinho_frango_fit.jpg",
  descricao:
    "Uma releitura saudável do clássico escondidinho, preparado com frango desfiado e purê cremoso de batata-doce. Rico em proteínas e sabor!",
  ingredientes: [
    "400g de batata-doce cozida e amassada",
    "1 colher (sopa) de azeite de oliva",
    "3 colheres (sopa) de leite desnatado",
    "300g de frango cozido e desfiado",
    "1/2 cebola picada",
    "1 dente de alho picado",
    "Sal, pimenta e páprica a gosto",
    "2 colheres (sopa) de requeijão light ou creme de ricota"
  ],
  preparo: [
    "Em uma panela, aqueça o azeite e refogue a cebola e o alho.",
    "Adicione o frango desfiado, tempere com sal, pimenta e páprica e misture bem.",
    "Prepare o purê misturando a batata-doce amassada com o leite e o requeijão até ficar cremoso.",
    "Monte em camadas: purê, frango e purê novamente.",
    "Leve ao forno a 200°C por 15 minutos para gratinar levemente."
  ],
  rendimento: "Serve 3 porções médias",
  beneficios:
    "Combina proteínas e carboidratos complexos, promovendo saciedade e energia duradoura. Ideal para refeições pós-treino.",
  dicas: [
    "Adicione legumes picados no recheio para mais fibras.",
    "Substitua o frango por carne magra ou atum.",
    "Finalize com gergelim torrado para crocância."
  ],
  resumoVisual: "🕒 45 min 🔥 410 kcal 🍠 Energia limpa 💪 Pós-treino perfeito"
},
{
  id: 21,
  nome: "Macarrão de Abobrinha com Molho de Tomate e Ricota",
  calorias: 260,
  tempo: "20min",
  imagem: "/imagens/macarrao_abobrinha_fit.jpg",
  descricao:
    "Um clássico italiano em versão leve e low carb. Abobrinha cortada em tiras finas com molho de tomate caseiro e ricota fresca.",
  ingredientes: [
    "1 abobrinha média cortada em tiras (espaguete de abobrinha)",
    "1 tomate maduro picado",
    "1 colher (chá) de azeite de oliva",
    "1 dente de alho picado",
    "3 colheres (sopa) de ricota fresca",
    "Sal, orégano e manjericão a gosto"
  ],
  preparo: [
    "Refogue o alho e o tomate no azeite até formar um molho leve.",
    "Tempere com sal e orégano.",
    "Adicione a abobrinha e refogue por 2 minutos, apenas para amaciar.",
    "Sirva com a ricota por cima e folhas de manjericão fresco."
  ],
  rendimento: "Serve 1 porção",
  beneficios:
    "Baixo em carboidratos e rico em fibras, ajuda na digestão e controle de peso. Ideal para jantares leves.",
  dicas: [
    "Use espiralizador para cortar a abobrinha de forma uniforme.",
    "Finalize com raspas de limão siciliano.",
    "Adicione castanhas picadas para mais textura."
  ],
  resumoVisual: "🕒 20 min 🔥 260 kcal 🥒 Low carb 🍅 Leve e aromático"
},
{
  id: 22,
  nome: "Purê de Batata-Doce com Frango Desfiado e Brócolis",
  calorias: 390,
  tempo: "35min",
  imagem: "/imagens/pure_batata_doce_frango.jpg",
  descricao:
    "Um prato reconfortante e saudável com purê cremoso de batata-doce e frango temperado. Ideal para o almoço do dia a dia.",
  ingredientes: [
    "1 batata-doce média cozida e amassada",
    "1 colher (chá) de azeite",
    "2 colheres (sopa) de leite desnatado",
    "150g de frango desfiado",
    "1/2 cebola picada",
    "1 xícara (chá) de brócolis cozido",
    "Sal e páprica a gosto"
  ],
  preparo: [
    "Refogue a cebola e o frango no azeite com sal e páprica.",
    "Prepare o purê misturando a batata-doce amassada com o leite até ficar cremoso.",
    "Sirva o purê como base, o frango por cima e o brócolis ao lado.",
    "Finalize com um fio de azeite e pimenta-do-reino."
  ],
  rendimento: "Serve 2 porções",
  beneficios:
    "Fonte de energia de liberação lenta e proteínas magras. Perfeito para quem busca recuperação muscular.",
  dicas: [
    "Adicione alho refogado no purê para mais sabor.",
    "Substitua o frango por carne magra ou tofu.",
    "Finalize com salsinha picada e limão."
  ],
  resumoVisual: "🕒 35 min 🔥 390 kcal 🍠 Nutritivo 💪 Pós-treino ideal"
},
{
  id: 23,
  nome: "Lasanha de Abobrinha com Frango e Queijo Cottage",
  calorias: 420,
  tempo: "40min",
  imagem: "/imagens/lasanha_abobrinha_frango.jpg",
  descricao:
    "Uma lasanha leve e cremosa feita com camadas de abobrinha grelhada, frango desfiado e queijo cottage. Um clássico com menos calorias, mas muito sabor.",
  ingredientes: [
    "2 abobrinhas médias fatiadas no sentido do comprimento",
    "200g de peito de frango cozido e desfiado",
    "1 xícara (chá) de molho de tomate natural",
    "1/2 xícara (chá) de queijo cottage",
    "2 colheres (sopa) de parmesão ralado",
    "1 colher (chá) de azeite de oliva",
    "Sal, orégano e pimenta-do-reino a gosto"
  ],
  preparo: [
    "Grelhe as fatias de abobrinha com um fio de azeite e reserve.",
    "Misture o frango desfiado com o molho de tomate e os temperos.",
    "Monte em camadas: abobrinha, frango, queijo cottage e repita.",
    "Finalize com parmesão por cima e leve ao forno a 180°C por 20 minutos.",
    "Sirva quente, com salada verde como acompanhamento."
  ],
  rendimento: "Serve 2 porções",
  beneficios:
    "Baixo em carboidratos e rico em proteínas. O queijo cottage adiciona cremosidade sem excesso de gordura.",
  dicas: [
    "Substitua o cottage por ricota ou requeijão light.",
    "Adicione espinafre entre as camadas para mais fibras.",
    "Finalize com ervas frescas como manjericão e salsinha."
  ],
  resumoVisual: "🕒 40 min 🔥 420 kcal 🥒 Low carb 🍗 Leve e cremoso"
},
{
  id: 24,
  nome: "Frango Cremoso com Requeijão Light e Legumes",
  calorias: 410,
  tempo: "35min",
  imagem: "/imagens/frango_cremoso_requeijao.jpg",
  descricao:
    "Peito de frango em cubos envolto em um creme leve de requeijão e legumes coloridos. Uma refeição completa, cremosa e nutritiva.",
  ingredientes: [
    "300g de peito de frango em cubos",
    "1/2 cenoura ralada",
    "1/2 xícara (chá) de milho verde",
    "1/2 xícara (chá) de ervilha",
    "2 colheres (sopa) de requeijão light",
    "1 colher (chá) de azeite",
    "Sal, pimenta e orégano a gosto"
  ],
  preparo: [
    "Aqueça o azeite e doure o frango em fogo médio.",
    "Adicione a cenoura, milho e ervilha, refogando por 5 minutos.",
    "Baixe o fogo e misture o requeijão até formar um creme leve.",
    "Acerte os temperos e sirva quente, acompanhado de arroz integral."
  ],
  rendimento: "Serve 2 pessoas",
  beneficios:
    "Rico em proteínas e vitaminas A e C. Um prato leve e equilibrado, ótimo para almoço saudável.",
  dicas: [
    "Adicione queijo muçarela light por cima e leve ao forno para gratinar.",
    "Use peito de peru em cubos como variação.",
    "Sirva com purê de batata-doce para um combo completo."
  ],
  resumoVisual: "🕒 35 min 🔥 410 kcal 🍗 Proteico 🥕 Colorido e cremoso"
},
{
  id: 25,
  nome: "Almôndegas de Carne Magra com Molho Cremoso de Tomate",
  calorias: 450,
  tempo: "45min",
  imagem: "/imagens/almondegas_cremosas.jpg",
  descricao:
    "Almôndegas suculentas de carne magra com molho de tomate cremoso e toque de queijo. Um prato que combina conforto e leveza.",
  ingredientes: [
    "300g de carne moída magra (patinho ou acém)",
    "1 clara de ovo",
    "2 colheres (sopa) de aveia em flocos",
    "Sal, alho e ervas finas a gosto",
    "1 xícara (chá) de molho de tomate natural",
    "2 colheres (sopa) de creme de ricota",
    "2 colheres (sopa) de queijo parmesão ralado"
  ],
  preparo: [
    "Misture a carne, clara, aveia e temperos e molde as almôndegas.",
    "Asse em forno a 200°C por 20 minutos ou até dourar.",
    "Aqueça o molho de tomate, adicione o creme de ricota e mexa bem.",
    "Junte as almôndegas ao molho e finalize com parmesão por cima."
  ],
  rendimento: "Serve 3 porções",
  beneficios:
    "Fonte de proteína magra e cálcio, com baixo teor de gordura. Perfeita para um almoço balanceado.",
  dicas: [
    "Substitua o creme de ricota por iogurte natural desnatado.",
    "Adicione espinafre picado na carne para mais nutrientes.",
    "Sirva com macarrão integral ou purê de legumes."
  ],
  resumoVisual: "🕒 45 min 🔥 450 kcal 🍖 Proteico 🍅 Cremoso e leve"
},
{
  id: 26,
  nome: "Panqueca Integral de Legumes com Queijo Branco",
  calorias: 380,
  tempo: "25min",
  imagem: "/imagens/panqueca_integral_queijo_branco.jpg",
  descricao:
    "Panquecas macias e saudáveis recheadas com legumes refogados e queijo branco derretido. Uma refeição leve e super saborosa.",
  ingredientes: [
    "1 ovo",
    "3 colheres (sopa) de farinha integral",
    "1/2 xícara (chá) de leite desnatado",
    "1 colher (chá) de azeite",
    "1/2 cenoura ralada",
    "1/2 abobrinha ralada",
    "50g de queijo branco em cubos",
    "Sal e orégano a gosto"
  ],
  preparo: [
    "Misture o ovo, farinha, leite e sal até formar uma massa lisa.",
    "Faça discos finos em uma frigideira antiaderente.",
    "Recheie com legumes refogados e o queijo branco.",
    "Enrole e leve ao forno por 10 minutos para derreter o queijo.",
    "Sirva quente com molho de tomate leve, se desejar."
  ],
  rendimento: "Serve 2 panquecas grandes",
  beneficios:
    "Rica em fibras, cálcio e antioxidantes. Ideal para refeições leves sem perder o sabor.",
  dicas: [
    "Adicione espinafre ou ricota no recheio.",
    "Use molho branco fit para variar o sabor.",
    "Finalize com sementes de chia ou linhaça por cima."
  ],
  resumoVisual: "🕒 25 min 🔥 380 kcal 🥗 Leve e nutritiva 🧀 Fonte de cálcio"
},

];

const Receitas: React.FC = () => {
  const [receitaSelecionada, setReceitaSelecionada] = useState<Receita | null>(
    null
  );

  return (
    <>
     <motion.section
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
  className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-hidden"
>


        {receitas.map((receita) => (
          <motion.div
            key={receita.id}
            whileHover={{ scale: 1.03 }}
            className="bg-gray-900/60 border border-yellow-400/10 rounded-2xl overflow-hidden shadow-md hover:shadow-yellow-400/10 transition-all cursor-pointer"
            onClick={() => setReceitaSelecionada(receita)}
          >
            <img
              src={receita.imagem}
              alt={receita.nome}
              className="w-full h-48 object-cover"
            />
            <div className="p-5">
              <h3 className="text-lg font-semibold text-white mb-1">
                {receita.nome}
              </h3>
              <p className="text-sm text-gray-400 mb-3">{receita.descricao}</p>

              <div className="flex justify-between items-center text-gray-300 text-sm mb-3">
                <span>🔥 {receita.calorias} kcal</span>
                <span>⏱ {receita.tempo}</span>
              </div>

              <button className="w-full bg-yellow-400/20 hover:bg-yellow-400/30 text-yellow-300 text-sm font-medium py-2 rounded-lg transition">
                Ver Receita Completa
              </button>
            </div>
          </motion.div>
        ))}
      </motion.section>

      {/* MODAL */}
      <AnimatePresence>
        {receitaSelecionada && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-md bg-black/60 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ duration: 0.3 }}
              className="relative bg-gray-900/90 border border-yellow-400/20 rounded-2xl max-w-lg w-full text-white shadow-lg"
            >
              {/* Div interna com rolagem sem scrollbar */}
              <div
                className="max-h-[80vh] overflow-y-auto p-6"
                style={{
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                }}
              >
                <style>
                  {`
                    div::-webkit-scrollbar {
                      display: none;
                    }
                  `}
                </style>

                <button
                  onClick={() => setReceitaSelecionada(null)}
                  className="absolute top-3 right-3 text-yellow-400 hover:text-yellow-300 transition"
                >
                  <XCircle size={26} />
                </button>

                <img
                  src={receitaSelecionada.imagem}
                  alt={receitaSelecionada.nome}
                  className="w-full h-52 object-cover rounded-xl mb-4"
                />

                <h2 className="text-2xl font-bold text-yellow-300 mb-2">
                  {receitaSelecionada.nome}
                </h2>

                <div className="flex justify-between text-sm text-gray-300 mb-4">
                  <span>🔥 {receitaSelecionada.calorias} kcal</span>
                  <span>⏱ {receitaSelecionada.tempo}</span>
                </div>

                <h3 className="text-lg font-semibold text-yellow-200 mb-2">
                  Ingredientes:
                </h3>
                <ul className="list-disc list-inside text-gray-300 mb-4 space-y-1">
                  {receitaSelecionada.ingredientes.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>

                <h3 className="text-lg font-semibold text-yellow-200 mb-2">
                  Modo de Preparo:
                </h3>
                <ol className="list-decimal list-inside text-gray-300 space-y-2">
                  {receitaSelecionada.preparo.map((passo, i) => (
                    <li key={i}>{passo}</li>
                  ))}
                </ol>
                {receitaSelecionada.rendimento && (
  <p className="text-gray-300 mt-4"><strong>Rendimento:</strong> {receitaSelecionada.rendimento}</p>
)}

{receitaSelecionada.beneficios && (
  <p className="text-gray-300 mt-2"><strong>Benefícios:</strong> {receitaSelecionada.beneficios}</p>
)}

{receitaSelecionada.dicas && (
  <>
    <h3 className="text-lg font-semibold text-yellow-200 mt-4 mb-2">Dicas Extras / Variações:</h3>
    <ul className="list-disc list-inside text-gray-300 space-y-1">
      {receitaSelecionada.dicas.map((dica, i) => (
        <li key={i}>{dica}</li>
      ))}
    </ul>
  </>
)}

{receitaSelecionada.resumoVisual && (
  <p className="text-gray-300 mt-4">{receitaSelecionada.resumoVisual}</p>
)}

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Receitas;
