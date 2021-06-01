import { memo, useState } from "react";
import { AddProductToWishlistProps } from "./AddProductToWishlist";

import dynamic from "next/dynamic";

const AddProductToWishlist = dynamic<AddProductToWishlistProps>(
  () => {
    return import("./AddProductToWishlist").then(
      (mod) => mod.AddProductToWishlist
    );
  },
  {
    loading: () => <span>Carregando...</span>,
  }
);

interface ProductItemProps {
  product: {
    id: number;
    priceFormatted: string;
    price: number;
    title: string;
  };
  onAddToWishList: (id: number) => void;
}

export function ProductItemComponent({
  product,
  onAddToWishList,
}: ProductItemProps) {
  const [isAddingToWishlist, setIsAddingToWishlist] = useState(false);

  return (
    <div>
      {product.title} - <strong>{product.priceFormatted}</strong>
      <button onClick={() => setIsAddingToWishlist(true)}>
        Adiconar aos favoritos
      </button>
      {isAddingToWishlist && (
        <AddProductToWishlist
          onAddToWishlist={() => onAddToWishList(product.id)}
          onRequestClose={() => setIsAddingToWishlist(false)}
        />
      )}
    </div>
  );
}

export const ProductItem = memo(
  ProductItemComponent,
  (prevProps, nextProps) => {
    // comparando cada propriedade dos objetos
    return Object.is(prevProps.product, nextProps.product);
  }
);

// shallow compare -> comparação falsa
// {} === {} // false
// igualdade referencial
