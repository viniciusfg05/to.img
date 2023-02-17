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
      <Modal
        blockScrollOnMount={false}
        isOpen={isOpen}
        onClose={onClose}
        size="900px"
      >
        <ModalOverlay w="100vw" h="100vh" bg="rgba(0, 0, 0, 0.6) " />
        <ModalContent bg="transparent">
          <ModalBody
            sx={{ border: 'none', padding: 0, backgroundColor: 'transparent' }}
            mw="900px"
          >
            <Box w="900px" m="auto auto">
              <Image src={imgUrl} w="100%" position="relative" p="0" />
              <Box
                bg="#353431"
                borderRadius={'0px 0px 6px 6px'}
                h="2rem"
                display="flex"
                alignItems="center"
                p={'0.5rem'}
              >
                <Link href={imgUrl} fontSize="1rem" mr="auto" isExternal>
                  Abrir original
                </Link>
              </Box>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
