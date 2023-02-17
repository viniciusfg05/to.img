
# MEMO

meno - Compara se o componente mudou, e não gera uma nova versão dela

memo fazer um Shallow Compare => Comparação rasa, verifica a igualdade das informação.
Mas como no javascript ao compararmos dois objetos igual, o javascript retorna "false", por causa da igualdade referencial
    então sempre que uma objeto recebido do componenet mudar o component pai vai rederizar.
Para lidar com propriedade temos que criar uma função no segundo parametro do memo,
    `(prevProps, nextProps) => {}`: prevProps: Dom anterior, nextProps: Nova DOM
    `Object.is()`: Faz uma comparação profunda, cuidar pois custa um pouco de processamento caso os obejetos seja complexo
Desta forma se a condição for satifeira o memo evita uma nova rederização

    Quais situações usar: 
        1. Componentes Puros: Que não dependa de algo exteno da aplicação
        2. Componentes que rederizam de mais
        3. Componentes renderiza com as mesmas props
        4. Components medio para grande
    

```ts
interface ProductItemProps {
    product: {
        id: number;
        price: number;
        title: string;
    }
}

function ProductItemComponent({ product }) {
    return (
    )
}

export const ProductItem = memo(ProductItemComponent, (prevProps, nextProps) => {
    return Object.is(prevProps.product, nextProps.product)
})
```

# USEMENO

useMemo: memorizar uma variavel - Evitar que algo que ocupe muito processamento seja refeito a cada rederização
    Digamos que temos uma função que soma todos os valores de 'product.price'.
    Com useMeno - podemos memorizar esse resultado para que não precise ser realizado o calculo novamento
    Podemos colocar uma dependecia que, caso o valor `results` mude, o calculo é refeito
useMemo - devido a igualdade referencial se não ultilizar o useMeno e passarmos a variavel como propriedade,
    quando a variavel mudar, ela vai ocupar um espaço diferente na memoria.

    Quais situações usar:
        1. Calculos pesados
        2. Igualdade referencial ( quando repasamos uma informação aquela informação a um componente filho  )

```ts
const totalPrice = useMemo(() => {
    return results.reduce((total, product) => {
        return total + product.price
    }, 0)
}, [results])
```

# USECALLBACK

useCallback: memorizar uma função -Quando criamos uma fução que vai se passada para o componentes filhos é importante, ultilizar esse hook.
    Quando o component Pai renderizar, todos as funções tb executariam, devido a igualdade referencial a posição da memoria vai ser diferente da anterio.
    E como o React faz um comparação por igualdade referencial e a função já não ocupa o msm espaço,
        o component que recebe essa propriedade vai rederizar novamente 

```tsx
const addToWishList = useCallback(async (id: number) => {
    console.log(id)
}, [])
```

# FORMATAÇÂO DE DADOS

É importante fazer a formatação dos dados, quando os dados são chamados e não no momento da rederização.

# Dynamic import (Code Splitting)

Para components que precisão da ação do usuario para mudar, podemos fazer com que o components seja importado,
    somente quando precesisa


```tsx

// import { lazy } from "react"
import dymanic from "next/dynamic";

const addPropsToWishList = dynamic</*Props do componte que vai ser importado*/>(() => {
    return import("./AddToWishList").them(mod => mod.addToWishList) // importo o componente 
}, {
    loading: () => <span>Carregando...</span>
})
```

# Virtualização

Biblioteca - react-virtualized

Mostar somente os elementos que então visiveis no navegado.

```tsx
import { List, ListRowRenderer } from "react-virtualized"

function List() {
    const rowRenderer: ListRowRenderer = ({ index, key, style }) => {
        return (
            <div key={key} style={style} /* style: controla se o elemento esá visivel ou não em tela */>
                <ProductItem
                    product={results[index]}
                />
            </div>
        ) 
    }

    return (
        <List
            heiht={300}
            rowHeight={30}
            width={900}
            overscanRowCount={5} // quanto item para cima e para baixo quer que fique pre-carregado
            rowCount={results.lenght}// Maximo de itens
            rowRenderer={rowRenderer} // função que vai renderizar os elemento
        >
        
        </List>
    )
}