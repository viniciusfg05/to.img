import { Box, Image, SimpleGrid, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { Card } from './Card';
import { ModalViewImage } from './Modal/ViewImage';

interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface CardsProps {
  cards: Card[];
}

export function CardList({ cards }: CardsProps): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure();

  // TODO SELECTED IMAGE URL STATE

  // TODO FUNCTION HANDLE VIEW IMAGE
  // async function handleModalViewImage(onOpen) {
  //   ModalViewImage(onOpen);
  //   console.log('open');
  //   console.log('open');
  // }

  return (
    <>
      <SimpleGrid templateColumns="1fr 1fr 1fr">
        {cards.map(card => (
          <Box key={card.id}>
            <ModalViewImage
              isOpen={isOpen}
              onClose={onClose}
              imgUrl={card.url}
            />
            <Image src={card.url} onClick={onOpen} />
          </Box>
        ))}
      </SimpleGrid>
    </>
  );
}
