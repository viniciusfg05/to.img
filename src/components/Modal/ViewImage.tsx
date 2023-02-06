import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Image,
  Link,
  Button,
  ModalHeader,
  ModalCloseButton,
  Box,
} from '@chakra-ui/react';

interface ModalViewImageProps {
  isOpen: boolean;
  onClose?: () => void;
  imgUrl?: string;
}

export function ModalViewImage({
  isOpen,
  onClose,
  imgUrl,
}: ModalViewImageProps): JSX.Element {
  return (
    <>
      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay w="100vw" h="100vh" bg="rgba(0, 0, 0, 0.6) " />
        <ModalContent
          display="flex"
          justifyContent="center"
          position="relative"
          alignItems="center"
          margin="auto 0"
          ww={900}
          wh={600}
        >
          <ModalBody
            position="relative"
            alignItems="center"
            display="flex"
            w={900}
            h={600}
            p="0"
            bg="transparent"
          >
            <Box bg="transparent">
              <Image src={imgUrl} />
              <Box
                bg="#353431"
                borderRadius={'0px 0px 6px 6px'}
                h="2rem"
                display="flex"
                alignItems="center"
                p={'0.5rem'}
              >
                <Link href="#">Abrir original</Link>
              </Box>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
