import { Box, Button, Stack, useToast } from '@chakra-ui/react';
import { useForm, ValidateResult } from 'react-hook-form';
import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import { api } from '../../services/api';
import { FileInput } from '../Input/FileInput';
import { TextInput } from '../Input/TextInput';
import { Error } from '../Error';

interface FormAddImageProps {
  closeModal: () => void;
}

interface ImputForm {
  create: {
    url: string;
    title: string;
    description: string;
  };
}

export function FormAddImage({ closeModal }: FormAddImageProps): JSX.Element {
  const [imageUrl, setImageUrl] = useState('');
  const [localImageUrl, setLocalImageUrl] = useState('');
  const toast = useToast();

  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: ({ create }: ImputForm) => {
      return api.post('/api/images', create);
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['images'] });
    },
  });

  const { register, handleSubmit, reset, formState, setError, trigger } =
    useForm();

  const { errors } = formState;

  const onSubmit = async (data: any): Promise<void> => {
    try {
      const { description, title } = data;

      const create = {
        description,
        title,
        url: imageUrl,
      };

      toast({
        position: 'bottom-left',
        render: () => (
          <Box color="white" p={3} bg="blue.500">
            Imagem antes de realizar o cadastro.
          </Box>
        ),
      });

      mutateAsync({ create });
    } catch (err) {
      if (err) {
        <Error />;
      }
      return err;
    } finally {
      closeModal();
      setLocalImageUrl('');
      setImageUrl('');
    }
  };

  const validateImage = (value: FileList) => {
    let file = value[0];

    if (file.size / 1024 >= 10000) {
      return 'A image deve ter no maximo 10mb';
    }

    if (
      file.type === 'image/jpeg' ||
      file.type === 'image/png' ||
      file.type === 'image/gif'
    ) {
      return null;
    } else {
      return 'A imagem deve ser um arquivo JPEG/ PNG ou GIF';
    }
  };

  return (
    <Box as="form" width="100%" onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4}>
        <FileInput
          setImageUrl={setImageUrl}
          localImageUrl={localImageUrl}
          setLocalImageUrl={setLocalImageUrl}
          setError={setError}
          trigger={trigger}
          {...register('image', {
            required: {
              value: true,
              message: 'Campo obrigatorio',
            },
            validate: {
              value: value => validateImage(value),
            },
          })}
        />

        <TextInput
          placeholder="Título da imagem..."
          {...register('title', {
            minLength: {
              value: 2,
              message: 'Titulo deve ter no mímino 2 e no máximo 20 caracteres', // JS only: <p>error message</p> TS only support string
            },
            maxLength: {
              value: 20,
              message: 'Titulo deve ter no mímino 2 e no máximo 20 caracteres', // JS only: <p>error message</p> TS only support string
            },
            required: {
              value: true,
              message: 'Campo obrigatório',
            },
          })}
        />

        <TextInput
          placeholder="Descrição da imagem..."
          {...register('description', {
            required: {
              value: true,
              message: 'Campo obrigatório',
            },
            maxLength: {
              value: 20,
              message:
                'Descrição deve ter no mímino 2 e no máximo 20 caracteres', // JS only: <p>error message</p> TS only support string
            },
          })}
        />
      </Stack>

      <Button
        my={6}
        isLoading={formState.isSubmitting}
        isDisabled={
          formState.isSubmitting ||
          errors.title ||
          errors.image ||
          errors.description
            ? true
            : false
        }
        type="submit"
        w="100%"
        py={6}
      >
        Enviar
      </Button>

      {errors.image ? <p>{errors.image.message}</p> : null}
      {errors.description ? <p>{errors.description.message}</p> : null}
      {errors.title ? <p>{errors.title.message}</p> : null}
    </Box>
  );
}
