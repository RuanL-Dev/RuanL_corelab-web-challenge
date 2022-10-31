import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import axios from 'axios'

import styled from 'styled-components'
import { editCarSchema } from '../../../modules/cars/car.schema'

import Input from '../input/Input'
import ButtonSave from '../button/ButtonSave'

const StyledBody = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0px;
`

const FormContainer = styled.div`
  background-color: ${(props) => props.theme.secondBackgroundColor};
  padding: 100px;
  margin-bottom: 10vh;
  position: relative;

  @media (max-width: 850px) {
    padding: 100px;
  }

  @media (max-width: 650px) {
    padding: 20px;
    padding-bottom: 100px;
  }

  @media (max-width: 450px) {
    align-items: center;
    display: flex;
    flex-direction: column;
  }
`

const ContainerButtonSave = styled.div`
  position: absolute;
  right: 150px;
  bottom: 20px;
  margin-top: 10px;

  @media (max-width: 650px) {
    right: 115px;
  }
  @media (max-width: 450px) {
    align-items: center;
    display: flex;
    flex-direction: column;
    padding: 10px 0px;
  }
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 300px;

  @media (max-width: 445px) {
    width: 350px;
  }

  @media (max-width: 390px) {
    width: 280px;
  }

  @media (max-width: 330px) {
    width: 200px;
  }
`

export default function EditCardRouter({
  id,
  name,
  price,
  description,
  year,
  brand,
  carColor,
  plate,
  onSave
}) {
  const [loading, setLoading] = useState(false)
  const {
    control,
    handleSubmit,
    // eslint-disable-next-line no-unused-vars
    formState: { isValid }
  } = useForm({
    resolver: joiResolver(editCarSchema),
    mode: 'all'
  })

  const handleForm = async ({
    carModel,
    carBrand,
    carColor,
    carPlate,
    carPrice,
    carDescription,
    carYear
  }) => {
    try {
      setLoading(true)
      const { status } = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/cars/indexCars`,
        {
          _id: id,
          carModel,
          carBrand,
          carColor,
          carPlate,
          carPrice,
          carDescription,
          carYear
        }
      )
      if (status === 201) {
        onSave()
      }
    } catch (err) {
      console.error(err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <StyledBody>
        <FormContainer>
          <Form onSubmit={handleSubmit(handleForm)}>
            <Input
              label="Nome"
              placeholder="Insira um novo nome"
              name="carModel"
              control={control}
              defaultValue={name}
            />
            <Input
              label="Marca"
              placeholder="Digite a marca do carro"
              name="carBrand"
              control={control}
              defaultValue={brand}
            />
            <Input
              label="Cor"
              placeholder="Digite a cor do carro"
              name="carColor"
              control={control}
              defaultValue={carColor}
            />
            <Input
              label="Descrição"
              placeholder="Faça uma breve descrição do seu carro"
              name="carDescription"
              control={control}
              defaultValue={description}
            />
            <Input
              label="Ano"
              placeholder="Digite o ano no formato (YYYY)"
              name="carYear"
              control={control}
              defaultValue={year}
            />
            <Input
              label="Placa"
              placeholder="Digite a placa do carro"
              name="carPlate"
              control={control}
              defaultValue={plate}
            />
            <Input
              label="Preço"
              placeholder="Digite o preço do carro"
              name="carPrice"
              control={control}
              defaultValue={price}
            />
            <ContainerButtonSave>
              <ButtonSave loading={loading} type="submit">
                SALVAR
              </ButtonSave>
            </ContainerButtonSave>
          </Form>
        </FormContainer>
      </StyledBody>
    </>
  )
}
